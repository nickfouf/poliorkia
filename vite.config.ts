import { defineConfig } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';

// Fix for __dirname in ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  resolve: {
    alias: {
      // Force 'netplayjs' imports to point to your local source file
      'netplayjs': path.resolve(__dirname, './netplay/src/index.ts')
    }
  },
  optimizeDeps: {
    // Critical: Tell Vite to NEVER bundle this, serving source files directly
    exclude: ['netplayjs']
  },
  server: {
    // Ensure file watcher catches changes in this folder
    watch: {
      ignored: ['!**/netplay/src/**']
    },
    host: '0.0.0.0', // listen on all network interfaces
    port: 5173,      // or whatever port you want
  },
    build: {
        outDir: '../dist', // <-- your custom output directory
    }
});

