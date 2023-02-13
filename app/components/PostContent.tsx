import { useEffect } from 'react';
import type { PostOrPage } from '@tryghost/content-api';
import { formatDate, formatReadingTime } from '~/utils/formats';
import PostMeta from '~/components/PostMeta';

type Props = {
  post: PostOrPage;
};

const PostContent = ({ post }: Props) => {
  const publishedAt = formatDate(post.published_at);
  const readingTime = formatReadingTime(post.reading_time);

  useEffect(() => {
    window.addEventListener('load', () => {
      (window as any).Prism.highlightAll();
    });
  });

  return (
    <div
      className="
        prose
        prose-sm
        sm:prose-base
        md:prose-lg
        xl:prose-2xl
        prose-nord
        dark:prose-invert
        leading-loose
        max-w-5xl
        prose-a:no-underline
        prose-a:border-b-2
        prose-a:pb-1
        prose-a:border-b-nord-frost-1-400
        prose-a:transition-all
        hover:prose-a:border-b-nord-frost-1-600
        mx-auto
        px-4
        sm:px-10
      "
    >
      {post.feature_image && (
        <div className="not-prose kg-width-full">
          <img
            className="w-full h-screen object-cover"
            src={post.feature_image}
            alt={post.feature_image_alt || post.title}
          />
        </div>
      )}

      <div className="h-8 sm:h-16 lg:h-32" />
      <h1>{post.title}</h1>
      <PostMeta
        mode="full"
        readingTime={readingTime}
        publishedAt={publishedAt}
        updatedAt={post.updated_at}
        tags={post.tags}
      />

      <div dangerouslySetInnerHTML={{ __html: post.html || '' }} />
    </div>
  );
};

export default PostContent;
