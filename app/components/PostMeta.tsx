import type { Nullable, Tag } from '@tryghost/content-api';
import { formatDate } from '~/utils/formats';
import TagList from '~/components/TagList';
import IconLabel from '~/components/IconLabel';
import classnames from 'classnames';

type GenericProps = {
  mode?: 'small' | 'full';
  publishedAt?: string;
  readingTime?: string;
  className?: string;
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
      <div
        className={classnames(
          props.className,
          'not-prose flex flex-col gap-2 border-b-2 border-b-nord-2 pb-5 text-nord-polarnight-0-500 dark:text-nord-snowstorm-0-400',
        )}
      >
        <div className="flex flex-col sm:flex-row justify-between">
          <small>
            <IconLabel
              title={`Published on ${publishedAt}`}
              name="calendar-day"
            >
              {publishedAt}
            </IconLabel>
          </small>
          <small className="flex flex-row gap-2.5 items-baseline">
            <IconLabel
              title={`Updated on ${formattedUpdatedDate}`}
              name="square-pen"
            >
              {formattedUpdatedDate}
            </IconLabel>
          </small>
          <small>
            <IconLabel
              title={`Estimated reading time ${readingTime}`}
              name="stopwatch"
            >
              {readingTime}
            </IconLabel>
          </small>
        </div>

        <div className="flex flex-row justify-between">
          <TagList small tags={tags} />
        </div>
      </div>
    );
  }

  return (
    <div
      className={classnames(
        props.className,
        'not-prose flex flex-row justify-between',
      )}
    >
      <small>
        <IconLabel title={`Published on ${publishedAt}`} name="calendar-day">
          {publishedAt}
        </IconLabel>
      </small>
      <small>
        <IconLabel
          title={`Estimated reading time ${readingTime}`}
          name="stopwatch"
        >
          {readingTime}
        </IconLabel>
      </small>
    </div>
  );
};

export default PostMeta;
