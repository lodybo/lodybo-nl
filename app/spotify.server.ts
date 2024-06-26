import { prisma } from './db.server';

const scope = 'user-read-playback-state user-read-currently-playing';

enum SpotifySettings {
  refreshToken = 'refreshToken',
  accessToken = 'accessToken',
  authorizationToken = 'authorizationToken',
  track = 'track',
  state = 'state',
}

/**
 * A list of "denied" songs from Spotify, songs I'd rather not see show up on my website.
 * To get the ID of a track, right-click it in Spotify and select "Share" -> "Copy Song Link".
 * The ID is the last part of the URL, before the query string.
 *
 * Example: 3T6R0ppqCnUW6iJhtUYhO3 is the ID of Supertramp - The Logical Song
 * The song link is: https://open.spotify.com/track/3T6R0ppqCnUW6iJhtUYhO3
 */
const deniedSongs = [
  '2DbDvdYbb6kLf7VFd4Mkcc',
  '33JVkLsrCXHByPWQLQhMsU',
  '28Tr02JcJSJCgz1z6dUN9b',
  '3dRlULMNy2IGnQ1at2MSZO',
  '5kAX0tsmzwwRSRVAhDXxQr',
  '67biuNJA03k1cU0XpciTNJ',
  '4PzHxygSGOjo9NMhTc4UqC',
  '5yezNuvNC1dgw90zxdtSRg',
  '6xtBw3iVzSLSdLot4QRFYh',
  '4FZoFK86X6Wd1csU9afTIA',
  '1ZuBwqM4NeUz8ucJyuJuxV',
  '7kPZ2v5kmx0PTI5zV6mvDz',
  '14Mi9T3sZrDZZy0686Yf31',
];

/**
 * Constructs the Basic Auth token for inclusion in the 'Authorization' header
 */
function constructBasicAuthToken() {
  const encodedAuth = Buffer.from(
    `${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`,
  ).toString('base64');
  return `Basic ${encodedAuth}`;
}

/**
 * Send authorization request to Spotify
 */
export async function sendAuthorizationRequest() {
  const state = Math.random().toString(36);
  await updateSpotifyCSRFState(state);

  const params = new URLSearchParams({
    response_type: 'code',
    client_id: process.env.SPOTIFY_CLIENT_ID ?? '',
    scope,
    redirect_uri: process.env.SPOTIFY_REDIRECT_URI ?? '',
    state,
  });

  return `https://accounts.spotify.com/authorize?${params.toString()}`;
}

/**
 * Fetches the access token from Spotify
 * @param code
 */
async function fetchAccessToken(code: string) {
  const options: RequestInit = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: constructBasicAuthToken(),
    },
    body: new URLSearchParams({
      code,
      redirect_uri: process.env.SPOTIFY_REDIRECT_URI ?? '',
      grant_type: 'authorization_code',
    }),
  };

  const response: Response = await fetch(
    'https://accounts.spotify.com/api/token',
    options,
  );

  if (!response.ok) {
    const body = await response.text();
    const err = JSON.parse(body);
    console.error(err);
    throw new Error(err.error_description);
  } else {
    const body = (await response.json()) as AccessTokenResponse;

    return {
      accessToken: body.access_token,
      refreshToken: body.refresh_token,
      timeout: body.expires_in,
    };
  }
}

/**
 * Refreshes the access token
 */
async function refreshAccessToken() {
  let refreshToken: string;
  const storedToken = await getRefreshToken();

  if (!storedToken) {
    const fetchResult = await fetchAccessToken(process.env.SPOTIFY_CODE);
    refreshToken = fetchResult.refreshToken;
  } else {
    if (!storedToken) {
      throw new Error('No Spotify refresh token');
    }

    refreshToken = storedToken;
  }

  const options: RequestInit = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: constructBasicAuthToken(),
    },
    body: new URLSearchParams({
      refresh_token: refreshToken,
      grant_type: 'refresh_token',
    }),
  };

  const response: Response = await fetch(
    'https://accounts.spotify.com/api/token',
    options,
  );

  if (!response.ok) {
    const body = await response.text();
    console.error(body);
  }

  const body = (await response.json()) as AccessTokenResponse;
  await updateAccessToken(body.access_token);

  if (body.refresh_token) {
    await updateRefreshToken(body.refresh_token);
  }

  return {
    accessToken: body.access_token,
    refreshToken: body.refresh_token ?? undefined,
  };
}

/**
 * Gets the current playback state from Spotify
 */
async function getPlaybackState(): Promise<Track | undefined> {
  let accessToken: string | undefined;
  const storedToken = await getAccessToken();

  if (!storedToken) {
    const token = await refreshAccessToken();
    if (!token) {
      console.error('No Spotify access token');
    }

    accessToken = token.accessToken;
  } else {
    if (!storedToken) {
      throw new Error('No Spotify access token');
    }

    accessToken = storedToken;
  }

  const options: RequestInit = {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };

  const response = await fetch(
    'https://api.spotify.com/v1/me/player/currently-playing',
    options,
  );

  if (!response.ok) {
    if (response.status === 401) {
      await refreshAccessToken();
      return getPlaybackState();
    }
    const error = await response.text();
    console.error(error);
  }

  const body = await response.text();

  if (!body) {
    return undefined;
  }

  return JSON.parse(body);
}

