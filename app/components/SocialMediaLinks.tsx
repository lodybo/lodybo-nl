import type { ReactNode } from 'react';
import type { IconName } from '@fortawesome/fontawesome-svg-core';
import Icon from '~/components/Icon';

type ListProps = {
  children: ReactNode;

  alignment?: 'left' | 'center' | 'right';

  stacked?: boolean;
};

type ListItemProps = {
  url: string;
  icon: IconName;

  handle?: string;

  title?: string;

  rel?: string;

  ariaLabel: string;
};

export const SocialMediaList = ({
  children,
  stacked = false,
  alignment = 'center',
}: ListProps) => (
  <ul
    className={`flex gap-10 sm:gap-5 ${stacked ? 'flex-col' : 'flex-row'} ${
      alignment === 'center'
        ? 'justify-center'
        : alignment === 'left'
        ? 'justify-start'
        : 'justify-end'
    }`}
  >
    {children}
  </ul>
);

export const SocialMediaListItem = ({
  url,
  icon,
  handle,
  title,
  ariaLabel,
  rel = '',
}: ListItemProps) => (
  <li>
    <a
      className="flex flex-row gap-1.5 items-center"
      href={url}
      aria-label={ariaLabel}
      target="_blank"
      rel={`noopener ${rel}`}
    >
      <Icon prefix="fab" name={icon} className="text-4xl sm:text-2xl" />
      {handle && <p>@{handle}</p>}
      {title && <p>{title}</p>}
    </a>
  </li>
);
