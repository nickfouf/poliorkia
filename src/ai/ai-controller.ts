import { PasseTrappeGame } from "../game";
import { DefaultInput } from "netplayjs";
import { NAIL, VISUALS, RUBBER_BAND, BOARD, PULI } from "../config";
import { PuliState } from "../types";
import * as THREE from "three";

enum AIState {
    IDLE,
    TARGETING,        // Moving hand to the puck to shoot
    GRABBING,         // Pressing down
    PULLING,          // Dragging back to the band
    HOLDING,          // Wait/Stabilize aim at max tension
    RELEASING,        // Letting go
    
    // --- NEW STATES FOR CLEARING ---
    CLEARING_TARGETING, // Moving hand to a blocking puck
    CLEARING_DRAGGING   // Dragging the blocker out of the way
}

export class AIController {
    private game: PasseTrappeGame;
    
    // Virtual "Mouse" Position for the AI
    private currentX: number = 0;
    private currentY: number = 10; // Start at the back
    
    private state: AIState = AIState.IDLE;
    private targetPuliId: number | null = null;
    
    // Timers & Offsets
    private timer: number = 0;
    private aimOffset: number = 0;
    private currentShotPullDistance: number = 0; 
    
    // Configuration calculated based on difficulty
    private readonly moveSpeed: number; 
    private readonly pullSpeed: number; 
    private readonly errorMargin: number; 
    private readonly minReaction: number;
    private readonly maxReaction: number;
    private readonly basePullDistance: number; 
    private readonly holdDuration: number;

    // Constants
    private readonly TUNNEL_ENTRANCE_Z = 1.0; 
    private readonly SAFE_POWER_LIMIT = 0.7;
    
    // --- NEW CONSTANTS FOR CLEARING MECHANIC ---
    private readonly CLEAR_ZONE_WIDTH = BOARD.TUNNEL_WIDTH + 0.5; // Slightly wider than tunnel
    private readonly CLEAR_PUSH_TARGET_X = 2.5; // How far sideways to push
    private readonly AMMO_ZONE_Z_LIMIT = NAIL.OFFSET_Z - 2.0; // Pucks behind this Z are "ammo", not blockers
    
    constructor(game: PasseTrappeGame, difficultyRatio: number) {
        this.game = game;

        // --- Difficulty Tuning ---

        // 1. Speed
        this.moveSpeed = 15.0 + (40.0 * difficultyRatio);
        this.pullSpeed = 10.0 + (30.0 * difficultyRatio);

        // 2. Accuracy
        this.errorMargin = 3.0 * (1.0 - difficultyRatio);

        // 3. Power (Base Pull Distance)
        const minStretch = 0.7;
        const maxStretch = RUBBER_BAND.MAX_STRETCH; 
        this.basePullDistance = minStretch + (maxStretch - minStretch) * difficultyRatio;

        // 4. Reaction Time
        this.minReaction = 0.8 - (0.75 * difficultyRatio);
        this.maxReaction = 1.2 - (1.05 * difficultyRatio);

        // 5. Hold Duration
        this.holdDuration = 0.2; 
    }

    public generateInput(dt: number): DefaultInput {
        const input = new DefaultInput();
        
        this.updateLogic(dt);

        // 1. Set World Coordinates (Critical for Game Logic)
        input.targetX = this.currentX;
        input.targetY = this.currentY;

        // 2. Optional: Set Screen Coordinates (Visual debugging / compatibility)
        const worldPos = new THREE.Vector3(this.currentX, 0, this.currentY);
        const camera = this.game.scene.camera1; 

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
        
        if (
            this.state === AIState.GRABBING || 
            this.state === AIState.PULLING || 
            this.state === AIState.HOLDING ||
            this.state === AIState.CLEARING_DRAGGING // Hold button while clearing
        ) {
            input.mouseButtons.add(0); 
        }

        return input;
    }

