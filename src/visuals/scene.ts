import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { RoundedBoxGeometry } from "three/examples/jsm/geometries/RoundedBoxGeometry.js";
import { BOARD, NAIL, NAILS_POSITIONS, PULI, VISUALS } from "../config";
import { PuliState } from "../types";
import { RubberBandVisuals } from "./rubberband";

export class GameScene {
  scene: THREE.Scene;
  renderer: THREE.WebGLRenderer;
  camera: THREE.PerspectiveCamera;
  camera0: THREE.PerspectiveCamera;
  camera1: THREE.PerspectiveCamera;
  
  puliMeshes: Map<number, THREE.Mesh> = new Map();
  rubberBand: RubberBandVisuals;

  constructor(canvas: HTMLCanvasElement, localPlayerId: number) {
    this.scene = new THREE.Scene();
    // Exact color from original code
    this.scene.background = new THREE.Color(0x222222);

    // Camera Setup
    const radius = 29;
    const angle = 45;
    const verticalShift = 2;
    const rads = THREE.MathUtils.degToRad(angle);
    const y = radius * Math.cos(rads);
    const z = radius * Math.sin(rads);

    this.camera0 = new THREE.PerspectiveCamera(40, VISUALS.CANVAS_WIDTH / VISUALS.CANVAS_HEIGHT, 0.1, 100);
    this.camera0.position.set(0, y, -(z + verticalShift));
    this.camera0.lookAt(0, 0, -verticalShift);
    this.camera0.updateMatrixWorld();

    this.camera1 = new THREE.PerspectiveCamera(40, VISUALS.CANVAS_WIDTH / VISUALS.CANVAS_HEIGHT, 0.1, 100);
    this.camera1.position.set(0, y, z + verticalShift);
    this.camera1.lookAt(0, 0, verticalShift);
    this.camera1.updateMatrixWorld();

    this.camera = (localPlayerId === 0) ? this.camera0 : this.camera1;

    // Renderer Setup
    this.renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true });
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    
    // Original Tone Mapping Settings
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.0; 
    // Note: No outputColorSpace setting needed for 0.148.0 to match original

    // Build World
    this.buildBoard();
    this.setupLights();
    
    this.rubberBand = new RubberBandVisuals(this.scene);
  }

  createPulis(pulis: PuliState[]) {
    const blueMaterial = new THREE.MeshStandardMaterial({
        color: 0x1F3C6E,
        roughness: 0.6,
        metalness: 0.0,
        vertexColors: true
    });
    const redMaterial = new THREE.MeshStandardMaterial({
        color: 0x8C1D18,
        roughness: 0.6,
        metalness: 0.0,
        vertexColors: true
    });

    const points: THREE.Vector2[] = [];
    const rOuter = PULI.RADIUS;
    const h = PULI.HEIGHT;
    const hCenter = 0.15;

    points.push(new THREE.Vector2(0.0, 0.0));
    points.push(new THREE.Vector2(rOuter - 0.05, 0.0));
    points.push(new THREE.Vector2(rOuter, 0.05));
    points.push(new THREE.Vector2(rOuter, h - 0.05));
    points.push(new THREE.Vector2(rOuter - 0.05, h));
    points.push(new THREE.Vector2(0.35, h));

    const rRimInner = 0.35;
    const rFlatCenter = 0.05;
    const steps = 12;

    for (let i = 0; i <= steps; i++) {
        const t = i / steps;
        const r = rRimInner - t * (rRimInner - rFlatCenter);
        const y = hCenter + (h - hCenter) * Math.pow(1 - t, 2.0);
        points.push(new THREE.Vector2(r, y));
    }
    points.push(new THREE.Vector2(0.0, hCenter));

    const puliGeo = new THREE.LatheGeometry(points, 64);
    const count = puliGeo.attributes.position.count;
    const colors = new Float32Array(count * 3);
    const pos = puliGeo.attributes.position;

    for (let i = 0; i < count; i++) {
        const x = pos.getX(i);
        const z = pos.getZ(i);
        const y = pos.getY(i);
        const r = Math.sqrt(x * x + z * z);
        let intensity = 1.0;
        if (r < rRimInner && y < h - 0.01) {
             const t = (r - rFlatCenter) / (rRimInner - rFlatCenter);
             let factor = Math.max(0, Math.min(1, t));
             intensity = 0.95 + 0.05 * Math.pow(factor, 0.5);
        }
        colors[i * 3] = intensity;
        colors[i * 3 + 1] = intensity;
        colors[i * 3 + 2] = intensity;
    }
    puliGeo.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    for (let puli of pulis) {
      const material = (puli.owner === 1) ? redMaterial : blueMaterial;
      const mesh = new THREE.Mesh(puliGeo, material);
      mesh.castShadow = true; mesh.receiveShadow = true;
      this.scene.add(mesh);
      this.puliMeshes.set(puli.id, mesh);
    }
  }

  draw(pulis: PuliState[]) {
    for (const p of pulis) {
      const mesh = this.puliMeshes.get(p.id);
      if (mesh) mesh.position.set(p.x, 0.1, p.y);
    }
    this.rubberBand.update(pulis);
    this.renderer.render(this.scene, this.camera);
  }

  private buildBoard() {
    const boardGroup = new THREE.Group();
    const posY = BOARD.BASE_THICKNESS / 2 + BOARD.SLAT_HEIGHT / 2;
    const baseGeo = new RoundedBoxGeometry(BOARD.WIDTH, BOARD.BASE_THICKNESS, BOARD.HEIGHT, 4, BOARD.BEVEL_SIZE);
    const floorMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.5 });
    const baseMesh = new THREE.Mesh(baseGeo, floorMaterial);
    baseMesh.receiveShadow = true; baseMesh.castShadow = true;
    boardGroup.add(baseMesh);

    const borderConfigs: { mesh: THREE.Mesh, w: number, d: number }[] = [];
    let bridgeMesh: THREE.Mesh | null = null;

    const loader = new GLTFLoader();
    loader.load("assets/wood.glb", (gltf) => {
        let foundMaterial: any = null;
        gltf.scene.traverse((child) => {
            if ((child as THREE.Mesh).isMesh && !foundMaterial) {
                const mesh = child as THREE.Mesh;
                const material = mesh.material;
                const mat = Array.isArray(material) ? material[0] : material;
                if (mat instanceof THREE.MeshStandardMaterial) {
                    foundMaterial = mat;
                }
            }
        });

        if (foundMaterial && foundMaterial.map) {
            const standardMat = foundMaterial as THREE.MeshStandardMaterial;
            const originalTexture = standardMat.map;

            if (originalTexture) {
                const TEXTURE_DENSITY = 0.2;
                for (const config of borderConfigs) {
                    const localMat = standardMat.clone() as THREE.MeshStandardMaterial;
                    const localTexture = originalTexture.clone();
                    
                    localTexture.wrapS = THREE.RepeatWrapping;
                    localTexture.wrapT = THREE.RepeatWrapping;
                    localTexture.repeat.set(config.w * TEXTURE_DENSITY, config.d * TEXTURE_DENSITY);
                    localTexture.needsUpdate = true;
                    localMat.map = localTexture;
                    config.mesh.material = localMat;
                }
                if (bridgeMesh) {
                    const bridgeMat = standardMat.clone() as THREE.MeshStandardMaterial;
                    const bridgeTex = originalTexture.clone();
                    
                    bridgeTex.wrapS = THREE.RepeatWrapping;
                    bridgeTex.wrapT = THREE.RepeatWrapping;
                    bridgeTex.center.set(0.5, 0.5);
                    bridgeTex.repeat.set(0.5, 0.3);
                    bridgeTex.needsUpdate = true;
                    bridgeMat.map = bridgeTex;
                    bridgeMesh.material = bridgeMat;
                }
            }
        }
    });

    const woodColor = 0x4A2E1F;
    const sideMaterial = new THREE.MeshStandardMaterial({ color: woodColor, roughness: 0.4 });

    const topGeo = new RoundedBoxGeometry(BOARD.WIDTH, BOARD.SLAT_HEIGHT, BOARD.SLAT_WIDTH, 4, BOARD.BEVEL_SIZE);
    const topSlat = new THREE.Mesh(topGeo, sideMaterial);
    topSlat.position.set(0, posY, -BOARD.HEIGHT / 2 + BOARD.SLAT_WIDTH / 2);
    topSlat.castShadow = true; topSlat.receiveShadow = true;
    boardGroup.add(topSlat);
    borderConfigs.push({ mesh: topSlat, w: BOARD.WIDTH, d: BOARD.SLAT_WIDTH });

    const botSlat = new THREE.Mesh(topGeo, sideMaterial);
    botSlat.position.set(0, posY, BOARD.HEIGHT / 2 - BOARD.SLAT_WIDTH / 2);
    botSlat.castShadow = true; botSlat.receiveShadow = true;
    boardGroup.add(botSlat);
    borderConfigs.push({ mesh: botSlat, w: BOARD.WIDTH, d: BOARD.SLAT_WIDTH });

    const sideH = BOARD.HEIGHT - 2 * BOARD.SLAT_WIDTH;
    const sideGeo = new RoundedBoxGeometry(BOARD.SLAT_WIDTH, BOARD.SLAT_HEIGHT, sideH, 4, BOARD.BEVEL_SIZE);
    const leftSlat = new THREE.Mesh(sideGeo, sideMaterial);
    leftSlat.position.set(-BOARD.WIDTH / 2 + BOARD.SLAT_WIDTH / 2, posY, 0);
    leftSlat.castShadow = true; leftSlat.receiveShadow = true;
    boardGroup.add(leftSlat);
    borderConfigs.push({ mesh: leftSlat, w: BOARD.SLAT_WIDTH, d: sideH });

    const rightSlat = new THREE.Mesh(sideGeo, sideMaterial);
    rightSlat.position.set(BOARD.WIDTH / 2 - BOARD.SLAT_WIDTH / 2, posY, 0);
    rightSlat.castShadow = true; rightSlat.receiveShadow = true;
    boardGroup.add(rightSlat);
    borderConfigs.push({ mesh: rightSlat, w: BOARD.SLAT_WIDTH, d: sideH });

    const shapeH = BOARD.SLAT_HEIGHT - 2 * BOARD.BEVEL_SIZE;
    const shapeD = BOARD.SLAT_WIDTH - 2 * BOARD.BEVEL_SIZE;
    const innerWidth = BOARD.WIDTH - 2 * BOARD.SLAT_WIDTH;
    const shapeW = innerWidth - 2 * BOARD.BEVEL_SIZE;

    const shape = new THREE.Shape();
    const center = shapeW / 2;
    const holeHalfWidth = BOARD.TUNNEL_WIDTH / 2;
    shape.moveTo(0, 0);
    shape.lineTo(center - holeHalfWidth, 0);
    shape.lineTo(center - holeHalfWidth, BOARD.TUNNEL_HEIGHT);
    shape.lineTo(center + holeHalfWidth, BOARD.TUNNEL_HEIGHT);
    shape.lineTo(center + holeHalfWidth, 0);
    shape.lineTo(shapeW, 0);
    shape.lineTo(shapeW, shapeH);
    shape.lineTo(0, shapeH);
    shape.lineTo(0, 0);

    const extrudeSettings = { steps: 1, depth: shapeD, bevelEnabled: true, bevelThickness: BOARD.BEVEL_SIZE, bevelSize: BOARD.BEVEL_SIZE, bevelSegments: 4 };
    const middleGeometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);
    middleGeometry.center();

    bridgeMesh = new THREE.Mesh(middleGeometry, sideMaterial);
    bridgeMesh.position.set(0, posY, 0);
    bridgeMesh.castShadow = true; bridgeMesh.receiveShadow = true;
    boardGroup.add(bridgeMesh);

    const nailGeo = new THREE.CylinderGeometry(NAIL.RADIUS, NAIL.RADIUS, NAIL.HEIGHT, 16);
    const nailMat = new THREE.MeshStandardMaterial({ color: NAIL.COLOR, roughness: 0.4, metalness: 0.7 });

    for (const pos of NAILS_POSITIONS) {
        const nail = new THREE.Mesh(nailGeo, nailMat);
        nail.position.set(pos.x, BOARD.BASE_THICKNESS / 2 + NAIL.HEIGHT / 2, pos.y);
        nail.castShadow = true; nail.receiveShadow = true;
        boardGroup.add(nail);
    }

    const planeGeo = new THREE.PlaneGeometry(100, 100);
    const planeMat = new THREE.MeshStandardMaterial({ color: 0x1a1a1a, roughness: 1 });
    const plane = new THREE.Mesh(planeGeo, planeMat);
    plane.rotation.x = -Math.PI / 2;
    plane.position.y = -(BOARD.BASE_THICKNESS / 2 + 0.01);
    plane.receiveShadow = true;
    this.scene.add(plane);

    this.scene.add(boardGroup);
  }

  private setupLights() {
    // Original Light values
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5); 
    this.scene.add(ambientLight);
    const hemiLight = new THREE.HemisphereLight(0xffffff, 0x444444, 0.6); 
    this.scene.add(hemiLight);
    
    // Original Light value
    const dirLight = new THREE.DirectionalLight(0xffffff, 1.5); 
    dirLight.position.set(0, 20, 0);
    dirLight.castShadow = true;
    dirLight.shadow.mapSize.width = 2048; dirLight.shadow.mapSize.height = 2048;
    this.scene.add(dirLight);
  }
}





