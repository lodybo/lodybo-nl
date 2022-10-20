import type { ReactNode } from 'react';
import Header from '~/components/Header';

type Props = {
  children: ReactNode;
};

const PageLayout = ({ children }: Props) => (
  <div>
    <Header />

    <div>{children}</div>
  </div>
);

export default PageLayout;
