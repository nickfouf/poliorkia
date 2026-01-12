import { DefaultInput } from "../defaultinput";
import { LockstepNetcode } from "../netcode/lockstep";
import * as log from "loglevel";
import { GameWrapper } from "./gamewrapper";
import { assert } from "chai";
export class LockstepWrapper extends GameWrapper {
    constructor(gameClass) {
        super(gameClass);
        Object.defineProperty(this, "game", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "lockstepNetcode", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
    }
    getStateSyncPeriod() {
        if (this.gameClass.deterministic)
            return 0;
        else
            return 1;
    }
    startHost(players, conn) {
        assert(conn.dataChannel?.readyState === "open", "DataChannel must be open.");
        log.info("Starting a lockstep host.");
        this.game = new this.gameClass(this.canvas, players);
        this.lockstepNetcode = new LockstepNetcode(true, this.game, players, this.gameClass.timestep, this.getStateSyncPeriod(), () => this.inputReader.getInput(), (frame, input) => {
            conn.send({ type: "input", frame: frame, input: input.serialize() });
        }, (frame, state) => {
            conn.send({ type: "state", frame: frame, state: state });
        });
        conn.on("data", (data) => {
            if (data.type === "input") {
                let input = new DefaultInput();
                input.deserialize(data.input);
                this.lockstepNetcode.onRemoteInput(data.frame, players[1], input);
            }
        });
        console.log("Client has connected... Starting game...");
        this.startGameLoop();
    }
    startClient(players, conn) {
        assert(conn.dataChannel?.readyState === "open", "DataChannel must be open.");
        log.info("Starting a lockstep client.");
        this.game = new this.gameClass(this.canvas, players);
        this.lockstepNetcode = new LockstepNetcode(false, this.game, players, this.gameClass.timestep, this.getStateSyncPeriod(), () => this.inputReader.getInput(), (frame, input) => {
            conn.send({ type: "input", frame: frame, input: input.serialize() });
        });
        conn.on("data", (data) => {
            if (data.type === "input") {
                let input = new DefaultInput();
                input.deserialize(data.input);
                this.lockstepNetcode.onRemoteInput(data.frame, players[0], input);
            }
            else if (data.type === "state") {
                this.lockstepNetcode.onStateSync(data.frame, data.state);
            }
        });
        console.log("Successfully connected to server... Starting game...");
        this.startGameLoop();
    }
    startGameLoop() {
        this.stats.style.display = "inherit";
        // Start the netcode game loop.
        this.lockstepNetcode.start();
        let animate = (timestamp) => {
            // Draw state to canvas.
            this.game.draw(this.canvas);
            // Update stats
            this.stats.innerHTML = `
      <div>Netcode Algorithm: Lockstep</div>
      <div>Ping: ${this.pingMeasure
                .average()
                .toFixed(2)} ms +/- ${this.pingMeasure.stddev().toFixed(2)} ms</div>
      <div>Frame Number: ${this.lockstepNetcode.frame}</div>
      <div>Missed Frames: ${this.lockstepNetcode.missedFrames}</div>

      <div>State Syncs: ${this.lockstepNetcode.stateSyncsSent} sent, ${this.lockstepNetcode.stateSyncsReceived} received</div>
      <div>
        BW: ${this.lockstepNetcode.isHost ? "Sent" : "Recv"} 
        ${this.lockstepNetcode.isHost ? conn.sendStats.formatStats() : conn.receiveStats.formatStats()}
      </div>
      `;
            // Request another frame.
            requestAnimationFrame(animate);
        };
        requestAnimationFrame(animate);
    }
}
//# sourceMappingURL=lockstepwrapper.js.map