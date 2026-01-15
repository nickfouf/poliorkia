import { 
    ref, onValue, set, runTransaction, push, 
    onDisconnect, serverTimestamp, 
    onChildAdded, DatabaseReference, off, get,
    child, remove
} from "firebase/database";
import { db, auth } from "../firebase-config"; 
import { signInAnonymously, onAuthStateChanged } from "firebase/auth";

import { IdGenerator } from "../utils/id-generator";
import { TypedEvent } from "@vramesh/netplayjs-common/typedevent";
import * as log from "loglevel";
import EventEmitter from "eventemitter3";
import * as msgpack from "msgpack-lite";
import { ConnectionStats } from "./stats";
import strings from "../strings.json";
import { GameVisualConfig } from "../../../src/types";

// --- Types ---
type SignalMessage = {
    sender: string;
    type: "offer" | "answer" | "candidate";
    payload: any;
    timestamp: number;
};

// --- Firebase Peer Connection Adapter ---
export class FirebasePeerConnection extends EventEmitter {
    peerConnection: RTCPeerConnection;
    dataChannel?: RTCDataChannel;
    
    sendStats: ConnectionStats = new ConnectionStats();
    receiveStats: ConnectionStats = new ConnectionStats();
    
    onClose: TypedEvent<void> = new TypedEvent();

    private signalsRef: DatabaseReference;
    private signalCallback: (snapshot: any) => void;
    private candidateQueue: RTCIceCandidateInit[] = [];
    
    private createdAt: number;
    private isNegotiating = false;

    private processingQueue: Promise<void> = Promise.resolve();

    constructor(
        private myId: string, 
        public peerId: string, 
        private roomRef: DatabaseReference, 
        initiator: boolean,
        private serverTimeOffset: number, 
        iceServers: RTCIceServer[] = [{ urls: "stun:stun.l.google.com:19302" }]
    ) {
        super();
        
        this.createdAt = Date.now() + this.serverTimeOffset;
        this.peerConnection = new RTCPeerConnection({ iceServers });

        this.peerConnection.onicecandidate = (event) => {
            if (event.candidate) {
                this.sendSignal("candidate", event.candidate.toJSON());
            }
        };

        this.peerConnection.onconnectionstatechange = () => {
            if (this.peerConnection.connectionState === "disconnected" || 
                this.peerConnection.connectionState === "failed") {
                this.close();
            }
        };

        if (initiator) {
            const dc = this.peerConnection.createDataChannel("game-data", { ordered: true });
            this.setupDataChannel(dc);
            
            this.peerConnection.onnegotiationneeded = async () => {
                if (this.isNegotiating) return;
                this.isNegotiating = true;
                try {
                    const offer = await this.peerConnection.createOffer();
                    await this.peerConnection.setLocalDescription(offer);
                    this.sendSignal("offer", { type: offer.type, sdp: offer.sdp });
                } catch (err) {
                    console.error("Negotiation failed", err);
                } finally {
                    this.isNegotiating = false;
                }
            };
        } else {
            this.peerConnection.ondatachannel = (ev) => {
                this.setupDataChannel(ev.channel);
            };
        }

        this.signalsRef = child(this.roomRef, `signals/${this.myId}`);
        this.signalCallback = (snapshot) => {
            const msg = snapshot.val() as SignalMessage;
            this.processingQueue = this.processingQueue
                .then(() => this.handleSignal(msg, initiator))
                .catch(err => {
                    if (err.message && err.message.includes("stable")) {
                        log.warn("Suppressed duplicate signal error.");
                    } else {
                        log.error(`Error processing signal ${msg.type}:`, err);
                    }
                });
        };
        onChildAdded(this.signalsRef, this.signalCallback);
    }

