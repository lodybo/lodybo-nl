import type { PostOrPage } from '@tryghost/content-api';
import { admin, ghost } from '~/ghost.server';

type GetPosts = {
  page?: number;
};

export function getPosts({ page = 1 }: GetPosts) {
  return ghost.posts
    .browse({
      page,
      include: ['tags'],
    })
    .catch((err) => {
      if (err.code === 'ECONNREFUSED') {
        return undefined;
      }

      throw new Error(err);
    });
}

export function getRecentPosts(count: number = 5) {
  return ghost.posts
    .browse({
      limit: 5,
      order: 'published_at DESC',
      include: ['tags'],
    })
    .catch((err) => {
      if (err.code === 'ECONNREFUSED') {
        return undefined;
      }

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
      if (err.code === 'ECONNREFUSED') {
        return undefined;
      }

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
      if (err.code === 'ECONNREFUSED') {
        return undefined;
      }

      if (err.response.status === 404) {
        return undefined;
      }

      throw new Error(err);
    });
}

export async function getAdminPosts() {
  return admin.posts.browse({ limit: 'all', formats: 'html' });
}

export async function getAdminPages() {
  return admin.pages.browse({ limit: 'all', formats: 'html' });
}
