import { createSiteMap } from '~/utils/sitemap.server';

export const loader = async () => {
  const sitemapXML = await createSiteMap();

  return new Response(sitemapXML, {
    headers: {
      'Content-Type': 'application/xml',
      'Content-Length': String(Buffer.byteLength(sitemapXML)),
      'Cache-Control': 'public, max-age=3600',
    },
  });
};
