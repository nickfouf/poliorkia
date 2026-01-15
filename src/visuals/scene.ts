import * as THREE from "three";
import { RoundedBoxGeometry } from "three/examples/jsm/geometries/RoundedBoxGeometry.js";
import { BOARD, NAIL, NAILS_POSITIONS, PULI, VISUALS, PALETTES } from "../config";
import { PuliState, PlayerProfile, GameVisualConfig } from "../types";
import { RubberBandVisuals } from "./rubberband";
import strings from "../../netplay/src/strings.json";
import { AssetManager } from "../asset-manager";

export interface SceneTiming {
    INITIAL_BLACK: number;
    FADE: number;
    POST_FADE_WAIT: number;
    CAMERA_MOVE: number;
    COUNTDOWN: number;
    GO_SIGNAL: number;
}

export class GameScene {
    scene: THREE.Scene;
    renderer: THREE.WebGLRenderer;
    camera: THREE.PerspectiveCamera;
    camera0: THREE.PerspectiveCamera;
    camera1: THREE.PerspectiveCamera;

    puliMeshes: Map<number, THREE.Mesh> = new Map();
    rubberBand: RubberBandVisuals;

    private INITIAL_BLACK_DURATION: number;
    private FADE_DURATION: number;
    private POST_FADE_WAIT: number;
    private CAMERA_MOVE_DURATION: number;
    private COUNTDOWN_DURATION: number;
    private GO_SIGNAL_DURATION: number;
    
    private TOTAL_INTRO_DURATION: number;
    private CAMERA_START_TIME: number;
    
    private introPosition: THREE.Vector3;
    private introLookAt: THREE.Vector3;
    private finalPosition: THREE.Vector3;
    private finalLookAt: THREE.Vector3;

    private fadeOverlay: THREE.Mesh;

    private countdownSprite: THREE.Sprite;
    private countdownCanvas: HTMLCanvasElement;
    private countdownContext: CanvasRenderingContext2D;
    private currentCountdownText: string = "";

    private foulIndicator: THREE.Mesh;
    private nameGroup: THREE.Group = new THREE.Group();

    private hudGroup: THREE.Group;
    private timerMesh: THREE.Mesh;
    private timerTexture: THREE.Texture;
    private timerCtx: CanvasRenderingContext2D;
    private foulLeftMesh: THREE.Mesh;
    private foulLeftTexture: THREE.Texture;
    private foulLeftCtx: CanvasRenderingContext2D;
    private foulRightMesh: THREE.Mesh;
    private foulRightTexture: THREE.Texture;
    private foulRightCtx: CanvasRenderingContext2D;

    private floorMaterial: THREE.MeshStandardMaterial;
    private paintedWoodMaterial: THREE.MeshStandardMaterial; 
    private p0DiscMaterial: THREE.MeshStandardMaterial;
    private p1DiscMaterial: THREE.MeshStandardMaterial;

    constructor(canvas: HTMLCanvasElement, localPlayerId: number, timings: SceneTiming) {
        this.INITIAL_BLACK_DURATION = timings.INITIAL_BLACK;
        this.FADE_DURATION = timings.FADE;
        this.POST_FADE_WAIT = timings.POST_FADE_WAIT;
        this.CAMERA_MOVE_DURATION = timings.CAMERA_MOVE;
        this.COUNTDOWN_DURATION = timings.COUNTDOWN;
        this.GO_SIGNAL_DURATION = timings.GO_SIGNAL;

        this.TOTAL_INTRO_DURATION = this.INITIAL_BLACK_DURATION + this.FADE_DURATION + this.POST_FADE_WAIT + this.CAMERA_MOVE_DURATION;
        this.CAMERA_START_TIME = this.INITIAL_BLACK_DURATION + this.FADE_DURATION + this.POST_FADE_WAIT;

        this.scene = new THREE.Scene();
        const backgroundColor = 0x87CEFA;
        this.scene.background = new THREE.Color(backgroundColor);
        this.scene.fog = new THREE.Fog(backgroundColor, 30, 100);

        const radius = 25;
        const angle = 45;
        const verticalShift = 2;
        const rads = THREE.MathUtils.degToRad(angle);
        const y = radius * Math.cos(rads);
        const z = radius * Math.sin(rads);
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
        this.scene.add(this.camera);

        this.hudGroup = new THREE.Group();
        this.camera.add(this.hudGroup);

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

        this.finalPosition = this.camera.position.clone();
        this.finalLookAt = new THREE.Vector3(0, 0, (localPlayerId === 0) ? -verticalShift : verticalShift);
        this.introPosition = new THREE.Vector3(-22, 10, 0);
        this.introLookAt = new THREE.Vector3(0, 0, 0);

        this.camera.position.copy(this.introPosition);
        this.camera.lookAt(this.introLookAt);

        this.renderer = new THREE.WebGLRenderer({canvas: canvas, antialias: true, alpha: false});
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
        this.renderer.toneMappingExposure = 1.0;

        this.floorMaterial = new THREE.MeshStandardMaterial({color: 0xffffff, roughness: 0.5});
        this.paintedWoodMaterial = new THREE.MeshStandardMaterial({color: 0x4A2E1F, roughness: 0.4});
        
        this.p0DiscMaterial = new THREE.MeshStandardMaterial({ color: 0x1F3C6E, roughness: 0.6, metalness: 0.0 });
        this.p1DiscMaterial = new THREE.MeshStandardMaterial({ color: 0x8C1D18, roughness: 0.6, metalness: 0.0 });

        this.buildEnvironment();
        this.buildBoard();
        this.loadTable();
        this.setupLights();
        this.scene.add(this.nameGroup);
        this.initCountdownSprite();
        this.initHUD();
        this.rubberBand = new RubberBandVisuals(this.scene);
    }

