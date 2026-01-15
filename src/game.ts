import { NetplayPlayer, DefaultInput, Game, JsonObject } from "netplayjs";
import * as THREE from "three";
import { GameScene } from "./visuals/scene";
import { PhysicsEngine } from "./physics";
import { PuliState, PlayerProfile, GameVisualConfig } from "./types";
import { PHYSICS, PULI, VISUALS, TIMING_CONFIG, BOARD, GAME_CONFIG } from "./config";
import strings from "../netplay/src/strings.json";
import { startConfetti } from "./visuals/confetti";

export class PasseTrappeGame extends Game {
  static timestep = PHYSICS.TIMESTEP;
  static canvasSize = { width: VISUALS.CANVAS_WIDTH, height: VISUALS.CANVAS_HEIGHT };
  static deterministic = true;
  
  static useFastAnimations = false;

  scene: GameScene;
  pulis: PuliState[] = [];

  heldPulis: { [playerId: number]: number | null } = {};
  heldOffsets: { [playerId: number]: { x: number; y: number } | null } = {};
  localPlayerId: number = 0;

  gameTickCount: number = 0;
  foulSide: number = 0; 
  
  timeRemaining: number = GAME_CONFIG.DURATION_SECONDS;
  initialDuration: number = GAME_CONFIG.DURATION_SECONDS;

  private totalIntroDuration: number;
  private countdownDuration: number;
  private goSignalDuration: number; 
  
  p0Profile: PlayerProfile = { name: "Player 1", team: null };
  p1Profile: PlayerProfile = { name: "Player 2", team: null };

  winner: number | null = null;
  gameOverTime: number | null = null;
  gameOverUIShown: boolean = false;

  constructor(canvas: HTMLCanvasElement, players: Array<NetplayPlayer>) {
    super();
    for (let p of players) {
      if (p.isLocalPlayer()) {
        this.localPlayerId = p.getID();
        break;
      }
    }

    this.initGameState(players);

    const timingProfile = PasseTrappeGame.useFastAnimations ? TIMING_CONFIG.FAST : TIMING_CONFIG.NORMAL;
    
    this.totalIntroDuration = timingProfile.INITIAL_BLACK + timingProfile.FADE + timingProfile.POST_FADE_WAIT + timingProfile.CAMERA_MOVE;
    this.countdownDuration = timingProfile.COUNTDOWN;
    this.goSignalDuration = timingProfile.GO_SIGNAL;

    this.scene = new GameScene(canvas, this.localPlayerId, timingProfile);
    this.scene.createPulis(this.pulis);
  }
  
  setGameDuration(seconds: number) {
      this.initialDuration = seconds;
      this.timeRemaining = seconds;
      this.scene.updateHUD(Math.ceil(this.timeRemaining), 0, 0);
  }

  setVisualConfig(config: GameVisualConfig) {
      if (this.scene) {
          this.scene.updateVisuals(config);
      }
  }
  
  destroy() {
      if (this.scene) {
          this.scene.dispose();
      }
      this.pulis = [];
      this.heldPulis = {};
      this.heldOffsets = {};
      const overlay = document.querySelector('.game-over-overlay');
      if (overlay) overlay.remove();
  }

  setPlayerProfiles(p0: PlayerProfile, p1: PlayerProfile) {
      this.p0Profile = p0;
      this.p1Profile = p1;
      this.scene.updatePlayerInfo(this.p0Profile, this.p1Profile);
  }

  initGameState(players: Array<NetplayPlayer>) {
    this.gameTickCount = 0; 
    this.winner = null;
    this.gameOverTime = null;
    this.gameOverUIShown = false;
    this.timeRemaining = GAME_CONFIG.DURATION_SECONDS;

    let idCounter = 0;
    for (let player of players) {
      this.heldPulis[player.getID()] = null;
      this.heldOffsets[player.getID()] = null;
    }

    const xSide = 3.4;
    const zPositions = [6.0, 4.5, 3.0]; 

    for (const z of zPositions) {
      this.pulis.push({ id: idCounter++, owner: 0, x: -xSide, y: -z, vx: 0, vy: 0 });
      this.pulis.push({ id: idCounter++, owner: 0, x: xSide, y: -z, vx: 0, vy: 0 });
    }

    for (const z of zPositions) {
      this.pulis.push({ id: idCounter++, owner: 1, x: -xSide, y: z, vx: 0, vy: 0 });
      this.pulis.push({ id: idCounter++, owner: 1, x: xSide, y: z, vx: 0, vy: 0 });
    }
  }

