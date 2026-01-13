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

  // Animation Timing Constants (ms)
  private readonly INITIAL_BLACK_DURATION = 500;  // Stay black for 0.5s
  private readonly FADE_DURATION = 1500;          // Fade in over 1.5s
  private readonly POST_FADE_WAIT = 1000;         // Wait 2s after fade
  private readonly CAMERA_MOVE_DURATION = 2000;   // Move camera over 2.5s

  // Derived: When does the camera start moving?
  // 0.5 + 1.5 + 2.0 = 4.0 seconds total wait
  private readonly CAMERA_START_TIME = this.INITIAL_BLACK_DURATION + this.FADE_DURATION + this.POST_FADE_WAIT;

  private animStartTime: number;
  private isAnimating: boolean = true;
  
  private introPosition: THREE.Vector3;
  private introLookAt: THREE.Vector3;
  private finalPosition: THREE.Vector3;
  private finalLookAt: THREE.Vector3;

  // Fade Overlay
  private fadeOverlay: THREE.Mesh;

  constructor(canvas: HTMLCanvasElement, localPlayerId: number) {
    this.scene = new THREE.Scene();

    // --- Studio Environment Colors ---
    // Light Sky Blue
    const backgroundColor = 0x87CEFA; 
    this.scene.background = new THREE.Color(backgroundColor);
    
    // Fog helps fade the grid lines into the distance
    this.scene.fog = new THREE.Fog(backgroundColor, 30, 100);
    // ------------------------------------------

    // Camera Setup
    const radius = 25;
    const angle = 45;
    const verticalShift = 2;
    const rads = THREE.MathUtils.degToRad(angle);
    const y = radius * Math.cos(rads);
    const z = radius * Math.sin(rads);

    // Initial aspect ratio (will be updated immediately by resize)
    const aspect = VISUALS.CANVAS_WIDTH / VISUALS.CANVAS_HEIGHT;

    this.camera0 = new THREE.PerspectiveCamera(40, aspect, 0.1, 150);
    this.camera0.position.set(0, y, -(z + verticalShift));
    this.camera0.lookAt(0, 0, -verticalShift);
    this.camera0.updateMatrixWorld();

    this.camera1 = new THREE.PerspectiveCamera(40, aspect, 0.1, 150);
    this.camera1.position.set(0, y, z + verticalShift);
    this.camera1.lookAt(0, 0, verticalShift);
    this.camera1.updateMatrixWorld();

    this.camera = (localPlayerId === 0) ? this.camera0 : this.camera1;

    // --- Fade In Setup ---
    this.scene.add(this.camera);

    const fadeGeo = new THREE.PlaneGeometry(10, 10);
    const fadeMat = new THREE.MeshBasicMaterial({
        color: 0x000000,
        transparent: true,
        opacity: 1.0,
        side: THREE.DoubleSide,
        depthTest: false,
        depthWrite: false
    });
    this.fadeOverlay = new THREE.Mesh(fadeGeo, fadeMat);
    this.fadeOverlay.position.set(0, 0, -0.2); 
    this.fadeOverlay.renderOrder = 9999; 
    this.camera.add(this.fadeOverlay);
    // ---------------------

    // --- Animation Initialization ---
    this.animStartTime = performance.now();

    this.finalPosition = this.camera.position.clone();
    this.finalLookAt = new THREE.Vector3(0, 0, (localPlayerId === 0) ? -verticalShift : verticalShift);

    this.introPosition = new THREE.Vector3(-22, 10, 0); 
    this.introLookAt = new THREE.Vector3(0, 0, 0);

    this.camera.position.copy(this.introPosition);
    this.camera.lookAt(this.introLookAt);
    // --------------------------------

    // Renderer Setup
    this.renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true, alpha: false });
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.0; 

    // Build World
    this.buildEnvironment(); 
    this.buildBoard();
    this.loadTable();
    this.setupLights();
    
    this.rubberBand = new RubberBandVisuals(this.scene);
  }

  // --- Solid Floor + Grid ---
  private buildEnvironment() {
      // 1. The Floor (Solid color)
      // Stronger Yellow to appear "white-yellow" on screen
      const floorGeo = new THREE.PlaneGeometry(300, 300);
      const floorMat = new THREE.MeshStandardMaterial({
          color: 0xffe066, 
          roughness: 1.0,
          metalness: 0.0
      });

      const floor = new THREE.Mesh(floorGeo, floorMat);
      floor.rotation.x = -Math.PI / 2;
      floor.position.y = -8.0; 
      floor.receiveShadow = true;
      this.scene.add(floor);

      // 2. The Grid
      const gridSize = 300;
      const gridDivisions = 60;
      
      // Gray grid lines for contrast against the yellow floor
      const gridColor = 0x808080; 
      const gridHelper = new THREE.GridHelper(gridSize, gridDivisions, gridColor, gridColor);
      gridHelper.position.y = -7.9; 
      
      const gridMat = gridHelper.material as THREE.Material;
      gridMat.transparent = true;
      gridMat.opacity = 0.4;
      
      this.scene.add(gridHelper);
  }

  // Handle dynamic resize
  resize(width: number, height: number) {
      this.renderer.setSize(width, height, false);
      
      const aspect = width / height;
      
      // Update both cameras
      [this.camera0, this.camera1].forEach(cam => {
          cam.aspect = aspect;
          
          if (aspect < 0.6) {
              cam.fov = 40 * (0.6 / aspect); 
          } else {
              cam.fov = 40;
          }
          cam.updateProjectionMatrix();
      });
  }

  private loadTable() {
    const loader = new GLTFLoader();
    loader.load("assets/table.glb", (gltf) => {
        const object = gltf.scene;
        const box = new THREE.Box3().setFromObject(object);
        const size = box.getSize(new THREE.Vector3());
        const center = box.getCenter(new THREE.Vector3());
        const targetWidth = BOARD.WIDTH * 1.3;

        if (size.x > 0) {
            const scale = targetWidth / size.x;
            object.scale.set(scale, scale, scale);
            object.position.x = -center.x * scale;
            object.position.z = -center.z * scale;
            const boardBottomY = -BOARD.BASE_THICKNESS / 2;
            const tableTopY = box.max.y * scale;
            object.position.y = boardBottomY - tableTopY;
            object.traverse((child) => {
                if ((child as THREE.Mesh).isMesh) {
                    // --- Disable Shadow Casting for Table ---
                    child.castShadow = false; 
                    child.receiveShadow = true;
                    const mesh = child as THREE.Mesh;
                    if (mesh.material) {
                         const materials = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
                         materials.forEach(mat => {
                             if (mat instanceof THREE.MeshStandardMaterial) {
                                 mat.metalness = 0.1;
                                 mat.roughness = 0.6;
                             }
                         });
                    }
                }
            });
            this.scene.add(object);
        }
    }, undefined, (error) => {
        console.error("Error loading table.glb:", error);
    });
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

  // --- Animation Logic Helper ---
  private updateAnimationState() {
    const now = performance.now();
    const elapsed = now - this.animStartTime;

    if (this.fadeOverlay.visible) {
        if (elapsed < this.INITIAL_BLACK_DURATION) {
            (this.fadeOverlay.material as THREE.MeshBasicMaterial).opacity = 1.0;
        } else if (elapsed < this.INITIAL_BLACK_DURATION + this.FADE_DURATION) {
            const fadeElapsed = elapsed - this.INITIAL_BLACK_DURATION;
            const t = fadeElapsed / this.FADE_DURATION;
            (this.fadeOverlay.material as THREE.MeshBasicMaterial).opacity = 1.0 - t;
        } else {
            this.fadeOverlay.visible = false;
        }
    }

    if (this.isAnimating) {
        if (elapsed < this.CAMERA_START_TIME) {
            this.camera.position.copy(this.introPosition);
            this.camera.lookAt(this.introLookAt);
        } else if (elapsed < this.CAMERA_START_TIME + this.CAMERA_MOVE_DURATION) {
            const moveElapsed = elapsed - this.CAMERA_START_TIME;
            const t = moveElapsed / this.CAMERA_MOVE_DURATION;
            const ease = t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

            const curPos = new THREE.Vector3().lerpVectors(this.introPosition, this.finalPosition, ease);
            const curTarget = new THREE.Vector3().lerpVectors(this.introLookAt, this.finalLookAt, ease);

            this.camera.position.copy(curPos);
            this.camera.lookAt(curTarget);
        } else {
            this.camera.position.copy(this.finalPosition);
            this.camera.lookAt(this.finalLookAt);
            this.isAnimating = false;
        }
    }
  }

  draw(pulis: PuliState[]) {
    this.updateAnimationState();

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

    // --- Add Logo on Left Side with Correct Aspect Ratio ---
    const logoHeight = 0.6;
    const logoGeo = new THREE.PlaneGeometry(1, 1);
    const logoMat = new THREE.MeshStandardMaterial({
        transparent: true,
        roughness: 0.5,
        metalness: 0.0,
        polygonOffset: true,
        polygonOffsetFactor: -1,
        polygonOffsetUnits: -1
    });

    const logoMesh = new THREE.Mesh(logoGeo, logoMat);
    logoMesh.position.set(-BOARD.WIDTH / 2 - 0.005, posY, 0);
    logoMesh.rotation.y = -Math.PI / 2;
    logoMesh.visible = false; 
    boardGroup.add(logoMesh);

    new THREE.TextureLoader().load("assets/poliorkia_wood.png", (tex) => {
        tex.encoding = THREE.sRGBEncoding;
        const aspect = tex.image.width / tex.image.height;
        logoMesh.scale.set(logoHeight * aspect, logoHeight, 1);
        logoMat.map = tex;
        logoMat.needsUpdate = true;
        logoMesh.visible = true;
    });
    // -----------------------------

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

    this.scene.add(boardGroup);
  }

  private setupLights() {
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    this.scene.add(ambientLight);
    const hemiLight = new THREE.HemisphereLight(0xffffff, 0x444444, 0.6);
    this.scene.add(hemiLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 1.5);
    dirLight.position.set(0, 20, 0);
    dirLight.castShadow = true;
    dirLight.shadow.mapSize.width = 2048; dirLight.shadow.mapSize.height = 2048;
    this.scene.add(dirLight);
  }
}