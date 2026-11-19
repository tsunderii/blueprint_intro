import { randomBytes } from 'node:crypto'
import { writeFile } from 'node:fs/promises'
import { createServer } from 'node:http'

const { SPOTIFY_CLIENT_ID: clientId, SPOTIFY_CLIENT_SECRET: clientSecret } = process.env
if (!clientId || !clientSecret) {
  console.error('Set SPOTIFY_CLIENT_ID and SPOTIFY_CLIENT_SECRET in .env.spotify.local.')
  process.exit(1)
}

const redirectUri = 'http://127.0.0.1:8888/callback'
const state = randomBytes(32).toString('hex')
const authorizeUrl = new URL('https://accounts.spotify.com/authorize')
authorizeUrl.search = new URLSearchParams({
  client_id: clientId,
  response_type: 'code',
  redirect_uri: redirectUri,
  scope: 'user-read-recently-played',
  state,
})

const server = createServer(async (request, response) => {
  const callback = new URL(request.url, redirectUri)
  response.setHeader('Content-Type', 'text/plain; charset=utf-8')
  response.setHeader('Cache-Control', 'no-store')

  if (request.method !== 'GET' || callback.pathname !== '/callback') {
    response.writeHead(404).end('Not found.')
    return
  }
  if (callback.searchParams.get('state') !== state) {
    response.writeHead(400).end('Open the authorization link printed in your terminal.')
    return
  }

  server.close()
  const code = callback.searchParams.get('code')
  try {
    if (!code || callback.searchParams.has('error')) {
      throw new Error('Spotify authorization was declined or did not return a code.')
    }

    const credentials = Buffer.from(`${clientId}:${clientSecret}`).toString('base64')
    const tokenResponse = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: { Authorization: `Basic ${credentials}` },
      body: new URLSearchParams({
        grant_type: 'authorization_code',
        code,
        redirect_uri: redirectUri,
      }),
      signal: AbortSignal.timeout(15000),
    })
    if (!tokenResponse.ok) {
      throw new Error(`Spotify rejected the token exchange (HTTP ${tokenResponse.status}). Check your app credentials and redirect URI.`)
    }

    const { refresh_token: refreshToken } = await tokenResponse.json()
    if (!refreshToken) throw new Error('Spotify did not return a refresh token.')

    await writeFile('.env.spotify-token.local', `SPOTIFY_REFRESH_TOKEN=${refreshToken}\n`, {
      flag: 'wx',
      mode: 0o600,
    })
    console.log('Saved the refresh token to .env.spotify-token.local.')
    response.end('Spotify authorized. You can close this tab.')
  } catch (error) {
    console.error(error.code === 'EEXIST'
      ? 'A token file already exists at .env.spotify-token.local. Move it aside before authorizing again.'
      : error.message)
    process.exitCode = 1
    response.writeHead(400).end('Spotify setup did not complete. Check your terminal for details.')
  }
})

server.on('error', (error) => {
  console.error(`Could not start the Spotify callback server: ${error.message}`)
  process.exitCode = 1
})
server.listen(8888, '127.0.0.1', () => {
  console.log(`Open this link to authorize Spotify:\n${authorizeUrl}`)
})
