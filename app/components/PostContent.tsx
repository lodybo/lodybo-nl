import { useEffect } from 'react';
import type { PostOrPage } from '@tryghost/content-api';
import { formatDate, formatReadingTime } from '~/utils/formats';
import PostMeta from '~/components/PostMeta';
import Prose from '~/components/Prose';

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
    <Prose isPost>
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
    </Prose>
  );
};

export default PostContent;
