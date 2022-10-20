import type { ReactNode } from 'react';
import classNames from 'classnames';
import { Link } from '@remix-run/react';

type Props = {
  id: string;
  featured?: boolean;
  linkTo: string;
  children: ReactNode;
};

const ListItem = ({ id, linkTo, children, featured = false }: Props) => (
  <li
    className={classNames({
      'transition-all': true,

      'border-l-4': !featured,
      'border-l-slate-200': !featured,
      'hover:border-l-slate-300': !featured,
      'hover:border-l-8': !featured,
      'pl-5': !featured,

      'p-10': featured,
      'text-white': featured,
      'scale-100': featured,
      'hover:scale-[1.015]': featured,
      'duration-300': featured,
      'border-2': featured,
      'border-slate-200': featured,
      'shadow-md': featured,
      'bg-gradient-to-r from-cyan-500 to-blue-500': featured,
    })}
    key={id}
  >
    <Link className="flex flex-col gap-2.5" to={linkTo}>
      {children}
    </Link>
  </li>
);

export default ListItem;