    public updateVisuals(config: GameVisualConfig) {
        if (!config) return;

        this.p0DiscMaterial.color.set(config.p1Color); 
        this.p1DiscMaterial.color.set(config.p2Color); 
        this.paintedWoodMaterial.color.set(config.woodColor);
        this.floorMaterial.color.set(config.floorColor);
    }

    public dispose() {
        this.renderer.dispose();
        if (this.timerTexture) this.timerTexture.dispose();
        if (this.foulLeftTexture) this.foulLeftTexture.dispose();
        if (this.foulRightTexture) this.foulRightTexture.dispose();
        
        const cleanMaterial = (material: THREE.Material) => { material.dispose(); };
        const traverseAndClean = (obj: any) => {
            if (!obj) return;
            if (obj.geometry) obj.geometry.dispose();
            if (obj.material) {
                if (Array.isArray(obj.material)) obj.material.forEach(cleanMaterial);
                else cleanMaterial(obj.material);
            }
            if (obj.children) { for (const child of obj.children) traverseAndClean(child); }
        };
        traverseAndClean(this.scene);
        this.clearNameLabels();
        if (this.renderer.domElement && this.renderer.domElement.parentNode) {
            this.renderer.domElement.parentNode.removeChild(this.renderer.domElement);
        }
    }

    private initHUD() {
        const { mesh: tMesh, texture: tTex, ctx: tCtx } = this.createHUDElement("assets/timer_box.png", 434, 182);
        this.timerMesh = tMesh; this.timerTexture = tTex; this.timerCtx = tCtx;
        this.timerMesh.userData = { lastTime: -1 };
        this.hudGroup.add(this.timerMesh);

        const { mesh: fLMesh, texture: fLTex, ctx: fLCtx } = this.createHUDElement("assets/foul_box.png", 256, 256);
        this.foulLeftMesh = fLMesh; this.foulLeftTexture = fLTex; this.foulLeftCtx = fLCtx;
        this.foulLeftMesh.userData = { lastFoul: -1 };
        this.hudGroup.add(this.foulLeftMesh);

        const { mesh: fRMesh, texture: fRTex, ctx: fRCtx } = this.createHUDElement("assets/foul_box.png", 256, 256);
        this.foulRightMesh = fRMesh; this.foulRightTexture = fRTex; this.foulRightCtx = fRCtx;
        this.foulRightMesh.userData = { lastFoul: -1 };
        this.hudGroup.add(this.foulRightMesh);
        
        this.updateHUDText(this.timerCtx, this.timerTexture, "00:45", "white");
        this.updateHUDText(this.foulLeftCtx, this.foulLeftTexture, "0", "red");
        this.updateHUDText(this.foulRightCtx, this.foulRightTexture, "0", "red");
    }

    private createHUDElement(bgAssetPath: string, canvasW: number, canvasH: number) {
        const canvas = document.createElement("canvas");
        canvas.width = canvasW; canvas.height = canvasH; 
        const ctx = canvas.getContext("2d")!;
        const bgImg = AssetManager.getInstance().getTexture(bgAssetPath)?.image;
        (canvas as any)._bgImg = bgImg;
        const texture = new THREE.CanvasTexture(canvas);
        texture.minFilter = THREE.LinearFilter;
        const material = new THREE.MeshBasicMaterial({ map: texture, transparent: true, depthTest: false, depthWrite: false });
        const geometry = new THREE.PlaneGeometry(1, 1);
        const mesh = new THREE.Mesh(geometry, material);
        mesh.renderOrder = 9998;
        return { mesh, texture, ctx };
    }

