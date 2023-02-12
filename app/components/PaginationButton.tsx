import { Link } from '@remix-run/react';

type Props = {
  page: number;
  caption?: string;
  active?: boolean;
};

export default function PaginationButton({ page, caption, active }: Props) {
  return (
    <li>
      <Link
        to={`/posts?page=${page}`}
        className={`
          px-4 py-2 rounded-sm hover:bg-nord-frost-1-700
          ${
            active
              ? 'bg-nord-frost-1-500 hover:bg-nord-frost-1-400 text-white'
              : 'text-gray-500'
          }
        `}
      >
        {caption || page}
      </Link>
    </li>
  );
}
