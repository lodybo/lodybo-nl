import { ghost } from '~/ghost.server';

export function getTags() {
  return ghost.tags
    .browse({
      limit: 'all',
      include: 'count.posts',
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
