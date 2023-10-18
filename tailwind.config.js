/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}"
  ],
  theme: {
    extend: {
      colors: {
        'black-olive': '#3E3E3E',
        'pastel-pink': '#FED2DB',
        'light-aquamarine': '#A1FCEA',
        'flamingo': '#FDA0B3',
        'rangoon-green': '#1D1B1B',
        'soapstone': '#FFFAFA',
        'error-red': '#f44336',
        /** PURPLES - PINK for MATERIAL */
        'watermelon-pink': '#FC6E8B',
        'purplish-pink': '#D959AC',
        'pearl': '#DEE1DF',
        'ghost-white': '#F9F9F9',
        'purple-heart': '#673ab7'
      },
    },
  },
  plugins: [],
}

