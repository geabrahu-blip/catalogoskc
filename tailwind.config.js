/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'skc-purple': '#c77dff', // stronger purple
        'skc-white': '#FFFFFF',
        'skc-gold': '#FFD700', // gold for libra
      }
    },
  },
  plugins: [],
}
