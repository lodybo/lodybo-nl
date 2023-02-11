import { ghost } from '~/ghost.server';
import { Tag } from '@tryghost/content-api';

export function getTags() {
  return ghost.tags
    .browse({
      limit: 'all',
      include: 'count.posts',
      filter: 'visibility:public',
    })
    .catch((err) => {
      if (err.code === 'ECONNREFUSED') {
        return undefined;
      }

      throw new Error(err);
    });
}

export function getTagInfo(slug: string) {
  return ghost.tags
    .read(
      {
        slug,
      },
      {
        include: 'count.posts',
        filter: 'visibility:public',
      },
    )
    .catch((err) => {
      if (err.code === 'ECONNREFUSED') {
        return undefined;
      }

      if (err.response.status === 404) {
        return undefined;
      }

      console.error(err);
    });
}

export function filterInternalTags(tags: Tag[] | undefined) {
  if (!tags) return;
  return tags.filter((tag) => !tag.slug.startsWith('hash'));
}
