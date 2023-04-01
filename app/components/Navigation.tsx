import { Link } from '@remix-run/react';
import DarkModeToggle from '~/components/DarkModeToggle';
import SnowModeToggle from '~/components/SnowModeToggle';
import { useDarkMode } from '~/hooks/useDarkMode';
import { useSnowMode } from '~/hooks/useSnowMode';
import lody from '~/assets/images/lody.svg';
import { useHasScrolled } from '~/hooks/hasScrolled';

type Props = {
  /**
   * Whether the navigation should have a background or not.
   */
  hasBackground?: boolean;

  /**
   * Whether the navigation should be hidden or not.
   */
  hidden?: boolean;
};

export enum NavigationVisibility {
  VISIBLE = 'visible',
  HIDDEN = 'hidden',
}

export enum NavigationBackground {
  TRANSPARENT = 'transparent',
  SOLID = 'solid',
}

const Navigation = ({ hasBackground, hidden }: Props) => {
  const [darkModeIsEnabled] = useDarkMode();
  const [snowModeIsEnabled] = useSnowMode();
  const [hasScrolled] = useHasScrolled();

  return (
    <header
      className={`fixed w-full z-10 top-0 border-b-2 ${
        hidden ? (hasScrolled ? 'opacity-100' : 'opacity-0') : 'opacity-100'
      } ${
        hasBackground
          ? 'bg-nord-6 dark:bg-nord-0 border-b-nord-1 dark:border-b-nord-4'
          : 'bg-nord-6/50 dark:bg-nord-0/50 border-b-0'
      } transition-opacity duration-300 py-5 px-5 sm:px-10 gap-5 flex flex-col sm:flex-row items-center justify-between h-auto sm:h-20`}
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
};

export default Navigation;
