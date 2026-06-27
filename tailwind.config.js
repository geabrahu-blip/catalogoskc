/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'skc-purple': '#c5417b', // light magenta/purple from image
        'skc-purple-dark': '#501548', // dark purple from image
        'skc-white': '#FFFFFF',
        'skc-copper': '#c26953', // copper/rose gold from image horseshoe
        'skc-background': '#fdf2f7', // light pink/purple background to match branding
      }
    },
  },
  plugins: [],
}
