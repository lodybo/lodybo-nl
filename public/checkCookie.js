/**
 * Part 1 of the ULTIMATE DARK MODE HACK: as quick as we can, check if a cookie with 'user-prefs' is known. If so, add it to the window object.
 */
const parseCookie = (str) =>
  str
    .split(';')
    .map((v) => v.split('='))
    .reduce((acc, v) => {
      acc[decodeURIComponent(v[0].trim())] = decodeURIComponent(v[1].trim());
      return acc;
    }, {});
const cookies = parseCookie(document.cookie);
const userPrefs = cookies['user-prefs'];
window.darkModeEnabled = userPrefs
  ? JSON.parse(atob(userPrefs)).darkModeEnabled
  : matchMedia('(prefers-color-scheme: dark)').matches;
