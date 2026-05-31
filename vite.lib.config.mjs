import { fileURLToPath, URL } from 'node:url'

import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'

const entry = fileURLToPath(new URL('./src/index.js', import.meta.url))

export default defineConfig({
  plugins: [
    vue({
      template: {
        compilerOptions: {
          whitespace: 'preserve'
        }
      }
    })
  ],
  resolve: {
    extensions: ['.mjs', '.js', '.json', '.vue', '.scss', '.css']
  },
  build: {
    emptyOutDir: true,
    lib: {
      entry,
      formats: ['es'],
      fileName: 'view3'
    },
    rollupOptions: {
      external: ['vue', 'pinia', 'vue-router', '@popperjs/core']
    },
    sourcemap: true,
    target: 'es2022'
  }
})
