import { DefaultInput, DefaultInputReader } from "../defaultinput";
import { NetplayPlayer } from "../netcode/types";
import * as log from "loglevel";
import { GameWrapper } from "./gamewrapper";
import { Game, GameClass } from "../game";
import { RollbackNetcode } from "../netcode/rollback";
import { assert } from "chai";
import { FirebasePeerConnection } from "../matchmaking/firebase-client";
import * as lit from "lit-html";

export class RollbackWrapper extends GameWrapper {
  game?: Game;
  rollbackNetcode?: RollbackNetcode<Game, DefaultInput>;

  constructor(gameClass: GameClass) { super(gameClass); }
  getInitialInputs(players: Array<NetplayPlayer>): Map<NetplayPlayer, DefaultInput> {
    let initialInputs: Map<NetplayPlayer, DefaultInput> = new Map();
    for (let player of players) { initialInputs.set(player, new DefaultInput()); }
    return initialInputs;
  }

  startHost(players: Array<NetplayPlayer>, conn: FirebasePeerConnection) {
    assert(conn.dataChannel?.readyState === "open", "DataChannel must be open.");
    log.info("Starting a rollback host.");
    this.game = new this.gameClass(this.canvas, players);
    this.rollbackNetcode = new RollbackNetcode(
      true, this.game!, players, this.getInitialInputs(players), 10, this.pingMeasure, this.gameClass.timestep,
      () => this.inputReader.getInput(),
      (frame, input) => { conn.send({ type: "input", frame: frame, input: input.serialize() }); },
      (frame, state) => { conn.send({ type: "state", frame: frame, state: state }); }
    );
    conn.on("data", (data) => {
      if (data.type === "input") {
        let input = new DefaultInput();
        input.deserialize(data.input);
        this.rollbackNetcode!.onRemoteInput(data.frame, players![1], input);
      }
    });
    console.log("Client connected... Starting game...");
    this.startGameLoop();
  }

  startClient(players: Array<NetplayPlayer>, conn: FirebasePeerConnection) {
    assert(conn.dataChannel?.readyState === "open", "DataChannel must be open.");
    log.info("Starting a rollback client.");
    this.game = new this.gameClass(this.canvas, players);
    this.rollbackNetcode = new RollbackNetcode(
      false, this.game!, players, this.getInitialInputs(players), 10, this.pingMeasure, this.gameClass.timestep,
      () => this.inputReader.getInput(),
      (frame, input) => { conn.send({ type: "input", frame: frame, input: input.serialize() }); }
    );
    conn.on("data", (data) => {
      if (data.type === "input") {
        let input = new DefaultInput();
        input.deserialize(data.input);
        this.rollbackNetcode!.onRemoteInput(data.frame, players![0], input);
      } else if (data.type === "state") {
        this.rollbackNetcode!.onStateSync(data.frame, data.state);
      }
    });
    console.log("Connected to server... Starting game...");
    this.startGameLoop();
  }

  startGameLoop() {
    // --- FORCE HIDE STATS ---
    this.stats.style.display = "none";

    this.rollbackNetcode!.start();
    let animate = (timestamp) => {
      this.game!.draw(this.canvas);
      // Stats updated but invisible
      const statsHTML = lit.html`<div>Ping: ${this.pingMeasure.average().toFixed(2)} ms</div>`;
      lit.render(statsHTML, this.stats);
      requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }
}



