
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  base: '/db-citas-medicas/',
  plugins: [
    react(),
    tailwindcss(),
  ],
})
