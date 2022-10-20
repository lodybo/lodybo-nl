import type { ReactNode } from 'react';
import PageLayout from '~/layouts/Page';

type Props = {
  children: ReactNode;
};

const ListPageLayout = ({ children }: Props) => (
  <PageLayout>
    <div className="px-20 mx-auto">{children}</div>
  </PageLayout>
);

export default ListPageLayout;
