import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Ścieżki względne: strona działa i pod adresem GitHub Pages (/wordpress-dev-nauka/), i lokalnie.
  base: './',
})
