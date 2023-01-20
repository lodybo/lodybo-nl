import { getPosts } from '~/models/posts.server';
import { getTags } from '~/models/tags.server';
import type { PostOrPage, Tag } from '@tryghost/content-api';

export async function createSiteMap() {
  const posts = await getPosts();
  const tags = await getTags();

  let xml = '<?xml version="1.0" encoding="UTF-8"?>';
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">';

  // Create an entry for the index page.
  xml += createEntry('/');

  // Create entries for each post.
  if (posts && posts.length) {
    posts.forEach((post) => {
      xml += createEntryForPost(post);
    });
  }

  // Create entries for each tag.
  if (tags && tags.length) {
    tags.forEach((tag) => {
      xml += createEntryForTag(tag);
    });
  }

  return xml;
}

function createEntryForPost(post: PostOrPage) {
  return `
    <url>
      <loc>${post.slug}</loc>
      <lastmod>${post.updated_at || post.published_at}</lastmod>
      ${
        post.feature_image
          ? `
        <image:image>
          <image:loc>${post.feature_image}</image:loc>
          <image:caption>${
            post.feature_image_caption || post.title
          }</image:caption>
        </image:image>`.trim()
          : ''
      }
    </url>`.trim();
}

function createEntryForTag(tag: Tag) {
  return `
    <url>
      <loc>/topics/${tag.slug}</loc>
      ${
        tag.feature_image
          ? `<image:image><image:loc>${tag.feature_image}</image:loc></image:image>`
          : ''
      }
    </url>
  `.trim();
}

function createEntry(url: string, lastmod?: string) {
  return `
    <url>
      <loc>${url}</loc>
      ${lastmod ? `<lastmod>${lastmod}</lastmod>` : ''}
    </url>
  `.trim();
}
