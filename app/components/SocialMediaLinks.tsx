import type { ReactNode } from 'react';
import type { IconName } from '@fortawesome/fontawesome-svg-core';
import Icon from '~/components/Icon';

type ListProps = {
  children: ReactNode;
};

type ListItemProps = {
  url: string;
  icon: IconName;
  handle?: string;

  rel?: string;
};

export const SocialMediaList = ({ children }: ListProps) => (
  <ul className="flex flex-row gap-5 justify-center">{children}</ul>
);

export const SocialMediaListItem = ({
  url,
  icon,
  handle,
  rel = '',
}: ListItemProps) => (
  <li>
    <a
      className="flex flex-row gap-1.5 items-center"
      href={url}
      target="_blank"
      rel={`noopener ${rel}`}
    >
      <Icon prefix="fab" name={icon} className="text-xl" />
      {handle && <small>@{handle}</small>}
    </a>
  </li>
);