async function savePlaybackState() {
  const track = await getPlaybackState();
  return updateTrack(track);
}

async function createSpotifySession(accessToken: string, refreshToken: string) {
  return Promise.all([
    prisma.spotifySettings.upsert({
      where: {
        key: SpotifySettings.accessToken,
      },
      create: {
        key: SpotifySettings.accessToken,
        value: accessToken,
      },
      update: {
        value: accessToken,
      },
    }),
    prisma.spotifySettings.upsert({
      where: {
        key: SpotifySettings.refreshToken,
      },
      create: {
        key: SpotifySettings.refreshToken,
        value: refreshToken,
      },
      update: {
        value: refreshToken,
      },
    }),
  ]);
}

export async function startSpotifyFlow() {
  let accessTokenTimeout: number | undefined;
  const result = await getAccessToken();

  if (!result) {
    console.log('No Spotify access token, fetching...');
    const authorizationCode = await getAuthorizationCode();

    if (!authorizationCode) {
      throw new Error('No Spotify authorization code');
    } else {
      console.log('Spotify authorization code found.');
    }

    const { timeout, refreshToken, accessToken } =
      await fetchAccessToken(authorizationCode);
    accessTokenTimeout = timeout * 1000;
    await createSpotifySession(accessToken, refreshToken);
  } else {
    console.log('Spotify access token found.');
  }

  setInterval(refreshAccessToken, accessTokenTimeout ?? 3600000);
  setInterval(savePlaybackState, 120000);

  return savePlaybackState();
}

export function songIsDenied(track?: Track) {
  if (!track || !track.item) {
    return false;
  }
  return deniedSongs.includes(track.item.id);
}

export async function getAuthorizationCode() {
  return prisma.spotifySettings
    .findFirst({
      where: {
        key: SpotifySettings.authorizationToken,
      },
      select: {
        value: true,
      },
    })
    .then((result) => {
      if (!result || !result.value) {
        throw new Error('No Spotify authorization code');
      }

      return result.value;
    });
}

export async function updateAuthorizationCode(authorizationToken: string) {
  return prisma.spotifySettings.upsert({
    where: {
      key: SpotifySettings.authorizationToken,
    },
    create: {
      key: SpotifySettings.authorizationToken,
      value: authorizationToken,
    },
    update: {
      value: authorizationToken,
    },
  });
}

async function getAccessToken() {
  return prisma.spotifySettings
    .findUnique({
      where: {
        key: SpotifySettings.accessToken,
      },
      select: {
        value: true,
      },
    })
    .then((result) => {
      if (!result || !result.value) {
        return undefined;
      }

      return result.value;
    });
}

export async function updateAccessToken(accessToken: string) {
  return prisma.spotifySettings.upsert({
    where: {
      key: SpotifySettings.accessToken,
    },
    create: {
      key: SpotifySettings.accessToken,
      value: accessToken,
    },
    update: {
      value: accessToken,
    },
  });
}

async function getRefreshToken() {
  return prisma.spotifySettings
    .findUnique({
      where: {
        key: SpotifySettings.refreshToken,
      },
      select: {
        value: true,
      },
    })
    .then((result) => {
      if (!result || !result.value) {
        return undefined;
      }

      return result.value;
    });
}

async function updateRefreshToken(refreshToken: string) {
  return prisma.spotifySettings.upsert({
    where: {
      key: SpotifySettings.refreshToken,
    },
    create: {
      key: SpotifySettings.refreshToken,
      value: refreshToken,
    },
    update: {
      value: refreshToken,
    },
  });
}

export async function getTrack(): Promise<Track> {
  const stringifiedTrack = await prisma.spotifySettings.findUnique({
    where: {
      key: SpotifySettings.track,
    },
    select: {
      value: true,
    },
  });
  return JSON.parse(stringifiedTrack?.value ?? '{}');
}

export async function updateTrack(track: Track | undefined) {
  let stringifiedTrack: string = '{}';

  if (track) {
    stringifiedTrack = JSON.stringify(track);
  }

  return prisma.spotifySettings.upsert({
    where: {
      key: SpotifySettings.track,
    },
    create: {
      key: SpotifySettings.track,
      value: stringifiedTrack,
    },
    update: {
      value: stringifiedTrack,
    },
  });
}

export async function getSpotifyCSRFState() {
  return prisma.spotifySettings
    .findUnique({
      where: {
        key: SpotifySettings.state,
      },
      select: {
        value: true,
      },
    })
    .then((result) => {
      if (!result || !result.value) {
        throw new Error('No Spotify CSRF state');
      }

      return result.value;
    });
}

export async function updateSpotifyCSRFState(state: string) {
  return prisma.spotifySettings.upsert({
    where: {
      key: SpotifySettings.state,
    },
    create: {
      key: SpotifySettings.state,
      value: state,
    },
    update: {
      value: state,
    },
  });
}

export async function clearSpotifyCSRFState() {
  return prisma.spotifySettings.delete({
    where: {
      key: SpotifySettings.state,
    },
  });
}
