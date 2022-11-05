import type { ReactNode } from 'react';
import classNames from 'classnames';

type Props = {
  id: string;
  featured?: boolean;
  children: ReactNode;
  grid?: boolean;
  forceLastItemSpan?: boolean;
};

const ListItem = ({
  id,
  children,
  featured = false,
  grid = false,
  forceLastItemSpan = false,
}: Props) => (
  <li
    className={classNames({
      'transition-all': true,
      'md:last:col-span-2': forceLastItemSpan,
      group: true,
      'h-full flex flex-col gap-4': true,

      'border-l-4': !featured,
      'border-l-nord-4': !featured && !grid,
      'hover:border-l-nord-9': !featured && !grid,
      'dark:border-l-nord-2': !featured && !grid,
      'dark:hover:border-l-nord-9': !featured && !grid,
      'hover:border-l-8': !featured && !grid,
      'pl-5': !featured,
      'bg-transparent': !featured,

      'p-10': featured && !grid,
      'scale-100': featured || grid,
      'hover:scale-[1.015]': featured || grid,
      'duration-300': featured,
      'shadow-md': featured && !grid,
      'dark:shadow-nord-3/75': featured && !grid,
      'bg-gradient-to-r from-nord-frost-1-200 to-nord-frost-3-300': featured,
      'dark:bg-gradient-to-r dark:from-nord-frost-1-500 dark:to-nord-frost-3-600':
        featured,

      'border-l-transparent': grid && !featured,
      'p-5': grid,
      'hover:bg-nord-frost-1-200': grid,
      'dark:hover:bg-nord-frost-1-800': grid,
    })}
    key={id}
  >
    {children}
  </li>
);

export default ListItem;
