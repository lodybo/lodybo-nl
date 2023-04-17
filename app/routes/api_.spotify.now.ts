import type { LoaderArgs } from '@remix-run/node';
import { eventStream } from 'remix-utils';
import { getTrack } from '~/spotify.server';

export async function loader({ request }: LoaderArgs) {
  return eventStream(request.signal, function setup(send) {
    const fetchTrack = async () => {
      const track = await getTrack();

      send({ event: 'spotify', data: JSON.stringify(track) });
    };

    fetchTrack();

    const interval = setInterval(() => {
      fetchTrack();
    }, 30000); // 30 seconds

    return function clear() {
      clearInterval(interval);
    };
  });
}
