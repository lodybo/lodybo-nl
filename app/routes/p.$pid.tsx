import type { LoaderArgs } from '@remix-run/node';
import { json } from '@remix-run/node';
import {
  useLoaderData,
  useCatch,
  useRouteError,
  isRouteErrorResponse,
} from '@remix-run/react';
import invariant from 'tiny-invariant';
import type { PostOrPage } from '@tryghost/content-api';

import { getAdminPages, getAdminPosts } from '~/models/posts.server';
import PostContent from '~/components/PostContent';
import MainSection from '~/components/MainSection';
import Prose from '~/components/Prose';
import { getErrorMessage } from '~/utils/errors';
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
    <MainSection>
      <PostContent post={post} />
    </MainSection>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    const { data } = error;

    return (
      <MainSection className="mt-10">
        <Prose>
          <h1>{data.message}</h1>
          <p>{data.description}</p>
        </Prose>
      </MainSection>
    );
  }

  console.error(error);

  if (error instanceof Error && error.stack) {
    console.trace(error.stack);
  }

  const message = getErrorMessage(error);

  return (
    <MainSection className="mt-10">
      <h1 className="text-4xl">{message}</h1>
    </MainSection>
  );
}
