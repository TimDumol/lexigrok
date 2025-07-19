/// <reference types="vitest/config" />
import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"
import tailwindcss from '@tailwindcss/vite'


export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://backend:9933',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
      '/images': {
        target: 'http://minio:9000', // Minio endpoint
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/images/, '/lexigrok-images'), // Assumes bucket is named 'lexigrok-images'
      }
    }
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/test/setup.ts',
  },
})
