import EventEmitter from "eventemitter3";
import log from "loglevel";
import * as msgpack from "msgpack-lite";
import { ConnectionStats } from "./stats";
import { TypedEvent } from "@vramesh/netplayjs-common/typedevent";
/** A reliable data connection to a single peer. */
export class PeerConnection extends EventEmitter {
    constructor(client, peerID, initiator) {
        super();
        Object.defineProperty(this, "client", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "peerID", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "peerConnection", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "dataChannel", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "sendStats", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: new ConnectionStats()
        });
        Object.defineProperty(this, "receiveStats", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: new ConnectionStats()
        });
        Object.defineProperty(this, "onClose", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: new TypedEvent()
        });
        Object.defineProperty(this, "closed", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: false
        });
        this.client = client;
        this.peerID = peerID;
        // Create a RTCPeerConnection.
        this.peerConnection = new RTCPeerConnection({
            iceServers: client.iceServers,
        });
        // Close the connection if the browser page is closed.
        window.addEventListener("beforeunload", (e) => {
            this.peerConnection.close();
            this.dataChannel?.close();
        });
        // Send out candidate messages as we generate ICE candidates.
        this.peerConnection.onicecandidate = (event) => {
            if (event.candidate) {
                this.client.send({
                    kind: "send-message",
                    type: "candidate",
                    destinationID: peerID,
                    payload: event.candidate,
                });
            }
        };
        this.peerConnection.onconnectionstatechange = (event) => {
            log.debug(`ConnectionStateChange: ${this.peerConnection.connectionState}`);
            if (this.peerConnection.connectionState === "disconnected") {
                this.close();
            }
        };
        if (initiator) {
            // Invoked when we are ready to negotiate.
            this.peerConnection.onnegotiationneeded = async () => {
                // Create an offer and send to our peer.
                const offer = await this.peerConnection.createOffer();
                this.client.send({
                    kind: "send-message",
                    type: "offer",
                    destinationID: peerID,
                    payload: offer,
                });
                // Install this offer locally.
                await this.peerConnection.setLocalDescription(offer);
            };
            // Create a reliable data channel.
            this.setDataChannel(this.peerConnection.createDataChannel("data", {
                ordered: true,
            }));
        }
        else {
            this.peerConnection.ondatachannel = (event) => {
                this.setDataChannel(event.channel);
            };
        }
    }
    close() {
        if (!closed) {
            this.closed = true;
            this.peerConnection.close();
            this.dataChannel?.close();
            this.onClose.emit();
        }
    }
    setDataChannel(dataChannel) {
        this.dataChannel = dataChannel;
        this.dataChannel.binaryType = "arraybuffer";
        this.dataChannel.onopen = (e) => {
            this.emit("open");
        };
        this.dataChannel.onmessage = (e) => {
            this.receiveStats.onMessage(e.data.byteLength);
            this.emit("data", msgpack.decode(new Uint8Array(e.data)));
        };
        this.dataChannel.onclose = (e) => {
            log.debug("Data channel closed...");
            this.close();
        };
    }
    async onSignalingMessage(type, payload) {
        log.debug(`onSignalingMessage: ${type}, ${JSON.stringify(payload)}`);
        if (type === "offer") {
            // Set the offer as our remote description.
            await this.peerConnection.setRemoteDescription(payload);
            // Generate an answer and set it as our local description.
            log.debug("Generating answer...");
            const answer = await this.peerConnection.createAnswer();
            await this.peerConnection.setLocalDescription(answer);
            // Send the answer back to our peer.
            this.client.send({
                kind: "send-message",
                type: "answer",
                destinationID: this.peerID,
                payload: answer,
            });
        }
        else if (type === "answer") {
            // Set the answer as our remote description.
            await this.peerConnection.setRemoteDescription(payload);
        }
        else if (type === "candidate") {
            // Add this ICE candidate.
            await this.peerConnection.addIceCandidate(payload);
        }
    }
    send(data) {
        if (this.dataChannel?.readyState !== "open")
            return;
        let encoded = msgpack.encode(data);
        this.sendStats.onMessage(encoded.byteLength);
        this.dataChannel.send(encoded);
    }
}
//# sourceMappingURL=peerconnection.js.map