    private updateHUDText(ctx: CanvasRenderingContext2D, texture: THREE.Texture, text: string, color: string) {
        const W = ctx.canvas.width; const H = ctx.canvas.height;
        ctx.clearRect(0, 0, W, H);
        const bgImg = (ctx.canvas as any)._bgImg;
        if (bgImg) ctx.drawImage(bgImg, 0, 0, W, H);
        else { ctx.fillStyle = "rgba(50,50,50,0.5)"; ctx.fillRect(0, 0, W, H); }
        ctx.fillStyle = color === "red" ? "#e74c3c" : "#ffffff";
        const fontSize = Math.floor(H * 0.55);
        ctx.font = `900 ${fontSize}px 'Nunito', sans-serif`;
        ctx.textAlign = "center"; ctx.textBaseline = "middle";
        ctx.shadowColor = "rgba(0,0,0,0.5)"; ctx.shadowBlur = 4;
        ctx.fillText(text, W / 2, H / 2 + (H * 0.05));
        ctx.shadowBlur = 0;
        texture.needsUpdate = true;
    }

    private formatTime(totalSeconds: number): string {
        const m = Math.floor(totalSeconds / 60);
        const s = totalSeconds % 60;
        const mStr = m < 10 ? "0" + m : m.toString();
        const sStr = s < 10 ? "0" + s : s.toString();
        return `${mStr}:${sStr}`;
    }

    public updateHUD(time: number, foulP0: number, foulP1: number) {
        if (this.timerMesh.userData.lastTime !== time) {
             const color = time <= 10 ? "#ff6b6b" : "white";
             this.updateHUDText(this.timerCtx, this.timerTexture, this.formatTime(time), color);
             this.timerMesh.userData.lastTime = time;
        }
        if (this.foulLeftMesh.userData.lastFoul !== foulP0) {
            this.updateHUDText(this.foulLeftCtx, this.foulLeftTexture, foulP0.toString(), "red");
            this.foulLeftMesh.userData.lastFoul = foulP0;
        }
        if (this.foulRightMesh.userData.lastFoul !== foulP1) {
            this.updateHUDText(this.foulRightCtx, this.foulRightTexture, foulP1.toString(), "red");
            this.foulRightMesh.userData.lastFoul = foulP1;
        }
    }

    private clearNameLabels() {
        while(this.nameGroup.children.length > 0) { 
            const obj = this.nameGroup.children[0];
            if ((obj as THREE.Mesh).material) {
                const m = (obj as THREE.Mesh).material as THREE.MeshStandardMaterial;
                if (m.map) m.map.dispose();
                m.dispose();
            }
            if ((obj as THREE.Mesh).geometry) (obj as THREE.Mesh).geometry.dispose();
            this.nameGroup.remove(obj);
        }
    }
    
    public updatePlayerInfo(p0: PlayerProfile, p1: PlayerProfile) {
        this.clearNameLabels();
        this.createLabelForPlayer(p0, 0, "#1F3C6E");
        this.createLabelForPlayer(p1, 1, "#8C1D18");
    }

