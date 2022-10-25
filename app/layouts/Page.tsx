import type { ReactNode } from 'react';
import Header from '~/components/Header';
import Footer from '~/components/Footer';

type Props = {
  children: ReactNode;
};

const PageLayout = ({ children }: Props) => (
  <div className="flex flex-col min-h-screen">
    <Header />

    <div className="flex-1">{children}</div>

    <Footer />
  </div>
);

export default PageLayout;
