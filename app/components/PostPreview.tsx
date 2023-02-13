import type { PostOrPage } from '@tryghost/content-api';
import { formatDate, formatReadingTime } from '~/utils/formats';
import TagList from '~/components/TagList';
import ListItem from '~/components/ListItem';
import PostMeta from '~/components/PostMeta';
import classnames from 'classnames';
import { Link } from '@remix-run/react';

type Props = {
  post: Pick<
    PostOrPage,
    | 'id'
    | 'tags'
    | 'published_at'
    | 'excerpt'
    | 'featured'
    | 'feature_image'
    | 'feature_image_alt'
    | 'reading_time'
    | 'slug'
    | 'title'
  >;
  grid?: boolean;
};

const PostPreview = ({
  post: {
    id,
    title,
    slug,
    excerpt,
    tags,
    published_at,
    reading_time,
    featured,
    feature_image,
    feature_image_alt,
  },
  grid,
}: Props) => {
  const publishedAt = formatDate(published_at);
  const readingTime = formatReadingTime(reading_time);

  return (
    <ListItem id={id} featured={featured} grid={grid} forceLastItemSpan={grid}>
      <Link
        className="h-full flex flex-col sm:flex-row gap-4"
        to={`/posts/${slug}`}
      >
        {feature_image && (
          <img
            className="w-full sm:w-52 h-20 sm:h-full flex-initial object-cover aspect-video sm:aspect-square"
            src={feature_image}
            alt={feature_image_alt || `Featured image for ${title}`}
          />
        )}

        <span className="w-full flex-1 flex flex-col gap-2.5 text-nord-2 dark:text-nord-4 group-hover:text-nord-0 dark:group-hover:text-nord-6">
          <h2 className="text-xl">{title}</h2>
          <p className="text-sm">{excerpt}</p>
        </span>
      </Link>

      <span className="mt-auto flex flex-1 flex-col gap-2.5">
        <TagList tags={tags} />

        <PostMeta readingTime={readingTime} publishedAt={publishedAt} />
      </span>
    </ListItem>
  );
};

export default PostPreview;
