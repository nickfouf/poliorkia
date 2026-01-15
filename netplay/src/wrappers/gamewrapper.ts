import { DefaultInputReader } from "../defaultinput";
import { NetplayPlayer } from "../netcode/types";

import * as log from "loglevel";
import { Game, GameClass } from "../game";
import { assert } from "chai";

import * as utils from "../utils";
import * as lit from "lit-html";
import { GameMenu } from "../ui/gamemenu";
import EWMASD from "../ewmasd";

import { FirebasePeerConnection } from "../matchmaking/firebase-client";
import strings from "../strings.json";
import rawTeamsList from "../../../src/teams.json";
import { GameVisualConfig } from "../../../src/types";

const sortedTeamsList = [...rawTeamsList].sort((a, b) => a.name.localeCompare(b.name));
const PING_INTERVAL = 100;

export abstract class GameWrapper {
  gameClass: GameClass;
  canvas: HTMLCanvasElement;
  stats: HTMLDivElement;
  inputReader: DefaultInputReader;
  playerPausedIndicator: HTMLDivElement;
  
  localPlayerName: string = strings.game.default_player_name;
  localTeamIndex: number = 0; 
  
  opponentName: string = strings.game.default_opponent_name;
  opponentTeamIndex: number = 0; 
  
  gameDuration: number = 45; 
  gameVisuals?: GameVisualConfig;

  protected animationFrameId: number | null = null;
  protected activeConnection?: FirebasePeerConnection;

  public onReturnToMenu: () => void = () => {};

  isChannelOrdered(channel: RTCDataChannel) { return channel.ordered; }
  isChannelReliable(channel: RTCDataChannel) { return (channel.maxPacketLifeTime === null && channel.maxRetransmits === null); }
  checkChannel(channel: RTCDataChannel) { assert.isTrue(this.isChannelOrdered(channel)); assert.isTrue(this.isChannelReliable(channel)); }

