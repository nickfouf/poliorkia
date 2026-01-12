import log from "loglevel";
import { TypedEvent } from "@vramesh/netplayjs-common/typedevent";
import { PeerConnection } from "./peerconnection";
export const DEFAULT_SERVER_URL = "https://netplayjs.varunramesh.net";
/**
 * Server URLs are provided using either http:// or https://. We use
 * this URL to connect to any REST endpoints. We can also derive the
 * WebSocket endpoint by changing the protocol to ws:// or wss:// respectively.
 */
function getWebSocketURL(serverURL) {
    const url = new URL(serverURL);
    if (url.protocol === "http:") {
        return `ws://${url.hostname}:${url.port}/`;
    }
    else if (url.protocol === "https:") {
        return `wss://${url.hostname}:${url.port}/`;
    }
    else {
        throw new Error(`Unknown protocol: ${url.protocol}`);
    }
}
export class MatchmakingClient {
    constructor(serverURL = DEFAULT_SERVER_URL) {
        /** The URL of the matchmaking server that we are connected to. */
        Object.defineProperty(this, "serverURL", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        /** The websocket transport that lets us send messages to the server. */
        Object.defineProperty(this, "ws", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        /**
         * The ID that this client is registed as on the server. This ID is only
         * available after the onRegistered event has been called.
         */
        Object.defineProperty(this, "clientID", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        /**
         * The list of ICE servers that we should forward to WebRTC. This
         * is only set after the onRegistered event has been fired.
         */
        Object.defineProperty(this, "iceServers", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        /** A map of all the currently active PeerConnections. */
        Object.defineProperty(this, "connections", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: new Map()
        });
        /**
         * This event is emitted as result of matchmaking.
         * The server has told us that we should host a public match.
         * */
        Object.defineProperty(this, "onHostMatch", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: new TypedEvent()
        });
        /**
         * This event is emitted as a result of matchmaking.
         * The server has told has that we should join a public match
         * as a client.
         */
        Object.defineProperty(this, "onJoinMatch", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: new TypedEvent()
        });
        /**
         * This event is emitted as soon as a peer tries to establish a connection
         * with us. However, you must still wait until the connection is actually
         * open before sending any data.
         */
        Object.defineProperty(this, "onConnection", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: new TypedEvent()
        });
        Object.defineProperty(this, "onRegistered", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: new TypedEvent()
        });
        this.serverURL = serverURL;
        this.ws = new WebSocket(getWebSocketURL(this.serverURL));
        this.ws.onmessage = (message) => {
            log.debug(`Server -> Client: ${message.data}`);
            this.onServerMessage(JSON.parse(message.data));
        };
    }
    send(msg) {
        const data = JSON.stringify(msg);
        log.debug(`Client -> Server: ${data}`);
        this.ws.send(data);
    }
    /** THis function handles all messages received from the server. */
    onServerMessage(msg) {
        if (msg.kind === "registration-success") {
            // If we registered successfully, emit an event.
            this.clientID = msg.clientID;
            this.iceServers = msg.iceServers;
            this.onRegistered.emit(this.clientID);
        }
        else if (msg.kind === "peer-message") {
            // We've received a peer message. Check if we already have a
            // matching PeerConnection.
            if (!this.connections.has(msg.sourceID)) {
                // Create the connection and emit it.
                const connection = new PeerConnection(this, msg.sourceID, false);
                this.connections.set(msg.sourceID, connection);
                this.onConnection.emit(connection);
            }
            // Forward the signaling message to our peer.
            this.connections
                .get(msg.sourceID)
                .onSignalingMessage(msg.type, msg.payload);
        }
        else if (msg.kind === "host-match") {
            // The server is telling us to host a match.
            this.onHostMatch.emit({
                clientIDs: msg.clientIDs,
            });
        }
        else if (msg.kind === "join-match") {
            // The server is telling us to join a match.
            this.onJoinMatch.emit({
                hostID: msg.hostID,
            });
        }
    }
    /** Start opening a connection to a peer. */
    connectPeer(peerID) {
        const connection = new PeerConnection(this, peerID, true);
        this.connections.set(peerID, connection);
        this.onConnection.emit(connection);
        return connection;
    }
    /** Start matchmaking. */
    sendMatchRequest(gameID, minPlayers, maxPlayers) {
        this.send({
            kind: "match-request",
            gameID: gameID,
            minPlayers,
            maxPlayers,
        });
    }
}
//# sourceMappingURL=client.js.map