    private createLabelForPlayer(profile: PlayerProfile, playerId: number, color: string) {
        const W = 1024; const H = 256;
        const canvas = document.createElement('canvas');
        canvas.width = W; canvas.height = H;
        const ctx = canvas.getContext('2d')!;
        const texture = new THREE.CanvasTexture(canvas);
        texture.minFilter = THREE.LinearFilter; texture.anisotropy = 16;
        const updateTexture = () => { texture.needsUpdate = true; };
        const hasTeam = profile.team && profile.team.name && profile.team.name !== strings.menu.team_none && profile.team.name !== "None";

        const drawCanvas = (img: HTMLImageElement | null) => {
            ctx.clearRect(0, 0, W, H); ctx.save();
            const centerX = W / 2; const centerY = H / 2 + 20;
            if (hasTeam) {
                const iconSize = 100; const iconBorder = 8; const iconTotalWidth = iconSize + (iconBorder * 2);
                const gap = 30; const centerY = H / 2 + 20;
                let nameSize = 70; if (profile.name.length > 12) nameSize = 50;
                const nameFont = `900 ${nameSize}px 'Nunito', sans-serif`;
                ctx.font = nameFont; const nameWidth = ctx.measureText(profile.name).width;
                let teamNameSize = 35; if (profile.team!.name.length > 15) teamNameSize = 25;
                const teamFont = `800 ${teamNameSize}px 'Nunito', sans-serif`;
                ctx.font = teamFont; const teamWidth = ctx.measureText(profile.team!.name).width;
                const textBlockWidth = Math.max(nameWidth, teamWidth); const totalGroupWidth = iconTotalWidth + gap + textBlockWidth;
                const startX = (W - totalGroupWidth) / 2;
                const iconCenterX = startX + (iconTotalWidth / 2); const textStartX = startX + iconTotalWidth + gap;

                ctx.beginPath(); ctx.arc(iconCenterX, centerY, iconSize / 2 + iconBorder, 0, 2 * Math.PI);
                ctx.fillStyle = "white"; ctx.fill(); ctx.lineWidth = 5; ctx.strokeStyle = "#dfe6e9"; ctx.stroke();
                if (img) {
                    ctx.save(); ctx.beginPath(); ctx.arc(iconCenterX, centerY, iconSize / 2, 0, 2 * Math.PI);
                    ctx.clip(); ctx.drawImage(img, iconCenterX - iconSize / 2, centerY - iconSize / 2, iconSize, iconSize);
                    ctx.restore();
                } else {
                     ctx.fillStyle = "#dfe6e9"; ctx.font = "900 40px 'Nunito', sans-serif";
                     ctx.textAlign = "center"; ctx.textBaseline = "middle"; ctx.fillText("?", iconCenterX, centerY);
                }
                ctx.textAlign = "left"; ctx.textBaseline = "bottom"; 
                ctx.fillStyle = color; ctx.font = nameFont; ctx.fillText(profile.name, textStartX, centerY + 5);
                ctx.textBaseline = "top"; ctx.fillStyle = "#636e72"; ctx.font = teamFont;
                ctx.fillText(profile.team!.name, textStartX, centerY + 10);
            } else {
                ctx.textAlign = "center"; ctx.textBaseline = "middle"; ctx.fillStyle = color;
                let nameSize = 90; if (profile.name.length > 12) nameSize = 70;
                ctx.font = `900 ${nameSize}px 'Nunito', sans-serif`;
                ctx.fillText(profile.name, centerX, centerY);
            }
            ctx.restore(); updateTexture();
        };

        drawCanvas(null);
        if (hasTeam && profile.team!.icon) {
            const img = new Image(); img.crossOrigin = "Anonymous"; img.src = `assets/avatars/${profile.team!.icon}`;
            img.onload = () => { drawCanvas(img); }; img.onerror = () => { drawCanvas(null); };
        }
        const mat = new THREE.MeshBasicMaterial({ map: texture, transparent: true, side: THREE.DoubleSide });
        const width = 8.8; const height = width * (H / W);
        const geo = new THREE.PlaneGeometry(width, height);
        const mesh = new THREE.Mesh(geo, mat);
        const yPos = 0.12; const zPos = 8.8;
        if (playerId === 0) { mesh.position.set(0, yPos, -zPos); mesh.rotation.x = -Math.PI / 2; }
        else { mesh.position.set(0, yPos, zPos); mesh.rotation.x = -Math.PI / 2; mesh.rotation.z = Math.PI; }
        this.nameGroup.add(mesh);
    }

    resize(width: number, height: number) {
        this.renderer.setSize(width, height, false);
        const aspect = width / height;
        [this.camera0, this.camera1].forEach(cam => {
            cam.aspect = aspect; cam.fov = aspect < 0.6 ? 40 * (0.6 / aspect) : 40; cam.updateProjectionMatrix();
        });
        const dist = 10; const vFOV = THREE.MathUtils.degToRad(this.camera.fov);
        const visibleHeight = 2 * Math.tan(vFOV / 2) * dist; const visibleWidth = visibleHeight * aspect;
        const hudY = (visibleHeight / 2) - 0.45; const hudZ = -dist;
        const baseH = 0.8; const timerAspect = 434 / 182;
        this.timerMesh.position.set(0, hudY, hudZ); this.timerMesh.scale.set(baseH * timerAspect, baseH, 1);
        const minOffset = (baseH * timerAspect * 0.5) + (baseH * 0.5) + 0.2;
        const xOffset = Math.max(minOffset, visibleWidth * 0.35); 
        this.foulLeftMesh.position.set(-xOffset, hudY, hudZ); this.foulLeftMesh.scale.set(baseH, baseH, 1);
        this.foulRightMesh.position.set(xOffset, hudY, hudZ); this.foulRightMesh.scale.set(baseH, baseH, 1);
        if (visibleWidth < 6) {
             const smallScale = 0.8;
             this.timerMesh.scale.multiplyScalar(smallScale);
             this.foulLeftMesh.scale.multiplyScalar(smallScale);
             this.foulRightMesh.scale.multiplyScalar(smallScale);
             const smallMinOffset = (baseH * smallScale * timerAspect * 0.5) + (baseH * smallScale * 0.5) + 0.1;
             this.foulLeftMesh.position.x = -Math.max(smallMinOffset, visibleWidth * 0.35);
             this.foulRightMesh.position.x = Math.max(smallMinOffset, visibleWidth * 0.35);
        }
    }

