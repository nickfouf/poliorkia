import * as autoserialize from "../serialization/autoserialize";
/**
 * NetplayState is the interface between the netcode
 * and the actual game mechanics. It describes to the
 * netcode how to simulate the game forward and how to
 * save / restore the game for rewinds.
 */
export class NetplayState {
    /**
     * By default, use the auto serializer.
     */
    serialize() {
        return autoserialize.serialize(this);
    }
    /**
     * By default, use the auto deserializer.
     */
    deserialize(value) {
        autoserialize.deserialize(value, this);
    }
}
/**
 * NetplayJS games are synchronized by sending inputs across the network.
 * The NetplayInput class represents a single input for a single frame. It can
 * be keyboard keys, mouse positions, etc. Basically any thing that exists outside
 * of the simulation of the game.
 */
export class NetplayInput {
    /**
     * For predictive netcodes like rollback, we need to be able
     * to speculatively predict the next input from the current
     * input. By default, though, the prediction is just the same value as
     * the previous frame.
     */
    predictNext() {
        return this;
    }
    /**
     * By default, use the auto serializer.
     */
    serialize() {
        return autoserialize.serialize(this);
    }
    /**
     * By default, use the auto deserializer.
     */
    deserialize(value) {
        autoserialize.deserialize(value, this);
    }
}
/**
 * A NetplayPlayer object represents one player in a game.
 */
export class NetplayPlayer {
    constructor(id, isLocal, isHost) {
        Object.defineProperty(this, "id", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "isLocal", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "isHost", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.id = id;
        this.isLocal = isLocal;
        this.isHost = isHost;
    }
    isLocalPlayer() {
        return this.isLocal;
    }
    isRemotePlayer() {
        return !this.isLocal;
    }
    isServer() {
        return this.isHost;
    }
    isClient() {
        return !this.isHost;
    }
    getID() {
        return this.id;
    }
}
//# sourceMappingURL=types.js.map