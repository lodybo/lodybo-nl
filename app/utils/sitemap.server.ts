import { getPosts } from '~/models/posts.server';
import { getTags } from '~/models/tags.server';
import type { PostOrPage, SettingsResponse, Tag } from '@tryghost/content-api';
import { getGhostSettings } from '~/models/settings.server';

export async function createSiteMap() {
  const { url } = (await getGhostSettings()) as SettingsResponse;
  const posts = await getPosts({});
  const tags = await getTags();

  let xml = '<?xml version="1.0" encoding="UTF-8"?>';
  xml +=
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">';

  // Create an entry for the index page.
  xml += createEntry(`${url}`);

  // Create entries for each post.
  if (posts && posts.length) {
    posts.forEach((post) => {
      xml += createEntryForPost(post, url);
    });
  }

  // Create entries for each tag.
  if (tags && tags.length) {
    tags.forEach((tag) => {
      xml += createEntryForTag(tag, url);
    });
  }

  xml += '</urlset>';

  return xml;
}

function createEntryForPost(post: PostOrPage, url: string = '/') {
  // Strip <, /> and ` from the post caption or title. Also encode it since Unsplash captions contain urls.
  let caption: string = '';
  if (post.feature_image && post.feature_image_caption) {
    caption = post.feature_image_caption.replace(/<|\/>|`/g, '');
  } else if (post.title) {
    caption = post.title.replace(/<|\/>|`/g, '');
  }
  caption = encodeURIComponent(caption);

  // urlescape the featured image url
  let feature_image: string = '';
  if (post.feature_image) {
    feature_image = encodeURIComponent(post.feature_image);
  }

  return `
    <url>
      <loc>${url}posts/${post.slug}</loc>
      <lastmod>${post.updated_at || post.published_at}</lastmod>
      ${
        feature_image
          ? `
        <image:image>
          <image:loc>${feature_image}</image:loc>
          <image:caption>${caption}</image:caption>
        </image:image>`.trim()
          : ''
      }
    </url>`.trim();
}

function createEntryForTag(tag: Tag, url: string = '/') {
  return `
    <url>
      <loc>${url}topics/${tag.slug}</loc>
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
