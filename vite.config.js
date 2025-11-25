import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // For a user/organization root Pages site (<username>.github.io), base should be '/'
  base: '/',
})
