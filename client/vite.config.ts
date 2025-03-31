import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@context": path.resolve(__dirname, "./src/context"),
      "@grpc": path.resolve(__dirname, "./src/grpc"),
      "@components": path.resolve(__dirname, "./src/component"),
    },
  },
})
