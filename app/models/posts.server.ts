import { ghost } from '~/ghost.server';

export async function getPosts() {
  return await ghost.posts
    .browse({
      limit: "all",
      include: ['tags'],
    })
    .catch(err => {
      console.error(err);
    });
}

export async function getPost(slug: string) {
  return await ghost.posts
    .read({
      slug,
    })
    .catch(err => {
      console.error(err);
    });
}
