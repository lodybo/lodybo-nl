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

  if (!isTrack(track)) {
    return <div className="h-20" />;
  }

  const { item } = track;

  const title = item.name;
  const artists = item.artists.map((artist) => ({
    name: artist.name,
    url: artist.external_urls.spotify,
  }));
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
        <SpotifyAnchor href={track.item.album.external_urls.spotify}>
          <img className="mx-auto" src={cover} alt={title} />
        </SpotifyAnchor>
      </div>

      <div className="flex flex-col gap-1.5 items-center lg:items-start justify-between">
        <h3 className="text-xl sm:text-base text-center sm:text-left font-light">
          {label}
        </h3>
        <h2 className="text-2xl">
          <SpotifyAnchor href={track.item.external_urls.spotify}>
            {title}
          </SpotifyAnchor>
        </h2>
        <p>
          {artists.map((artist, index) => (
            <span key={artist.url}>
              <SpotifyAnchor href={artist.url}>{artist.name}</SpotifyAnchor>
              {index < artists.length - 1 ? ', ' : ''}
            </span>
          ))}{' '}
          <span className="text-small">
            (from{' '}
            <SpotifyAnchor href={track.item.album.external_urls.spotify}>
              "{album}"
            </SpotifyAnchor>
            )
          </span>
        </p>
      </div>
    </div>
  );
}

const SpotifyAnchor = ({ children, ...props }: JSX.IntrinsicElements['a']) => (
  <a
    {...props}
    className="text-nord-polarnight-0-400 dark:text-nord-snowstorm-2-300 hover:text-nord-polarnight-0-600 dark:hover:text-nord-snowstorm-2-100"
    target="_blank"
    rel="noopener noreferrer"
  >
    {children}
  </a>
);
