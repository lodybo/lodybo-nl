import { userPrefs } from '~/cookies';
import type { ActionArgs } from '@remix-run/node';
import { redirect } from '@remix-run/node';

type ActionData = {
  action: 'disable' | 'enable';
  referrer: string;
};

export const action = async ({ request }: ActionArgs) => {
  const cookieHeader = request.headers.get('Cookie');
  const formData = await request.formData();

  const cookie = (await userPrefs.parse(cookieHeader)) || {};

  const { action, referrer } = Object.fromEntries(
    formData,
  ) as unknown as ActionData;

  if (action === undefined) {
    throw new Error('An action is missing');
  }

  cookie.darkModeEnabled = action == 'enable';

  return redirect(referrer, {
    headers: {
      'Set-Cookie': await userPrefs.serialize(cookie),
    },
  });
};
