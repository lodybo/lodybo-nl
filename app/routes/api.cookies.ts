import { userPrefs } from '~/cookies';
import type { ActionArgs } from '@remix-run/node';
import { redirect } from '@remix-run/node';

type ActionData = {
  actionType: string;
  actionValue: 'disable' | 'enable';
  referrer: string;
};

export const action = async ({ request }: ActionArgs) => {
  const cookieHeader = request.headers.get('Cookie');
  const formData = await request.formData();

  const cookie = (await userPrefs.parse(cookieHeader)) || {};

  const { actionType, actionValue, referrer } = Object.fromEntries(
    formData,
  ) as unknown as ActionData;

  if (actionType === undefined || actionValue === undefined) {
    throw new Error('An action is missing');
  }

  switch (actionType) {
    case 'darkMode':
      cookie.darkModeEnabled = actionValue == 'enable';
      break;

    case 'snowMode':
      cookie.snowModeEnabled = actionValue == 'enable';
      break;
  }

  return redirect(referrer, {
    headers: {
      'Set-Cookie': await userPrefs.serialize(cookie),
    },
  });
};
