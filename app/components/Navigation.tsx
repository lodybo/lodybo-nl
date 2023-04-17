import { forwardRef } from 'react';
import type { HTMLAttributeAnchorTarget, RefObject } from 'react';
import { NavLink } from '@remix-run/react';
import DarkModeToggle from '~/components/DarkModeToggle';
import SnowModeToggle from '~/components/SnowModeToggle';
import { useDarkMode } from '~/hooks/useDarkMode';
import { useSnowMode } from '~/hooks/useSnowMode';
import { useHasScrolled } from '~/hooks/hasScrolled';
import AnimationToggle from '~/components/AnimationToggle';
import { useAnimationMode } from '~/hooks/useAnimationMode';
import lody from '~/assets/images/lody.svg';

type Props = {
  /**
   * Which background the navigation should have.
   */
  background?: NavigationBackground;

  /**
   * Whether the navigation should be hidden or not.
   */
  hidden?: boolean;

  /**
   * A ref to the navigation element.
   */
  ref?: RefObject<HTMLElement>;

  /**
   * The position of the navigation.
   * @default 'relative'
   */
  position?: 'fixed' | 'relative';
};

export enum NavigationVisibility {
  VISIBLE = 'visible',
  HIDDEN = 'hidden',
}

export enum NavigationBackground {
  TRANSPARENT = 'transparent',

  TRANSLUCENT = 'translucent',

  SOLID = 'solid',
}

const Navigation = forwardRef<HTMLElement, Props>(
  (
    {
      background = NavigationBackground.SOLID,
      hidden = false,
      position = 'relative',
    },
    ref,
  ) => {
    const [darkModeIsEnabled] = useDarkMode();
    const [snowModeIsEnabled] = useSnowMode();
    const [animationModeIsEnabled] = useAnimationMode();
    const [hasScrolled] = useHasScrolled();

    let backgroundClass;

    switch (background) {
      case NavigationBackground.SOLID:
        backgroundClass =
          'bg-nord-6 dark:bg-nord-0 border-b-nord-1 dark:border-b-nord-4';
        break;

      case NavigationBackground.TRANSLUCENT:
        backgroundClass = 'bg-nord-6/75 dark:bg-nord-0/75 border-b-0';
        break;

      case NavigationBackground.TRANSPARENT:
      default:
        backgroundClass = 'bg-transparent border-b-0';
    }

    return (
      <header
        ref={ref}
        className={`${position} w-full z-10 top-0 border-b-2 ${
          hidden ? (hasScrolled ? 'opacity-100' : 'opacity-0') : 'opacity-100'
        } ${backgroundClass} transition-opacity duration-300 py-5 px-5 sm:px-10 gap-5 flex flex-col sm:flex-row items-center justify-between h-auto sm:h-20`}
      >
        <NavLink
          className="flex flex-row gap-2.5 hover:gap-4 transition-all items-center"
          to="/"
        >
          <img className="w-14" src={lody} alt="Me" />

          <h1 className="text-xl sm:text-2xl md:text-3xl">Lodybo</h1>
        </NavLink>

        <ul className="flex flex-row gap-5 items-center text-lg md:text-xl">
          <li>
            <NavigationLink to="/music">Music</NavigationLink>
          </li>
          <li>
            <NavigationLink to="/development">Development</NavigationLink>
          </li>
          <li>
            <NavigationLink to="/posts">Blog</NavigationLink>
          </li>
          <li>
            <NavigationLink to="/me">Me</NavigationLink>
          </li>
          <li>
            <NavigationLink to="/uses">Uses</NavigationLink>
          </li>
          <li>
            <NavigationLink to="/contact">Contact</NavigationLink>
          </li>
          {snowModeIsEnabled !== null && (
            <li>
              <SnowModeToggle />
            </li>
          )}
          <li>
            <AnimationToggle enabled={animationModeIsEnabled} />
          </li>
          <li>
            <DarkModeToggle enabled={darkModeIsEnabled} />
          </li>
        </ul>
      </header>
    );
  },
);
Navigation.displayName = 'Navigation';

export default Navigation;

type BaseNavigationLinkProps = {
  children: string;
};

type InternalNavigationLinkProps = BaseNavigationLinkProps & {
  to: string;
  href?: never;
};

type ExternalNavigationLinkProps = BaseNavigationLinkProps & {
  to?: never;
  href: string;
  target?: HTMLAttributeAnchorTarget;
  rel?: string;
};

type NavigationLinkProps =
  | InternalNavigationLinkProps
  | ExternalNavigationLinkProps;

function NavigationLink({ children, ...props }: NavigationLinkProps) {
  const { href } = props;

  const classes = `
    relative 
    text-nord-0
    dark:text-nord-6
    before:content-['']
    before:absolute
    before:w-full
    before:h-0.5
    before:bottom-[-5px]
    before:left-0
    before:bg-nord-0
    before:dark:bg-nord-6
    before:transition-all
    before:duration-300
    before:ease-in-out
    hover:before:visible
    hover:before:scale-x-100
  `;

  if (href) {
    const { href: to, target, rel } = props;
    return (
      <a
        className={`${classes} before:invisible before:scale-x-0`}
        href={to}
        target={target}
        rel={rel}
      >
        {children}
      </a>
    );
  }

  const { to } = props;
  if (!to)
    throw new Error('NavigationLink must have either a `to` or `href` prop.');

  return (
    <NavLink
      className={({ isActive }) => {
        return `${classes} ${
          isActive
            ? 'before:visible before:scale-x-100'
            : 'before:invisible before:scale-x-0'
        }`;
      }}
      to={to}
    >
      {children}
    </NavLink>
  );
}
