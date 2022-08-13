import { api } from './client';

export async function getPges() {
  return await api.pages
    .browse({
      limit: "all"
    })
    .catch(err => {
      console.error(err);
    });
}

export async function getPage(slug: string) {
  return await api.pages
    .read({
      slug,
    })
    .catch(err => {
      console.error(err);
    });
}
