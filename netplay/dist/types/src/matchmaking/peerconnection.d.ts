import EventEmitter from "eventemitter3";
import { MatchmakingClient } from "./client";
import { MessageType } from "@vramesh/netplayjs-common/matchmaking-protocol";
import { ConnectionStats } from "./stats";
import { TypedEvent } from "@vramesh/netplayjs-common/typedevent";
/** A reliable data connection to a single peer. */
export declare class PeerConnection extends EventEmitter {
    client: MatchmakingClient;
    peerID: string;
    peerConnection: RTCPeerConnection;
    dataChannel?: RTCDataChannel;
    sendStats: ConnectionStats;
    receiveStats: ConnectionStats;
    onClose: TypedEvent<void>;
    constructor(client: MatchmakingClient, peerID: string, initiator: boolean);
    closed: boolean;
    close(): void;
    setDataChannel(dataChannel: RTCDataChannel): void;
    onSignalingMessage(type: MessageType, payload: any): Promise<void>;
    send(data: any): void;
}
