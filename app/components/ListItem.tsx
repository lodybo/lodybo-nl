import type { ReactNode } from 'react';
import classNames from 'classnames';
import { Link } from '@remix-run/react';

type Props = {
  id: string;
  featured?: boolean;
  linkTo: string;
  children: ReactNode;
  grid?: boolean;
  forceLastItemSpan?: boolean;
};

const ListItem = ({
  id,
  linkTo,
  children,
  featured = false,
  grid = false,
  forceLastItemSpan = false,
}: Props) => (
  <li
    className={classNames({
      'transition-all': true,
      'last:col-span-2': forceLastItemSpan,
      group: true,

      'border-l-4': !featured,
      'border-l-slate-200': !featured && !grid,
      'hover:border-l-slate-300': !featured && !grid,
      'hover:border-l-8': !featured && !grid,
      'pl-5': !featured,
      'bg-transparent': !featured,

      'p-10': featured && !grid,
      'scale-100': featured || grid,
      'hover:scale-[1.015]': featured || grid,
      'duration-300': featured,
      'border-2': featured && !grid,
      'border-slate-200': featured && !grid,
      'shadow-md': featured && !grid,
      'bg-gradient-to-r from-cyan-200 to-blue-200': featured && !grid,

      'border-l-transparent': grid && !featured,
      'p-5': grid,
      'hover:bg-cyan-100': grid,
      'bg-gradient-to-r from-cyan-100 to-blue-100': grid && featured,
    })}
    key={id}
  >
    <Link className="h-full flex flex-row gap-4" to={linkTo}>
      {children}
    </Link>
  </li>
);

export default ListItem;
