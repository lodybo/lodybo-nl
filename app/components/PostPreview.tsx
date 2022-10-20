import { Link } from '@remix-run/react';
import type { PostOrPage } from '@tryghost/content-api';
import classNames from 'classnames';
import { formatDate, formatReadingTime } from '~/utils/formats';
import TagList from '~/components/TagList';
import ListItem from '~/components/ListItem';

type Props = {
  post: Pick<
    PostOrPage,
    | 'id'
    | 'tags'
    | 'published_at'
    | 'excerpt'
    | 'featured'
    | 'reading_time'
    | 'slug'
    | 'title'
  >;
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
  },
}: Props) => {
  const publishedAt = formatDate(published_at);
  const readingTime = formatReadingTime(reading_time);

  return (
    <ListItem id={id} featured={featured} linkTo={`/posts/${slug}`}>
      <h2 className="text-xl">{title}</h2>
      <p className="text-sm">{excerpt}</p>

      <TagList tags={tags} />

      <div className="flex flex-row justify-between">
        {publishedAt && <small>{publishedAt}</small>}
        <small>{readingTime}</small>
      </div>
    </ListItem>
  );
};

export default PostPreview;
