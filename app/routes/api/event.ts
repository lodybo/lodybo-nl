import type { ActionArgs } from '@remix-run/node';

export const action = async ({ request }: ActionArgs) => {
  const { method, body } = request;

  const response = await fetch('https://plausible.io/api/event', {
    body,
    method,
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const responseBody = await response.text();

  if (!response.ok) {
    return new Response(responseBody, {
      status: response.status,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  return new Response(responseBody, {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
  });
};
