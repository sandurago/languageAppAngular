/** @type {import('tailwindcss').Config} */
module.exports = {
  important: true,
  content: [
    "./src/**/*.{html,ts}"
  ],
  theme: {
    extend: {
      colors: {
        'black-olive': '#3E3E3E', // text dark
        'ghost-white': '#F9F9F9', // text light

        'purple-heart': '#673ab7', // navbar darkest color & primary color

        'darkgreen-blue': '#25676e', // third primary color (used for better visibility against white bg)

        'rangoon-green': '#1D1B1B', // hovered elements
        'error-red': '#f44336', // errors
        'pearl': '#DEE1DF', // borders

        //--- NEW PALETTE
        'dark-purple': '#845EC2',
        'light-gray': '#b0a8b9',
        'dark-gray': '#7c7484',
        'light-purple':'#C197FF',
      },
    },
  },
  plugins: [],
}

