import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/san_valentin_card/',
  
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
  },
})