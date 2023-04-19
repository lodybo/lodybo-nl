import React from 'react';
import type { IconName, IconPrefix } from '@fortawesome/fontawesome-svg-core';
import { icon, library } from '@fortawesome/fontawesome-svg-core';
import {
  faCalendarDay,
  faSquarePen,
  faStopwatch,
  faArrowRight,
  faMoon,
  faSun,
  faFilm,
  faArrowsUpDown,
} from '@fortawesome/free-solid-svg-icons';
import { faSnowflake } from '@fortawesome/free-regular-svg-icons';
import {
  faTwitter,
  faGithub,
  faMastodon,
  faLinkedinIn,
  faInstagram,
} from '@fortawesome/free-brands-svg-icons';

library.add(
  faCalendarDay,
  faSquarePen,
  faStopwatch,
  faTwitter,
  faGithub,
  faArrowRight,
  faSun,
  faMoon,
  faSnowflake,
  faMastodon,
  faLinkedinIn,
  faFilm,
  faInstagram,
  faArrowsUpDown,
);

export type Props = {
  className?: React.HTMLAttributes<HTMLSpanElement>['className'];
  prefix?: Extract<IconPrefix, 'fas' | 'fab' | 'far'>;
  name: IconName;
  iconClasses?: string;
  title?: string;
};

const Icon = ({
  name,
  prefix = 'fas',
  className = '',
  iconClasses = '',
  title = '',
}: Props) => {
  const iconHTML = icon(
    {
      prefix,
      iconName: name,
    },
    {
      classes: iconClasses,
      styles: {
        height: '1em',
      },
    },
  ).html;

  return (
    <span
      title={title}
      className={className}
      dangerouslySetInnerHTML={{ __html: iconHTML[0] }}
    />
  );
};

export default Icon;
