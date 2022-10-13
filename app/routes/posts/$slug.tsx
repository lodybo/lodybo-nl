import type { LoaderArgs } from '@remix-run/node';
import { json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { getPost } from '~/models/posts.server';
import { notFound } from 'remix-utils';

export const loader = async ({ params }: LoaderArgs) => {
  const { slug } = params;

  const post = await getPost(slug!);

  if (!post) {
    throw notFound({});
  }

  return json({ post, });
};

export default function Post() {
  const { post } = useLoaderData<typeof loader>();

  return (
    <div className="prose max-w-3xl mx-auto">
      { post.feature_image && (
        <img src={post.feature_image} alt={post.feature_image_alt || post.title} />
      )}

      <h1>{post.title}</h1>

      <div dangerouslySetInnerHTML={{ __html: post.html || '' }} />
    </div>
  );
}

export function CatchBoundary() {
  return (
    <h1>Post not found</h1>
  );
}
