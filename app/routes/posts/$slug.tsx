import type { LoaderArgs } from '@remix-run/node';
import { json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { getPost } from '~/api/posts';
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

  if (post === undefined) {
    return (
      <div className="prose">
        <h1>No post found.</h1>
      </div>
    );
  }

  return (
    <div className="prose">
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
