import type { LoaderArgs } from '@remix-run/node';
import { json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { getPost } from '~/models/posts.server';
import { notFound } from 'remix-utils';
import { useEffect } from 'react';

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

  useEffect(() => {
    (window as any).Prism.highlightAll();
  });

  return (
    <div className="
      prose
      prose-2xl
      max-w-5xl
      prose-a:no-underline
      prose-a:border-b-2
      prose-a:pb-1
      prose-a:border-b-primary-400
      prose-a:transition-all
      hover:prose-a:border-b-primary-700
      mx-auto
      font-recursive
    ">
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

export const handle = {
  loadPrismJS: true,
};
