/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      scale: {
        '25': '.25',
      },
      gridTemplateColumns: {
        'auto-fit-100': 'repeat(auto-fit, minmax(256px, 1fr))',
      },
    },
  },
  plugins: [],
}

