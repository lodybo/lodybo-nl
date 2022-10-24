import React from 'react';
import type { IconName, IconPrefix } from '@fortawesome/fontawesome-svg-core';
import {
  icon as fontAwesomeIcon,
  toHtml,
} from '@fortawesome/fontawesome-svg-core';

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
  const icon = fontAwesomeIcon(
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
  ).abstract.shift();

  return (
    <span
      title={title}
      className={className}
      dangerouslySetInnerHTML={{ __html: toHtml(icon) }}
    />
  );
};

export default Icon;
