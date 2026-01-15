import { PuliState } from "./types";
import { BOARD, NAIL, NAILS_POSITIONS, PHYSICS, PULI, RUBBER_BAND, VISUALS } from "./config";

const MAX_LATERAL_STRETCH = NAIL.OFFSET_X - NAIL.RADIUS - PULI.RADIUS - 0.15;
const TUNNEL_ENTRY_Z = NAIL.OFFSET_Z - PULI.RADIUS;

// Return type for simulation
export interface SimulationResult {
    forcedDrops: Set<number>;
    foulSide: number; // 0 = None, -1 = Player 0 Foul, 1 = Player 1 Foul
}

export class PhysicsEngine {
  static applyInput(
    puli: PuliState, 
    targetX: number, 
    targetY: number, 
    offsetX: number, 
    offsetY: number,
    playerId: number
  ) {
    let desiredX = targetX + offsetX;
    let desiredY = targetY + offsetY;

    const bandOffset = NAIL.RADIUS + VISUALS.BAND_THICKNESS / 2;
    const bridgeHalfDepth = BOARD.SLAT_WIDTH / 2;
    const p0FrontLimit = -bridgeHalfDepth - PULI.RADIUS;
    const p1FrontLimit = bridgeHalfDepth + PULI.RADIUS;

    if (playerId === 0) {
      const bandRestY = -NAIL.OFFSET_Z + bandOffset;
      const limitY = bandRestY + PULI.RADIUS - RUBBER_BAND.MAX_STRETCH;
      if (desiredY < limitY) desiredY = limitY;
      
      // Prevent pulling forward through the bridge while holding
      if (desiredY > p0FrontLimit) desiredY = p0FrontLimit;

      if (desiredY < -TUNNEL_ENTRY_Z) {
        if (desiredX < -MAX_LATERAL_STRETCH) desiredX = -MAX_LATERAL_STRETCH;
        if (desiredX > MAX_LATERAL_STRETCH) desiredX = MAX_LATERAL_STRETCH;
      }
    } else {
      const bandRestY = NAIL.OFFSET_Z - bandOffset;
      const limitY = bandRestY - PULI.RADIUS + RUBBER_BAND.MAX_STRETCH;
      if (desiredY > limitY) desiredY = limitY;

      // Prevent pulling forward through the bridge while holding
      if (desiredY < p1FrontLimit) desiredY = p1FrontLimit;

      if (desiredY > TUNNEL_ENTRY_Z) {
        if (desiredX < -MAX_LATERAL_STRETCH) desiredX = -MAX_LATERAL_STRETCH;
        if (desiredX > MAX_LATERAL_STRETCH) desiredX = MAX_LATERAL_STRETCH;
      }
    }

    let dx = desiredX - puli.x;
    let dy = desiredY - puli.y;
    const KP = 60.0;
    const MAX_VELOCITY = 60.0;
    let vx = dx * KP;
    let vy = dy * KP;
    const speedSq = vx * vx + vy * vy;
    if (speedSq > MAX_VELOCITY * MAX_VELOCITY) {
      const scale = MAX_VELOCITY / Math.sqrt(speedSq);
      vx *= scale; vy *= scale;
    }
    puli.vx = vx;
    puli.vy = vy;
  }

