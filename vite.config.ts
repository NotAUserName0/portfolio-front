import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  css: {
    preprocessorOptions: {
      scss: {
        // Silencia warnings de deprecación de funciones de color legacy en Bootstrap 5
        silenceDeprecations: ['color-functions', 'import', 'global-builtin', 'if-function'],
      },
    },
  },
})
