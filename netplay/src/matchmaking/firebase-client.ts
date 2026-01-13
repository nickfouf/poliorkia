import { 
    ref, onValue, set, runTransaction, push, 
    onDisconnect, serverTimestamp, increment, 
    onChildAdded, DatabaseReference, off, get
} from "firebase/database";
import { db } from "../firebase-config";
import { IdGenerator } from "../utils/id-generator";
import { TypedEvent } from "@vramesh/netplayjs-common/typedevent";
import * as log from "loglevel";
import EventEmitter from "eventemitter3";
import * as msgpack from "msgpack-lite";
import { ConnectionStats } from "./stats";

// --- Types ---
type SignalMessage = {
    sender: string;
    type: "offer" | "answer" | "candidate";
    payload: any;
};

// --- Firebase Peer Connection Adapter ---
export class FirebasePeerConnection extends EventEmitter {
    peerConnection: RTCPeerConnection;
    dataChannel?: RTCDataChannel;
    
    // Stats to match original PeerConnection interface
    sendStats: ConnectionStats = new ConnectionStats();
    receiveStats: ConnectionStats = new ConnectionStats();
    
    onClose: TypedEvent<void> = new TypedEvent();

    constructor(
        private myId: string, 
        public peerId: string, 
        private roomRef: DatabaseReference, 
        initiator: boolean,
        iceServers: RTCIceServer[] = [{ urls: "stun:stun.l.google.com:19302" }]
    ) {
        super();

        this.peerConnection = new RTCPeerConnection({ iceServers });

        // 1. Handle ICE Candidates
        this.peerConnection.onicecandidate = (event) => {
            if (event.candidate) {
                this.sendSignal("candidate", event.candidate.toJSON());
            }
        };

        // 2. Connection State Changes
        this.peerConnection.onconnectionstatechange = () => {
            log.debug(`ConnectionStateChange: ${this.peerConnection.connectionState}`);
            if (this.peerConnection.connectionState === "disconnected" || 
                this.peerConnection.connectionState === "failed") {
                this.close();
            }
        };

        // 3. Data Channel Logic
        if (initiator) {
            const dc = this.peerConnection.createDataChannel("game-data", { ordered: true });
            this.setupDataChannel(dc);
            
            this.peerConnection.onnegotiationneeded = async () => {
                const offer = await this.peerConnection.createOffer();
                await this.peerConnection.setLocalDescription(offer);
                this.sendSignal("offer", { type: offer.type, sdp: offer.sdp });
            };
        } else {
            this.peerConnection.ondatachannel = (ev) => {
                this.setupDataChannel(ev.channel);
            };
        }

        // 4. Listen for Signals from Firebase
        const signalsRef = ref(db, `${this.roomRef.key}/signals/${this.myId}`);
        onChildAdded(signalsRef, async (snapshot) => {
            const msg = snapshot.val() as SignalMessage;
            if (msg.sender !== this.peerId) return; // Ignore noise

            log.debug(`Received signal: ${msg.type}`);

            if (msg.type === "offer") {
                await this.peerConnection.setRemoteDescription(new RTCSessionDescription(msg.payload));
                const answer = await this.peerConnection.createAnswer();
                await this.peerConnection.setLocalDescription(answer);
                this.sendSignal("answer", { type: answer.type, sdp: answer.sdp });
            } else if (msg.type === "answer") {
                await this.peerConnection.setRemoteDescription(new RTCSessionDescription(msg.payload));
            } else if (msg.type === "candidate") {
                await this.peerConnection.addIceCandidate(new RTCIceCandidate(msg.payload));
            }
        });
    }

    private setupDataChannel(dc: RTCDataChannel) {
        this.dataChannel = dc;
        this.dataChannel.binaryType = "arraybuffer";
        this.dataChannel.onopen = () => this.emit("open");
        this.dataChannel.onmessage = (e) => {
            this.receiveStats.onMessage(e.data.byteLength);
            const decoded = msgpack.decode(new Uint8Array(e.data as ArrayBuffer));
            this.emit("data", decoded);
        };
        this.dataChannel.onclose = () => {
            log.debug("Data channel closed...");
            this.close();
        };
    }

    private sendSignal(type: "offer" | "answer" | "candidate", payload: any) {
        // We write to the *peer's* signal queue
        const targetRef = ref(db, `${this.roomRef.key}/signals/${this.peerId}`);
        push(targetRef, {
            sender: this.myId,
            type,
            payload
        });
    }

    send(data: any) {
        if (this.dataChannel?.readyState === "open") {
            const encoded = msgpack.encode(data);
            this.sendStats.onMessage(encoded.byteLength);
            // @ts-ignore
            this.dataChannel.send(encoded);
        }
    }

    close() {
        this.peerConnection.close();
        this.dataChannel?.close();
        this.onClose.emit();
    }
}

// --- Main Matchmaking Class ---
export class FirebaseMatchmaker {
    myId: string;
    serverTimeOffset = 0;

    onMatchFound: TypedEvent<{ connection: FirebasePeerConnection, isHost: boolean, roomId: string }> = new TypedEvent();

    constructor() {
        // Generate a random temporary ID for this session
        this.myId = Math.random().toString(36).substring(2, 15);
        
        // Track server time offset to sync 15s timeout check logic
        const offsetRef = ref(db, ".info/serverTimeOffset");
        onValue(offsetRef, (snap) => {
            this.serverTimeOffset = snap.val() || 0;
        });
    }

