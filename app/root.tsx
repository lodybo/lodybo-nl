import type { LinksFunction, LoaderArgs } from '@remix-run/node';
import { json } from '@remix-run/node';
import { Outlet, useLoaderData } from '@remix-run/react';
import type { SettingsResponse } from '@tryghost/content-api';
import tailwindStylesheetUrl from './styles/tailwind.css';
import { recursiveFontURL } from '~/assets/fonts';
import Document from '~/components/Document';
import { userPrefs } from '~/cookies';
import { getGhostSettings } from '~/models/settings.server';
import type { SnowModeSetting } from '~/hooks/useSnowMode';
import Navigation from '~/components/Navigation';
import MainSection from '~/components/MainSection';
import Prose from '~/components/Prose';

export const links: LinksFunction = () => [
  {
    rel: 'preload',
    href: recursiveFontURL,
    as: 'font',
    type: 'font/woff2',
    crossOrigin: 'anonymous',
  },
  { rel: 'stylesheet', href: tailwindStylesheetUrl },
  { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
  {
    rel: 'apple-touch-icon-precomposed',
    sizes: '180x180',
    href: '/apple-touch-icon.png',
  },
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

export type LoaderData = {
  cardsScriptUrl: string;
  cardsCssUrl: string;
  darkModeEnabled: any;
  animationEnabled: any;
  snowModeEnabled: SnowModeSetting;
  currentCopyrightYear: string;
  ghostSettings?: SettingsResponse | undefined;
};

export const loader = async ({ request }: LoaderArgs) => {
  const ghostSettings = await getGhostSettings();
  const cookieHeader = request.headers.get('Cookie');
  const cookie = (await userPrefs.parse(cookieHeader)) || {};

  let snowModeEnabled: SnowModeSetting = null;
  if (process.env.SNOW_MODE_ENABLED === 'true') {
    snowModeEnabled = cookie.snowModeEnabled;
  }

  const data: LoaderData = {
    cardsScriptUrl: `${process.env.GHOST_URL}/public/cards.min.js`,
    cardsCssUrl: `${process.env.GHOST_URL}/public/cards.min.css`,
    darkModeEnabled: cookie.darkModeEnabled,
    animationEnabled: cookie.animationEnabled,
    snowModeEnabled,
    ghostSettings,
    currentCopyrightYear: new Date().getFullYear().toString(),
  };

  return json(data);
};

export default function App() {
  const { cardsScriptUrl, cardsCssUrl, ghostSettings } =
    useLoaderData<typeof loader>();

  return (
    <Document
      cardsScriptUrl={cardsScriptUrl}
      cardsCssUrl={cardsCssUrl}
      siteUrl={ghostSettings?.url || ''}
    >
      <Outlet />
    </Document>
  );
}

export function ErrorBoundary({ error }: { error: Error }) {
  return (
    <Document>
      <Navigation />
      <MainSection className="mt-10">
        <Prose isPost>
          <h1>Oops.. Something went wrong!</h1>

          <p>
            It's not you, it's us. We encountered an error and reported it.
            <br />
            If you're curious, this is what it said:
          </p>

          <pre className="language-jsstacktrace">
            <code className="language-jsstacktrace whitespace-normal">
              {error.message}
            </code>
          </pre>
        </Prose>
      </MainSection>
    </Document>
  );
}