    private loadTable() {
        const gltf = AssetManager.getInstance().getGLTF("assets/table.glb");
        if (gltf) {
            const object = gltf.scene; const box = new THREE.Box3().setFromObject(object);
            const size = box.getSize(new THREE.Vector3()); const center = box.getCenter(new THREE.Vector3());
            const targetWidth = BOARD.WIDTH * 1.3;
            if (size.x > 0) {
                const scale = targetWidth / size.x;
                object.scale.set(scale, scale, scale); object.position.x = -center.x * scale;
                object.position.z = -center.z * scale;
                const boardBottomY = -BOARD.BASE_THICKNESS / 2; const tableTopY = box.max.y * scale;
                object.position.y = boardBottomY - tableTopY;
                object.traverse((child: any) => {
                    if (child.isMesh) {
                        child.castShadow = false; child.receiveShadow = true;
                        const mesh = child as THREE.Mesh;
                        if (mesh.material) {
                            const materials = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
                            materials.forEach(mat => { if (mat instanceof THREE.MeshStandardMaterial) { mat.metalness = 0.1; mat.roughness = 0.6; } });
                        }
                    }
                });
                this.scene.add(object);
            }
        }
    }

    createPulis(pulis: PuliState[]) {
        const points: THREE.Vector2[] = [];
        const rOuter = PULI.RADIUS; const h = PULI.HEIGHT; const hCenter = 0.15;
        points.push(new THREE.Vector2(0.0, 0.0)); points.push(new THREE.Vector2(rOuter - 0.05, 0.0));
        points.push(new THREE.Vector2(rOuter, 0.05)); points.push(new THREE.Vector2(rOuter, h - 0.05));
        points.push(new THREE.Vector2(rOuter - 0.05, h)); points.push(new THREE.Vector2(0.35, h));
        const rRimInner = 0.35; const rFlatCenter = 0.05; const steps = 12;
        for (let i = 0; i <= steps; i++) {
            const t = i / steps; const r = rRimInner - t * (rRimInner - rFlatCenter);
            const y = hCenter + (h - hCenter) * Math.pow(1 - t, 2.0); points.push(new THREE.Vector2(r, y));
        }
        points.push(new THREE.Vector2(0.0, hCenter));
        const puliGeo = new THREE.LatheGeometry(points, 64);
        
        this.p0DiscMaterial.vertexColors = true;
        this.p1DiscMaterial.vertexColors = true;

        const count = puliGeo.attributes.position.count; const colors = new Float32Array(count * 3);
        const pos = puliGeo.attributes.position;
        for (let i = 0; i < count; i++) {
            const x = pos.getX(i); const z = pos.getZ(i); const y = pos.getY(i);
            const r = Math.sqrt(x * x + z * z); let intensity = 1.0;
            if (r < rRimInner && y < h - 0.01) {
                const t = (r - rFlatCenter) / (rRimInner - rFlatCenter);
                let factor = Math.max(0, Math.min(1, t)); intensity = 0.95 + 0.05 * Math.pow(factor, 0.5);
            }
            colors[i * 3] = intensity; colors[i * 3 + 1] = intensity; colors[i * 3 + 2] = intensity;
        }
        puliGeo.setAttribute('color', new THREE.BufferAttribute(colors, 3));

        for (let puli of pulis) {
            const material = (puli.owner === 1) ? this.p1DiscMaterial : this.p0DiscMaterial;
            const mesh = new THREE.Mesh(puliGeo, material);
            mesh.castShadow = true; mesh.receiveShadow = true;
            this.scene.add(mesh); this.puliMeshes.set(puli.id, mesh);
        }
    }

    private initCountdownSprite() {
        this.countdownCanvas = document.createElement('canvas');
        this.countdownCanvas.width = 512; this.countdownCanvas.height = 256;
        this.countdownContext = this.countdownCanvas.getContext('2d')!;
        const texture = new THREE.CanvasTexture(this.countdownCanvas);
        texture.minFilter = THREE.LinearFilter;
        const material = new THREE.SpriteMaterial({ map: texture, transparent: true, opacity: 0, depthTest: false });
        this.countdownSprite = new THREE.Sprite(material);
        this.countdownSprite.position.set(0, 0, -10);
        this.countdownSprite.scale.set(4, 2, 1);
        this.countdownSprite.renderOrder = 999;
        this.camera.add(this.countdownSprite);
    }

