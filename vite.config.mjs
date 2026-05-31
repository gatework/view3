import { fileURLToPath, URL } from 'node:url'

import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'

const projectRoot = fileURLToPath(new URL('.', import.meta.url))
const srcRoot = fileURLToPath(new URL('./src', import.meta.url))

function manualChunks (id) {
  const normalizedId = id.replaceAll('\\', '/')

  if (normalizedId.includes('/node_modules/vue')) return 'vendor-vue'
  if (normalizedId.includes('/node_modules/')) return 'vendor'
  if (normalizedId.includes('/src/components/date-picker/')) return 'view3-date-picker'
  if (normalizedId.includes('/src/components/table')) return 'view3-table'
  if (normalizedId.includes('/src/components/')) return 'view3-components'
  if (normalizedId.includes('/src/plugins/')) return 'view3-plugins'
  if (normalizedId.includes('/src/directives/')) return 'view3-directives'
  if (normalizedId.includes('/src/utils/') || normalizedId.includes('/src/mixins/') || normalizedId.includes('/src/locale/')) return 'view3-shared'
}

export default defineConfig({
  root: 'examples',
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
    alias: {
      '@': srcRoot
    },
    extensions: ['.mjs', '.js', '.json', '.vue', '.scss', '.css']
  },
  server: {
    fs: {
      allow: [projectRoot]
    }
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      output: {
        manualChunks
      }
    },
    sourcemap: true,
    target: 'es2022'
  }
})
