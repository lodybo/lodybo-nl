import { prisma } from './db.server';

// const scope = 'user-read-playback-state';

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
      redirect_uri: process.env.SPOTIFY_REDIRECT_URI,
      grant_type: 'authorization_code',
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

  return {
    accessToken: body.access_token,
    refreshToken: body.refresh_token,
    timeout: body.expires_in,
  };
}

/**
 * Refreshes the access token
 */
async function refreshAccessToken() {
  let refreshToken: string | undefined;
  const result = await getRefreshToken();

  if (!result) {
    const fetchResult = await fetchAccessToken(process.env.SPOTIFY_CODE);
    refreshToken = fetchResult.refreshToken;
  } else {
    refreshToken = result.refreshToken;
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
  const result = await getAccessToken();

  if (!result) {
    const token = await refreshAccessToken();
    if (!token) {
      console.error('No Spotify access token');
    }

    accessToken = token.accessToken;
  } else {
    accessToken = result.accessToken;
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
  return prisma.spotify.upsert({
    where: {
      id: 1,
    },
    create: {
      accessToken,
      refreshToken,
    },
    update: {
      accessToken,
      refreshToken,
    },
  });
}

export async function startSpotifyFlow() {
  let accessTokenTimeout: number | undefined;
  const result = await getAccessToken();

  if (!result) {
    const { timeout, refreshToken, accessToken } = await fetchAccessToken(
      process.env.SPOTIFY_CODE,
    );
    accessTokenTimeout = timeout * 1000;
    await createSpotifySession(accessToken, refreshToken);
  }

  setInterval(refreshAccessToken, accessTokenTimeout ?? 3600000);
  setInterval(savePlaybackState, 120000);

  return savePlaybackState();
}

async function getAccessToken() {
  return prisma.spotify.findUnique({
    where: {
      id: 1,
    },
    select: {
      accessToken: true,
    },
  });
}

async function updateAccessToken(accessToken: string) {
  return prisma.spotify.update({
    where: {
      id: 1,
    },
    data: {
      accessToken,
    },
  });
}

async function getRefreshToken() {
  return prisma.spotify.findUnique({
    where: {
      id: 1,
    },
    select: {
      refreshToken: true,
    },
  });
}

async function updateRefreshToken(refreshToken: string) {
  return prisma.spotify.update({
    where: {
      id: 1,
    },
    data: {
      refreshToken,
    },
  });
}

export async function getTrack(): Promise<Track> {
  const stringifiedTrack = await prisma.spotify.findUnique({
    where: {
      id: 1,
    },
    select: {
      track: true,
    },
  });

  return JSON.parse(stringifiedTrack?.track ?? '{}');
}

export async function updateTrack(track: Track | undefined) {
  let stringifiedTrack: string | null = null;

  if (track) {
    stringifiedTrack = JSON.stringify(track);
  }

  return prisma.spotify.update({
    where: {
      id: 1,
    },
    data: {
      track: stringifiedTrack,
    },
  });
}
