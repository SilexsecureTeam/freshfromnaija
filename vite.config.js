// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react({ fastRefresh: false })],
  clearScreen: false,
  optimizeDeps: {
    include: ['recharts'],
  },

  // ←— This makes `vite preview` serve index.html on all non-file URLs
  preview: {
    historyApiFallback: true,
  },
})
