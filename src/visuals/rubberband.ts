import * as THREE from "three";
import { PuliState, HullItem, TangentLine } from "../types";
import { NAIL, NAILS_POSITIONS, PULI, VISUALS } from "../config";

export class RubberBandVisuals {
  scene: THREE.Scene;
  bandMeshes: THREE.Mesh[] = [];

  constructor(scene: THREE.Scene) {
    this.scene = scene;
    this.initVisuals();
  }

  private initVisuals() {
    const bandMaterial = new THREE.MeshStandardMaterial({
      color: VISUALS.BAND_COLOR,
      roughness: 0.8,
    });

    for (let i = 0; i < 2; i++) {
        const geometry = new THREE.BufferGeometry();
        const mesh = new THREE.Mesh(geometry, bandMaterial);
        mesh.scale.set(1, VISUALS.BAND_HEIGHT_SCALE, 1);
        mesh.castShadow = true;
        mesh.receiveShadow = true;
        this.scene.add(mesh);
        this.bandMeshes.push(mesh);
    }
  }

  public update(pulis: PuliState[]) {
    this.updateRubberBandMesh(0, this.getBandHull(0, pulis));
    this.updateRubberBandMesh(1, this.getBandHull(1, pulis));
  }

  private getBandHull(playerId: number, pulis: PuliState[]): HullItem[] {
    const isP0 = playerId === 0;
    const bandOffset = NAIL.RADIUS + VISUALS.BAND_THICKNESS / 2;
    const restY = isP0 ? -NAIL.OFFSET_Z + bandOffset : NAIL.OFFSET_Z - bandOffset;

    const rNail = NAIL.RADIUS + VISUALS.BAND_THICKNESS;
    const rPuck = PULI.RADIUS + VISUALS.BAND_THICKNESS;

    const activePucks: HullItem[] = [];
    const bandCatchLimit = NAIL.OFFSET_X - PULI.RADIUS;
    const EPSILON = 0.01;

    for (const p of pulis) {
        if (isP0) {
            if (p.y - PULI.RADIUS < restY - EPSILON && Math.abs(p.x) < bandCatchLimit) {
                activePucks.push({ x: p.x, y: p.y, r: rPuck, isNail: false });
            }
        } else {
            if (p.y + PULI.RADIUS > restY + EPSILON && Math.abs(p.x) < bandCatchLimit) {
                activePucks.push({ x: p.x, y: p.y, r: rPuck, isNail: false });
            }
        }
    }

    const nailL = isP0 ? NAILS_POSITIONS[0] : NAILS_POSITIONS[2];
    const nailR = isP0 ? NAILS_POSITIONS[1] : NAILS_POSITIONS[3];
    const itemL = { x: nailL.x, y: nailL.y, r: rNail, isNail: true };
    const itemR = { x: nailR.x, y: nailR.y, r: rNail, isNail: true };

    const allPoints = [itemL, ...activePucks, itemR];
    allPoints.sort((a, b) => a.x - b.x);

    const hull: HullItem[] = [];

    const getK = (item: HullItem) => {
        if (isP0) {
             return item.isNail ? item.y + item.r : item.y - item.r;
        } else {
             return item.isNail ? item.y - item.r : item.y + item.r;
        }
    };

    const cross = (o: HullItem, a: HullItem, b: HullItem) => {
        const oy = getK(o); const ay = getK(a); const by = getK(b);
        return (a.x - o.x) * (by - oy) - (ay - oy) * (b.x - o.x);
    };

    for (const p of allPoints) {
        while (hull.length >= 2) {
            const c = cross(hull[hull.length - 2], hull[hull.length - 1], p);
            if (isP0) {
                 if (c <= 0) hull.pop();
                 else break;
            } else {
                 if (c >= 0) hull.pop();
                 else break;
            }
        }
        hull.push(p);
    }

    return hull;
  }

