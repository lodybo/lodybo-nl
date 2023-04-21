import type { AnchorHTMLAttributes } from 'react';
import type { LinkProps } from '@remix-run/react';
import { Link } from '@remix-run/react';

type AnchorLinkProps = LinkProps;

type ExternalAnchorLinkProps = AnchorHTMLAttributes<HTMLAnchorElement>;

type Props = AnchorLinkProps | ExternalAnchorLinkProps;

const AnchorLink = ({ children, className = '', ...props }: Props) => {
  const classes = `no-underline border-b-2 pb-1 transition-all border-b-nord-frost-1-300 hover:border-b-nord-frost-1-600 dark:border-b-nord-frost-1-600 dark:hover:border-b-nord-frost-1-300 ${className}`;

  if ((props as AnchorLinkProps).to) {
    return (
      <Link className={classes} {...(props as LinkProps)}>
        {children}
      </Link>
    );
  }

  return (
    <a className={classes} {...props} rel="noopener">
      {children}
    </a>
  );
};

export default AnchorLink;