  serialize(): JsonObject {
    return {
      pulis: this.pulis,
      heldPulis: this.heldPulis,
      heldOffsets: this.heldOffsets,
      gameTickCount: this.gameTickCount,
      winner: this.winner,
      timeRemaining: this.timeRemaining
    };
  }

  deserialize(value: JsonObject) {
    this.pulis = value.pulis as PuliState[];
    this.heldPulis = value.heldPulis as { [playerId: number]: number | null };
    this.heldOffsets = value.heldOffsets as { [playerId: number]: { x: number; y: number } | null };
    this.gameTickCount = value.gameTickCount as number;
    this.winner = value.winner as number | null;
    this.timeRemaining = value.timeRemaining as number;
  }

  resize(width: number, height: number) {
      this.scene.resize(width, height);
  }

  public enrichInput(input: DefaultInput) {
      let screenX: number | null = null;
      let screenY: number | null = null;

      if (input.touches && input.touches.length > 0) {
          screenX = input.touches[0].x;
          screenY = input.touches[0].y;
      } else if (input.mousePosition) {
          screenX = input.mousePosition.x;
          screenY = input.mousePosition.y;
      }

      if (screenX !== null && screenY !== null) {
          const virtualWidth = PasseTrappeGame.canvasSize.width;
          const virtualHeight = PasseTrappeGame.canvasSize.height;

          const ndc = new THREE.Vector2(
              (screenX / virtualWidth) * 2 - 1,
              -(screenY / virtualHeight) * 2 + 1
          );

          const raycaster = new THREE.Raycaster();
          raycaster.setFromCamera(ndc, this.scene.camera);
          
          const plane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0);
          const target = new THREE.Vector3();
          
          if (raycaster.ray.intersectPlane(plane, target)) {
              input.targetX = target.x;
              input.targetY = target.z;
          }
      }
  }

  tick(playerInputs: Map<NetplayPlayer, DefaultInput>): void {
      const dt = PasseTrappeGame.timestep / 1000;
      this.gameTickCount++;

      const currentTimeMs = this.gameTickCount * PasseTrappeGame.timestep;
      
      const isGameActive = currentTimeMs > (this.totalIntroDuration + this.countdownDuration + this.goSignalDuration);

      if (this.winner === null && isGameActive) {
          this.timeRemaining -= dt;
          
          if (this.timeRemaining <= 0) {
              this.timeRemaining = 0;
              this.handleTimeoutWinCondition(currentTimeMs);
          } else {
              const hasPucksOnNegative = this.pulis.some(p => p.y < -0.1); 
              const hasPucksOnPositive = this.pulis.some(p => p.y > 0.1);

              if (!hasPucksOnNegative) {
                  this.winner = 0; 
                  this.gameOverTime = currentTimeMs + 1000; 
              } else if (!hasPucksOnPositive) {
                  this.winner = 1; 
                  this.gameOverTime = currentTimeMs + 1000;
              }
          }
      }

      this.foulSide = 0; 

      for (const [player, input] of playerInputs.entries()) {
        const playerId = player.getID();

        if (!isGameActive || this.winner !== null) {
          this.heldPulis[playerId] = null;
          this.heldOffsets[playerId] = null;
          continue; 
        }
        
        let targetX = (input.targetX !== undefined) ? input.targetX : null;
        let targetY = (input.targetY !== undefined) ? input.targetY : null;
        
        const isInputActive = (input.mouseButtons && input.mouseButtons.has(0)) || (input.touches && input.touches.length > 0);

        let currentlyHeldId = this.heldPulis[playerId];

        if (isInputActive && targetX !== null && targetY !== null) {
          if (currentlyHeldId === null || currentlyHeldId === undefined) {
            let closestDist = Infinity;
            let closestPuli: PuliState | null = null;

            for (let puli of this.pulis) {
              if (playerId === 0 && puli.y > 0) continue;
              if (playerId === 1 && puli.y < 0) continue;
              
              const dx = puli.x - targetX;
              const dy = puli.y - targetY;
              const dist = Math.sqrt(dx * dx + dy * dy);
              if (dist < PULI.RADIUS * 1.5 && dist < closestDist) {
                closestDist = dist;
                closestPuli = puli;
              }
            }

            if (closestPuli) {
              this.heldPulis[playerId] = closestPuli.id;
              currentlyHeldId = closestPuli.id;
              this.heldOffsets[playerId] = { x: closestPuli.x - targetX, y: closestPuli.y - targetY };
            }
          }

          if (currentlyHeldId !== null) {
             const heldPuli = this.pulis.find((p) => p.id === currentlyHeldId);
             const offset = this.heldOffsets[playerId];
             if (heldPuli && offset) {
               PhysicsEngine.applyInput(heldPuli, targetX, targetY, offset.x, offset.y, playerId);
             }
          }
        } else {
          this.heldPulis[playerId] = null;
          this.heldOffsets[playerId] = null;
        }
      }

      const simulationResult = PhysicsEngine.simulate(this.pulis, this.heldPulis, dt);
      
      const forcedDrops = simulationResult.forcedDrops;
      if (forcedDrops.size > 0) {
          for (const playerIdKey in this.heldPulis) {
              const pid = parseInt(playerIdKey);
              const heldId = this.heldPulis[pid];
              
              if (heldId !== null && forcedDrops.has(heldId)) {
                  this.heldPulis[pid] = null;
                  this.heldOffsets[pid] = null;
              }
          }
      }
  }

  private handleTimeoutWinCondition(currentTimeMs: number) {
      const discsOnP0 = this.pulis.filter(p => p.y < -0.1).length;
      const discsOnP1 = this.pulis.filter(p => p.y > 0.1).length;

      if (discsOnP0 < discsOnP1) {
          this.winner = 0; 
      } else if (discsOnP1 < discsOnP0) {
          this.winner = 1; 
      } else {
          this.winner = -1; 
      }
      this.gameOverTime = currentTimeMs;
  }

  draw() {
    const logicalTimeMs = this.gameTickCount * PasseTrappeGame.timestep;
    
    this.scene.setFoulIndicator(this.foulSide);
    this.scene.updateHUD(Math.ceil(this.timeRemaining), 1, 1);
    
    this.scene.draw(this.pulis, logicalTimeMs);

    if (this.winner !== null && this.gameOverTime !== null) {
        if (logicalTimeMs >= this.gameOverTime && !this.gameOverUIShown) {
            this.showGameOverUI();
            this.gameOverUIShown = true;
        }
    }
  }

  private showGameOverUI() {
      if (this.winner === this.localPlayerId) {
          startConfetti();
      }

      const isDraw = (this.winner === -1);
      const winnerId = isDraw ? -1 : this.winner;
      
      const leftProfile = (winnerId === 0 || isDraw) ? this.p0Profile : this.p1Profile;
      const rightProfile = (winnerId === 0 || isDraw) ? this.p1Profile : this.p0Profile;

      const overlay = document.createElement("div");
      overlay.className = "game-over-overlay";

      const renderPlayer = (profile: PlayerProfile, resultType: 'winner' | 'loser' | 'draw') => {
          const iconUrl = (profile.team && profile.team.icon) 
              ? `assets/avatars/${profile.team.icon}` 
              : null;
          
          const teamName = (profile.team && profile.team.name) ? profile.team.name : "";
          
          let badgeText = "";
          let cssClass = "";
          
          if (resultType === 'winner') {
              badgeText = strings.game.label_winner;
              cssClass = "winner";
          } else if (resultType === 'loser') {
              badgeText = strings.game.label_loser;
              cssClass = "loser";
          } else {
              badgeText = strings.game.label_draw;
              cssClass = "loser"; 
          }
          
          return `
              <div class="player-result ${cssClass}">
                  ${iconUrl 
                      ? `<img src="${iconUrl}" class="result-avatar" alt="Avatar" />`
                      : `<div class="result-avatar" style="display:flex;align-items:center;justify-content:center;font-weight:bold;color:#aaa;">?</div>`
                  }
                  <div class="result-name" title="${profile.name}">${profile.name}</div>
                  <div style="font-size:0.75rem; color:#888;">${teamName}</div>
                  <div class="result-badge">${badgeText}</div>
              </div>
          `;
      };

      overlay.innerHTML = `
          <div class="game-over-card">
              <h1 class="game-over-title">${isDraw ? strings.game.label_draw : strings.game.game_over_title}</h1>
              
              <div class="result-container">
                  ${renderPlayer(leftProfile, isDraw ? 'draw' : 'winner')}
                  <div class="vs-divider">VS</div>
                  ${renderPlayer(rightProfile, isDraw ? 'draw' : 'loser')}
              </div>

              <button id="go-home-btn" class="btn-home">
                  ${strings.game.btn_return}
              </button>
          </div>
      `;

      document.body.appendChild(overlay);

      document.getElementById('go-home-btn')?.addEventListener('click', () => {
          window.location.reload();
      });
  }
}