  private getTangents(c1: THREE.Vector2, r1: number, c2: THREE.Vector2, r2: number, type: 'internal' | 'external'): TangentLine[] {
    const d = new THREE.Vector2().subVectors(c2, c1);
    const dist = d.length();
    if (type === 'internal' && dist <= r1 + r2) return [];
    if (type === 'external' && dist <= Math.abs(r1 - r2)) return [];

    const angle = Math.atan2(d.y, d.x);
    const offset = type === 'internal' ? Math.acos((r1 + r2) / dist) : Math.acos((r1 - r2) / dist);

    const t1 = {
        start: { x: c1.x + r1 * Math.cos(angle + (type === 'internal' ? -offset : offset)), y: c1.y + r1 * Math.sin(angle + (type === 'internal' ? -offset : offset)), ang: angle + (type === 'internal' ? -offset : offset) },
        end: { x: c2.x + r2 * Math.cos(angle + (type === 'internal' ? -offset + Math.PI : offset)), y: c2.y + r2 * Math.sin(angle + (type === 'internal' ? -offset + Math.PI : offset)), ang: angle + (type === 'internal' ? -offset + Math.PI : offset) }
    };
    const t2 = {
        start: { x: c1.x + r1 * Math.cos(angle + (type === 'internal' ? offset : -offset)), y: c1.y + r1 * Math.sin(angle + (type === 'internal' ? offset : -offset)), ang: angle + (type === 'internal' ? offset : -offset) },
        end: { x: c2.x + r2 * Math.cos(angle + (type === 'internal' ? offset + Math.PI : -offset)), y: c2.y + r2 * Math.sin(angle + (type === 'internal' ? offset + Math.PI : -offset)), ang: angle + (type === 'internal' ? offset + Math.PI : -offset) }
    };
    return [t1, t2];
  }

  private updateRubberBandMesh(meshIndex: number, hull: HullItem[]) {
    const mesh = this.bandMeshes[meshIndex];
    const curvePoints: THREE.Vector3[] = [];
    const addPt = (x: number, z: number) => {
         const last = curvePoints[curvePoints.length - 1];
         if (last && Math.abs(last.x - x) < 0.001 && Math.abs(last.z - z) < 0.001) return;
         curvePoints.push(new THREE.Vector3(x, 0, z));
    };

    const isP0 = meshIndex === 0;
    const NAIL_FACE = isP0 ? 1 : -1;

    const getFace = (item: HullItem) => item.isNail ? NAIL_FACE : -NAIL_FACE;

    const addArc = (center: THREE.Vector2, r: number, startAng: number, endAng: number, face: number) => {
        let start = startAng; let end = endAng;
        const PI2 = Math.PI * 2;
        while (start < 0) start += PI2; while (start >= PI2) start -= PI2;
        while (end < 0) end += PI2; while (end >= PI2) end -= PI2;

        let delta = end - start;
        const isCW = (face === 1);

        if (isCW) { if (delta > 0) delta -= PI2; }
        else { if (delta < 0) delta += PI2; }

        const steps = 12;
        for (let i = 0; i <= steps; i++) {
            const t = i / steps; const a = start + delta * t;
            addPt(center.x + r * Math.cos(a), center.y + r * Math.sin(a));
        }
    };

    const nailRestL = Math.PI; const nailRestR = 0;
    let currentArcStart = nailRestL;

    for (let i = 0; i < hull.length - 1; i++) {
        const curr = hull[i]; const next = hull[i + 1];
        const C1 = new THREE.Vector2(curr.x, curr.y); const C2 = new THREE.Vector2(next.x, next.y);

        const f1 = getFace(curr); const f2 = getFace(next);
        const type = (f1 === f2) ? 'external' : 'internal';

        const candidates = this.getTangents(C1, curr.r, C2, next.r, type);
        let chosenTangent: TangentLine | null = null;

        if (candidates.length > 0) {
            const score = (t: TangentLine) => {
                const dy1 = t.start.y - C1.y; const dy2 = t.end.y - C2.y;
                const s1 = (dy1 * f1 >= -0.001);
                const s2 = (dy2 * f2 >= -0.001);
                return (s1 ? 1 : 0) + (s2 ? 1 : 0);
            };
            candidates.sort((a, b) => score(b) - score(a));
            chosenTangent = candidates[0];
        } else {
            chosenTangent = { start: { x: C1.x, y: C1.y, ang: 0 }, end: { x: C2.x, y: C2.y, ang: 0 } };
        }

        if (chosenTangent) {
            addArc(C1, curr.r, currentArcStart, chosenTangent.start.ang, f1);
            addPt(chosenTangent.start.x, chosenTangent.start.y);
            addPt(chosenTangent.end.x, chosenTangent.end.y);
            currentArcStart = chosenTangent.end.ang;
        }
    }

    const last = hull[hull.length - 1];
    addArc(new THREE.Vector2(last.x, last.y), last.r, currentArcStart, nailRestR, getFace(last));

    if (curvePoints.length < 2) { addPt(hull[0].x, hull[0].y); addPt(hull[hull.length-1].x, hull[hull.length-1].y); }

    const curve = new THREE.CatmullRomCurve3(curvePoints, false, 'catmullrom', 0.05);
    if (mesh.geometry) mesh.geometry.dispose();
    mesh.geometry = new THREE.TubeGeometry(curve, VISUALS.BAND_SEGMENTS, VISUALS.BAND_THICKNESS, 8, false);
    mesh.position.y = 0.15;
  }
}







