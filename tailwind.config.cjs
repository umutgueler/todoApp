/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],

  theme: {
    container: {
      center: true
    },
    extend: {
      colors: {
        "u-blue": "#001233",
        "u-red": "#FF595A",
        "u-yellow": "#FEC501",
        "u-gred": "#CAC0B3"
      },
      fontFamily: {
        ubebas: ['Bebas Neue', "cursive", "sans-serif"],
        ucrimson: ['Crimson Text', "sans-serif"]
      }
    },
  },
  plugins: [],
}
