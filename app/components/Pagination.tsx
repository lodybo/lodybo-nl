import type { Pagination } from '@tryghost/content-api';
import PaginationButton from '~/components/PaginationButton';

type Props = Pagination;

export default function PostPagination({ page, pages, next, prev }: Props) {
  return (
    <div className="mt-10">
      <div className="flex flex-col items-center justify-center">
        <ul className="flex space-x-3">
          {prev && (
            <PaginationButton key={prev} page={prev} caption="Previous" />
          )}

          {pages > 1 && (
            <>
              {Array.from({ length: pages }, (_, i) => {
                const pageNumber = i + 1;
                return (
                  <PaginationButton
                    key={pageNumber}
                    page={pageNumber}
                    active={pageNumber === page}
                  />
                );
              })}
            </>
          )}

          {next && <PaginationButton key={next} page={next} caption="Next" />}
        </ul>
      </div>
    </div>
  );
}
