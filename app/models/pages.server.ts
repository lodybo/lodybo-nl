import { ghost } from '~/ghost.server';

export async function getPages() {
  return await ghost.pages
    .browse({
      limit: "all"
    })
    .catch(err => {
      console.error(err);
    });
}

export async function getPage(slug: string) {
  return await ghost.pages
    .read({
      slug,
    })
    .catch(err => {
      console.error(err);
    });
}
