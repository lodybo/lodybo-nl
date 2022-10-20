import type { Nullable, Tag } from '@tryghost/content-api';
import { formatDate } from '~/utils/formats';
import TagList from '~/components/TagList';

type GenericProps = {
  mode?: 'small' | 'full';
  publishedAt?: string;
  readingTime?: string;
};

type SmallMode = GenericProps & {
  mode?: 'small';
};

type FullMode = GenericProps & {
  mode: 'full';
  tags?: Tag[];
  updatedAt?: Nullable<string>;
};

type Props = SmallMode | FullMode;

const PostMeta = (props: Props) => {
  const { mode, publishedAt, readingTime } = props;

  if (mode === 'full') {
    const { tags, updatedAt } = props;
    const formattedUpdatedDate = formatDate(updatedAt);

    return (
      <div className="not-prose flex flex-col gap-2 border-b border-b-slate-300 pb-2.5">
        <div className="flex flex-row justify-between">
          <small>{publishedAt}</small>
          <small>{formattedUpdatedDate}</small>
          <small>{readingTime}</small>
        </div>

        <div className="flex flex-row justify-between">
          <TagList small tags={tags} />
        </div>
      </div>
    );
  }

  return (
    <div className="not-prose flex flex-row justify-between">
      <small>{publishedAt}</small>
      <small>{readingTime}</small>
    </div>
  );
};

export default PostMeta;
