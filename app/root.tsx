import type { LinksFunction, MetaFunction } from '@remix-run/node';
import { json } from '@remix-run/node';
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from '@remix-run/react';
import tailwindStylesheetUrl from './styles/tailwind.css';
import { recursiveFontDeclaration, recursiveFontURL } from '~/assets/fonts';

export const meta: MetaFunction = () => ({
  charset: 'utf-8',
  title: 'New Remix App',
  viewport: 'width=device-width,initial-scale=1',
});

export const links: LinksFunction = () => ([
  {
    rel: 'preload',
    href: recursiveFontURL,
    as: 'font',
    type: 'font/woff2',
    crossOrigin: 'anonymous',
  },
  {
    rel: 'stylesheet', href: '/prism/prism-1.29.0.css',
  },
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
    <html lang="en" className="font-recursive">
      <head>
        <Meta />
        <style dangerouslySetInnerHTML={{ __html: `${recursiveFontDeclaration}`}} />
        <link rel="stylesheet" href={cardsCssUrl} />
        <Links />
      </head>
      <body>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <script src="/prism/prism-1.29.0.js" data-manual />
        <script src={cardsScriptUrl} />
        <LiveReload />
      </body>
    </html>
  );
}
