/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#FF6B35',
        secondary: '#F7C59F',
        background: '#FFFBF5',
        'text-dark': '#2D3142',
      },
    },
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: ["light"],
  },
}