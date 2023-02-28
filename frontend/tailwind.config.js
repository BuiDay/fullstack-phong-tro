/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      width:{
        '1100':'1100px'
      },
      backgroundColor:{
        primary:"#f5f5f5",
        secondary:"#3961fb",
        secondary2:"#f73859"
      },
      maxWidth:{
        "600":"600px"
      }
    },
  },
  plugins: [],
}