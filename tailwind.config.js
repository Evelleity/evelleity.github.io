/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Archivo Narrow', 'ui-sans-serif', 'system-ui'],
        serif: ['IBM Plex Serif', 'ui-serif', 'Georgia'],
        accent: ['IBM Plex Serif', 'serif']
      },
      colors: {
        base: '#1a2e1a',
        accent: '#DAD7CD'
      },
      backdropBlur: {
        xs: '2px'
      },
      boxShadow: {
        soft: '0 4px 24px -4px rgba(0,0,0,0.4)',
        insetLine: 'inset 0 0 0 1px rgba(255,255,255,0.06)'
      },
      transitionTimingFunction: {
        smooth: 'cubic-bezier(0.2, 0.8, 0.2, 1)'
      }
    },
  },
  plugins: [],
}
