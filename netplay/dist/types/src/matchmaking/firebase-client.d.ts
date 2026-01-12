import { DatabaseReference } from "firebase/database";
import { TypedEvent } from "@vramesh/netplayjs-common/typedevent";
import EventEmitter from "eventemitter3";
import { ConnectionStats } from "./stats";
export declare class FirebasePeerConnection extends EventEmitter {
    private myId;
    peerId: string;
    private roomRef;
    peerConnection: RTCPeerConnection;
    dataChannel?: RTCDataChannel;
    sendStats: ConnectionStats;
    receiveStats: ConnectionStats;
    onClose: TypedEvent<void>;
    constructor(myId: string, peerId: string, roomRef: DatabaseReference, initiator: boolean, iceServers?: RTCIceServer[]);
    private setupDataChannel;
    private sendSignal;
    send(data: any): void;
    close(): void;
}
export declare class FirebaseMatchmaker {
    myId: string;
    serverTimeOffset: number;
    onMatchFound: TypedEvent<{
        connection: FirebasePeerConnection;
        isHost: boolean;
        roomId: string;
    }>;
    constructor();
    /**
     * Create a private room with a 6-digit code
     */
    createPrivateRoom(): Promise<string>;
    /**
     * Join a specific 6-digit room ID
     */
    joinPrivateRoom(roomId: string): Promise<void>;
    /**
     * Public Matchmaking Logic (King of the Hill style on /matchmake)
     */
    private matchmakeInterval;
    startPublicMatchmaking(): void;
    private listenForChallenger;
    stopPublicMatchmaking(): void;
    /**
     * Establish the WebRTC connection via Firebase Signaling
     */
    private connect;
}
