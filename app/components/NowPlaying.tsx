import { useEventSource } from 'remix-utils';

function isTrack(track: Track | string): track is Track {
  return !!track && typeof track !== 'string' && 'item' in track;
}

export default function NowPlaying() {
  const trackStream = useEventSource('/api/spotify/now', {
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
    label = 'Currently listening to';
  } else {
    label = 'I recently listened to';
  }

  return (
    <div className="grid grid-rows-1 grid-cols-1 sm:grid-cols-[auto_1fr] min-h-20 justify-end items-center gap-2 sm:gap-5">
      <div className="w-full sm:w-24">
        <img className="mx-auto" src={cover} alt={title} />
      </div>

      <div className="flex flex-col gap-1.5 items-center lg:items-start justify-between">
        <h3 className="text-xl sm:text-base text-center sm:text-left font-light">
          {label}
        </h3>
        <h2 className="text-2xl">{title}</h2>
        <p>
          {artist} <span className="text-small">(from "{album}")</span>
        </p>
      </div>
    </div>
  );
}
