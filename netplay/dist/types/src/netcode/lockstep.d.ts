/**
 * Lockstep networking is the simplest networking architecture for games. It's easy
 * to retrofit into an existing game. It also tends to work well for low tick rate games
 * like an RTS.
 *
 * Each player broadcasts their own local input while waiting for inputs from remote players.
 * Once all remote player inputs have been received, the game can tick forward one step.
 * This architecture is the easiest to implement into an existing game, since there is no
 * rewinding or prediction required.
 */
import { NetplayInput, NetplayPlayer, NetplayState } from "./types";
import { JsonValue } from "type-fest";
export declare class LockstepNetcode<TState extends NetplayState<TInput>, TInput extends NetplayInput> {
    /**
     * Whether or not we are the host of this match. The host is responsible for
     * sending our authoritative state updates to prevent non-determinism.
     */
    isHost: boolean;
    /** The current frame we are on. */
    frame: number;
    /** The current state of the game. */
    state: TState;
    /** The list of players that are in this match. */
    players: Array<NetplayPlayer>;
    broadcastInput: (frame: number, input: TInput) => void;
    pollInput: () => TInput;
    timestep: number;
    /**
     * A queue of inputs for each player. When every player has at least one
     * input in their queue, the game state can tick forward.
     */
    inputs: Map<NetplayPlayer, Array<{
        frame: number;
        input: TInput;
    }>>;
    /**
     * How often the host should send out an authoritative state sync.
     * If set to zero, the state can be considered deterministic and no
     * state syncs are required.
     */
    stateSyncPeriod: number;
    broadcastState?: (frame: number, state: JsonValue) => void;
    constructor(isHost: boolean, initialState: TState, players: Array<NetplayPlayer>, timestep: number, stateSyncPeriod: number, pollInput: () => TInput, broadcastInput: (frame: number, input: TInput) => void, broadcastState?: (frame: number, state: JsonValue) => void);
    getLocalPlayer(): NetplayPlayer;
    /**
     * Check if we have at least one input queued for every player.
     */
    checkAllInputsReady(): boolean;
    missedFrames: number;
    tryAdvanceState(): void;
    start(): void;
    stateSyncsReceived: number;
    onStateSync(frame: number, serializedState: JsonValue): void;
    stateSyncsSent: number;
    tryStateSync(): void;
    processLocalInput(): void;
    onRemoteInput(frame: number, player: NetplayPlayer, input: TInput): void;
}
