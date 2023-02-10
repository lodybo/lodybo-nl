import { Remix } from '~/components/RemixIcon';
import { NextJS } from '~/components/NextJSIcon';
import { HTML } from '~/components/HTMLIcon';
import { CSS } from '~/components/CSSIcon';
import { JS } from '~/components/JSIcon';
import { TypeScript } from '~/components/TypeScriptIcon';
import { React } from '~/components/ReactIcon';
import { Tailwind } from '~/components/TailwindIcon';
import { WordPress } from '~/components/WordPressIcon';
import { Ghost } from '~/components/GhostIcon';
import { NodeJS } from '~/components/NodeJSIcon';
import { Docker } from '~/components/DockerIcon';
import { Jest } from '~/components/JestIcon';
import { Sanity } from '~/components/SanityIcon';
import { MySQL } from '~/components/MySQLIcon';
import { PostgresSQL } from '~/components/PostgresSQLIcon';

export function MarqueeRow() {
  return (
    <div className="marquee shrink-0 flex items-center justify-around gap-4 min-w-full animate-scroll">
      <Remix />
      <NextJS />
      <HTML />
      <CSS />
      <JS />
      <TypeScript />
      <React />
      <Tailwind />
      <WordPress />
      <Ghost />
      <NodeJS />
      <Docker />
      <Jest />
      <Sanity />
      <MySQL />
      <PostgresSQL />
    </div>
  );
}
