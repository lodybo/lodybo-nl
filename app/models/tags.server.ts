import { ghost } from '~/ghost.server';

export function getTags() {
  return ghost.tags
    .browse({
      limit: 'all',
      include: 'count.posts',
    })
    .catch((err) => {
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
      console.error(err);
    });
}
