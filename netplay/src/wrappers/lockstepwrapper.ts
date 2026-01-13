import { DefaultInput, DefaultInputReader } from "../defaultinput";
import { LockstepNetcode } from "../netcode/lockstep";
import { NetplayPlayer } from "../netcode/types";
import * as log from "loglevel";
import { GameWrapper } from "./gamewrapper";
import { Game, GameClass } from "../game";
import { assert } from "chai";
import { FirebasePeerConnection } from "../matchmaking/firebase-client";

export class LockstepWrapper extends GameWrapper {
  game?: Game;
  lockstepNetcode?: LockstepNetcode<Game, DefaultInput>;

  constructor(gameClass: GameClass) { super(gameClass); }
  getStateSyncPeriod(): number { return this.gameClass.deterministic ? 0 : 1; }

  startHost(players: Array<NetplayPlayer>, conn: FirebasePeerConnection) {
    assert(conn.dataChannel?.readyState === "open", "DataChannel must be open.");
    log.info("Starting a lockstep host.");
    this.game = new this.gameClass(this.canvas, players);
    this.lockstepNetcode = new LockstepNetcode(
      true, this.game!, players, this.gameClass.timestep, this.getStateSyncPeriod(),
      () => this.inputReader.getInput(),
      (frame, input) => { conn.send({ type: "input", frame: frame, input: input.serialize() }); },
      (frame, state) => { conn.send({ type: "state", frame: frame, state: state }); }
    );
    conn.on("data", (data) => {
      if (data.type === "input") {
        let input = new DefaultInput();
        input.deserialize(data.input);
        this.lockstepNetcode!.onRemoteInput(data.frame, players![1], input);
      }
    });
    console.log("Client connected... Starting game...");
    this.startGameLoop(conn);
  }

  startClient(players: Array<NetplayPlayer>, conn: FirebasePeerConnection) {
    assert(conn.dataChannel?.readyState === "open", "DataChannel must be open.");
    log.info("Starting a lockstep client.");
    this.game = new this.gameClass(this.canvas, players);
    this.lockstepNetcode = new LockstepNetcode(
      false, this.game!, players, this.gameClass.timestep, this.getStateSyncPeriod(),
      () => this.inputReader.getInput(),
      (frame, input) => { conn.send({ type: "input", frame: frame, input: input.serialize() }); }
    );
    conn.on("data", (data) => {
      if (data.type === "input") {
        let input = new DefaultInput();
        input.deserialize(data.input);
        this.lockstepNetcode!.onRemoteInput(data.frame, players![0], input);
      } else if (data.type === "state") {
        this.lockstepNetcode!.onStateSync(data.frame, data.state);
      }
    });
    console.log("Connected to server... Starting game...");
    this.startGameLoop(conn);
  }

  startGameLoop(conn: FirebasePeerConnection) {
    // --- FORCE HIDE STATS ---
    this.stats.style.display = "none";

    this.lockstepNetcode!.start();
    let animate = (timestamp) => {
      this.game!.draw(this.canvas);
      // Stats exist in DOM but are hidden
      this.stats.innerHTML = `
      <div>Algorithm: Lockstep</div>
      <div>Ping: ${this.pingMeasure.average().toFixed(2)} ms</div>
      `;
      requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }
}



