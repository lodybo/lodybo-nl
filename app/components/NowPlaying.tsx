import { useEventSource } from 'remix-utils';

function isTrack(track: Track | string): track is Track {
  return !!track && typeof track !== 'string' && 'item' in track;
}

export default function NowPlaying() {
  const trackStream = useEventSource('api/spotify/now', {
    event: 'spotify',
  });

  let track: Track | string = '';

  if (trackStream && trackStream !== '') {
    track = JSON.parse(trackStream);
  }

  if (!isTrack(track) || track.device.is_private_session) {
    return <div className="h-20" />;
  }

  const { item } = track;

  const title = item.name;
  const artist = item.artists.map((artist) => artist.name).join(', ');
  const album = item.album.name;
  const cover = item.album.images.filter((image) => image.width === 300)[0].url;

  let label: string;
  if (track.is_playing) {
    label = 'Now playing';
  } else {
    label = 'I recently listened to';
  }

  return (
    <div className="grid grid-cols-[auto_1fr] min-h-20 justify-end gap-2">
      <div />
      <h2 className="text-left font-light mb-1">{label}</h2>

      <div className="w-24">
        <img src={cover} alt={title} />
      </div>

      <div className="flex flex-col gap-1.5 items-start">
        <h3 className="text-xl">{title}</h3>
        <p>
          {artist} <span className="text-small">(from "{album}")</span>
        </p>
      </div>
    </div>
  );
}
