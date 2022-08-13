import { api } from './client';

export async function getPosts() {
  return await api.posts
    .browse({
      limit: "all"
    })
    .catch(err => {
      console.error(err);
    });
}

export async function getPost(slug: string) {
  return await api.posts
    .read({
      slug,
    })
    .catch(err => {
      console.error(err);
    });
}
