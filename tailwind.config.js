/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      maxWidth: {
        '1/3': '33%',
        '1/2': '50%'
      },
      maxHeight: {
        '101': '29rem'
      },
      height: {
        '1/3screen': '33vh',
        '101': '29rem'
      },
      width: {
        '90p': '90%',
      },
    },
  },
  plugins: [],
};
