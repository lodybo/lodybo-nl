const colors = require('tailwindcss/colors');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      mono: 'Recursive, JetBrains Mono, monospace',
    },
    extend: {
      colors: {
        primary: colors.teal,
      },
      fontFamily: {
        recursive: 'Recursive, sans-serif',
      }
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
