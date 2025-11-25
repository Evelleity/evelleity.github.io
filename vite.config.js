import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// GitHub Pages user site: base remains '/'.
// Output to 'docs' so Pages can serve main branch /docs without a build action.
export default defineConfig({
  plugins: [react()],
  base: '/',
  build: {
    outDir: 'docs',
    emptyOutDir: true,
  },
})
