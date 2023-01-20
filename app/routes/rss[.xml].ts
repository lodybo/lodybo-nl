import { generateRssFeed } from '~/utils/rss.server';

export const loader = async () => {
  const feed = await generateRssFeed();

  return new Response(feed, {
    headers: {
      'Content-Type': 'application/rss+xml',
      'Content-Length': String(Buffer.byteLength(feed)),
    },
  });
};
