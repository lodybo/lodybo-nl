import type { ReactNode } from 'react';
import {
  Links,
  LiveReload,
  Meta,
  Scripts,
  ScrollRestoration,
  useLocation,
} from '@remix-run/react';
import { recursiveFontDeclaration } from '~/assets/fonts';
import classnames from 'classnames';
import { DynamicLinks } from 'remix-utils';
import { useDarkMode } from '~/hooks/useDarkMode';
import { useSnowMode } from '~/hooks/useSnowMode';
import Header from '~/components/Header';
import Footer from '~/components/Footer';

type Props = {
  children: ReactNode;
  cardsCssUrl?: string;
  cardsScriptUrl?: string;
  siteUrl?: string;
};

const Document = ({
  children,
  cardsCssUrl,
  cardsScriptUrl,
  siteUrl,
}: Props) => {
  const location = useLocation();
  const [darkModeIsEnabled] = useDarkMode();
  const [snowModeIsEnabled] = useSnowMode();

  return (
    <html
      lang="en"
      className={classnames({
        dark: darkModeIsEnabled,
      })}
    >
      <head>
        <Meta />
        <style
          dangerouslySetInnerHTML={{ __html: `${recursiveFontDeclaration}` }}
        />
        {cardsCssUrl && <link rel="stylesheet" href={cardsCssUrl} />}
        {cardsScriptUrl && <script defer src={cardsScriptUrl} />}
        <script defer data-domain="lodybo.nl" src="/js/script.js"></script>
        <DynamicLinks />
        <Links />
        <link
          rel="alternate"
          type="application/rss+xml"
          href={`${siteUrl}rss.xml`}
        />
        {siteUrl && (
          <link
            rel="canonical"
            href={`${siteUrl}${location.pathname.substring(1)}`}
          />
        )}
        <script src="/checkCookie.js"></script>
      </head>
      <body className="font-recursive antialiased bg-nord-6 dark:bg-nord-0 text-nord-0 dark:text-nord-6">
        <script src="/noFlash.js" />
        <div className="flex flex-col min-h-screen">
          <Header />

          <div className="w-full mb-10 px-5 md:px-10 xl:px-40 mx-auto flex-1">
            {children}
          </div>

          <Footer />
        </div>
        <ScrollRestoration />
        <Scripts />
        <script defer src="/prism/prism-1.29.0.js" data-manual />
        {snowModeIsEnabled && (
          <script src="https://app.embed.im/snow.js" defer></script>
        )}
        <LiveReload />
      </body>
    </html>
  );
};

export default Document;
