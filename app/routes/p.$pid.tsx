import type { LoaderArgs } from '@remix-run/node';
import { json } from '@remix-run/node';
import { useLoaderData, useCatch } from '@remix-run/react';
import invariant from 'tiny-invariant';
import type { PostOrPage } from 'tryghost__content-api';

import { getAdminPages, getAdminPosts } from '~/models/posts.server';
import PostContent from '~/components/PostContent';

export const loader = async ({ params }: LoaderArgs) => {
  const { pid } = params;

  const posts = getAdminPosts();
  const pages = getAdminPages();
  const results = await Promise.allSettled([posts, pages]);

  invariant(results, 'No posts or pages found');

  const list: PostOrPage[] = results.flatMap((result) => {
    if (result.status === 'fulfilled') {
      return result.value;
    }

    return [];
  });

  invariant(pid, 'Post UUID is required');

  const previewPost = list.find((item: PostOrPage) => item.uuid === pid);

  if (!previewPost || !previewPost.uuid) {
    throw json(
      {
        message: 'No post or pages found.',
        description: `Uuid ${pid} returns no post or pages. Maybe check the post/pages list to see what we actually have.`,
        list,
      },
      { status: 404 },
    );
  }

  return json({ post: previewPost });
};

export default function PostPreview() {
  const { post } = useLoaderData();

  return (
    <section className="px-5 md:px-10 xl:px-40 mx-auto flex flex-col">
      <PostContent post={post} />
    </section>
  );
}

export function ErrorBoundary({ error }: { error: Error }) {
  console.error(error);
  console.trace(error.stack);

  return (
    <section className="px-5 md:px-10 xl:px-40 mx-auto flex flex-col mt-10">
      <h1 className="text-4xl">{error.message}</h1>
    </section>
  );
}

export function CatchBoundary() {
  const { data } = useCatch();

  // console.dir(data.list);
  return (
    <section className="px-5 md:px-10 xl:px-40 mx-auto flex flex-col mt-10">
      <div
        className="mt-10 prose
        prose-sm
        sm:prose-base
        md:prose-lg
        xl:prose-2xl
        prose-nord
        dark:prose-invert
        prose-a:no-underline
        prose-a:border-b-2
        prose-a:pb-1
        prose-a:border-b-nord-frost-1-400
        prose-a:transition-all
        hover:prose-a:border-b-nord-frost-1-600"
      >
        <h1>{data.message}</h1>
        <p>{data.description}</p>
      </div>
    </section>
  );
}
