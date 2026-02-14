import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/tu-repo/',
  
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
  },
})