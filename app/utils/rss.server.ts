import * as cheerio from 'cheerio';
import rss from 'rss';
import invariant from 'tiny-invariant';
import type { Tag } from '@tryghost/content-api';
import { getGhostSettings } from '~/models/settings.server';
import { getPosts } from '~/models/posts.server';

export async function generateRssFeed() {
  const { title, description, url } = await getGhostSettings();
  const posts = await getPosts();

  invariant(title, 'title is required');
  invariant(description, 'description is required');
  invariant(url, 'url is required');
  invariant(posts, 'posts are required');

  const feed = new rss({
    title,
    description,
    site_url: url,
    feed_url: `${url}/rss.xml`,
    language: 'en',
    ttl: 60,
  });

  posts.forEach((post) => {
    const {
      url: post_url = '',
      canonical_url,
      html,
      title = '',
      excerpt: description = '',
      id: guid,
      published_at: date,
      tags,
      primary_author: author,
    } = post;
    const htmlContent = cheerio.load(html || '', {
      decodeEntities: false,
      xmlMode: true,
    });
    const imageUrl = post.feature_image;

    const tagsFilter = (tags: Tag[]) =>
      tags
        .filter(({ name }) => !!name && name.substring(0, 5) !== 'hash-')
        .map(({ name }) => name || '');

    const item = {
      title,
      description,
      guid,
      url: canonical_url || post_url,
      date: (!!date && date) || '',
      categories: (tags && tagsFilter(tags)) || [],
      author: (author && author.name) || '',
      custom_elements: [{}],
    };

    if (imageUrl) {
      // Add a media content tag
      item.custom_elements.push({
        'media:content': {
          _attr: {
            url: imageUrl,
            medium: `image`,
          },
        },
      });
      // Also add the image to the content, because not all readers support media:content
      htmlContent(`p`)
        .first()
        .before(
          `<img src="${imageUrl}" alt="${
            post.feature_image_caption || post.feature_image_alt
          }" />`,
        );
    }

    item.custom_elements.push({
      'content:encoded': {
        _cdata: htmlContent.html(),
      },
    });

    feed.item(item);
  });

  return feed.xml();
}
