import path from 'path';
import * as fs from 'fs';
import express from 'express';
import compression from 'compression';
import morgan from 'morgan';
import { createRequestHandler } from '@remix-run/express';
import { broadcastDevReady, installGlobals } from '@remix-run/node';
import sourceMapSupport from 'source-map-support';
import chokidar from 'chokidar';
import { networkInterfaces } from 'os';

sourceMapSupport.install();
installGlobals();

const app = express();

app.use(compression());

// http://expressjs.com/en/advanced/best-practice-security.html#at-a-minimum-disable-x-powered-by-header
app.disable('x-powered-by');

// Remix fingerprints its assets so we can cache forever.
app.use(
  '/build',
  express.static('public/build', { immutable: true, maxAge: '1y' }),
);

// Everything else (like favicon.ico) is cached for an hour. You may want to be
// more aggressive with this caching.
app.use(express.static('public', { maxAge: '1h' }));

app.use(morgan('tiny'));

const MODE = process.env.NODE_ENV;
const BUILD_DIR = path.join(process.cwd(), 'build');
let build = await import(BUILD_DIR);

app.all(
  '*',
  MODE === 'production'
    ? createRequestHandler({ build, mode: MODE })
    : createDevRequestHandler(),
);

const port = process.env.PORT || 3000;
const localIPAddress = Object.values(networkInterfaces())
  .flat()
  .find((x) => !!x && !x.internal && x.family === 'IPv4')?.address;

app.listen(port, async () => {
  console.log(`✅ Express server listening on port ${port}`);
  if (localIPAddress) {
    console.log(`💻 app reachable at: http://${localIPAddress}:${port}`);
  }

  if (process.env.NODE_ENV === 'development') {
    broadcastDevReady(await import(BUILD_DIR));
  }
});

function createDevRequestHandler() {
  const watcher = chokidar.watch(BUILD_DIR, { ignoreInitial: true });

  watcher.on('all', async () => {
    // 1. purge require cache && load updated server build
    const stat = fs.statSync(BUILD_DIR);
    build = import(BUILD_DIR + '?t=' + stat.mtimeMs);
    // 2. tell dev server that this app server is now ready
    broadcastDevReady(await build);
  });

  return async (req: any, res: any, next: any) => {
    try {
      //
      return createRequestHandler({
        build: await build,
        mode: 'development',
      })(req, res, next);
    } catch (error) {
      next(error);
    }
  };
}
