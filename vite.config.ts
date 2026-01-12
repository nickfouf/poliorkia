import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
  resolve: {
    alias: {
      // Maps imports of "netplayjs" to the local index file
      'netplayjs': path.resolve(__dirname, './netplay/src/index.ts')
    }
  }
});

