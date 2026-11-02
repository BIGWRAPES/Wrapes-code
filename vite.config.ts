
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  // GitHub Pages serves this project under /Wrapes-code/; Render serves it at /
  base: process.env.GITHUB_ACTIONS === 'true' ? '/Wrapes-code/' : '/',
  plugins: [vue(), tailwindcss()],
})
