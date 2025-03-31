import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@context": path.resolve(__dirname, "./src/context"),
      "@proto": path.resolve(__dirname, "./src/proto"),
      "@components": path.resolve(__dirname, "./src/component"),
    },
  },
})
