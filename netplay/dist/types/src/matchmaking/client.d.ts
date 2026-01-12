import { ClientMessage, ServerMessage } from "@vramesh/netplayjs-common/matchmaking-protocol";
import { TypedEvent } from "@vramesh/netplayjs-common/typedevent";
import { PeerConnection } from "./peerconnection";
export declare const DEFAULT_SERVER_URL = "https://netplayjs.varunramesh.net";
export declare class MatchmakingClient {
    /** The URL of the matchmaking server that we are connected to. */
    serverURL: string;
    /** The websocket transport that lets us send messages to the server. */
    ws: WebSocket;
    /**
     * The ID that this client is registed as on the server. This ID is only
     * available after the onRegistered event has been called.
     */
    clientID?: string;
    /**
     * The list of ICE servers that we should forward to WebRTC. This
     * is only set after the onRegistered event has been fired.
     */
    iceServers?: RTCIceServer[];
    /** A map of all the currently active PeerConnections. */
    connections: Map<string, PeerConnection>;
    /**
     * This event is emitted as result of matchmaking.
     * The server has told us that we should host a public match.
     * */
    onHostMatch: TypedEvent<{
        clientIDs: Array<string>;
    }>;
    /**
     * This event is emitted as a result of matchmaking.
     * The server has told has that we should join a public match
     * as a client.
     */
    onJoinMatch: TypedEvent<{
        hostID: string;
    }>;
    /**
     * This event is emitted as soon as a peer tries to establish a connection
     * with us. However, you must still wait until the connection is actually
     * open before sending any data.
     */
    onConnection: TypedEvent<PeerConnection>;
    onRegistered: TypedEvent<string>;
    constructor(serverURL?: string);
    send(msg: ClientMessage): void;
    /** THis function handles all messages received from the server. */
    onServerMessage(msg: ServerMessage): void;
    /** Start opening a connection to a peer. */
    connectPeer(peerID: string): PeerConnection;
    /** Start matchmaking. */
    sendMatchRequest(gameID: string, minPlayers: number, maxPlayers: number): void;
}
