import recursiveFont from './recursive/recursive-latin-full-normal.woff2';

export const recursiveFontURL = recursiveFont;

export const recursiveFontDeclaration = `
  @font-face {
    font-family: 'Recursive Variable';
    font-style: oblique 0deg 15deg;
    font-display: swap;
    font-weight: 300 1000;
    src: url(${recursiveFontURL}) format('woff2-variations');
    unicode-range: U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+0304,U+0308,U+0329,U+2000-206F,U+2074,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD;
  }
`;
