import { DefaultInputReader } from "../defaultinput";
import { NetplayPlayer } from "../netcode/types";

import * as log from "loglevel";
import { GameClass } from "../game";

import { assert } from "chai";

import * as utils from "../utils";
import * as lit from "lit-html";
import { GameMenu } from "../ui/gamemenu";
import EWMASD from "../ewmasd";

import { FirebasePeerConnection } from "../matchmaking/firebase-client";
import strings from "../strings.json";

const PING_INTERVAL = 100;

export abstract class GameWrapper {
  gameClass: GameClass;
  canvas: HTMLCanvasElement;
  stats: HTMLDivElement;
  inputReader: DefaultInputReader;
  playerPausedIndicator: HTMLDivElement;

  isChannelOrdered(channel: RTCDataChannel) { return channel.ordered; }
  isChannelReliable(channel: RTCDataChannel) { return (channel.maxPacketLifeTime === null && channel.maxRetransmits === null); }
  checkChannel(channel: RTCDataChannel) { assert.isTrue(this.isChannelOrdered(channel)); assert.isTrue(this.isChannelReliable(channel)); }

  constructor(gameClass: GameClass) {
    this.gameClass = gameClass;

    // Create canvas
    this.canvas = document.createElement("canvas");
    // We will set dimensions in resize()
    this.canvas.style.backgroundColor = "transparent";
    this.canvas.style.position = "absolute";
    this.canvas.style.zIndex = "0";
    
    // --- CHANGE: Hide canvas initially so we see the menu background ---
    this.canvas.style.display = "none"; 

    this.resize();
    window.addEventListener("resize", () => this.resize());
    document.body.appendChild(this.canvas);

    // Create stats UI (HIDDEN)
    this.stats = document.createElement("div");
    this.stats.style.zIndex = "1";
    this.stats.style.position = "absolute";
    this.stats.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
    this.stats.style.color = "white";
    this.stats.style.padding = "5px";
    this.stats.style.display = "none"; // FORCE HIDE
    document.body.appendChild(this.stats);

    // Create browser background info (Translated to Greek)
    this.playerPausedIndicator = (() => {
      const div = document.createElement("div");
      div.style.zIndex = "1";
      div.style.position = "absolute";
      div.style.backgroundColor = "rgba(0, 0, 0, 0.6)";
      div.style.color = "white";
      div.style.padding = "15px";
      div.style.borderRadius = "10px";
      div.style.left = "50%";
      div.style.top = "50%";
      div.style.transform = "translate(-50%, -50%)";
      div.style.boxSizing = "border-box";
      div.style.fontFamily = "'Nunito', sans-serif";
      div.style.textAlign = "center";
      div.innerHTML = `
      <h3 style="margin: 0 0 10px 0; color: #ff9f43;">${strings.game.opponent_away_title}</h3>
      <p style="margin: 3px">${strings.game.opponent_away_desc}</p>
      <p style="margin: 3px; font-size: 0.9em; opacity: 0.8;">${strings.game.opponent_away_note}</p>
      `;
      div.style.display = "none";
      document.body.appendChild(div);
      return div;
    })();

    if (this.gameClass.touchControls && window.navigator.userAgent.toLowerCase().includes("mobile")) {
      for (let [name, control] of Object.entries(this.gameClass.touchControls)) {
        control.show();
      }
    }

    this.inputReader = new DefaultInputReader(
      document.body,
      this.canvas,
      this.gameClass.canvasSize,
      this.gameClass.pointerLock || false,
      this.gameClass.preventContextMenu || false,
      this.gameClass.touchControls || {}
    );
  }

  // Calculate Layout removed - we use full screen now

  resize() {
    const pixelRatio = (this.gameClass.highDPI && window.devicePixelRatio) ? window.devicePixelRatio : 1;
    const width = window.innerWidth;
    const height = window.innerHeight;

    // Set internal resolution
    this.canvas.width = width * pixelRatio;
    this.canvas.height = height * pixelRatio;

    // Set CSS to fill window
    this.canvas.style.width = "100%";
    this.canvas.style.height = "100%";
    this.canvas.style.left = "0px";
    this.canvas.style.top = "0px";

    // Propagate resize to game
    const gameInstance = (this as any).game;
    if (gameInstance) {
        gameInstance.resize(this.canvas.width, this.canvas.height);
    }
  }

  async start() {
    const gameMenu = new GameMenu();

    gameMenu.onClientStart.once((conn) => {
      this.canvas.style.display = "block";
      const players = [new NetplayPlayer(0, false, true), new NetplayPlayer(1, true, false)];
      this.watchRTCStats(conn.peerConnection);
      this.startPing(conn);
      this.startVisibilityWatcher(conn);
      this.startClient(players, conn);
      // Trigger resize once game is created to ensure aspect ratio is correct
      this.resize();
    });

    gameMenu.onHostStart.once((conn) => {
      this.canvas.style.display = "block";
      const players = [new NetplayPlayer(0, true, true), new NetplayPlayer(1, false, false)];
      this.watchRTCStats(conn.peerConnection);
      this.startPing(conn);
      this.startVisibilityWatcher(conn);
      this.startHost(players, conn);
      // Trigger resize once game is created to ensure aspect ratio is correct
      this.resize();
    });
  }

  startVisibilityWatcher(conn: FirebasePeerConnection) {
    conn.send({ type: "visibility-state", value: document.visibilityState });
    document.addEventListener("visibilitychange", () => {
      log.debug(`My visibility state changed to: ${document.visibilityState}.`);
      conn.send({ type: "visibility-state", value: document.visibilityState });
    });
    conn.on("data", (data) => {
      if (data.type === "visibility-state") {
        if (data.value === "hidden") {
          this.playerPausedIndicator.style.display = "inherit";
        } else {
          this.playerPausedIndicator.style.display = "none";
        }
      }
    });
  }

  pingMeasure: EWMASD = new EWMASD(0.2);
  startPing(conn: FirebasePeerConnection) {
    setInterval(() => {
      conn.send({ type: "ping-req", sent_time: performance.now() });
    }, PING_INTERVAL);
    conn.on("data", (data) => {
      if (data.type == "ping-req") {
        conn.send({ type: "ping-resp", sent_time: data.sent_time });
      } else if (data.type == "ping-resp") {
        this.pingMeasure.update(performance.now() - data.sent_time);
      }
    });
  }

  renderRTCStats(stats: RTCStatsReport): lit.TemplateResult {
    return lit.html`
      <details>
        <summary>${strings.game.webrtc_stats_title}</summary>
        ${[...stats.values()].map((report) => lit.html`
          <div style="margin-left: 10px;">
            <details>
              <summary>${report.type}</summary>
              ${Object.entries(report).map(([key, value]) => { if (key !== "type") return lit.html`<div style="margin-left: 10px;">${key}: ${report[key]}</div>`; })}
            </details>
          </div>`
        )}
      </details>
    `;
  }

  rtcStats?: lit.TemplateResult;
  async watchRTCStats(connection: RTCPeerConnection) {
    const stats = await connection.getStats();
    this.rtcStats = this.renderRTCStats(stats);
    setTimeout(async () => { await this.watchRTCStats(connection); }, 1000);
  }

  abstract startHost(players: Array<NetplayPlayer>, conn: FirebasePeerConnection);
  abstract startClient(players: Array<NetplayPlayer>, conn: FirebasePeerConnection);
}

