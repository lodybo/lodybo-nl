import { Link } from '@remix-run/react';
import DarkModeToggle from '~/components/DarkModeToggle';
import SnowModeToggle from '~/components/SnowModeToggle';
import { useDarkMode } from '~/hooks/useDarkMode';
import { useSnowMode } from '~/hooks/useSnowMode';
import lody from '~/assets/images/lody.svg';
import { useHasScrolled } from '~/hooks/hasScrolled';
import type { RefObject } from 'react';
import { forwardRef } from 'react';

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
        <Link
          className="flex flex-row gap-2.5 hover:gap-4 transition-all items-center"
          to="/"
        >
          <img className="w-14" src={lody} alt="Me" />

          <h1 className="text-xl sm:text-2xl md:text-3xl">Lodybo</h1>
        </Link>

        <ul className="flex flex-row gap-5 items-center text-lg md:text-xl">
          {snowModeIsEnabled !== null && (
            <li>
              <SnowModeToggle />
            </li>
          )}
          <li>
            <DarkModeToggle enabled={darkModeIsEnabled} />
          </li>
          <li>
            <Link to="/posts">Posts</Link>
          </li>
          <li>
            <Link to="/topics">Topics</Link>
          </li>
        </ul>
      </header>
    );
  },
);
Navigation.displayName = 'Navigation';

export default Navigation;
