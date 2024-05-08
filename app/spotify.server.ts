import { prisma } from './db.server';

const scope = 'user-read-playback-state';

enum SpotifySettings {
  refreshToken = 'refreshToken',
  accessToken = 'accessToken',
  authorizationToken = 'authorizationToken',
  track = 'track',
  state = 'state',
}

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

  const response = await fetch('https://api.spotify.com/v1/me/player', options);

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
    const authorizationCode = await getAuthorizationCode();
    console.log('Authorization code:', authorizationCode);
    if (!authorizationCode) {
      throw new Error('No Spotify authorization code');
    }

    const { timeout, refreshToken, accessToken } =
      await fetchAccessToken(authorizationCode);
    accessTokenTimeout = timeout * 1000;
    await createSpotifySession(accessToken, refreshToken);
  }

  setInterval(refreshAccessToken, accessTokenTimeout ?? 3600000);
  setInterval(savePlaybackState, 120000);

  return savePlaybackState();
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
