import type { ReactNode } from 'react';
import Icon from '~/components/Icon';
import AnchorLink from '~/components/AnchorLink';

type Props = {
  /**
   * The URL to link to.
   */
  to: string;

  /**
   * The text to display.
   */
  children: ReactNode;
};

export default function ActionLink({ to, children }: Props) {
  return (
    <AnchorLink to={to}>
      <span className="flex flex-row items-center gap-2 hover:gap-3 transition-all">
        {children} <Icon name="arrow-right" />
      </span>
    </AnchorLink>
  );
}
