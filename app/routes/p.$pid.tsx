import type { LoaderArgs } from '@remix-run/node';
import { json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import invariant from 'tiny-invariant';
import type { PostOrPage } from '@tryghost/content-api';

import { adminPosts, getPostByUUID } from '~/models/posts.server';
import PostContent from '~/components/PostContent';
export const loader = async ({ params }: LoaderArgs) => {
  const { pid } = params;

  const list = await adminPosts();

  invariant(pid, 'Post UUID is required');

  const previewPost = list.find((item: PostOrPage) => item.uuid === pid);

  const post = await getPostByUUID(previewPost.uuid, previewPost.slug);

  return json({ post });
};

export default function PostPreview() {
  const { post } = useLoaderData<typeof loader>();

  return <PostContent post={post} />;
}
