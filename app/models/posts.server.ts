import { PostOrPage } from '@tryghost/content-api';
import { admin, ghost } from '~/ghost.server';

export function getPosts() {
  return ghost.posts
    .browse({
      limit: 'all',
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

export async function getPostByUUID(
  uuid: string,
  slug: string,
): Promise<PostOrPage> {
  return admin.posts
    .read(
      {
        uuid,
        slug,
      },
      {
        include: ['tags'],
        formats: 'html',
      },
    )
    .catch((err: any) => {
      console.log({ err });
      if (err.code === 'ECONNREFUSED') {
        return undefined;
      }

      if (err.response.status === 404) {
        return undefined;
      }

      throw new Error(err);
    });
}

export async function adminPosts() {
  return admin.posts.browse({ limit: 'all' });
}
