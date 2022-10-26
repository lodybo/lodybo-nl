import { createCookie } from '@remix-run/node';

export const userPrefs = createCookie('user-prefs', {
  maxAge: 31536000, // a year
});