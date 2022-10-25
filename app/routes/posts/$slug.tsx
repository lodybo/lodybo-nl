import { useEffect } from 'react';
import type { LoaderArgs } from '@remix-run/node';
import { json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { notFound } from 'remix-utils';
import PageLayout from '~/layouts/Page';
import { getPost } from '~/models/posts.server';
import PostMeta from '~/components/PostMeta';
import { formatDate, formatReadingTime } from '~/utils/formats';

export const loader = async ({ params }: LoaderArgs) => {
  const { slug } = params;

  const post = await getPost(slug!);

  if (!post) {
    throw notFound({});
  }

  return json({ post });
};

export default function Post() {
  const { post } = useLoaderData<typeof loader>();
  const publishedAt = formatDate(post.published_at);
  const readingTime = formatReadingTime(post.reading_time);

  useEffect(() => {
    (window as any).Prism.highlightAll();
  });

  return (
    <PageLayout>
      <div
        className="
        prose
        prose-2xl
        leading-loose
        max-w-5xl
        prose-a:no-underline
        prose-a:border-b-2
        prose-a:pb-1
        prose-a:border-b-primary-400
        prose-a:transition-all
        hover:prose-a:border-b-primary-700
        mx-auto
      "
      >
        {post.feature_image && (
          <div className="not-prose kg-width-full">
            <img
              className="w-full"
              src={post.feature_image}
              alt={post.feature_image_alt || post.title}
            />
          </div>
        )}

        <h1 className="mt-16">{post.title}</h1>
        <PostMeta
          mode="full"
          readingTime={readingTime}
          publishedAt={publishedAt}
          updatedAt={post.updated_at}
          tags={post.tags}
        />

        <div dangerouslySetInnerHTML={{ __html: post.html || '' }} />
      </div>
    </PageLayout>
  );
}

export function CatchBoundary() {
  return <h1>Post not found</h1>;
}
