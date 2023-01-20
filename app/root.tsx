import type {
  LinksFunction,
  LoaderArgs,
  MetaDescriptor,
  MetaFunction,
} from '@remix-run/node';
import { json } from '@remix-run/node';
import { Outlet, useLoaderData } from '@remix-run/react';
import type { SettingsResponse } from '@tryghost/content-api';
import tailwindStylesheetUrl from './styles/tailwind.css';
import { recursiveFontURL } from '~/assets/fonts';
import ListPageLayout from '~/layouts/ListPage';
import Document from '~/components/Document';
import { userPrefs } from '~/cookies';
import { getGhostSettings } from '~/models/settings.server';

export const meta: MetaFunction<typeof loader> = ({ data, location }) => {
  const baseMetaData: MetaDescriptor = {
    charSet: 'utf-8',
    title: 'Lodybo',
    viewport: 'width=device-width,initial-scale=1',
  };

  if (data && data.ghostSettings) {
    const { ghostSettings } = data;

    return {
      ...baseMetaData,
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
    };
  }

  return baseMetaData;
};

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
    href: '/prism/prism-nord-1.29.0.css',
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

export type LoaderData = {
  cardsScriptUrl: string;
  cardsCssUrl: string;
  darkModeEnabled: any;
  snowModeEnabled: any;
  currentCopyrightYear: string;
  ghostSettings?: SettingsResponse | undefined;
};

export const loader = async ({ request }: LoaderArgs) => {
  const ghostSettings = await getGhostSettings();
  const cookieHeader = request.headers.get('Cookie');
  const cookie = (await userPrefs.parse(cookieHeader)) || {};

  const data: LoaderData = {
    cardsScriptUrl: `${process.env.GHOST_URL}/public/cards.min.js`,
    cardsCssUrl: `${process.env.GHOST_URL}/public/cards.min.css`,
    darkModeEnabled: cookie.darkModeEnabled,
    snowModeEnabled: cookie.snowModeEnabled,
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
      <ListPageLayout>
        <div className="prose prose-nord dark:prose-invert prose-xl max-w-none">
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