    private updateLogic(dt: number) {
        if (this.targetPuliId !== null) {
            const puli = this.game.pulis.find(p => p.id === this.targetPuliId);
            // If lost puli or it crossed to opponent side, reset
            if (!puli || puli.y < 0) { 
                this.state = AIState.IDLE;
                this.targetPuliId = null;
            }
        }

        switch (this.state) {
            case AIState.IDLE:
                this.handleIdle(dt);
                break;
            // --- SHOOTING LOGIC ---
            case AIState.TARGETING:
                this.handleTargeting(dt);
                break;
            case AIState.GRABBING:
                this.state = AIState.PULLING;
                this.calculateShotParameters();
                break;
            case AIState.PULLING:
                this.handlePulling(dt);
                break;
            case AIState.HOLDING:
                this.handleHolding(dt);
                break;
            // --- CLEARING LOGIC ---
            case AIState.CLEARING_TARGETING:
                this.handleClearingTargeting(dt);
                break;
            case AIState.CLEARING_DRAGGING:
                this.handleClearingDragging(dt);
                break;
            // --- COMMON ---
            case AIState.RELEASING:
                this.handleReleasing(dt);
                break;
        }
    }

    private calculateShotParameters() {
        const shooter = this.game.pulis.find(p => p.id === this.targetPuliId);
        if (!shooter) return;

        // 1. Calculate Random Aim
        this.aimOffset = (Math.random() - 0.5) * 2 * this.errorMargin;

        // 2. Determine Shot Context
        const tunnelHalfWidth = BOARD.TUNNEL_WIDTH / 2 - PULI.RADIUS;
        const isAimingStraight = Math.abs(this.aimOffset) < tunnelHalfWidth;

        // Target Point: Center of the Opponent's Band (Player 0 side, negative Z)
        const targetPos = { x: 0, y: -NAIL.OFFSET_Z };

        // 3. Check for Obstacles
        const pathIsClear = this.isLineOfSightClear(shooter, targetPos);

        // 4. Set Power
        if (isAimingStraight && pathIsClear && this.basePullDistance > this.SAFE_POWER_LIMIT) {
            this.currentShotPullDistance = this.SAFE_POWER_LIMIT;
        } else {
            this.currentShotPullDistance = this.basePullDistance;
        }
    }

    /**
     * Checks if a line segment from the shooter to the target intersects any other puck.
     */
    private isLineOfSightClear(shooter: PuliState, target: {x: number, y: number}): boolean {
        const start = { x: shooter.x, y: shooter.y };
        const end = target;

        for (const other of this.game.pulis) {
            if (other.id === shooter.id) continue;

            const dist = this.distancePointToSegment(
                other.x, other.y, 
                start.x, start.y, 
                end.x, end.y
            );

            // Obstacle if closer than diameter
            if (dist < PULI.RADIUS * 2.0) {
                return false; 
            }
        }
        return true; 
    }

    private distancePointToSegment(px: number, py: number, x1: number, y1: number, x2: number, y2: number): number {
        const A = px - x1;
        const B = py - y1;
        const C = x2 - x1;
        const D = y2 - y1;

        const dot = A * C + B * D;
        const lenSq = C * C + D * D;
        let param = -1;
        
        if (lenSq !== 0) param = dot / lenSq;

        let xx, yy;

        if (param < 0) {
            xx = x1;
            yy = y1;
        } else if (param > 1) {
            xx = x2;
            yy = y2;
        } else {
            xx = x1 + param * C;
            yy = y1 + param * D;
        }

        const dx = px - xx;
        const dy = py - yy;
        return Math.sqrt(dx * dx + dy * dy);
    }

    private getRandomReactionTime() {
        return this.minReaction + Math.random() * (this.maxReaction - this.minReaction);
    }

