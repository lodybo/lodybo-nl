import type { Nullable } from '@tryghost/content-api';

export function formatDate(input: Nullable<Date> | string | undefined) {
  if (!input) return;

  let date: Date;

  if (typeof input === 'string') {
    date = new Date(input);
  } else {
    date = input;
  }

  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'Europe/Amsterdam',
  };

  return new Intl.DateTimeFormat('en', options).format(date);
}

export function formatReadingTime(readingTime: number | undefined) {
  if (!readingTime) return;

  if (readingTime < 2) {
    return 'Only a minute';
  }

  return `About ${readingTime} minutes`;
}
