/**
 * Part 1 of the ULTIMATE DARK MODE HACK: as quick as we can, check if a cookie with 'user-prefs' is known. If so, add it to the window object.
 */
const userPrefs = new URLSearchParams(document.cookie).get('user-prefs');
window.darkModeEnabled = userPrefs
  ? JSON.parse(atob(userPrefs)).darkModeEnabled
  : matchMedia('(prefers-color-scheme: dark)').matches;
