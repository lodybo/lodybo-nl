import type { LinksFunction, LoaderArgs, MetaFunction } from '@remix-run/node';
import { json } from '@remix-run/node';
import { Outlet, useLoaderData } from '@remix-run/react';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faCalendarDay,
  faSquarePen,
  faStopwatch,
  faArrowRight,
  faMoon,
  faSun,
} from '@fortawesome/free-solid-svg-icons';
import { faTwitter, faGithub } from '@fortawesome/free-brands-svg-icons';
import tailwindStylesheetUrl from './styles/tailwind.css';
import { recursiveFontURL } from '~/assets/fonts';
import ListPageLayout from '~/layouts/ListPage';
import Document from '~/components/Document';
import { userPrefs } from '~/cookies';
import { getGhostSettings } from '~/models/settings.server';

library.add(
  faCalendarDay,
  faSquarePen,
  faStopwatch,
  faTwitter,
  faGithub,
  faArrowRight,
  faSun,
  faMoon,
);

export const meta: MetaFunction = ({ data: { ghostSettings }, location }) => ({
  charset: 'utf-8',
  title: 'Lodybo',
  viewport: 'width=device-width,initial-scale=1',
  'og:site_name': ghostSettings.meta_title,
  'og:type': 'website',
  'og:title': ghostSettings.meta_title,
  'og:description': ghostSettings.meta_description,
  'og:url': `${ghostSettings.url}${location.pathname.substring(1)}`,
  'og:image': ghostSettings.cover_image,
  'article:publisher': ghostSettings.facebook,
  'twitter:card': 'summary_large_image',
  'twitter:site': ghostSettings.twitter_title,
  'twitter:title': ghostSettings.meta_title,
  'twitter:description': ghostSettings.meta_description,
  'twitter:url': `${ghostSettings.url}${location.pathname.substring(1)}`,
  'twitter:image': ghostSettings.cover_image,
});

export const links: LinksFunction = () => [
  {
    rel: 'preload',
    href: recursiveFontURL,
    as: 'font',
    type: 'font/woff2',
    crossOrigin: 'anonymous',
  },
  {
    rel: 'stylesheet',
    href: '/prism/prism-1.29.0.css',
  },
  { rel: 'stylesheet', href: tailwindStylesheetUrl },
  { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
  {
    rel: 'icon',
    type: 'image/png',
    sizes: '32x32',
    href: '/favicon-32x32.png',
  },
  {
    rel: 'icon',
    type: 'image/png',
    sizes: '16x16',
    href: '/favicon-16x16.png',
  },
  { rel: 'manifest', href: '/site.webmanifest' },
];

export const loader = async ({ request }: LoaderArgs) => {
  const ghostSettings = await getGhostSettings();
  const cookieHeader = request.headers.get('Cookie');
  const cookie = (await userPrefs.parse(cookieHeader)) || {};

  return json({
    cardsScriptUrl: `${process.env.GHOST_URL}/public/cards.min.js`,
    cardsCssUrl: `${process.env.GHOST_URL}/public/cards.min.css`,
    rssUrl: `${process.env.GHOST_URL}/rss/`,
    darkModeEnabled: cookie.darkModeEnabled,
    ghostSettings,
  });
};

export default function App() {
  const { cardsScriptUrl, cardsCssUrl, rssUrl, ghostSettings } =
    useLoaderData<typeof loader>();

  return (
    <Document
      cardsScriptUrl={cardsScriptUrl}
      cardsCssUrl={cardsCssUrl}
      rssUrl={rssUrl}
      siteUrl={ghostSettings.url}
    >
      <Outlet />
    </Document>
  );
}

export function ErrorBoundary({ error }: { error: Error }) {
  return (
    <Document>
      <ListPageLayout>
        <div className="prose prose-xl max-w-none">
          <h1>Oops.. Something went wrong!</h1>

          <p>
            It's not you, it's us. We encountered an error and reported it.
            <br />
            If you're curious, this is what it said:
          </p>

          <pre className="language-jsstacktrace">
            <code className="language-jsstacktrace">{error.message}</code>
          </pre>
        </div>
      </ListPageLayout>
    </Document>
  );
}
