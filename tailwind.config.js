
/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        bg: '#0b1020',
        panel: '#10172a',
        accent: '#06b6d4',   // cyan
        accent2: '#3b82f6',  // blue
        accent3: '#10b981',  // emerald
      },
      boxShadow: {
        soft: '0 10px 30px rgba(0,0,0,.35)'
      }
    },
  },
  plugins: [],
}