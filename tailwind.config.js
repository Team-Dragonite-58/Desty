/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      maxWidth: {
        '1/3': '33%',
      },
      height: {
        '1/3screen': '33vh',
      },
      width: {
        '90p': '90%',
      },
    },
  },
  plugins: [],
};
