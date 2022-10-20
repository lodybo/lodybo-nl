import type { PostOrPage } from '@tryghost/content-api';
import { formatDate, formatReadingTime } from '~/utils/formats';
import TagList from '~/components/TagList';
import ListItem from '~/components/ListItem';
import PostMeta from '~/components/PostMeta';

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

      <PostMeta readingTime={readingTime} publishedAt={publishedAt} />
    </ListItem>
  );
};

export default PostPreview;
