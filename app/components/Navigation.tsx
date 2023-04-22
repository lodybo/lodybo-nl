import { forwardRef, useState } from 'react';
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
import Icon from '~/components/Icon';

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
    const [menuIsExpanded, setMenuIsExpanded] = useState(false);

    let backgroundClass;

    switch (background) {
      case NavigationBackground.SOLID:
        backgroundClass =
          'bg-nord-6 dark:bg-nord-0 border-b-nord-1 dark:border-b-nord-4';
        break;

      case NavigationBackground.TRANSLUCENT:
        backgroundClass = 'bg-nord-6/90 dark:bg-nord-0/90 border-b-0';
        break;

      case NavigationBackground.TRANSPARENT:
      default:
        backgroundClass = 'bg-transparent border-b-0';
    }

    const handleMenuToggle = () => {
      setMenuIsExpanded(!menuIsExpanded);
    };

    return (
      <header
        ref={ref}
        className={`${position} w-full z-10 top-0 border-b-2 ${
          hidden ? (hasScrolled ? 'opacity-100' : 'opacity-0') : 'opacity-100'
        } ${backgroundClass} transition-opacity duration-300 px-5 sm:px-10 grid grid-cols-[15rem_1fr] grid-rows-[5rem_1fr] lg:grid-rows-1 [grid-template-areas:_'logo_toggle'_'menu_menu'] lg:[grid-template-areas:_'logo_menu'] items-center justify-between h-auto lg:h-20`}
      >
        <NavLink
          className="[grid-area:logo] flex flex-row gap-2.5 hover:gap-4 transition-all items-center"
          to="/"
        >
          <img className="w-14" src={lody} alt="Me" />

          <h1 className="text-4xl">Lodybo</h1>
        </NavLink>

        <ul
          className={`[grid-area:menu] mb-5 sm:mb-0 w-full lg:w-auto lg:flex flex-col flex-wrap h-auto sm:h-64 ${
            menuIsExpanded ? 'flex' : 'hidden'
          } lg:h-auto lg:flex-row gap-5 items-center text-3xl lg:text-xl justify-self-end`}
        >
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
            <NavigationLink to="/resume">Resume</NavigationLink>
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

        <button
          className="[grid-area:toggle] cursor-pointer lg:hidden justify-self-end pr-5"
          onClick={handleMenuToggle}
        >
          <Icon name="bars" />
        </button>
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
