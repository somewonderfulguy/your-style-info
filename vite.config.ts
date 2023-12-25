import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import eslint from 'vite-plugin-eslint'

export default defineConfig(() => ({
  build: {
    outDir: 'build'
  },
  server: {
    port: 3000
  },
  plugins: [react(), eslint()],
  resolve: {
    alias: {
      // keep in alphabetical order
      '~api': '/src/api',
      '~assets': '/src/assets',
      '~components': '/src/components',
      '~constants': '/src/constants',
      '~contexts': '/src/contexts',
      '~services': '/src/services',
      '~shared': '/src/shared'
    }
  }
}))