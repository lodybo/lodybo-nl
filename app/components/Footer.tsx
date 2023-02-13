import { useRouteLoaderData } from '@remix-run/react';
import {
  SocialMediaList,
  SocialMediaListItem,
} from '~/components/SocialMediaLinks';
import type { LoaderData } from '~/root';

const Footer = () => {
  const data = useRouteLoaderData('root') as LoaderData;

  return (
    <footer className="border-t border-t-nord-1 dark:border-t-nord-4 py-5 px-10 flex flex-col sm:flex-row justify-between gap-5 sm:gap-0 text-center">
      {data?.currentCopyrightYear && (
        <p>© 2022 - {data?.currentCopyrightYear} | All Rights Reserved.</p>
      )}

      <SocialMediaList>
        <SocialMediaListItem
          url="https://www.twitter.com/lodybo"
          icon="twitter"
          ariaLabel="Twitter"
        />
        <SocialMediaListItem
          rel="me"
          url="https://mastodon.social/@lodybo"
          icon="mastodon"
          ariaLabel="Mastodon"
        />
        <SocialMediaListItem
          url="https://www.github.com/lodybo"
          icon="github"
          ariaLabel="GitHub"
        />
        <SocialMediaListItem
          url="https://www.linkedin.com/in/lodybo"
          icon="linkedin-in"
          ariaLabel="LinkedIn"
        />
      </SocialMediaList>
    </footer>
  );
};

export default Footer;