    /**
     * Create a private room with a 6-digit code
     */
    async createPrivateRoom(): Promise<string> {
        // 1. Increment global game counter safely
        const countRef = ref(db, "meta/games_count");
        
        let newCount = 0;
        // Increment the counter transactionally
        const result = await runTransaction(countRef, (current) => {
            return (current || 0) + 1;
        });
        
        if (result.committed) {
             newCount = result.snapshot.val();
        } else {
            throw new Error("Failed to generate Room ID");
        }

        // 2. Generate ID using the permutation algorithm
        const roomId = IdGenerator.generate(newCount);
        const roomRef = ref(db, `rooms/${roomId}`);

        // 3. Set room state
        await set(roomRef, {
            host: this.myId,
            client: null,
            created: serverTimestamp()
        });
        
        // Remove room on disconnect to prevent zombies
        onDisconnect(roomRef).remove();

        // 4. Wait for client
        log.info(`Created private room ${roomId}. Waiting...`);
        const sub = onValue(roomRef, (snapshot) => {
            const data = snapshot.val();
            if (data && data.client) {
                // Client joined!
                off(roomRef, "value", sub); // Stop listening
                this.connect(roomId, data.client, true);
            }
        });

        return roomId;
    }

    /**
     * Join a specific 6-digit room ID
     */
    async joinPrivateRoom(roomId: string) {
        const roomRef = ref(db, `rooms/${roomId}`);

        // 1. Pre-fetch check: Ensures the room exists and warms the local cache
        // to prevent the transaction from seeing 'null' and aborting.
        const snapshot = await get(roomRef);
        if (!snapshot.exists()) {
            throw new Error("Room does not exist.");
        }

        // 2. Transactionally claim the client slot
        const result = await runTransaction(roomRef, (room) => {
            if (room === null) return null; // Ignore cold cache, retry

            if (room.host && !room.client) {
                room.client = this.myId;
                return room;
            }
            return; // Abort if room is full or invalid
        });

        if (result.committed) {
            const val = result.snapshot.val();
            // Double check we are the ones recorded as client
            if (val && val.client === this.myId) {
                this.connect(roomId, val.host, false);
            } else {
                throw new Error("Room is full.");
            }
        } else {
            throw new Error("Room not found or full.");
        }
    }

    /**
     * Public Matchmaking Logic (King of the Hill style on /matchmake)
     */
    private matchmakeInterval: any;
    
    startPublicMatchmaking() {
        const mmRef = ref(db, "matchmake");

        const attemptMatch = async () => {
            const result = await runTransaction(mmRef, (data) => {
                const now = Date.now();
                
                // Case 1: Slot is empty OR Stale (> 15s) -> I claim Host
                if (data === null || (data.timestamp && (now + this.serverTimeOffset) - data.timestamp > 15000)) {
                    return {
                        host: this.myId,
                        client: null,
                        timestamp: serverTimestamp()
                    };
                }

                // Case 2: Slot has a host, but no client, and I am not the host -> I claim Client
                if (data.host && !data.client && data.host !== this.myId) {
                    return {
                        ...data,
                        client: this.myId
                    };
                }

                // Case 3: Slot occupied or I am already involved -> Do nothing (abort transaction)
                return undefined;
            });

            // Analyze the result AFTER the transaction commits to avoid side-effects inside tx
            if (result.committed) {
                const val = result.snapshot.val();
                
                // Check if I successfully became the Client
                if (val && val.client === this.myId && val.host !== this.myId) {
                    const hostId = val.host;
                    this.stopPublicMatchmaking();
                    this.connect(`public_${hostId}`, hostId, false);
                    return;
                }

                // Check if I successfully became the Host
                if (val && val.host === this.myId && !val.client) {
                    // Start listening for a client to join my session
                    this.listenForChallenger(mmRef);
                    return; 
                }
            }
            // If failed, interval will retry
        };

        // Initial attempt
        attemptMatch();
        // Retry every 10 seconds
        this.matchmakeInterval = setInterval(attemptMatch, 10000);
    }

    private listenForChallenger(mmRef: any) {
        const sub = onValue(mmRef, (snap) => {
            const val = snap.val();
            
            // Scenario A: A client has joined!
            if (val && val.host === this.myId && val.client) {
                off(mmRef, "value", sub); // Stop listening
                this.stopPublicMatchmaking(); // Stop the interval
                this.connect(`public_${this.myId}`, val.client, true);
            } 
            // Scenario B: I was overwritten (e.g. by a timeout or collision)
            else if (!val || val.host !== this.myId) {
                off(mmRef, "value", sub);
                // We do NOT stop the interval here; allow the interval to retry matching us
            }
        });
    }

    stopPublicMatchmaking() {
        if (this.matchmakeInterval) clearInterval(this.matchmakeInterval);
    }

    /**
     * Establish the WebRTC connection via Firebase Signaling
     */
    private connect(roomId: string, otherUserId: string, amIHost: boolean) {
        // Reference to where signals are exchanged. 
        let roomRef: DatabaseReference;
        if (roomId.startsWith("public_")) {
             // Use a separate path for public signals
             roomRef = ref(db, `rooms_public/${roomId}`);
        } else {
             roomRef = ref(db, `rooms/${roomId}`);
        }

        const conn = new FirebasePeerConnection(this.myId, otherUserId, roomRef, amIHost);
        
        conn.on("open", () => {
            this.onMatchFound.emit({
                connection: conn,
                isHost: amIHost,
                roomId: roomId
            });
        });
    }
}