    private updateCountdown(visualTimeMs: number) {
        if (visualTimeMs < this.TOTAL_INTRO_DURATION) {
            this.countdownSprite.visible = false;
            return;
        }

        const countdownTime = visualTimeMs - this.TOTAL_INTRO_DURATION;
        const totalCountdown = this.COUNTDOWN_DURATION;
        const goPhaseTime = countdownTime - totalCountdown;

        if (goPhaseTime >= 0) {
            if (goPhaseTime < this.GO_SIGNAL_DURATION) {
                if (this.currentCountdownText !== strings.countdown.go) {
                    this.currentCountdownText = strings.countdown.go;
                    this.drawCountdownText(strings.countdown.go, 1.0);
                }
                
                const t = goPhaseTime / this.GO_SIGNAL_DURATION;
                
                let scale = 1.0;
                let opacity = 1.0;

                if (t < 0.2) {
                    const popT = t / 0.2;
                    scale = 0.5 + 0.6 * Math.sin(popT * Math.PI / 2);
                } else if (t < 0.6) {
                    scale = 1.1;
                    opacity = 1.0;
                } else {
                    const fadeT = (t - 0.6) / 0.4;
                    scale = 1.1 + (0.1 * fadeT);
                    opacity = 1.0 - fadeT;
                }

                this.countdownSprite.visible = true;
                this.countdownSprite.material.opacity = Math.max(0, opacity);
                const scaleBase = 4;
                this.countdownSprite.scale.set(scaleBase * scale, (scaleBase / 2) * scale, 1);
            } else {
                this.countdownSprite.visible = false;
            }
            return;
        }

        this.countdownSprite.visible = true;
        let text = "";
        let phaseTime = 0;

        const steps = 3;
        const stepDuration = totalCountdown / steps;

        if (countdownTime < stepDuration) {
            text = strings.countdown.step_3;
            phaseTime = countdownTime / stepDuration;
        } else if (countdownTime < stepDuration * 2) {
            text = strings.countdown.step_2;
            phaseTime = (countdownTime - stepDuration) / stepDuration;
        } else {
            text = strings.countdown.step_1;
            phaseTime = (countdownTime - stepDuration * 2) / stepDuration;
        }

        if (this.currentCountdownText !== text) {
            this.currentCountdownText = text;
            this.drawCountdownText(text, 1.0);
        }

        const scaleBase = 4;
        let scale = 1.0;
        let opacity = 1.0;

        if (phaseTime < 0.2) {
            const t = phaseTime / 0.2;
            scale = 0.5 + 0.7 * Math.sin(t * Math.PI / 2);
            opacity = t;
        } else {
            const t = (phaseTime - 0.2) / 0.8;
            scale = 1.2 - 0.2 * t;
            if (t > 0.8) {
                opacity = 1.0 - ((t - 0.8) * 5.0);
            }
        }
        
        this.countdownSprite.scale.set(scaleBase * scale, (scaleBase / 2) * scale, 1);
        this.countdownSprite.material.opacity = Math.max(0, opacity);
    }

    private drawCountdownText(text: string, alpha: number) {
        const ctx = this.countdownContext;
        const w = this.countdownCanvas.width;
        const h = this.countdownCanvas.height;
        ctx.clearRect(0, 0, w, h);
        ctx.globalAlpha = alpha;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        const orangeColor = "#ff6600";
        const grayStroke = "#2d3436";

        if (text === strings.countdown.go) {
            ctx.font = "900 90px 'Nunito', sans-serif";
            ctx.fillStyle = orangeColor; ctx.strokeStyle = grayStroke; ctx.lineWidth = 4;
        } else {
            ctx.font = "900 160px 'Nunito', sans-serif";
            ctx.fillStyle = orangeColor; ctx.strokeStyle = grayStroke; ctx.lineWidth = 6;
        }
        ctx.lineJoin = "round";
        ctx.strokeText(text, w / 2, h / 2);
        ctx.fillText(text, w / 2, h / 2);
        if (this.countdownSprite.material.map) this.countdownSprite.material.map.needsUpdate = true;
    }

