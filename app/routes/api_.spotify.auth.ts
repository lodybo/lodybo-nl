import { type LoaderFunctionArgs } from '@remix-run/router';
import { json, redirect } from '@remix-run/node';
import { sendAuthorizationRequest } from '~/spotify.server';

export async function loader({ request }: LoaderFunctionArgs) {
  const authCode = new URL(request.url).searchParams.get('authCode');

  if (authCode !== process.env.SPOTIFY_AUTH_SECRET) {
    return json(
      {
        error: 'Unauthorized',
      },
      {
        status: 401,
      },
    );
  }

  return redirect(await sendAuthorizationRequest());
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
