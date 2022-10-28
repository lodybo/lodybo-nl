import { Link } from '@remix-run/react';
import DarkModeToggle from '~/components/DarkModeToggle';
import { useDarkMode } from '~/utils/matches';

const Header = () => {
  const darkModeIsEnabled = useDarkMode();

  return (
    <header className="border-b py-5 px-5 sm:px-10 gap-5 flex flex-row items-center justify-between h-20">
      <h1 className="text-xl sm:text-2xl md:text-3xl">
        <Link to="/">Lodybo</Link>
      </h1>

      <ul className="flex flex-row gap-5 items-center text-lg md:text-xl">
        <li>
          <Link to="/posts">Posts</Link>
        </li>
        <li>
          <Link to="/topics">Topics</Link>
        </li>
        <li>
          <DarkModeToggle enabled={darkModeIsEnabled} />
        </li>
      </ul>
    </header>
  );
};

export default Header;
