import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// GitHub Pages serves project sites at https://<user>.github.io/<repo>/
// so we set base accordingly. Override with VITE_BASE when developing.
const base = process.env.VITE_BASE ?? '/amanda-bach-nashville/'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base,
})
