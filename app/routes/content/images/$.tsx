import type { LoaderArgs } from '@remix-run/node';
import invariant from 'tiny-invariant';

// A Splat route for images requested by the front-end because of Ghosts's payload (for example: an uploaded header image for a post).
// We simply fetch them from the actual Ghost backend.

export const loader = async ({ params }: LoaderArgs) => {
  const url = params['*'];

  invariant(url, 'Missing image URL');

  const image = await fetch(`${process.env.GHOST_URL}/content/images/${url}`);
  const { status, headers } = image;
  const blob = await image.blob();

  return new Response(blob, {
    status,
    headers,
  });
};
