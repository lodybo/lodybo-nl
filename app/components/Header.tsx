import { Link } from '@remix-run/react';

const Header = () => {
  return (
    <header className="border-b py-5 px-10 flex flex-row justify-between">
      <h1 className="text-xl">
        <Link to="/">Lodybo</Link>
      </h1>

      <ul className="flex flex-row gap-5">
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

export default Header;
