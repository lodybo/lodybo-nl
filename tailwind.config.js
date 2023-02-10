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
    colors: {
      transparent: colors.transparent,
      current: colors.current,
      white: colors.white,
      black: colors.black,
      slate: colors.slate,
      teal: colors.green,
      cyan: colors.green,

      /*
       * Nord's color scheme, detailed here: https://www.nordtheme.com/docs/colors-and-palettes
       * Every 'DEFAULT' key is the actual Nord color
       */
      // Nord 0
      'nord-polarnight-0': {
        50: '#f3f6f8',
        100: '#e0e7ed',
        200: '#c5d0dc',
        300: '#9dafc3',
        400: '#6e87a2',
        500: '#536c87',
        600: '#475973',
        700: '#3e4c60',
        800: '#394251',
        900: '#2e3440', // DEFAULT
      },

      // Nord 1
      'nord-polarnight-1': {
        50: '#f6f7f9',
        100: '#eceef2',
        200: '#d5d8e2',
        300: '#b1b9c8',
        400: '#8793a9',
        500: '#68758f',
        600: '#535e76',
        700: '#444c60',
        800: '#3b4252', // DEFAULT
        900: '#343946',
      },

      // Nord 2
      'nord-polarnight-2': {
        50: '#f6f7f9',
        100: '#eceef2',
        200: '#d6dae1',
        300: '#b1b9c8',
        400: '#8793a9',
        500: '#68778f',
        600: '#535f76',
        700: '#434c5e', // DEFAULT
        800: '#3b4251',
        900: '#343946',
      },

      // Nord 3
      'nord-polarnight-3': {
        50: '#f6f7f9',
        100: '#eceef2',
        200: '#d6dae1',
        300: '#b2b9c7',
        400: '#8894a8',
        500: '#69778e',
        600: '#546075',
        700: '#4c566a', // DEFAULT
        800: '#3b4251',
        900: '#353a45',
      },

      // Nord 4
      'nord-snowstorm-0': {
        50: '#f4f6f9',
        100: '#ebeef4',
        200: '#d8dee9', // DEFAULT
        300: '#c4ccdd',
        400: '#abb3ce',
        500: '#959cbf',
        600: '#7f84ac',
        700: '#6c6f96',
        800: '#595c7a',
        900: '#4c5063',
      },

      // Nord 5
      'nord-snowstorm-1': {
        50: '#f5f7f9',
        100: '#e5e9f0', // DEFAULT
        200: '#d6dde7',
        300: '#b9c5d7',
        400: '#97a8c3',
        500: '#7e8fb3',
        600: '#6c7aa4',
        700: '#606b95',
        800: '#52597b',
        900: '#454b63',
      },

      // Nord 6
      'nord-snowstorm-2': {
        50: '#f5f7f9',
        100: '#eceff4', // DEFAULT
        200: '#d6dde7',
        300: '#b9c5d7',
        400: '#97a9c3',
        500: '#7e8fb3',
        600: '#6c7ba4',
        700: '#606b95',
        800: '#525a7b',
        900: '#454b63',
      },

      // Nord 7
      'nord-frost-0': {
        50: '#f3f8f7',
        100: '#e0edec',
        200: '#c5dcdb',
        300: '#8fbcbb', // DEFAULT
        400: '#6ca4a4',
        500: '#518989',
        600: '#467174',
        700: '#3d5e61',
        800: '#385052',
        900: '#324447',
      },

      // Nord 8
      'nord-frost-1': {
        50: '#f4f9fb',
        100: '#e8f1f6',
        200: '#cce3eb',
        300: '#88c0d0', // DEFAULT
        400: '#6cb2c4',
        500: '#4a98ad',
        600: '#387c91',
        700: '#2e6376',
        800: '#295563',
        900: '#274753',
      },

      // Nord 9
      'nord-frost-2': {
        50: '#f4f8fa',
        100: '#e6eef3',
        200: '#d3e0ea',
        300: '#b4ccdc',
        400: '#90b1ca',
        500: '#81a1c1', // DEFAULT
        600: '#6383ad',
        700: '#58729d',
        800: '#4b5f82',
        900: '#404f68',
      },

      // Nord 10
      'nord-frost-3': {
        50: '#f5f7fa',
        100: '#eaeef4',
        200: '#cfd9e8',
        300: '#a6bad3',
        400: '#7594bb',
        500: '#5e81ac', // DEFAULT
        600: '#415f88',
        700: '#364d6e',
        800: '#2f425d',
        900: '#2b394f',
      },

      // Nord 11
      'nord-aurora-0': {
        50: '#fbf5f5',
        100: '#f8ebeb',
        200: '#f1dadb',
        300: '#e6bbbe',
        400: '#d7959a',
        500: '#bf616a', // DEFAULT
        600: '#ae505e',
        700: '#913f4d',
        800: '#7a3745',
        900: '#69323f',
      },

      // Nord 12
      'nord-aurora-1': {
        50: '#fcf6f4',
        100: '#f8ece8',
        200: '#f4dcd4',
        300: '#ebc3b6',
        400: '#dd9f8c',
        500: '#d08770', // DEFAULT
        600: '#b8644a',
        700: '#9a523b',
        800: '#804634',
        900: '#6b3f31',
      },

      // Nord 13
      'nord-aurora-2': {
        50: '#fdf9ef',
        100: '#f9f1db',
        200: '#f3e0b5',
        300: '#ebcb8b', // DEFAULT
        400: '#e1ab56',
        500: '#da9335',
        600: '#cc7b2a',
        700: '#a96025',
        800: '#874c25',
        900: '#6e4020',
      },

      // Nord 14
      'nord-aurora-3': {
        50: '#f7f9f4',
        100: '#ecf2e6',
        200: '#d9e5cd',
        300: '#b8d0a5',
        400: '#a3be8c', // DEFAULT
        500: '#719453',
        600: '#5a7940',
        700: '#486035',
        800: '#3c4d2e',
        900: '#324027',
      },

      // Nord 15
      'nord-aurora-4': {
        50: '#f9f6f9',
        100: '#f4eff4',
        200: '#eae0e9',
        300: '#dbc6d8',
        400: '#c3a3be',
        500: '#b48ead', // DEFAULT
        600: '#976b8d',
        700: '#805676',
        800: '#6b4962',
        900: '#5b4054',
      },
    },
    fontFamily: {
      mono: 'Recursive, JetBrains Mono, monospace',
    },
    fontWeight: {},
    extend: {
      colors: {
        nord: {
          0: '#2e3440',
          1: '#3b4252',
          2: '#434c5e',
          3: '#4c566a',
          4: '#d8dee9',
          5: '#e5e9f0',
          6: '#eceff4',
          7: '#8fbcbb',
          8: '#88c0d0',
          9: '#81a1c1',
          10: '#5e81ac',
          11: '#bf616a',
          12: '#d08770',
          13: '#ebcb8b',
          14: '#a3be8c',
          15: '#b48ead',
        },
      },
      fontFamily: {
        recursive: 'Recursive, sans-serif',
      },
      fontSize: {
        small: '80%',
      },
      typography: ({ theme }) => ({
        nord: {
          css: {
            '--tw-prose-body': theme('colors.nord-polarnight-0[700]'),
            '--tw-prose-headings': theme('colors.nord-polarnight-0[900]'),
            '--tw-prose-lead': theme('colors.nord-polarnight-0[600]'),
            '--tw-prose-links': theme('colors.nord-polarnight-0[900]'),
            '--tw-prose-bold': theme('colors.nord-polarnight-0[900]'),
            '--tw-prose-counters': theme('colors.nord-polarnight-0[500]'),
            '--tw-prose-bullets': theme('colors.nord-polarnight-0[300]'),
            '--tw-prose-hr': theme('colors.nord-polarnight-0[200]'),
            '--tw-prose-quotes': theme('colors.nord-polarnight-0[900]'),
            '--tw-prose-quote-borders': theme('colors.nord-polarnight-0[200]'),
            '--tw-prose-captions': theme('colors.nord-polarnight-0[500]'),
            '--tw-prose-code': theme('colors.nord-polarnight-0[900]'),
            '--tw-prose-pre-code': theme('colors.nord-polarnight-0[200]'),
            '--tw-prose-pre-bg': theme('colors.nord-polarnight-0[800]'),
            '--tw-prose-th-borders': theme('colors.nord-polarnight-0[300]'),
            '--tw-prose-td-borders': theme('colors.nord-polarnight-0[200]'),
            '--tw-prose-invert-body': theme('colors.nord-snowstorm-0[200]'),
            '--tw-prose-invert-headings': theme('colors.nord-snowstorm-0[100]'),
            '--tw-prose-invert-lead': theme('colors.nord-snowstorm-0[400]'),
            '--tw-prose-invert-links': theme('colors.nord-snowstorm-0[100]'),
            '--tw-prose-invert-bold': theme('colors.nord-snowstorm-0[100]'),
            '--tw-prose-invert-counters': theme('colors.nord-snowstorm-0[400]'),
            '--tw-prose-invert-bullets': theme('colors.nord-snowstorm-0[600]'),
            '--tw-prose-invert-hr': theme('colors.nord-snowstorm-0[700]'),
            '--tw-prose-invert-quotes': theme('colors.nord-snowstorm-0[100]'),
            '--tw-prose-invert-quote-borders': theme(
              'colors.nord-snowstorm-0[700]',
            ),
            '--tw-prose-invert-captions': theme('colors.nord-snowstorm-0[400]'),
            '--tw-prose-invert-code': theme('colors.nord-snowstorm-0[100]'),
            '--tw-prose-invert-pre-code': theme('colors.nord-snowstorm-0[300]'),
            '--tw-prose-invert-pre-bg': 'rgb(0 0 0 / 50%)',
            '--tw-prose-invert-th-borders': theme(
              'colors.nord-snowstorm-0[600]',
            ),
            '--tw-prose-invert-td-borders': theme(
              'colors.nord-snowstorm-0[700]',
            ),
          },
        },
      }),
      animation: {
        scroll: 'scroll 60s linear infinite',
      },
      // keyframes: ({ theme }) => ({
      //   scroll: {
      //     '0%': { transform: 'translateX(0)' },
      //     '100%': {
      //       transform: `translateX(calc(-100% - ${theme('gap.4')}')}))`,
      //     },
      //   },
      // }),
      keyframes: {
        scroll: {
          '0%': { transform: 'translateX(0)' },
          '100%': {
            // transform: `translateX(calc(-100% - 1rem)}))`,
            transform: `translateX(-100%)`,
          },
        },
      },
      width: {
        'marquee-item': 'clamp(10rem, 1rem + 40vmin, 30rem)',
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
