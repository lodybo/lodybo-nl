import type { ReactNode } from 'react';
import type { Nullable } from '@tryghost/content-api';
import classNames from 'classnames';
import classnames from 'classnames';

type Props = {
  title: string;
  description?: Nullable<string>;
  image?: Nullable<string>;
  children: ReactNode;
  grid?: boolean;
};

const List = ({ title, description, image, children, grid = false }: Props) => (
  <div className="px-5">
    <div className="flex flex-row gap-5 mb-10">
      {image && (
        <div className="w-32">
          <img src={image} alt={title} />
        </div>
      )}

      <div className="w-full">
        <h1
          className={classNames('text-4xl', {
            'mb-5': !!description,
          })}
        >
          {title}
        </h1>

        {description && <p className="mb-5">{description}</p>}
      </div>
    </div>

    <ul
      className={classnames('gap-10', {
        flex: !grid,
        'flex-col': !grid,

        grid: grid,
        'grid-cols-2': grid,
        'auto-rows-min': grid,
      })}
    >
      {children}
    </ul>
  </div>
);

export default List;
