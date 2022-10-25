import type { Tag } from '@tryghost/content-api';
import ListItem from '~/components/ListItem';

type Props = {
  topic: Tag;
};

const TopicPreview = ({
  topic: { id, name, slug, description, count, feature_image },
}: Props) => (
  <ListItem id={id} linkTo={`/topics/${slug}`} grid>
    {feature_image && (
      <img
        className="w-1/3 flex-initial object-cover aspect-square"
        src={feature_image}
        alt={name}
      />
    )}

    <span className="w-full flex-1 flex flex-col gap-2.5">
      <h2 className="text-xl">{name}</h2>
      {description && <p>{description}</p>}

      {count && (
        <div className="flex flex-row justify-between">
          <small>
            {count.posts} {count.posts === 1 ? 'post' : 'posts'}
          </small>
        </div>
      )}
    </span>
  </ListItem>
);

export default TopicPreview;
