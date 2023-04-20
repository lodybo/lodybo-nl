import { startSpotifyFlow } from '~/spotify.server';

export async function loader() {
  return startSpotifyFlow()
    .then(() => {
      return new Response('Spotify flow started successfully!', {
        status: 200,
      });
    })
    .catch(async (errorResponse: Response) => {
      const { status, text } = errorResponse;
      const message = await text();

      return new Response(message, {
        status,
      });
    });
}
