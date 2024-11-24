/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      //colours used in proj
      colors:{
        primary:"gray",
        secondary:"EF863E"
      }
    },
  },
  plugins: [],
}
