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

export const meta: MetaFunction = () => ({
  charset: 'utf-8',
  title: 'New Remix App',
  viewport: 'width=device-width,initial-scale=1',
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
];

export const loader = async ({ request }: LoaderArgs) => {
  const cookieHeader = request.headers.get('Cookie');
  const cookie = (await userPrefs.parse(cookieHeader)) || {};

  return json({
    cardsScriptUrl: `${process.env.GHOST_URL}/public/cards.min.js`,
    cardsCssUrl: `${process.env.GHOST_URL}/public/cards.min.css`,
    darkModeEnabled: cookie.darkModeEnabled,
  });
};

export default function App() {
  const { cardsScriptUrl, cardsCssUrl } = useLoaderData<typeof loader>();

  return (
    <Document cardsScriptUrl={cardsScriptUrl} cardsCssUrl={cardsCssUrl}>
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
