import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  css: {
    postcss: {}
  },
  server: {
    proxy: {
      '/api': 'http://localhost:3000'
    }
  }
})
