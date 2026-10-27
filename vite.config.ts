import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// GitHub Pages는 https://cafephilia.github.io/kaohsiung-trip/ 하위 경로에서 열린다
export default defineConfig({
  base: '/kaohsiung-trip/',
  plugins: [vue()],
})
