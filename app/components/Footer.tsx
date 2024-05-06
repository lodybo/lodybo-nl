import { useRouteLoaderData } from '@remix-run/react';
import {
  SocialMediaList,
  SocialMediaListItem,
} from '~/components/SocialMediaLinks';
import type { LoaderData } from '~/root';
import NowPlaying from '~/components/NowPlaying';

const Footer = () => {
  const data = useRouteLoaderData('root') as LoaderData;

  return (
    <footer
      className="
      border-t
      border-t-nord-1
      dark:border-t-nord-4
      py-5
      px-10
      grid
      [grid-template-areas:_'copyright'_'socials'_'spotify']
      sm:[grid-template-areas:_'copyright_socials'_'spotify_spotify']
      lg:[grid-template-areas:_'copyright_socials_spotify']
      grid-cols-1
      sm:grid-cols-2
      lg:grid-cols-3
      grid-rows-1
      justify-between
      gap-10
      sm:gap-5
      text-center
      items-center
    "
    >
      <div className="flex-1 [grid-area:copyright]">
        {data?.currentCopyrightYear && (
          <>
            <p>© 2022 - {data?.currentCopyrightYear}</p>
            <p>All Rights Reserved.</p>
          </>
        )}
      </div>

      <div className="flex-1 [grid-area:socials]">
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
      </div>

      <div className="flex-1 [grid-area:spotify] flex justify-center">
        <NowPlaying />
      </div>
    </footer>
  );
};

export default Footer;