    private updateAnimationState(visualTimeMs: number) {
        const elapsed = visualTimeMs;
        if (elapsed < this.INITIAL_BLACK_DURATION) {
            this.fadeOverlay.visible = true;
            (this.fadeOverlay.material as THREE.MeshBasicMaterial).opacity = 1.0;
        } else if (elapsed < this.INITIAL_BLACK_DURATION + this.FADE_DURATION) {
            this.fadeOverlay.visible = true;
            const fadeElapsed = elapsed - this.INITIAL_BLACK_DURATION;
            const t = fadeElapsed / this.FADE_DURATION;
            (this.fadeOverlay.material as THREE.MeshBasicMaterial).opacity = 1.0 - t;
        } else {
            this.fadeOverlay.visible = false;
        }

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
        }
    }

    draw(pulis: PuliState[], logicalTimeMs: number) {
        this.updateAnimationState(logicalTimeMs);
        this.updateCountdown(logicalTimeMs);

        for (const p of pulis) {
            const mesh = this.puliMeshes.get(p.id);
            if (mesh) mesh.position.set(p.x, 0.1, p.y);
        }
        this.rubberBand.update(pulis);
        this.renderer.render(this.scene, this.camera);
    }

    public setFoulIndicator(side: number) {
        if (!this.foulIndicator) return;
        if (side === 0) {
            this.foulIndicator.visible = false;
            (this.foulIndicator.material as THREE.Material).opacity = 0.0;
        } else {
            this.foulIndicator.visible = true;
            (this.foulIndicator.material as THREE.Material).opacity = 0.5;
            const zOffset = (BOARD.SLAT_WIDTH / 2 + 0.02) * side;
            this.foulIndicator.position.z = zOffset;
        }
    }

    private buildEnvironment() {
        const floorGeo = new THREE.PlaneGeometry(300, 300);
        const floorMat = new THREE.MeshStandardMaterial({ color: 0xffe066, roughness: 1.0, metalness: 0.0 });
        const floor = new THREE.Mesh(floorGeo, floorMat);
        floor.rotation.x = -Math.PI / 2; floor.position.y = -8.0; floor.receiveShadow = true;
        this.scene.add(floor);
        const gridSize = 300; const gridDivisions = 60; const gridColor = 0x808080;
        const gridHelper = new THREE.GridHelper(gridSize, gridDivisions, gridColor, gridColor);
        gridHelper.position.y = -7.9;
        const gridMat = gridHelper.material as THREE.Material; gridMat.transparent = true; gridMat.opacity = 0.4;
        this.scene.add(gridHelper);
    }

    private buildBoard() {
        const boardGroup = new THREE.Group();
        const posY = BOARD.BASE_THICKNESS / 2 + BOARD.SLAT_HEIGHT / 2;
        const baseGeo = new RoundedBoxGeometry(BOARD.WIDTH, BOARD.BASE_THICKNESS, BOARD.HEIGHT, 4, BOARD.BEVEL_SIZE);
        
        const baseMesh = new THREE.Mesh(baseGeo, this.floorMaterial);
        baseMesh.receiveShadow = true; baseMesh.castShadow = true;
        boardGroup.add(baseMesh);

        const borderConfigs: { mesh: THREE.Mesh, w: number, d: number }[] = [];
        let bridgeMesh: THREE.Mesh | null = null;
        
        const topGeo = new RoundedBoxGeometry(BOARD.WIDTH, BOARD.SLAT_HEIGHT, BOARD.SLAT_WIDTH, 4, BOARD.BEVEL_SIZE);
        const topSlat = new THREE.Mesh(topGeo, this.paintedWoodMaterial);
        topSlat.position.set(0, posY, -BOARD.HEIGHT / 2 + BOARD.SLAT_WIDTH / 2);
        topSlat.castShadow = true; topSlat.receiveShadow = true;
        boardGroup.add(topSlat); borderConfigs.push({mesh: topSlat, w: BOARD.WIDTH, d: BOARD.SLAT_WIDTH});
        
        const botSlat = new THREE.Mesh(topGeo, this.paintedWoodMaterial);
        botSlat.position.set(0, posY, BOARD.HEIGHT / 2 - BOARD.SLAT_WIDTH / 2);
        botSlat.castShadow = true; botSlat.receiveShadow = true;
        boardGroup.add(botSlat); borderConfigs.push({mesh: botSlat, w: BOARD.WIDTH, d: BOARD.SLAT_WIDTH});
        
        const sideH = BOARD.HEIGHT - 2 * BOARD.SLAT_WIDTH;
        const sideGeo = new RoundedBoxGeometry(BOARD.SLAT_WIDTH, BOARD.SLAT_HEIGHT, sideH, 4, BOARD.BEVEL_SIZE);
        const leftSlat = new THREE.Mesh(sideGeo, this.paintedWoodMaterial);
        leftSlat.position.set(-BOARD.WIDTH / 2 + BOARD.SLAT_WIDTH / 2, posY, 0);
        leftSlat.castShadow = true; leftSlat.receiveShadow = true;
        boardGroup.add(leftSlat); borderConfigs.push({mesh: leftSlat, w: BOARD.SLAT_WIDTH, d: sideH});
        
        const rightSlat = new THREE.Mesh(sideGeo, this.paintedWoodMaterial);
        rightSlat.position.set(BOARD.WIDTH / 2 - BOARD.SLAT_WIDTH / 2, posY, 0);
        rightSlat.castShadow = true; rightSlat.receiveShadow = true;
        boardGroup.add(rightSlat); borderConfigs.push({mesh: rightSlat, w: BOARD.SLAT_WIDTH, d: sideH});

        const shapeH = BOARD.SLAT_HEIGHT - 2 * BOARD.BEVEL_SIZE; const shapeD = BOARD.SLAT_WIDTH - 2 * BOARD.BEVEL_SIZE;
        const innerWidth = BOARD.WIDTH - 2 * BOARD.SLAT_WIDTH; const shapeW = innerWidth - 2 * BOARD.BEVEL_SIZE;
        const shape = new THREE.Shape(); const center = shapeW / 2; const holeHalfWidth = BOARD.TUNNEL_WIDTH / 2;
        shape.moveTo(0, 0); shape.lineTo(center - holeHalfWidth, 0); shape.lineTo(center - holeHalfWidth, BOARD.TUNNEL_HEIGHT);
        shape.lineTo(center + holeHalfWidth, BOARD.TUNNEL_HEIGHT); shape.lineTo(center + holeHalfWidth, 0);
        shape.lineTo(shapeW, 0); shape.lineTo(shapeW, shapeH); shape.lineTo(0, shapeH); shape.lineTo(0, 0);
        const extrudeSettings = { steps: 1, depth: shapeD, bevelEnabled: true, bevelThickness: BOARD.BEVEL_SIZE, bevelSize: BOARD.BEVEL_SIZE, bevelSegments: 4 };
        const middleGeometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);
        middleGeometry.center(); 
        bridgeMesh = new THREE.Mesh(middleGeometry, this.paintedWoodMaterial);
        bridgeMesh.position.set(0, posY, 0); bridgeMesh.castShadow = true; bridgeMesh.receiveShadow = true;
        boardGroup.add(bridgeMesh);

        const foulGeo = new THREE.PlaneGeometry(BOARD.TUNNEL_WIDTH, BOARD.TUNNEL_HEIGHT + 0.1);
        const foulMat = new THREE.MeshBasicMaterial({ color: 0xff0000, transparent: true, opacity: 0.0, side: THREE.DoubleSide, depthWrite: false });
        this.foulIndicator = new THREE.Mesh(foulGeo, foulMat);
        this.foulIndicator.position.set(0, BOARD.BASE_THICKNESS/2 + BOARD.TUNNEL_HEIGHT/2, 0);
        this.foulIndicator.visible = false; boardGroup.add(this.foulIndicator);

        const logoHeight = 0.6; const logoGeo = new THREE.PlaneGeometry(1, 1);
        const logoMat = new THREE.MeshStandardMaterial({ transparent: true, roughness: 0.5, metalness: 0.0, polygonOffset: true, polygonOffsetFactor: -1, polygonOffsetUnits: -1 });
        const logoMesh = new THREE.Mesh(logoGeo, logoMat);
        logoMesh.position.set(-BOARD.WIDTH / 2 - 0.005, posY, 0); logoMesh.rotation.y = -Math.PI / 2;
        logoMesh.visible = false; boardGroup.add(logoMesh);

        const gltf = AssetManager.getInstance().getGLTF("assets/wood.glb");
        if (gltf) {
            let foundMaterial: any = null;
            gltf.scene.traverse((child: any) => {
                if (child.isMesh && !foundMaterial) {
                    const mesh = child as THREE.Mesh; const material = mesh.material;
                    const mat = Array.isArray(material) ? material[0] : material;
                    if (mat instanceof THREE.MeshStandardMaterial) foundMaterial = mat;
                }
            });
            if (foundMaterial && foundMaterial.map) {
                const standardMat = foundMaterial as THREE.MeshStandardMaterial;
                const originalTexture = standardMat.map;
                if (originalTexture) {
                    const TEXTURE_DENSITY = 0.2;
                    const localTexture = originalTexture.clone();
                    localTexture.wrapS = THREE.RepeatWrapping; localTexture.wrapT = THREE.RepeatWrapping;
                    
                    this.paintedWoodMaterial.map = localTexture;
                    this.paintedWoodMaterial.needsUpdate = true;
                    
                    localTexture.repeat.set(BOARD.WIDTH * TEXTURE_DENSITY, BOARD.HEIGHT * TEXTURE_DENSITY); 
                }
            }
        }
        const tex = AssetManager.getInstance().getTexture("assets/poliorkia_wood.png");
        if (tex) {
            tex.encoding = THREE.sRGBEncoding; const aspect = tex.image.width / tex.image.height;
            logoMesh.scale.set(logoHeight * aspect, logoHeight, 1); logoMat.map = tex; logoMat.needsUpdate = true; logoMesh.visible = true;
        }
        
        const nailGeo = new THREE.CylinderGeometry(NAIL.RADIUS, NAIL.RADIUS, NAIL.HEIGHT, 16);
        const nailMat = new THREE.MeshStandardMaterial({color: NAIL.COLOR, roughness: 0.4, metalness: 0.7});
        for (const pos of NAILS_POSITIONS) {
            const nail = new THREE.Mesh(nailGeo, nailMat);
            nail.position.set(pos.x, BOARD.BASE_THICKNESS / 2 + NAIL.HEIGHT / 2, pos.y);
            nail.castShadow = true; nail.receiveShadow = true; boardGroup.add(nail);
        }
        this.scene.add(boardGroup);
    }

    private setupLights() {
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.5); this.scene.add(ambientLight);
        const hemiLight = new THREE.HemisphereLight(0xffffff, 0x444444, 0.6); this.scene.add(hemiLight);
        const dirLight = new THREE.DirectionalLight(0xffffff, 1.5);
        dirLight.position.set(0, 20, 0); dirLight.castShadow = true;
        dirLight.shadow.mapSize.width = 2048; dirLight.shadow.mapSize.height = 2048;
        this.scene.add(dirLight);
    }
}

