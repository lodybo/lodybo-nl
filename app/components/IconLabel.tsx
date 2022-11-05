import type { ReactNode } from 'react';
import type { Props as IconProps } from './Icon';
import Icon from './Icon';

type Props = Omit<IconProps, 'className'> & {
  children: ReactNode;
};

const IconLabel = ({ title, name, prefix, iconClasses, children }: Props) => (
  <span className="flex flex-row gap-2.5 items-center">
    <Icon
      className="text-nord-polarnight-0-600 dark:text-nord-snowstorm-0-300"
      title={title}
      name={name}
      prefix={prefix}
      iconClasses={iconClasses}
    />
    {children}
  </span>
);

export default IconLabel;
