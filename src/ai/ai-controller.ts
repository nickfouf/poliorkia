import { PasseTrappeGame } from "../game";
import { DefaultInput } from "netplayjs";
import { NAIL, VISUALS } from "../config";
import * as THREE from "three";

enum AIState {
    IDLE,
    TARGETING, // Moving hand to the puck
    GRABBING,  // Pressing down
    PULLING,   // Dragging back to the band
    RELEASING  // Letting go
}

export class AIController {
    private game: PasseTrappeGame;
    
    // Virtual "Mouse" Position for the AI
    private currentX: number = 0;
    private currentY: number = 10; // Start at the back
    
    private state: AIState = AIState.IDLE;
    private targetPuliId: number | null = null;
    
    // Randomization parameters
    private reactionTimer: number = 0;
    private aimOffset: number = 0;
    
    // Configuration
    private readonly MOVE_SPEED = 25.0; 
    private readonly PULL_SPEED = 15.0; 
    private readonly PULL_TARGET_Z = NAIL.OFFSET_Z + 1.5; 
    private readonly TUNNEL_ENTRANCE_Z = 1.0; 
    
    constructor(game: PasseTrappeGame) {
        this.game = game;
    }

    public generateInput(dt: number): DefaultInput {
        const input = new DefaultInput();
        
        this.updateLogic(dt);

        // Project World Coordinates to Screen Coordinates
        const worldPos = new THREE.Vector3(this.currentX, 0, this.currentY);
        const camera = this.game.scene.camera1; // AI is Player 1

        if (camera) {
            worldPos.project(camera);
            const width = VISUALS.CANVAS_WIDTH;
            const height = VISUALS.CANVAS_HEIGHT;

            const screenX = (worldPos.x * 0.5 + 0.5) * width;
            const screenY = -(worldPos.y * 0.5 - 0.5) * height;

            input.mousePosition = { x: screenX, y: screenY };
        } else {
            input.mousePosition = { x: 0, y: 0 };
        }
        
        if (this.state === AIState.GRABBING || this.state === AIState.PULLING) {
            input.mouseButtons.add(0); 
        }

        return input;
    }

    private updateLogic(dt: number) {
        if (this.targetPuliId !== null) {
            const puli = this.game.pulis.find(p => p.id === this.targetPuliId);
            if (!puli || puli.y < 0) { // Puck crossed to opponent side or doesn't exist
                this.state = AIState.IDLE;
                this.targetPuliId = null;
            }
        }

        switch (this.state) {
            case AIState.IDLE:
                this.handleIdle(dt);
                break;
            case AIState.TARGETING:
                this.handleTargeting(dt);
                break;
            case AIState.GRABBING:
                this.state = AIState.PULLING;
                this.aimOffset = (Math.random() - 0.5) * 1.5; 
                break;
            case AIState.PULLING:
                this.handlePulling(dt);
                break;
            case AIState.RELEASING:
                this.handleReleasing(dt);
                break;
        }
    }

    private handleIdle(dt: number) {
        this.reactionTimer -= dt;
        if (this.reactionTimer > 0) return;

        // Find best candidate
        const candidates = this.game.pulis.filter(p => {
            // FIX: Removed `p.owner === 1`. 
            // The AI should target ANY disc on its side (Positive Y), regardless of color.
            const onMySide = p.y > this.TUNNEL_ENTRANCE_Z; 
            const isSlow = (p.vx * p.vx + p.vy * p.vy) < 20.0; 
            return onMySide && isSlow;
        });

        if (candidates.length === 0) return;

        // Sort by Z (closest to tunnel/center first)
        candidates.sort((a, b) => a.y - b.y);

        this.targetPuliId = candidates[0].id;
        this.state = AIState.TARGETING;
    }

    private handleTargeting(dt: number) {
        if (this.targetPuliId === null) return;
        const puli = this.game.pulis.find(p => p.id === this.targetPuliId);
        if (!puli) return;

        if (this.moveHandTo(puli.x, puli.y, this.MOVE_SPEED, dt)) {
            this.state = AIState.GRABBING;
        }
    }

    private handlePulling(dt: number) {
        if (this.targetPuliId === null) return;

        const targetX = 0 + this.aimOffset; 
        const targetY = this.PULL_TARGET_Z;

        if (this.moveHandTo(targetX, targetY, this.PULL_SPEED, dt)) {
            this.state = AIState.RELEASING;
            this.reactionTimer = 0.05 + Math.random() * 0.1;
        }
    }

    private handleReleasing(dt: number) {
        this.reactionTimer -= dt;
        if (this.reactionTimer <= 0) {
            this.reactionTimer = 0.3 + Math.random() * 0.3; 
            this.state = AIState.IDLE;
            this.targetPuliId = null;
        }
    }

    private moveHandTo(tx: number, ty: number, speed: number, dt: number): boolean {
        const dx = tx - this.currentX;
        const dy = ty - this.currentY;
        const dist = Math.sqrt(dx*dx + dy*dy);
        const step = speed * dt;

        if (dist <= step) {
            this.currentX = tx;
            this.currentY = ty;
            return true;
        } else {
            this.currentX += (dx / dist) * step;
            this.currentY += (dy / dist) * step;
            return false;
        }
    }
}