import type { PostOrPage } from '@tryghost/content-api';
import { formatDate, formatReadingTime } from '~/utils/formats';
import TagList from '~/components/TagList';
import ListItem from '~/components/ListItem';
import PostMeta from '~/components/PostMeta';
import classnames from 'classnames';

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
    <ListItem
      id={id}
      featured={featured}
      linkTo={`/posts/${slug}`}
      grid={grid}
      forceLastItemSpan={grid}
    >
      {feature_image && (
        <img
          className="w-1/4 flex-initial object-cover aspect-square"
          src={feature_image}
          alt={feature_image_alt || `Featured image for ${title}`}
        />
      )}

      <span className="w-full flex-1 flex flex-col gap-2.5">
        <h2 className="text-xl">{title}</h2>
        <p
          className={classnames(
            'text-sm text-slate-500 group-hover:text-slate-800',
            {
              'text-slate-500': grid,
              'text-slate-700': !grid,
            },
          )}
        >
          {excerpt}
        </p>

        <TagList
          className="text-slate-500 group-hover:text-slate-600"
          tags={tags}
        />

        <PostMeta
          className="text-slate-500 group-hover:text-slate-500"
          readingTime={readingTime}
          publishedAt={publishedAt}
        />
      </span>
    </ListItem>
  );
};

export default PostPreview;
