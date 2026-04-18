/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'skc-purple': '#D8B4E2', // light purple
        'skc-white': '#FFFFFF',
        'skc-gold': '#FFD700', // gold for libra
      }
    },
  },
  plugins: [],
}
