import { Link } from '@remix-run/react';

const Header = () => {
  return (
    <div className="border-b mb-10 py-5 px-10 flex flex-row justify-between">
      <h1>Lodybo</h1>

      <ul>
        <li>
          <Link to="/posts">Posts</Link>
        </li>
      </ul>
    </div>
  );
};

export default Header;
