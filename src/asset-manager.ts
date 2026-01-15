import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { REQUIRED_ASSETS } from "./assets-list";

export class AssetManager {
    private static instance: AssetManager;

    // Asset Storage
    private textures: Map<string, THREE.Texture> = new Map();
    private gltfs: Map<string, any> = new Map();

    // Loading State
    private manifest: Record<string, number> = {};
    private fileProgress: Map<string, number> = new Map();
    private totalRequiredBytes: number = 0;
    private currentLoadedBytes: number = 0;

    private constructor() {}

    public static getInstance(): AssetManager {
        if (!AssetManager.instance) {
            AssetManager.instance = new AssetManager();
        }
        return AssetManager.instance;
    }

    /**
     * Loads the manifest, filters for required assets, calculates total size,
     * and downloads everything with a progress callback.
     */
    public async preloadAll(onProgress: (loaded: number, total: number) => void): Promise<void> {
        // 1. Fetch Manifest
        try {
            // --- CHANGE: Remove leading slash for relative fetching ---
            const response = await fetch('assets-manifest.json');
            if (response.ok) {
                const data = await response.json();
                this.manifest = data.files;
            } else {
                console.warn("assets-manifest.json not found. Progress calculation will be estimated.");
            }
        } catch (e) {
            console.warn("Failed to load asset manifest", e);
        }

        // 2. Calculate Total Size based ONLY on REQUIRED_ASSETS
        this.totalRequiredBytes = 0;
        const assetsToLoad: string[] = [];

        for (const path of REQUIRED_ASSETS) {
            if (this.manifest[path]) {
                this.totalRequiredBytes += this.manifest[path];
                assetsToLoad.push(path);
            } else {
                console.warn(`Asset listed in assets-list.ts but not found in manifest: ${path}. It will still be loaded.`);
                // We assume 0 bytes initially if missing from manifest to avoid breaking math
                assetsToLoad.push(path);
            }
        }

        // 3. Load all assets in parallel
        const promises = assetsToLoad.map(path => this.loadSingleAsset(path, onProgress));
        await Promise.all(promises);
    }

    private async loadSingleAsset(path: string, onProgress: (l: number, t: number) => void): Promise<void> {
        return new Promise((resolve, reject) => {
            const loader = new THREE.FileLoader();
            loader.setResponseType('blob');

            loader.load(
                path,
                async (blob) => {
                    // Update progress to 100% for this file
                    const size = this.manifest[path] || (blob instanceof Blob ? blob.size : 0);
                    this.updateProgress(path, size, onProgress);

                    // Parse the blob
                    const objectUrl = URL.createObjectURL(blob as any);

                    try {
                        if (path.endsWith('.glb') || path.endsWith('.gltf')) {
                            await this.parseGLTF(path, objectUrl);
                        } else if (path.match(/\.(png|jpg|jpeg)$/)) {
                            await this.parseTexture(path, objectUrl);
                        }
                    } catch (e) {
                        console.error(`Error parsing ${path}`, e);
                    } finally {
                        resolve();
                    }
                },
                (event) => {
                    if (event.lengthComputable) {
                        // Use manifest size if available for stability, otherwise event.total
                        // (Browsers sometimes report compressed vs uncompressed size differently)
                        const total = this.manifest[path] || event.total;
                        this.updateProgress(path, event.loaded, onProgress);
                    }
                },
                (err) => {
                    console.error(`Error loading asset: ${path}`, err);
                    // Resolve anyway to allow the game to try starting even if one asset fails
                    resolve();
                }
            );
        });
    }

    private updateProgress(path: string, loadedAmount: number, callback: (l: number, t: number) => void) {
        this.fileProgress.set(path, loadedAmount);

        let sum = 0;
        this.fileProgress.forEach(val => sum += val);
        this.currentLoadedBytes = sum;

        // Visual Clamp: don't show > 100% if manifest was slightly off
        if (this.totalRequiredBytes > 0 && this.currentLoadedBytes > this.totalRequiredBytes) {
            this.currentLoadedBytes = this.totalRequiredBytes;
        }

        callback(this.currentLoadedBytes, this.totalRequiredBytes);
    }

    // --- Parsing Wrappers ---

    private parseGLTF(originalPath: string, blobUrl: string): Promise<void> {
        return new Promise((resolve) => {
            const loader = new GLTFLoader();
            loader.load(blobUrl, (gltf) => {
                this.gltfs.set(originalPath, gltf);
                URL.revokeObjectURL(blobUrl);
                resolve();
            }, undefined, (err) => {
                console.error(`GLTF Parse error for ${originalPath}`, err);
                resolve(); // resolve to keep going
            });
        });
    }

    private parseTexture(originalPath: string, blobUrl: string): Promise<void> {
        return new Promise((resolve) => {
            const loader = new THREE.TextureLoader();
            loader.load(blobUrl, (tex) => {
                this.textures.set(originalPath, tex);
                URL.revokeObjectURL(blobUrl);
                resolve();
            }, undefined, (err) => {
                console.error(`Texture Parse error for ${originalPath}`, err);
                resolve();
            });
        });
    }

    // --- Public Getters ---

    public getGLTF(path: string): any {
        const asset = this.gltfs.get(path);
        if (!asset) {
            console.error(`AssetManager: GLTF not found (did you add it to REQUIRED_ASSETS?): ${path}`);
            return null;
        }
        // IMPORTANT: We must clone the scene so we can add it to the graph multiple times if needed,
        // or modify it without affecting the cached version.
        // However, animations/cameras in the root might need deep cloning.
        // For static props, cloning scene is usually enough.
        const clone = { ...asset, scene: asset.scene.clone() };
        return clone;
    }

    public getTexture(path: string): THREE.Texture | null {
        const tex = this.textures.get(path);
        if (!tex) {
            console.error(`AssetManager: Texture not found: ${path}`);
            return null;
        }
        return tex;
    }
}



