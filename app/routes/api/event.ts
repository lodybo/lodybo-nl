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
  const { status, headers } = response;

  return new Response(responseBody, {
    status,
    headers,
  });
};
