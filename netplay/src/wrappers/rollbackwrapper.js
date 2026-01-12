import { DefaultInput } from "../defaultinput";
import * as log from "loglevel";
import { GameWrapper } from "./gamewrapper";
import { RollbackNetcode } from "../netcode/rollback";
import { assert } from "chai";
import * as lit from "lit-html";
export class RollbackWrapper extends GameWrapper {
    constructor(gameClass) {
        super(gameClass);
        Object.defineProperty(this, "game", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "rollbackNetcode", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
    }
    getInitialInputs(players) {
        let initialInputs = new Map();
        for (let player of players) {
            initialInputs.set(player, new DefaultInput());
        }
        return initialInputs;
    }
    startHost(players, conn) {
        assert(conn.dataChannel?.readyState === "open", "DataChannel must be open.");
        log.info("Starting a rollback host.");
        this.game = new this.gameClass(this.canvas, players);
        this.rollbackNetcode = new RollbackNetcode(true, this.game, players, this.getInitialInputs(players), 10, this.pingMeasure, this.gameClass.timestep, () => this.inputReader.getInput(), (frame, input) => {
            conn.send({ type: "input", frame: frame, input: input.serialize() });
        }, (frame, state) => {
            conn.send({ type: "state", frame: frame, state: state });
        });
        conn.on("data", (data) => {
            if (data.type === "input") {
                let input = new DefaultInput();
                input.deserialize(data.input);
                this.rollbackNetcode.onRemoteInput(data.frame, players[1], input);
            }
        });
        console.log("Client has connected... Starting game...");
        this.startGameLoop();
    }
    startClient(players, conn) {
        assert(conn.dataChannel?.readyState === "open", "DataChannel must be open.");
        log.info("Starting a rollback client.");
        this.game = new this.gameClass(this.canvas, players);
        this.rollbackNetcode = new RollbackNetcode(false, this.game, players, this.getInitialInputs(players), 10, this.pingMeasure, this.gameClass.timestep, () => this.inputReader.getInput(), (frame, input) => {
            conn.send({ type: "input", frame: frame, input: input.serialize() });
        });
        conn.on("data", (data) => {
            if (data.type === "input") {
                let input = new DefaultInput();
                input.deserialize(data.input);
                this.rollbackNetcode.onRemoteInput(data.frame, players[0], input);
            }
            else if (data.type === "state") {
                this.rollbackNetcode.onStateSync(data.frame, data.state);
            }
        });
        console.log("Successfully connected to server... Starting game...");
        this.startGameLoop();
    }
    startGameLoop() {
        this.stats.style.display = "inherit";
        // Start the netcode game loop.
        this.rollbackNetcode.start();
        let animate = (timestamp) => {
            // Draw state to canvas.
            this.game.draw(this.canvas);
            // Update stats
            const statsHTML = lit.html `
        <div>Netcode Algorithm: Rollback</div>
        <div>Ping: ${this.pingMeasure
                .average()
                .toFixed(2)} ms +/- ${this.pingMeasure.stddev().toFixed(2)} ms</div>
        <div>History Size: ${this.rollbackNetcode.history.length}</div>
        <div>Frame Number: ${this.rollbackNetcode.currentFrame()}</div>
        <div>Largest Future Size: ${this.rollbackNetcode.largestFutureSize()}</div>
        <div>Predicted Frames: ${this.rollbackNetcode.predictedFrames()}</div>
        <div title="If true, then the other player is running slow, so we wait for them.">Stalling: ${this.rollbackNetcode.shouldStall()}</div>
        ${this.rtcStats}`;
            lit.render(statsHTML, this.stats);
            // Request another frame.
            requestAnimationFrame(animate);
        };
        requestAnimationFrame(animate);
    }
}
//# sourceMappingURL=rollbackwrapper.js.map