import { NetplayPlayer, DefaultInput, Game, JsonObject } from "netplayjs";
import * as THREE from "three";
import { GameScene } from "./visuals/scene";
import { PhysicsEngine } from "./physics";
import { PuliState } from "./types";
import { PHYSICS, PULI, VISUALS } from "./config";

export class PasseTrappeGame extends Game {
  static timestep = PHYSICS.TIMESTEP;
  static canvasSize = { width: VISUALS.CANVAS_WIDTH, height: VISUALS.CANVAS_HEIGHT };
  static deterministic = true;

  scene: GameScene;
  pulis: PuliState[] = [];

  // State for input handling
  heldPulis: { [playerId: number]: number | null } = {};
  heldOffsets: { [playerId: number]: { x: number; y: number } | null } = {};
  localPlayerId: number = 0;

  constructor(canvas: HTMLCanvasElement, players: Array<NetplayPlayer>) {
    super();
    for (let p of players) {
      if (p.isLocalPlayer()) {
        this.localPlayerId = p.getID();
        break;
      }
    }

    this.initGameState(players);

    // Initialize Visuals
    this.scene = new GameScene(canvas, this.localPlayerId);
    this.scene.createPulis(this.pulis);
  }

  initGameState(players: Array<NetplayPlayer>) {
    let idCounter = 0;
    for (let player of players) {
      this.heldPulis[player.getID()] = null;
      this.heldOffsets[player.getID()] = null;
    }

    // Configuration for 6 pucks per side
    // Arranged in two columns (left and right) of 3 pucks each
    const xSide = 3.4;
    const zPositions = [6.0, 4.5, 3.0]; // Spaced 1.5 units apart

    // Player 0 (Negative Z side)
    for (const z of zPositions) {
      // Left Column
      this.pulis.push({
        id: idCounter++,
        owner: 0,
        x: -xSide,
        y: -z,
        vx: 0,
        vy: 0
      });
      // Right Column
      this.pulis.push({
        id: idCounter++,
        owner: 0,
        x: xSide,
        y: -z,
        vx: 0,
        vy: 0
      });
    }

    // Player 1 (Positive Z side)
    for (const z of zPositions) {
      // Left Column (Negative X)
      this.pulis.push({
        id: idCounter++,
        owner: 1,
        x: -xSide,
        y: z,
        vx: 0,
        vy: 0
      });
      // Right Column (Positive X)
      this.pulis.push({
        id: idCounter++,
        owner: 1,
        x: xSide,
        y: z,
        vx: 0,
        vy: 0
      });
    }
  }

  serialize(): JsonObject {
    return {
      pulis: this.pulis,
      heldPulis: this.heldPulis,
      heldOffsets: this.heldOffsets,
    };
  }

  deserialize(value: JsonObject) {
    this.pulis = value.pulis as PuliState[];
    this.heldPulis = value.heldPulis as { [playerId: number]: number | null };
    this.heldOffsets = value.heldOffsets as { [playerId: number]: { x: number; y: number } | null };
  }

  // ADDED: Handle dynamic resize
  resize(width: number, height: number) {
      this.scene.resize(width, height);
  }

  tick(playerInputs: Map<NetplayPlayer, DefaultInput>): void {
    const dt = PasseTrappeGame.timestep / 1000;

    for (const [player, input] of playerInputs.entries()) {
      const playerId = player.getID();

      let targetX: number | null = null;
      let targetY: number | null = null;
      const isInputActive = input.mouseButtons.has(0) || (input.touches && input.touches.length > 0);

      // Extract Screen Coordinates
      let screenX: number | null = null;
      let screenY: number | null = null;
      if (input.touches && input.touches.length > 0) {
        screenX = input.touches[0].x;
        screenY = input.touches[0].y;
      } else if (input.mousePosition) {
        screenX = input.mousePosition.x;
        screenY = input.mousePosition.y;
      }

      // Raycasting logic
      if (screenX !== null && screenY !== null) {
        // --- FIX START ---
        // InputReader normalizes mouse coordinates to the VIRTUAL canvas size (600x900) defined in config.
        // We must normalize to NDC using that same virtual size, not the physical window size.
        const virtualWidth = PasseTrappeGame.canvasSize.width;
        const virtualHeight = PasseTrappeGame.canvasSize.height;

        // Map input coordinates to Normalized Device Coordinates (-1..1)
        const ndc = new THREE.Vector2(
            (screenX / virtualWidth) * 2 - 1,
            -(screenY / virtualHeight) * 2 + 1
        );
        // --- FIX END ---

        const raycaster = new THREE.Raycaster();

        const processingCamera = (playerId === 0) ? this.scene.camera0 : this.scene.camera1;

        raycaster.setFromCamera(ndc, processingCamera);
        const plane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0);
        const target = new THREE.Vector3();
        if (raycaster.ray.intersectPlane(plane, target)) {
          targetX = target.x;
          targetY = target.z;
        }
      }

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

    const activeHeldIds = new Set(Object.values(this.heldPulis).filter(id => id !== null));
    PhysicsEngine.simulate(this.pulis, activeHeldIds as Set<number>, dt);
  }

  draw() {
    this.scene.draw(this.pulis);
  }
}

