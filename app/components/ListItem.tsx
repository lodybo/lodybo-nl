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
      'border-l-slate-200': !featured && !grid,
      'hover:border-l-slate-300': !featured && !grid,
      'dark:border-l-slate-700': !featured && !grid,
      'dark:hover:border-l-slate-600': !featured && !grid,
      'hover:border-l-8': !featured && !grid,
      'pl-5': !featured,
      'bg-transparent': !featured,

      'p-10': featured && !grid,
      'scale-100': featured || grid,
      'hover:scale-[1.015]': featured || grid,
      'duration-300': featured,
      'shadow-md': featured && !grid,
      'dark:shadow-slate-700/50': featured && !grid,
      'bg-gradient-to-r from-teal-50 to-cyan-100': featured && !grid,
      'dark:bg-gradient-to-r dark:from-teal-800 dark:to-cyan-900': featured,

      'border-l-transparent': grid && !featured,
      'p-5': grid,
      'hover:bg-cyan-100': grid,
      'dark:hover:bg-cyan-900': grid,
      'bg-gradient-to-r from-teal-50 to-cyan-200': grid && featured,
    })}
    key={id}
  >
    {children}
  </li>
);

export default ListItem;
