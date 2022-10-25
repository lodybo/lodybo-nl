import type { AnchorHTMLAttributes } from 'react';
import type { LinkProps } from '@remix-run/react';
import { Link } from '@remix-run/react';

type AnchorLinkProps = LinkProps;

type ExternalAnchorLinkProps = AnchorHTMLAttributes<HTMLAnchorElement>;

type Props = AnchorLinkProps | ExternalAnchorLinkProps;

const AnchorLink = ({ children, ...props }: Props) => {
  const className =
    'no-underline border-b-2 pb-1 border-b-primary-400 transition-all hover:border-b-primary-700';

  if ((props as AnchorLinkProps).to) {
    return (
      <Link className={className} {...(props as LinkProps)}>
        {children}
      </Link>
    );
  }

  return (
    <a className={className} {...props} rel="noopener">
      {children}
    </a>
  );
};

export default AnchorLink;
