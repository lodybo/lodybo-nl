import type { LinksFunction, MetaFunction } from '@remix-run/node';
import { json } from '@remix-run/node';
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData
} from '@remix-run/react';
import tailwindStylesheetUrl from './styles/tailwind.css';

export const meta: MetaFunction = () => ({
  charset: 'utf-8',
  title: 'New Remix App',
  viewport: 'width=device-width,initial-scale=1',
});

export const links: LinksFunction = () => ([
  { rel: 'stylesheet', href: tailwindStylesheetUrl },
]);

export const loader = async () => {
  return json({
    cardsScriptUrl: `${ process.env.GHOST_URL }/public/cards.min.js`,
    cardsCssUrl: `${ process.env.GHOST_URL }/public/cards.min.css`,
  })
}

export default function App() {
  const { cardsScriptUrl, cardsCssUrl } = useLoaderData<typeof loader>();

  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
        <link rel="stylesheet" href={cardsCssUrl} />
        <script defer src={cardsScriptUrl} />
      </head>
      <body>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
