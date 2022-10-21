import type { ReactNode } from 'react';
import {
  Links,
  LiveReload,
  Meta,
  Scripts,
  ScrollRestoration,
} from '@remix-run/react';
import { recursiveFontDeclaration } from '~/assets/fonts';

type Props = {
  children: ReactNode;
  cardsCssUrl?: string;
  cardsScriptUrl?: string;
};

const Document = ({ children, cardsCssUrl, cardsScriptUrl }: Props) => (
  <html lang="en" className="font-recursive">
    <head>
      <Meta />
      <style
        dangerouslySetInnerHTML={{ __html: `${recursiveFontDeclaration}` }}
      />
      {cardsCssUrl && <link rel="stylesheet" href={cardsCssUrl} />}
      <Links />
    </head>
    <body>
      {children}
      <ScrollRestoration />
      <Scripts />
      <script src="/prism/prism-1.29.0.js" data-manual />
      {cardsScriptUrl && <script src={cardsScriptUrl} />}
      <LiveReload />
    </body>
  </html>
);

export default Document;
