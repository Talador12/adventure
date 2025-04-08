import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 8080, // or any port you like
    strictPort: true, // fail if it's taken instead of switching
  },
})