    private async handleSignal(msg: SignalMessage, initiator: boolean) {
        if (msg.sender !== this.peerId) return; 
        if (this.peerConnection.signalingState === "closed") return;
        if (msg.timestamp && msg.timestamp < this.createdAt - 2000) return;

        if (msg.type === "offer") {
            if (!initiator) {
                const isStable = this.peerConnection.signalingState === "stable";
                const hasRemote = this.peerConnection.signalingState === "have-remote-offer";
                
                if (isStable || hasRemote) {
                    await this.peerConnection.setRemoteDescription(new RTCSessionDescription(msg.payload));
                    while (this.candidateQueue.length > 0) {
                        const c = this.candidateQueue.shift();
                        if (c) await this.peerConnection.addIceCandidate(new RTCIceCandidate(c));
                    }
                    const answer = await this.peerConnection.createAnswer();
                    await this.peerConnection.setLocalDescription(answer);
                    this.sendSignal("answer", { type: answer.type, sdp: answer.sdp });
                }
            }
        } else if (msg.type === "answer") {
            if (initiator && this.peerConnection.signalingState === "have-local-offer") {
                await this.peerConnection.setRemoteDescription(new RTCSessionDescription(msg.payload));
            }
        } else if (msg.type === "candidate") {
            if (this.peerConnection.remoteDescription && this.peerConnection.signalingState !== "closed") {
                await this.peerConnection.addIceCandidate(new RTCIceCandidate(msg.payload));
            } else {
                this.candidateQueue.push(msg.payload);
            }
        }
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
            this.close();
        };
    }

    private sendSignal(type: "offer" | "answer" | "candidate", payload: any) {
        const targetRef = child(this.roomRef, `signals/${this.peerId}`);
        push(targetRef, {
            sender: this.myId,
            type,
            payload,
            timestamp: Date.now() + this.serverTimeOffset
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
        if (this.signalsRef && this.signalCallback) {
            off(this.signalsRef, "child_added", this.signalCallback);
        }
        this.peerConnection.close();
        this.dataChannel?.close();
        this.onClose.emit();
    }
}

// --- Main Matchmaking Class ---
export class FirebaseMatchmaker {
    myId: string = "";
    serverTimeOffset = 0;
    private authReady: Promise<void>;

    private challengerUnsub?: () => void;
    private privateRoomUnsub?: () => void;
    private currentHostedRoomId?: string;

    onMatchFound: TypedEvent<{
        connection: FirebasePeerConnection,
        isHost: boolean,
        roomId: string,
        opponentName: string,
        opponentTeamIndex: number,
        duration?: number,
        visuals?: GameVisualConfig
    }> = new TypedEvent();

    constructor() {
        this.authReady = new Promise((resolve) => {
            onAuthStateChanged(auth, (user) => {
                if (user) {
                    this.myId = user.uid;
                    resolve();
                } else {
                    signInAnonymously(auth).catch((error) => {
                        console.error("Auth Failed", error);
                    });
                }
            });
        });

        const offsetRef = ref(db, ".info/serverTimeOffset");
        onValue(offsetRef, (snap) => {
            this.serverTimeOffset = snap.val() || 0;
        });
    }

    private async ensureAuth() {
        await this.authReady;
        if (!this.myId) throw new Error("Not authenticated");
    }

    async createPrivateRoom(playerName: string, teamIndex: number, duration: number, visuals: GameVisualConfig, forceNew: boolean = false): Promise<string> {
        await this.ensureAuth();
        this.cancelPrivateHosting();

        const countRef = ref(db, "meta/games_count");
        let finalGameIndex = -1;
        const storedIndexStr = sessionStorage.getItem("poliorkia_saved_game_index");

        if (!forceNew && storedIndexStr) {
            const storedIndex = parseInt(storedIndexStr, 10);
            const snapshot = await get(countRef);
            const currentGlobalCount = snapshot.val() || 0;
            const diff = currentGlobalCount - storedIndex;
            if (diff >= 0 && diff < IdGenerator.MODULUS) {
                finalGameIndex = storedIndex;
                log.info(`Reusing existing game index: ${finalGameIndex}`);
            }
        }

        if (finalGameIndex === -1) {
            const result = await runTransaction(countRef, (current) => (current || 0) + 1);
            if (result.committed) {
                finalGameIndex = result.snapshot.val();
                sessionStorage.setItem("poliorkia_saved_game_index", finalGameIndex.toString());
            } else {
                throw new Error("Failed to generate Room ID");
            }
        }

        const roomId = IdGenerator.generate(finalGameIndex);
        const roomRef = ref(db, `rooms/${roomId}`);
        this.currentHostedRoomId = roomId;

        await set(roomRef, {
            host: this.myId,
            hostName: playerName,
            hostTeam: teamIndex,
            gameDuration: duration,
            visuals: visuals,
            client: null,
            created: serverTimestamp()
        });

        onDisconnect(roomRef).remove();
        log.info(`Created private room ${roomId}.`);

        const unsub = onValue(roomRef, (snapshot) => {
            const data = snapshot.val();
            if (data && data.client) {
                if (this.privateRoomUnsub) {
                    this.privateRoomUnsub();
                    this.privateRoomUnsub = undefined;
                }
                const clientName = data.clientName || strings.game.default_opponent_name;
                const clientTeam = (typeof data.clientTeam === 'number') ? data.clientTeam : 0;
                this.connect(roomId, data.client, true, clientName, clientTeam, duration, visuals);
            }
        });
        this.privateRoomUnsub = unsub;
        return roomId;
    }

    cancelPrivateHosting() {
        if (this.privateRoomUnsub) {
            this.privateRoomUnsub();
            this.privateRoomUnsub = undefined;
        }
        if (this.currentHostedRoomId) {
            const roomRef = ref(db, `rooms/${this.currentHostedRoomId}`);
            remove(roomRef).catch(err => console.warn("Failed to cleanup room", err));
            this.currentHostedRoomId = undefined;
        }
    }

    async joinPrivateRoom(roomId: string, playerName: string, teamIndex: number) {
        await this.ensureAuth();
        const roomRef = ref(db, `rooms/${roomId}`);
        const snapshot = await get(roomRef);
        if (!snapshot.exists()) throw new Error("Room does not exist.");
        
        const data = snapshot.val();
        const hostName = data.hostName || strings.game.default_opponent_name;
        const hostTeam = (typeof data.hostTeam === 'number') ? data.hostTeam : 0;
        const duration = (typeof data.gameDuration === 'number') ? data.gameDuration : 45;
        const visuals = data.visuals;

        const result = await runTransaction(roomRef, (room) => {
            if (room === null) return null;
            if (room.host && !room.client) {
                room.client = this.myId;
                room.clientName = playerName;
                room.clientTeam = teamIndex;
                return room;
            }
            return;
        });

        if (result.committed) {
            const val = result.snapshot.val();
            if (val && val.client === this.myId) {
                this.connect(roomId, val.host, false, hostName, hostTeam, duration, visuals);
            } else {
                throw new Error("Room is full.");
            }
        } else {
            throw new Error("Room not found or full.");
        }
    }

    private matchmakeInterval: any;

    async startPublicMatchmaking(playerName: string, teamIndex: number) {
        await this.ensureAuth();
        const mmRef = ref(db, "matchmake");

        const attemptMatch = async () => {
            const result = await runTransaction(mmRef, (data) => {
                const now = Date.now();
                if (data === null || (data.timestamp && (now + this.serverTimeOffset) - data.timestamp > 6000)) {
                    return {
                        host: this.myId,
                        hostName: playerName,
                        hostTeam: teamIndex,
                        client: null,
                        timestamp: serverTimestamp()
                    };
                }
                if (data.host && !data.client && data.host !== this.myId) {
                    return {
                        ...data,
                        client: this.myId,
                        clientName: playerName,
                        clientTeam: teamIndex
                    };
                }
                return undefined;
            });

            if (result.committed) {
                const val = result.snapshot.val();
                if (val && val.client === this.myId && val.host !== this.myId) {
                    const hostId = val.host;
                    const hostName = val.hostName || strings.game.default_opponent_name;
                    const hostTeam = (typeof val.hostTeam === 'number') ? val.hostTeam : 0;
                    this.stopPublicMatchmaking();
                    this.connect(`public_${hostId}`, hostId, false, hostName, hostTeam, 45, undefined);
                    return;
                }
                if (val && val.host === this.myId && !val.client) {
                    this.listenForChallenger(mmRef);
                    return;
                }
            }
        };

        attemptMatch();
        this.matchmakeInterval = setInterval(attemptMatch, 3000);
    }

    private listenForChallenger(mmRef: any) {
        if (this.challengerUnsub) this.challengerUnsub();
        this.challengerUnsub = onValue(mmRef, (snap) => {
            const val = snap.val();
            if (val && val.host === this.myId && val.client) {
                if (this.challengerUnsub) this.challengerUnsub();
                this.challengerUnsub = undefined;
                this.stopPublicMatchmaking();
                const clientName = val.clientName || strings.game.default_opponent_name;
                const clientTeam = (typeof val.clientTeam === 'number') ? val.clientTeam : 0;
                this.connect(`public_${this.myId}`, val.client, true, clientName, clientTeam, 45, undefined);
            }
            else if (!val || val.host !== this.myId) {
                if (this.challengerUnsub) this.challengerUnsub();
                this.challengerUnsub = undefined;
            }
        });
    }

    stopPublicMatchmaking() {
        if (this.matchmakeInterval) clearInterval(this.matchmakeInterval);
        this.matchmakeInterval = undefined;
        if (this.challengerUnsub) {
            this.challengerUnsub();
            this.challengerUnsub = undefined;
        }
    }

    private async connect(
        roomId: string, 
        otherUserId: string, 
        amIHost: boolean, 
        opponentName: string, 
        opponentTeamIndex: number,
        duration: number,
        visuals?: GameVisualConfig
    ) {
        let roomRef: DatabaseReference;
        if (roomId.startsWith("public_")) {
            roomRef = ref(db, `rooms_public/${roomId}`);
        } else {
            roomRef = ref(db, `rooms/${roomId}`);
        }

        const mySignalsRef = child(roomRef, `signals/${this.myId}`);
        await set(mySignalsRef, null);

        const conn = new FirebasePeerConnection(this.myId, otherUserId, roomRef, amIHost, this.serverTimeOffset);

        conn.on("open", () => {
            this.onMatchFound.emit({
                connection: conn,
                isHost: amIHost,
                roomId: roomId,
                opponentName: opponentName,
                opponentTeamIndex: opponentTeamIndex,
                duration: duration,
                visuals: visuals
            });
        });
    }
}

