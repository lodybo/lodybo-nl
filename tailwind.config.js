const colors = require('tailwindcss/colors');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,ts,jsx,tsx}'],
  theme: {
    fontFamily: {
      mono: 'Recursive, JetBrains Mono, monospace',
    },
    fontWeight: {},
    extend: {
      colors: {
        primary: colors.teal,
      },
      fontFamily: {
        recursive: 'Recursive, sans-serif',
      },
      fontSize: {
        small: '80%',
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
