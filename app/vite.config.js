import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Serve the /assets/ folder from project root as static files
  // accessible at e.g. /characters/baby/master/baby_master_v1.png
  publicDir: resolve(__dirname, '../assets'),
  server: {
    host: true,       // expose on all network interfaces
    port: 5173,
    open: false,
  },
})
