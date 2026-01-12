import { JsonValue } from "type-fest";
/**
 * NetplayState is the interface between the netcode
 * and the actual game mechanics. It describes to the
 * netcode how to simulate the game forward and how to
 * save / restore the game for rewinds.
 */
export declare abstract class NetplayState<TInput extends NetplayInput> {
    /**
     * This function describes how a state ticks forward given
     * the player inputs. It's used by netcodes to simulate the
     * game forward, sometimes with predicted inputs
     * and sometimes with actual inputs.
     */
    abstract tick(playerInputs: Map<NetplayPlayer, TInput>): void;
    /**
     * By default, use the auto serializer.
     */
    serialize(): JsonValue;
    /**
     * By default, use the auto deserializer.
     */
    deserialize(value: JsonValue): void;
}
/**
 * NetplayJS games are synchronized by sending inputs across the network.
 * The NetplayInput class represents a single input for a single frame. It can
 * be keyboard keys, mouse positions, etc. Basically any thing that exists outside
 * of the simulation of the game.
 */
export declare abstract class NetplayInput {
    /**
     * For predictive netcodes like rollback, we need to be able
     * to speculatively predict the next input from the current
     * input. By default, though, the prediction is just the same value as
     * the previous frame.
     */
    predictNext(): this;
    /**
     * By default, use the auto serializer.
     */
    serialize(): JsonValue;
    /**
     * By default, use the auto deserializer.
     */
    deserialize(value: JsonValue): void;
}
/**
 * A NetplayPlayer object represents one player in a game.
 */
export declare class NetplayPlayer {
    id: number;
    isLocal: boolean;
    isHost: boolean;
    constructor(id: number, isLocal: boolean, isHost: boolean);
    isLocalPlayer(): boolean;
    isRemotePlayer(): boolean;
    isServer(): boolean;
    isClient(): boolean;
    getID(): number;
}