    /**
     * Looks for a puck that is blocking the central path on the AI's side,
     * but is NOT in the launching area (ammo).
     */
    private findBlocker(): PuliState | undefined {
        // AI is Player 1 (Positive Z)
        return this.game.pulis.find(p => {
            const isMine = p.owner === 1; // AI is owner 1
            const isSlow = (p.vx * p.vx + p.vy * p.vy) < 5.0; // Only move stationary/slow pucks
            
            // Check Corridor (Blocking X)
            const inCorridor = Math.abs(p.x) < (this.CLEAR_ZONE_WIDTH / 2);
            
            // Check Depth (Blocking Z)
            // Must be between tunnel entrance and the "Ammo Zone" near the band.
            const blockingZ = p.y > this.TUNNEL_ENTRANCE_Z && p.y < this.AMMO_ZONE_Z_LIMIT;

            return isMine && isSlow && inCorridor && blockingZ;
        });
    }

    private handleIdle(dt: number) {
        this.timer -= dt;
        if (this.timer > 0) return;

        // 1. PRIORITY: Check if we need to clear a path first
        const blocker = this.findBlocker();
        if (blocker) {
            this.targetPuliId = blocker.id;
            this.state = AIState.CLEARING_TARGETING;
            return;
        }

        // 2. SECONDARY: Find best candidate to shoot
        const candidates = this.game.pulis.filter(p => {
            // Must be on my side
            const onMySide = p.y > this.TUNNEL_ENTRANCE_Z; 
            const isSlow = (p.vx * p.vx + p.vy * p.vy) < 20.0; 
            return onMySide && isSlow;
        });

        if (candidates.length === 0) return;

        // Sort: Closest to the band (Highest Y for Player 1) are usually better ammo
        // But the original logic sorted by y-ascending (closest to tunnel).
        // Let's stick to simple sort, maybe prioritizing clear shots later.
        candidates.sort((a, b) => a.y - b.y);

        this.targetPuliId = candidates[0].id;
        this.state = AIState.TARGETING;
    }

    // --- SHOOTING HANDLERS ---

    private handleTargeting(dt: number) {
        if (this.targetPuliId === null) return;
        const puli = this.game.pulis.find(p => p.id === this.targetPuliId);
        if (!puli) return;

        if (this.moveHandTo(puli.x, puli.y, this.moveSpeed, dt)) {
            this.state = AIState.GRABBING;
        }
    }

    private handlePulling(dt: number) {
        if (this.targetPuliId === null) return;

        const targetX = 0 + this.aimOffset; 
        const targetY = NAIL.OFFSET_Z + this.currentShotPullDistance;

        if (this.moveHandTo(targetX, targetY, this.pullSpeed, dt)) {
            this.state = AIState.HOLDING;
            this.timer = this.holdDuration;
        }
    }

    private handleHolding(dt: number) {
        this.timer -= dt;
        if (this.timer <= 0) {
            this.state = AIState.RELEASING;
            this.timer = 0.05; 
        }
    }

    // --- CLEARING HANDLERS ---

    private handleClearingTargeting(dt: number) {
        if (this.targetPuliId === null) return;
        const puli = this.game.pulis.find(p => p.id === this.targetPuliId);
        if (!puli) {
            this.state = AIState.IDLE;
            return;
        }

        // Move to the blocker
        if (this.moveHandTo(puli.x, puli.y, this.moveSpeed, dt)) {
            this.state = AIState.CLEARING_DRAGGING;
        }
    }

    private handleClearingDragging(dt: number) {
        if (this.targetPuliId === null) return;
        
        // Decide direction: Push Left or Right based on current X
        // If x > 0, it's easier to push Right (+X). If x < 0, push Left (-X).
        const direction = this.currentX >= 0 ? 1 : -1;
        const targetX = direction * this.CLEAR_PUSH_TARGET_X;
        
        // Keep the Y roughly the same, maybe slightly back to avoid pushing into tunnel wall
        const targetY = this.currentY; 

        // Move hand (dragging the puck)
        if (this.moveHandTo(targetX, targetY, this.pullSpeed, dt)) {
            this.state = AIState.RELEASING;
            this.timer = 0.05; // Short delay before letting go
        }
    }

    // --- COMMON ---

    private handleReleasing(dt: number) {
        this.timer -= dt;
        if (this.timer <= 0) {
            this.timer = this.getRandomReactionTime();
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



