import type { LoaderArgs } from '@remix-run/node';
import { eventStream } from 'remix-utils';
import { getTrack, songIsDenied } from '~/spotify.server';

export async function loader({ request }: LoaderArgs) {
  return eventStream(request.signal, function setup(send) {
    const fetchTrack = async () => {
      const track = await getTrack();

      let payload = '{}';
      if (!songIsDenied(track)) {
        payload = JSON.stringify(track);
      }

      send({ event: 'spotify', data: payload });
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
