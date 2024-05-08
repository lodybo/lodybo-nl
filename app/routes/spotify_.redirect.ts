import { type LoaderFunctionArgs } from '@remix-run/router';
import { json } from '@remix-run/node';
import {
  clearSpotifyCSRFState,
  getSpotifyCSRFState,
  startSpotifyFlow,
  updateAuthorizationCode,
} from '~/spotify.server';

export async function loader({ request }: LoaderFunctionArgs) {
  const params = new URL(request.url).searchParams;
  const code = params.get('code');
  const state = params.get('state');
  const error = params.get('error');

  if (error) {
    return json(
      {
        error,
      },
      {
        status: 400,
      },
    );
  }

  if (!code || !state) {
    return json(
      {
        error: 'Invalid request',
      },
      {
        status: 400,
      },
    );
  }

  const stateFromDb = await getSpotifyCSRFState();
  if (state !== stateFromDb) {
    return json(
      {
        error: 'Invalid state',
      },
      {
        status: 400,
      },
    );
  }

  await clearSpotifyCSRFState();
  await updateAuthorizationCode(code);
  await startSpotifyFlow()
    .then(() => {
      console.log('Spotify flow started successfully!');
    })
    .catch((err) => {
      throw new Error(`Failed to start Spotify flow: ${err}`);
    });

  return json({
    message: 'Authorization code updated successfully',
  });
}

export async function action() {
  return json(
    {
      error: 'Method Not Allowed',
    },
    {
      status: 405,
    },
  );
}
