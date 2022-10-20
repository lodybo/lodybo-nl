import type { ReactNode } from 'react';
import Header from '~/components/Header';

type Props = {
  children: ReactNode;
};

const ListPageLayout = ({ children }: Props) => (
  <div>
    <Header />

    <div className="mt-10 px-20 mx-auto">{children}</div>
  </div>
);

export default ListPageLayout;
