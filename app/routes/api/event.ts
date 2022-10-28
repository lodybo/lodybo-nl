import type { ActionArgs } from '@remix-run/node';

export const action = async ({ request }: ActionArgs) => {
  const response = await fetch('https://plausible.io/api/event', request);
  const body = await response.json();

  if (!response.ok) {
    return new Response(body, {
      status: response.status,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  return new Response(body, {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
  });
};
