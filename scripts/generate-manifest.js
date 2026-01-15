// poliorkia/scripts/generate-assets.js
import fs from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration
const PUBLIC_DIR = path.join(__dirname, '../public');
const ASSETS_DIR = path.join(PUBLIC_DIR, 'assets');

// --- CHANGE: Output inside 'public' so Vite copies it to 'dist' ---
const OUTPUT_FILE = path.join(PUBLIC_DIR, 'assets-manifest.json');

function getAllFiles(dirPath, arrayOfFiles = {}) {
    let files;
    try {
        files = fs.readdirSync(dirPath);
    } catch (e) {
        console.error(`Could not read directory: ${dirPath}`);
        return arrayOfFiles;
    }

    files.forEach((file) => {
        const fullPath = path.join(dirPath, file);

        if (fs.statSync(fullPath).isDirectory()) {
            getAllFiles(fullPath, arrayOfFiles);
        } else {
            // Relative to /public, so paths start with "assets/..."
            let relativePath = path
                .relative(PUBLIC_DIR, fullPath)
                .replace(/\\/g, '/');

            if (
                !relativePath.includes('DS_Store') &&
                !relativePath.includes('assets-manifest.json') &&
                !relativePath.includes('.git')
            ) {
                arrayOfFiles[relativePath] = fs.statSync(fullPath).size;
            }
        }
    });

    return arrayOfFiles;
}

try {
    console.log(`Scanning directory: ${ASSETS_DIR}`);
    const fileMap = getAllFiles(ASSETS_DIR);

    const jsonOutput = {
        generatedAt: new Date().toISOString(),
        files: fileMap
    };

    fs.writeFileSync(OUTPUT_FILE, JSON.stringify(jsonOutput, null, 2));
    console.log(`\nManifest generated at: ${OUTPUT_FILE}`);
    console.log(`Total files tracked: ${Object.keys(fileMap).length}`);
} catch (err) {
    console.error("Error generating manifest:", err);
}



