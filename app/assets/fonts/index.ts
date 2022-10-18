import recursiveFont from './recursive/recursive-latin-variable-full-normal.woff2';

export const recursiveFontURL = recursiveFont;

export const recursiveFontDeclaration = `
  @font-face {
    font-family: 'Recursive';
    font-style: oblique 0deg 15deg;
    font-display: swap;
    font-weight: 300 1000;
    src: url(${recursiveFont}) format('woff2');
    unicode-range: U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+2000-206F,U+2074,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD;
  }
`;
