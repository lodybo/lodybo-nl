import { ghost } from '~/ghost.server';

export async function getPosts() {
  return ghost.posts
    .browse({
      limit: 'all',
      include: ['tags'],
    })
    .catch((err) => {
      throw new Error(err);
    });
}

export function getPostsForTag(tag: string) {
  return ghost.posts
    .browse({
      filter: `tag:${tag}`,
      limit: 'all',
    })
    .catch((err) => {
      throw new Error(err);
    });
}

export async function getPost(slug: string) {
  return ghost.posts
    .read(
      {
        slug,
      },
      {
        include: ['tags'],
      },
    )
    .catch((err) => {
      throw new Error(err);
    });
}