  // --- CHANGED: Now accepts the Map of held pucks to identify WHO is holding ---
  static simulate(pulis: PuliState[], heldPulis: { [playerId: number]: number | null }, dt: number): SimulationResult {
    const subDt = dt / PHYSICS.SUBSTEPS;
    const forcedDrops = new Set<number>(); // Always empty now
    
    // Helper to check if a specific ID is held by anyone
    const isHeld = (id: number) => {
        return Object.values(heldPulis).includes(id);
    };

    // Apply friction to non-held pulis
    for (let p of pulis) {
      if (!isHeld(p.id)) {
        p.vx *= PHYSICS.FRICTION;
        p.vy *= PHYSICS.FRICTION;
      }
    }
    
    for (let step = 0; step < PHYSICS.SUBSTEPS; step++) {
      
      for (let i = 0; i < pulis.length; i++) {
        let p = pulis[i];
        
        // --- Rubber Band Logic ---
        let bandForceX = 0;
        let bandForceY = 0;
        let onBand = false;

        const bandOffset = NAIL.RADIUS + VISUALS.BAND_THICKNESS / 2;
        const bandRestY0 = -NAIL.OFFSET_Z + bandOffset;
        const bandRestY1 = NAIL.OFFSET_Z - bandOffset;
        const bandCatchLimit = NAIL.OFFSET_X - PULI.RADIUS;

        if (p.y - PULI.RADIUS < bandRestY0 && Math.abs(p.x) < bandCatchLimit) {
          onBand = true;
          const stretch = Math.abs((p.y - PULI.RADIUS) - bandRestY0);
          const forceMag = Math.pow(stretch, RUBBER_BAND.POWER_CURVE) * RUBBER_BAND.STIFFNESS;
          bandForceY += forceMag;
          bandForceX += (0 - p.x) * forceMag * RUBBER_BAND.CENTERING;
        } else if (p.y + PULI.RADIUS > bandRestY1 && Math.abs(p.x) < bandCatchLimit) {
          onBand = true;
          const stretch = Math.abs((p.y + PULI.RADIUS) - bandRestY1);
          const forceMag = Math.pow(stretch, RUBBER_BAND.POWER_CURVE) * RUBBER_BAND.STIFFNESS;
          bandForceY -= forceMag;
          bandForceX += (0 - p.x) * forceMag * RUBBER_BAND.CENTERING;
        }

        if (onBand && !isHeld(p.id)) {
          p.vx += bandForceX * subDt;
          p.vy += bandForceY * subDt;
          p.vx *= RUBBER_BAND.DAMPING;
          p.vy *= RUBBER_BAND.DAMPING;
        }

        p.x += p.vx * subDt;
        p.y += p.vy * subDt;

        // --- Walls ---
        const innerW = BOARD.WIDTH / 2 - BOARD.SLAT_WIDTH;
        const innerH = BOARD.HEIGHT / 2 - BOARD.SLAT_WIDTH;
        const held = isHeld(p.id);
        const bounce = held ? 0 : -0.5;

        if (p.x < -innerW + PULI.RADIUS) { p.x = -innerW + PULI.RADIUS; p.vx *= bounce; }
        if (p.x > innerW - PULI.RADIUS) { p.x = innerW - PULI.RADIUS; p.vx *= bounce; }
        if (p.y < -innerH + PULI.RADIUS) { p.y = -innerH + PULI.RADIUS; p.vy *= bounce; }
        if (p.y > innerH - PULI.RADIUS) { p.y = innerH - PULI.RADIUS; p.vy *= bounce; }

        if (Math.abs(p.y) > TUNNEL_ENTRY_Z) {
          if (p.x > MAX_LATERAL_STRETCH) {
            p.x = MAX_LATERAL_STRETCH;
            if (p.vx > 0) p.vx *= bounce;
          }
          if (p.x < -MAX_LATERAL_STRETCH) {
            p.x = -MAX_LATERAL_STRETCH;
            if (p.vx < 0) p.vx *= bounce;
          }
        }

        // --- Nails ---
        for (const nail of NAILS_POSITIONS) {
          const dx = p.x - nail.x;
          const dy = p.y - nail.y;
          const distSq = dx * dx + dy * dy;
          const minDist = PULI.RADIUS + NAIL.RADIUS + VISUALS.BAND_THICKNESS + 0.02;
          if (distSq < minDist * minDist) {
            const dist = Math.sqrt(distSq);
            const nx = dx / dist; const ny = dy / dist;
            const pen = minDist - dist;
            p.x += nx * pen; p.y += ny * pen;
            const vDot = p.vx * nx + p.vy * ny;
            if (vDot < 0) {
              const vn = vDot;
              const vtX = p.vx - vn * nx; const vtY = p.vy - vn * ny;
              p.vx = vtX + vn * nx * bounce; p.vy = vtY + vn * ny * bounce;
            }
          }
        }

        // --- Bridge / Barriers ---
        const barrierHalfThick = BOARD.SLAT_WIDTH / 2;
        const gapHalfWidth = BOARD.TUNNEL_WIDTH / 2;
        const barrierOuterX = BOARD.WIDTH / 2;
        const barriers = [
          { x1: gapHalfWidth, x2: barrierOuterX, y1: -barrierHalfThick, y2: barrierHalfThick },
          { x1: -barrierOuterX, x2: -gapHalfWidth, y1: -barrierHalfThick, y2: barrierHalfThick }
        ];
        for (const b of barriers) {
          const cx = Math.max(b.x1, Math.min(b.x2, p.x));
          const cy = Math.max(b.y1, Math.min(b.y2, p.y));
          const dx = p.x - cx; const dy = p.y - cy;
          const distSq = dx * dx + dy * dy;
          if (distSq < PULI.RADIUS * PULI.RADIUS) {
            const dist = Math.sqrt(distSq);
            let nx = 0, ny = 0, pen = 0;
            if (dist > 0.0001) {
              pen = PULI.RADIUS - dist; nx = dx / dist; ny = dy / dist;
            } else {
              const dLeft = Math.abs(p.x - b.x1); const dRight = Math.abs(p.x - b.x2);
              const dTop = Math.abs(p.y - b.y2); const dBottom = Math.abs(p.y - b.y1);
              const minD = Math.min(dLeft, dRight, dTop, dBottom);
              if (minD === dTop) { nx = 0; ny = 1; pen = PULI.RADIUS + dTop; }
              else if (minD === dBottom) { nx = 0; ny = -1; pen = PULI.RADIUS + dBottom; }
              else if (minD === dLeft) { nx = -1; ny = 0; pen = PULI.RADIUS + dLeft; }
              else { nx = 1; ny = 0; pen = PULI.RADIUS + dRight; }
            }
            p.x += nx * pen; p.y += ny * pen;
            const vDot = p.vx * nx + p.vy * ny;
            if (vDot < 0) {
              const vn = vDot;
              const vtX = p.vx - vn * nx; const vtY = p.vy - vn * ny;
              p.vx = vtX + vn * nx * bounce; p.vy = vtY + vn * ny * bounce;
            }
          }
        }

        // --- Puck-Puck Collisions ---
        for (let j = i + 1; j < pulis.length; j++) {
          let other = pulis[j];
          const dx = other.x - p.x; const dy = other.y - p.y;
          const distSq = dx * dx + dy * dy;
          const minDist = PULI.RADIUS * 2;
          
          if (distSq < minDist * minDist) {
            const dist = Math.sqrt(distSq);
            const overlap = minDist - dist;
            const nx = dx / dist; const ny = dy / dist;

            // Resolve Collision
            const moveX = nx * overlap * 0.5; const moveY = ny * overlap * 0.5;
            p.x -= moveX; p.y -= moveY;
            other.x += moveX; other.y += moveY;
            const dvx = other.vx - p.vx; const dvy = other.vy - p.vy;
            const dot = dvx * nx + dvy * ny;
            if (dot < 0) {
              const impulse = dot;
              p.vx += impulse * nx; p.vy += impulse * ny;
              other.vx -= impulse * nx; other.vy -= impulse * ny;
            }
          }
        }
      } // End Pucks Loop
    } // End Substeps
    
    // No fouls returned, effectively disabling the red foul indicator logic in the game
    return { forcedDrops, foulSide: 0 };
  }
}



