import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import { dir } from 'console'
import { resolve } from 'path'

export default defineConfig({
  plugins: [
    tailwindcss(),
  ],
  build: {
    outDir: "dist",
  },
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
    },
  },
});