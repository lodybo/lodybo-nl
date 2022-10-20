import type { LinkProps } from '@remix-run/react';
import { Link } from '@remix-run/react';

type Props = LinkProps;

const AnchorLink = ({ children, ...props }: Props) => (
  <Link
    className="no-underline border-b-2 pb-1 border-b-primary-400 transition-all hover:border-b-primary-700"
    {...props}
  >
    {children}
  </Link>
);

export default AnchorLink;
