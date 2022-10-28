import type { ReactNode } from 'react';
import {
  Links,
  LiveReload,
  Meta,
  Scripts,
  ScrollRestoration,
} from '@remix-run/react';
import { recursiveFontDeclaration } from '~/assets/fonts';
import classnames from 'classnames';
import { useDarkMode } from '~/utils/matches';
import { useEffect, useState } from 'react';

type Props = {
  children: ReactNode;
  cardsCssUrl?: string;
  cardsScriptUrl?: string;
};

const Document = ({ children, cardsCssUrl, cardsScriptUrl }: Props) => {
  const darkModeIsEnabled = useDarkMode();
  const [dark, setDark] = useState(darkModeIsEnabled);

  useEffect(() => {
    if (darkModeIsEnabled !== undefined) {
      setDark(darkModeIsEnabled);
    }
  }, [darkModeIsEnabled]);

  return (
    <html
      lang="en"
      className={classnames({
        dark,
      })}
    >
      <head>
        <Meta />
        <style
          dangerouslySetInnerHTML={{ __html: `${recursiveFontDeclaration}` }}
        />
        {cardsCssUrl && <link rel="stylesheet" href={cardsCssUrl} />}
        {cardsScriptUrl && <script defer src={cardsScriptUrl} />}
        <Links />
      </head>
      <body className="font-recursive antialiased bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300">
        {children}
        <ScrollRestoration />
        <Scripts />
        <script defer src="/prism/prism-1.29.0.js" data-manual />
        <LiveReload />
      </body>
    </html>
  );
};

export default Document;
