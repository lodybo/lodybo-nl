import { Link } from '@remix-run/react';
import type { PostOrPage } from '@tryghost/content-api';
import { formatDate, formatReadingTime } from '~/utils/formats';
import TagList from '~/components/TagList';
import classNames from 'classnames';

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
    <li
      className={classNames({
        'transition-all': true,

        'border-l-4': !featured,
        'border-l-slate-200': !featured,
        'hover:border-l-slate-300': !featured,
        'hover:border-l-8': !featured,
        'pl-5': !featured,

        'p-10': featured,
        'text-white': featured,
        'scale-100': featured,
        'hover:scale-[1.015]': featured,
        'duration-300': featured,
        'border-2': featured,
        'border-slate-200': featured,
        'shadow-md': featured,
        'bg-gradient-to-r from-cyan-500 to-blue-500': featured,
      })}
      key={id}
    >
      <Link className="flex flex-col gap-2.5" to={`/posts/${slug}`}>
        <h2 className="text-xl">{title}</h2>
        <p className="text-sm">{excerpt}</p>

        <TagList tags={tags} />

        <div className="flex flex-row justify-between">
          {publishedAt && <small>{publishedAt}</small>}
          <small>{readingTime}</small>
        </div>
      </Link>
    </li>
  );
};

export default PostPreview;
