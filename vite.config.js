import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({

  plugins: [react()],
  server: {
    port: 6606,
    https: false,
    proxy: {
      '/api': {
        target: 'http://localhost:6600',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\//, ""),
      }
    }
  }
})
