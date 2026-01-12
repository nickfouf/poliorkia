/**
 * Rollback netcode is an effective netcode algorithm for two-player games which allows
 * both players to have lag-free control of their own character, at the expense of
 * artifacting for remote characters. This is the most common algorithm used in
 * fighting games.
 *
 * The algorithm works as follows:
 * - All clients play on the same clock.
 * - When a client simulates a frame F, it uses it's own local input, but makes a guess as to what
 *   actions the remote players have taken. The client sends it's local input to all other players.
 * - When a remote player's input for frame F arrives, we rewind the state of the game to F - 1,
 *   and replay forward with the correct input from frame F.
 *
 * Resources:
 * - RetroArch Netplay Implementation: https://github.com/libretro/RetroArch/tree/v1.9.0/network/netplay
 */
import { NetplayInput, NetplayPlayer, NetplayState } from "./types";
import { JsonValue } from "type-fest";
declare class RollbackHistory<TInput extends NetplayInput> {
    /**
     * The frame number that this history entry represents.
     */
    frame: number;
    /**
     * The serialized state of the game at this frame.
     */
    state: JsonValue;
    /**
     * These inputs represent the set of inputs that produced this state
     * from the previous state.
     * Eg: history[n].state = history[n - 1].state.tick(history[n].inputs)
     */
    inputs: Map<NetplayPlayer, {
        input: TInput;
        isPrediction: boolean;
    }>;
    constructor(frame: number, state: JsonValue, inputs: Map<NetplayPlayer, {
        input: TInput;
        isPrediction: boolean;
    }>);
    isPlayerInputPredicted(player: NetplayPlayer): boolean;
    anyInputPredicted(): boolean;
    allInputsSynced(): boolean;
}
export declare class RollbackNetcode<TState extends NetplayState<TInput>, TInput extends NetplayInput> {
    /**
     * The rollback history buffer.
     */
    history: Array<RollbackHistory<TInput>>;
    /**
     * The max number of frames that we can predict ahead before we have to stall.
     */
    maxPredictedFrames: number;
    /**
     * Inputs from other players that have already arrived, but have not been
     * applied due to our simulation being behind.
     */
    future: Map<NetplayPlayer, Array<{
        frame: number;
        input: TInput;
    }>>;
    highestFrameReceived: Map<NetplayPlayer, number>;
    /**
     * Whether or not we are the host of this match. The host is responsible for
     * sending our authoritative state updates.
     */
    isHost: boolean;
    onStateSync(frame: number, state: JsonValue): void;
    onRemoteInput(frame: number, player: NetplayPlayer, input: TInput): void;
    broadcastInput: (frame: number, input: TInput) => void;
    broadcastState?: (frame: number, state: JsonValue) => void;
    pingMeasure: any;
    timestep: number;
    state: TState;
    pollInput: () => TInput;
    players: Array<NetplayPlayer>;
    constructor(isHost: boolean, initialState: TState, players: Array<NetplayPlayer>, initialInputs: Map<NetplayPlayer, TInput>, maxPredictedFrames: number, pingMeasure: any, timestep: number, pollInput: () => TInput, broadcastInput: (frame: number, input: TInput) => void, broadcastState?: (frame: number, state: JsonValue) => void);
    currentFrame(): number;
    largestFutureSize(): number;
    predictedFrames(): number;
    shouldStall(): boolean;
    tick(): void;
    /**
     * Internally, we store inputs with a flag indicating whether or not that input is
     * a prediction. Before sending that to the state, we need to remove the prediction
     * flags, since the game logic doesn't care.
     */
    getStateInputs(inputs: Map<NetplayPlayer, {
        input: TInput;
        isPrediction: boolean;
    }>): Map<NetplayPlayer, TInput>;
    start(): void;
}
export {};
