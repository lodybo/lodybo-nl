import { useRouteData } from 'remix-utils';
import Icon from '~/components/Icon';
import type { LoaderData } from '~/root';

const Footer = () => {
  // TODO: When moving to Remix's native useRouteData, remove the type assertion in root.tsx.
  const data = useRouteData<LoaderData>('root');

  return (
    <footer className="border-t border-t-nord-1 dark:border-t-nord-4 py-5 px-10 flex flex-row justify-between">
      {data?.currentCopyrightYear && (
        <p>© 2022 - {data?.currentCopyrightYear} | All Rights Reserved.</p>
      )}

      <ul className="flex flex-row gap-5">
        <li>
          <a
            className="flex flex-row gap-1.5 items-center"
            href="https://www.twitter.com/lodybo"
            target="_blank"
            rel="noopener"
          >
            <Icon prefix="fab" name="twitter" />
            <small>@lodybo</small>
          </a>
        </li>

        <li>
          <a
            className="flex flex-row gap-1.5 items-center"
            href="https://www.github.com/lodybo"
            target="_blank"
            rel="noopener"
          >
            <Icon prefix="fab" name="github" />
            <small>@lodybo</small>
          </a>
        </li>
      </ul>
    </footer>
  );
};

export default Footer;
