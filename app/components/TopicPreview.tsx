import type { Tag } from '@tryghost/content-api';
import ListItem from '~/components/ListItem';

type Props = {
  topic: Tag;
};

const TopicPreview = ({
  topic: { id, name, slug, description, count },
}: Props) => (
  <ListItem id={id} linkTo={`/topics/${slug}`}>
    <h2 className="text-xl">{name}</h2>
    {description && <p>{description}</p>}

    {count && (
      <div className="flex flex-row justify-between">
        <small>
          {count.posts} {count.posts === 1 ? 'post' : 'posts'}
        </small>
      </div>
    )}
  </ListItem>
);

export default TopicPreview;
