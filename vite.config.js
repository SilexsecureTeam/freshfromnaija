import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react({
    // ensures React Fast Refresh + overlay are enabled
    fastRefresh: false
  })],
  clearScreen: false,               // ← don’t clear the console
  optimizeDeps: {
    include: ['recharts']
  }
})
