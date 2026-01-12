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
import { get, shift, clone } from "../utils";
import * as log from "loglevel";
import { DEV } from "../debugging";
import { assert } from "chai";
class RollbackHistory {
    constructor(frame, state, inputs) {
        /**
         * The frame number that this history entry represents.
         */
        Object.defineProperty(this, "frame", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        /**
         * The serialized state of the game at this frame.
         */
        Object.defineProperty(this, "state", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        /**
         * These inputs represent the set of inputs that produced this state
         * from the previous state.
         * Eg: history[n].state = history[n - 1].state.tick(history[n].inputs)
         */
        Object.defineProperty(this, "inputs", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.frame = frame;
        this.state = state;
        this.inputs = inputs;
    }
    isPlayerInputPredicted(player) {
        return get(this.inputs, player).isPrediction;
    }
    anyInputPredicted() {
        for (const [player, { isPrediction }] of this.inputs.entries()) {
            if (isPrediction)
                return true;
        }
        return false;
    }
    allInputsSynced() {
        return !this.anyInputPredicted();
    }
}
export class RollbackNetcode {
    onStateSync(frame, state) {
        DEV && assert.isFalse(this.isHost, "Only clients recieve state syncs.");
        // Cleanup states that we don't need anymore because we have the definitive
        // server state. We have to leave at least one state in order to simulate
        // on the next local tick.
        let cleanedUpStates = 0;
        while (this.history.length > 1) {
            DEV && assert.isTrue(this.history[0].allInputsSynced());
            if (this.history[0].frame < frame) {
                shift(this.history);
                cleanedUpStates++;
            }
            else
                break;
        }
        DEV && log.debug(`Cleaned up ${cleanedUpStates} states.`);
        // Update the first state with the definitive server state.
        DEV && assert.equal(this.history[0].frame, frame);
        this.history[0].state = state;
        // Rollback to this state.
        this.state.deserialize(state);
        // Resimulate up to the current point.
        for (let i = 1; i < this.history.length; ++i) {
            let currentState = this.history[i];
            this.state.tick(this.getStateInputs(currentState.inputs));
            currentState.state = clone(this.state.serialize());
        }
        DEV &&
            log.debug(`Resimulated ${this.history.length - 1} states after state sync.`);
    }
    onRemoteInput(frame, player, input) {
        DEV &&
            assert.isTrue(player.isRemotePlayer(), `'player' must be a remote player.`);
        DEV && assert.isNotEmpty(this.history, `'history' cannot be empty.`);
        let expectedFrame = get(this.highestFrameReceived, player) + 1;
        DEV && assert.equal(expectedFrame, frame);
        this.highestFrameReceived.set(player, expectedFrame);
        // If this input is for a frame that we haven't even simulated, we need to
        // store it in a queue to pull during our next tick.
        if (frame > this.history[this.history.length - 1].frame) {
            get(this.future, player).push({ frame: frame, input: input });
            return; // Skip rest of logic in this function.
        }
        // If we have already simulated a frame F for which we are currently receiving
        // an input, it must be the case that frame F is a prediction. This is because,
        // when we simulated F, we didn't have this input available. Find F.
        let firstPrediction = null;
        for (let i = 0; i < this.history.length; ++i) {
            if (this.history[i].isPlayerInputPredicted(player)) {
                firstPrediction = i;
                break;
            }
        }
        DEV && assert.exists(firstPrediction);
        // Assuming that input messages from a given client are ordered, the
        // first history with a predicted input for this player is also the
        // frame for which we just recieved a message.
        DEV && assert.equal(this.history[firstPrediction].frame, frame);
        // The state before the first prediction is, by definition,
        // not a prediction. There must be one such state.
        let lastActualState = this.history[firstPrediction - 1];
        // Roll back to that previous state.
        this.state.deserialize(lastActualState.state);
        // Resimulate forwards with the actual input.
        for (let i = firstPrediction; i < this.history.length; ++i) {
            let currentState = this.history[i];
            let currentPlayerInput = get(currentState.inputs, player);
            DEV && assert.isTrue(currentPlayerInput.isPrediction);
            if (i === firstPrediction) {
                DEV && assert.equal(currentState.frame, frame);
                currentPlayerInput.isPrediction = false;
                currentPlayerInput.input = input;
            }
            else {
                let previousState = this.history[i - 1];
                let previousPlayerInput = get(previousState.inputs, player);
                currentPlayerInput.input = previousPlayerInput.input.predictNext();
            }
            this.state.tick(this.getStateInputs(currentState.inputs));
            currentState.state = clone(this.state.serialize());
        }
        DEV &&
            log.debug(`Resimulated ${this.history.length - firstPrediction} states after rollback.`);
        // If this is the server, then we can cleanup states for which input has been synced.
        // However, we must maintain the invariant that there is always at least one state
        // in the history buffer, and that the first entry in the history buffer is a
        // synced state.
        if (this.isHost) {
            let cleanedUpStates = 0;
            while (this.history.length >= 2) {
                let firstState = this.history[0];
                let nextState = this.history[1];
                DEV && assert.isTrue(firstState.allInputsSynced());
                if (nextState.allInputsSynced()) {
                    let syncedState = shift(this.history);
                    cleanedUpStates++;
                    this.broadcastState(syncedState.frame, syncedState.state);
                }
                else
                    break;
            }
            DEV && log.debug(`Cleaned up ${cleanedUpStates} states.`);
        }
    }
    constructor(isHost, initialState, players, initialInputs, maxPredictedFrames, pingMeasure, timestep, pollInput, broadcastInput, broadcastState) {
        /**
         * The rollback history buffer.
         */
        Object.defineProperty(this, "history", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        /**
         * The max number of frames that we can predict ahead before we have to stall.
         */
        Object.defineProperty(this, "maxPredictedFrames", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        /**
         * Inputs from other players that have already arrived, but have not been
         * applied due to our simulation being behind.
         */
        Object.defineProperty(this, "future", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "highestFrameReceived", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        /**
         * Whether or not we are the host of this match. The host is responsible for
         * sending our authoritative state updates.
         */
        Object.defineProperty(this, "isHost", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "broadcastInput", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "broadcastState", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "pingMeasure", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "timestep", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "state", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "pollInput", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "players", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.isHost = isHost;
        this.state = initialState;
        this.players = players;
        this.maxPredictedFrames = maxPredictedFrames;
        this.broadcastInput = broadcastInput;
        this.pingMeasure = pingMeasure;
        this.timestep = timestep;
        this.pollInput = pollInput;
        if (isHost) {
            if (broadcastState) {
                this.broadcastState = broadcastState;
            }
            else {
                throw new Error("Expected a broadcast state function.");
            }
        }
        let historyInputs = new Map();
        for (const [player, input] of initialInputs.entries()) {
            historyInputs.set(player, { input, isPrediction: false });
        }
        this.history = [
            new RollbackHistory(0, clone(this.state.serialize()), historyInputs),
        ];
        this.future = new Map();
        this.highestFrameReceived = new Map();
        for (let player of this.players) {
            this.future.set(player, []);
            this.highestFrameReceived.set(player, 0);
        }
    }
    currentFrame() {
        DEV && assert.isNotEmpty(this.history, `'history' cannot be empty.`);
        return this.history[this.history.length - 1].frame;
    }
    largestFutureSize() {
        return Math.max(...Array.from(this.future.values()).map((a) => a.length));
    }
    // Returns the number of frames for which at least one player's input is predicted.
    predictedFrames() {
        for (let i = 0; i < this.history.length; ++i) {
            if (!this.history[i].allInputsSynced()) {
                return this.history.length - i;
            }
        }
        return 0;
    }
    // Whether or not we should stall.
    shouldStall() {
        // If we are predicting too many frames, then we have to stall.
        return this.predictedFrames() > this.maxPredictedFrames;
    }
    tick() {
        DEV && assert.isNotEmpty(this.history, `'history' cannot be empty.`);
        // If we should stall, then don't peform a tick at all.
        if (this.shouldStall())
            return;
        // Get the most recent state.
        const lastState = this.history[this.history.length - 1];
        // Construct the new map of inputs for this frame.
        const newInputs = new Map();
        for (const [player, input] of lastState.inputs.entries()) {
            if (player.isLocalPlayer()) {
                let localInput = this.pollInput();
                // Local player gets the local input.
                newInputs.set(player, { input: localInput, isPrediction: false });
                // Broadcast the input to the other players.
                this.broadcastInput(lastState.frame + 1, localInput);
            }
            else {
                if (get(this.future, player).length > 0) {
                    // If we have already recieved the player's input (due to our)
                    // simulation being behind, then use that input.
                    let future = shift(get(this.future, player));
                    DEV && assert.equal(lastState.frame + 1, future.frame);
                    newInputs.set(player, {
                        input: future.input,
                        isPrediction: false,
                    });
                }
                else {
                    // Otherwise, set the next input based off of the previous input.
                    newInputs.set(player, {
                        input: input.input.predictNext(),
                        isPrediction: true,
                    });
                }
            }
        }
        // Tick our state with the new inputs, which may include predictions.
        this.state.tick(this.getStateInputs(newInputs));
        // Add a history entry into our rollback buffer.
        this.history.push(new RollbackHistory(lastState.frame + 1, clone(this.state.serialize()), newInputs));
    }
    /**
     * Internally, we store inputs with a flag indicating whether or not that input is
     * a prediction. Before sending that to the state, we need to remove the prediction
     * flags, since the game logic doesn't care.
     */
    getStateInputs(inputs) {
        let stateInputs = new Map();
        for (const [player, { input }] of inputs.entries()) {
            stateInputs.set(player, input);
        }
        return stateInputs;
    }
    start() {
        setInterval(() => {
            // TODO: This is way to aggressive of a speed up.
            // If us and our peer are running at the same simulation clock,
            // we should expect inputs from our peer to arrive after we have
            // simulated that state. If inputs from our peer are arriving before
            // we simulate the state, that means we are running slow, and we
            // have to tick faster. Otherwise we are needlessly forcing our
            // peer to predict lots of frames.
            let numTicks = 1;
            if (this.largestFutureSize() > 0) {
                numTicks = 2;
            }
            for (let i = 0; i < numTicks; ++i) {
                this.tick();
            }
        }, this.timestep);
    }
}
//# sourceMappingURL=rollback.js.map