import type { LoaderArgs } from '@remix-run/node';
import { json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { getPost } from '~/api/posts';
import invariant from 'tiny-invariant';

export const loader = async ({ params }: LoaderArgs) => {
  const { slug } = params;
  invariant(!!slug, 'Slug is required');

  const post = await getPost(slug);
  invariant(!!post, `No post found with slug ${slug}`);

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
