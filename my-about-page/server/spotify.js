import { readFile } from 'node:fs/promises'
import { parseEnv } from 'node:util'

async function getSpotifyEnv(file) {
  try {
    return parseEnv(await readFile(file, 'utf8'))
  } catch (error) {
    if (error.code === 'ENOENT') return {}
    throw error
  }
}

async function getRecentTracks() {
  const [app, token] = await Promise.all([
    getSpotifyEnv('.env.spotify.local'),
    getSpotifyEnv('.env.spotify-token.local'),
  ])
  const { SPOTIFY_CLIENT_ID: id, SPOTIFY_CLIENT_SECRET: secret } = app
  const { SPOTIFY_REFRESH_TOKEN: refreshToken } = token
  if (!id || !secret || !refreshToken) throw new Error('Spotify setup is incomplete.')

  const tokenResponse = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: { Authorization: `Basic ${Buffer.from(`${id}:${secret}`).toString('base64')}` },
    body: new URLSearchParams({ grant_type: 'refresh_token', refresh_token: refreshToken }),
    signal: AbortSignal.timeout(10000),
  })
  if (!tokenResponse.ok) throw new Error('Spotify token refresh failed.')
  const { access_token: accessToken } = await tokenResponse.json()

  const tracksResponse = await fetch('https://api.spotify.com/v1/me/player/recently-played?limit=3', {
    headers: { Authorization: `Bearer ${accessToken}` },
    signal: AbortSignal.timeout(10000),
  })
  if (!tracksResponse.ok) throw new Error('Spotify listening history request failed.')
  const { items } = await tracksResponse.json()
  return items.map(({ track, played_at: playedAt }) => ({
    id: track.id,
    name: track.name,
    artist: track.artists.map((artist) => artist.name).join(', '),
    image: track.album.images.at(-1)?.url,
    url: track.external_urls.spotify,
    playedAt,
  }))
}

export function registerSpotifyRoute(server) {
  server.middlewares.use('/api/spotify/recently-played', async (request, response) => {
    response.setHeader('Content-Type', 'application/json; charset=utf-8')
    response.setHeader('Cache-Control', 'no-store')
    if (request.method !== 'GET') {
      response.setHeader('Allow', 'GET')
      response.writeHead(405).end(JSON.stringify({ error: 'Use GET.' }))
      return
    }

    try {
      const tracks = await getRecentTracks()
      response.end(JSON.stringify({ tracks }))
    } catch {
      response.writeHead(503).end(JSON.stringify({ error: 'Spotify tracks are temporarily unavailable.' }))
    }
  })
}
