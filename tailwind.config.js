const colors = require('tailwindcss/colors');
const defaultTheme = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    screens: {
      xs: '475px',
      ...defaultTheme.screens,
    },
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
