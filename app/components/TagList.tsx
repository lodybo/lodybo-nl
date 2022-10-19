import type { Tag } from '@tryghost/content-api';
import AnchorLink from '~/components/AnchorLink';

type Props = {
  tags: Tag[] | undefined,
};

const TagList = ({ tags }: Props) => {
  if (!tags || tags.length === 0) {
    return null;
  }

  return (
    <ul className="flex flex-row gap-2">
      <li>Filed under:</li>
      { tags.map(({ id, slug, name}) => (
        <li key={id}>
          <AnchorLink to={`/tags/${slug}`}>{ name }</AnchorLink>
        </li>
      )) }
    </ul>
  );
}

export default TagList;
