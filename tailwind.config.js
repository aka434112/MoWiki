const defaultTheme = require('windicss/defaultTheme')

module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
    './public/styles/*.css',
  ],
  theme: {
    extend: {
      fontFamily: {
        montserrat: ['Montserrat'],
      },
    },
  },
  plugins: [],
}
