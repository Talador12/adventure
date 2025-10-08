import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  publicDir: 'assets', // Use 'assets' for static files instead of default 'public'
  build: {
    outDir: 'public',
    emptyOutDir: false, // Don't delete _worker.js
  },
})
