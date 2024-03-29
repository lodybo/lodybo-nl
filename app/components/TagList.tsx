import type { Tag } from '@tryghost/content-api';
import classnames from 'classnames';
import AnchorLink from '~/components/AnchorLink';

type Props = {
  tags: Tag[] | undefined;
  small?: boolean;
  className?: string;
};

const TagList = ({ tags, small = false, className = '' }: Props) => {
  if (!tags || tags.length === 0) {
    return null;
  }

  return (
    <ul
      className={classnames(
        className,
        'flex flex-col flex-wrap xs:flex-row gap-2 mb-5 xs:mb-0',
        {
          'text-small': small,
        },
      )}
    >
      <li>Filed under:</li>
      {tags.map(({ id, slug, name }) => (
        <li key={id}>
          <AnchorLink to={`/topics/${slug}`}>{name}</AnchorLink>
        </li>
      ))}
    </ul>
  );
};

export default TagList;
