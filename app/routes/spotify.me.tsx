import { json } from '@remix-run/node';
import { useLoaderData, useRouteError } from '@remix-run/react';
import { getTrack, updateTrack } from '~/spotify.server';
import Navigation from '~/components/Navigation';
import MainSection from '~/components/MainSection';
import Prose from '~/components/Prose';

export async function loader() {
  const track = await getTrack();
  await updateTrack(track);

  return json({ track });
}

export default function SpotifyMe() {
  const { track } = useLoaderData<typeof loader>();

  return (
    <>
      <Navigation />

      <MainSection className="mt-10">
        <h1>Spotify Me</h1>
        <pre>{JSON.stringify(track, null, 2)}</pre>
      </MainSection>
    </>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();

  console.error({ error });

  return (
    <>
      <Navigation />

      <MainSection className="mt-10">
        <Prose>
          <h1>Error!!</h1>
          <pre>{JSON.stringify(error, null, 2)}</pre>
        </Prose>
      </MainSection>
    </>
  );
}