  constructor(gameClass: GameClass) {
    this.gameClass = gameClass;

    this.canvas = document.createElement("canvas");
    this.canvas.style.backgroundColor = "transparent";
    this.canvas.style.position = "absolute";
    this.canvas.style.zIndex = "0";
    this.canvas.style.display = "none"; 

    this.resize();
    window.addEventListener("resize", () => this.resize());
    document.body.appendChild(this.canvas);

    this.stats = document.createElement("div");
    this.stats.style.zIndex = "1";
    this.stats.style.position = "absolute";
    this.stats.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
    this.stats.style.color = "white";
    this.stats.style.padding = "5px";
    this.stats.style.display = "none"; 
    document.body.appendChild(this.stats);

    this.playerPausedIndicator = (() => {
      const container = document.createElement("div");
      container.className = "game-menu-overlay";
      container.style.zIndex = "99999"; 
      container.style.display = "none"; 

      const card = document.createElement("div");
      card.className = "menu-card";
      
      card.innerHTML = `
        <div style="font-size: 3.5rem; margin-bottom: 20px;">⏸</div>
        <h3 class="menu-subtitle" style="color: var(--primary-color); font-size: 1.5rem; margin-bottom: 1rem; margin-top:0;">
            ${strings.game.opponent_away_title}
        </h3>
        <p style="margin: 0 0 1rem 0; font-size: 1.1rem; font-weight: bold; color: var(--text-main);">
            ${strings.game.opponent_away_desc}
        </p>
        <p style="margin: 0; font-size: 0.9em; color: var(--text-muted); font-style: italic;">
            ${strings.game.opponent_away_note}
        </p>
      `;

      container.appendChild(card);
      document.body.appendChild(container);
      return container;
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

  resize() {
    const pixelRatio = (this.gameClass.highDPI && window.devicePixelRatio) ? window.devicePixelRatio : 1;
    const width = window.innerWidth;
    const height = window.innerHeight;

    this.canvas.width = width * pixelRatio;
    this.canvas.height = height * pixelRatio;

    this.canvas.style.width = "100%";
    this.canvas.style.height = "100%";
    this.canvas.style.left = "0px";
    this.canvas.style.top = "0px";

    const gameInstance = (this as any).game;
    if (gameInstance) {
        gameInstance.resize(this.canvas.width, this.canvas.height);
    }
  }

  startVisibilityWatcher(conn: FirebasePeerConnection) {
    conn.send({ type: "visibility-state", value: document.visibilityState });
    
    document.addEventListener("visibilitychange", () => {
      conn.send({ type: "visibility-state", value: document.visibilityState });
    });

    conn.on("data", (data) => {
      if (data.type === "visibility-state") {
        if (data.value === "hidden") {
          this.playerPausedIndicator.style.display = "flex";
          this.playerPausedIndicator.style.pointerEvents = "auto"; 
          
          const card = this.playerPausedIndicator.firstElementChild as HTMLElement;
          if (card) {
             card.animate([
               { transform: 'scale(0.9)', opacity: 0 },
               { transform: 'scale(1)', opacity: 1 }
             ], { duration: 300, easing: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)' });
          }

        } else {
          this.playerPausedIndicator.style.display = "none";
          this.playerPausedIndicator.style.pointerEvents = "none";
        }
      }
    });

    conn.onClose.on(() => {
        const card = this.playerPausedIndicator.firstElementChild as HTMLElement;
        if (card) {
            card.innerHTML = `
              <div style="font-size: 3.5rem; margin-bottom: 20px;">🔌</div>
              <h3 class="menu-subtitle" style="color: var(--danger-color); font-size: 1.5rem; margin-bottom: 1rem; margin-top: 0;">
                ${strings.game.conn_lost_title}
              </h3>
              <p style="margin: 0 0 2rem 0; font-size: 1.1rem; font-weight: bold; color: var(--text-main);">
                ${strings.game.conn_lost_desc}
              </p>
              
              <button id="btn-return-menu" class="btn btn-primary" style="margin-bottom: 0;">
                ${strings.game.btn_return}
              </button>
            `;
            
            const btn = card.querySelector("#btn-return-menu");
            if (btn) {
                btn.addEventListener("click", () => {
                    this.destroy(); 
                    this.onReturnToMenu(); 
                });
            }
        }
        this.playerPausedIndicator.style.display = "flex";
        this.playerPausedIndicator.style.pointerEvents = "auto";
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

  private getTeamFromIndex(index: number) {
      if (typeof index !== 'number') return null;
      if (index <= 0) return null; 
      
      const realIndex = index - 1;
      if (realIndex >= 0 && realIndex < sortedTeamsList.length) {
          return sortedTeamsList[realIndex];
      }
      return null;
  }

  public pushProfilesToGame(game: Game | undefined, isHost: boolean) {
      if (!game) return;

      const localTeam = this.getTeamFromIndex(this.localTeamIndex);
      const oppTeam = this.getTeamFromIndex(this.opponentTeamIndex);

      const g = game as any;
      if (typeof g.setPlayerProfiles === 'function') {
           if (isHost) {
              g.setPlayerProfiles(
                  { name: this.localPlayerName, team: localTeam }, 
                  { name: this.opponentName, team: oppTeam }
              );
          } else {
              g.setPlayerProfiles(
                  { name: this.opponentName, team: oppTeam },
                  { name: this.localPlayerName, team: localTeam }
              );
          }
      }

      if (this.gameVisuals && typeof g.setVisualConfig === 'function') {
          g.setVisualConfig(this.gameVisuals);
      }
  }

  protected handleProfileData(data: any, game: Game | undefined, isHost: boolean) {
  }

  destroy() {
      if (this.animationFrameId !== null) {
          cancelAnimationFrame(this.animationFrameId);
          this.animationFrameId = null;
      }
      if (this.activeConnection) {
          this.activeConnection.close();
          this.activeConnection = undefined;
      }
      if (this.canvas.parentNode) this.canvas.parentNode.removeChild(this.canvas);
      if (this.stats.parentNode) this.stats.parentNode.removeChild(this.stats);
      if (this.playerPausedIndicator.parentNode) this.playerPausedIndicator.parentNode.removeChild(this.playerPausedIndicator);

      this.inputReader.destroy();

      const gameInstance = (this as any).game;
      if (gameInstance && typeof gameInstance.destroy === 'function') {
          gameInstance.destroy();
      }
  }

  abstract startHost(players: Array<NetplayPlayer>, conn: FirebasePeerConnection, opponentName: string, visuals?: GameVisualConfig);
  abstract startClient(players: Array<NetplayPlayer>, conn: FirebasePeerConnection, opponentName: string, visuals?: GameVisualConfig);
}

