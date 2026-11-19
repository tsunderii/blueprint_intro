import { useEffect, useState } from 'react'

export function RecentlyPlayed() {
  const [tracks, setTracks] = useState(null)
  const [error, setError] = useState(false)

  useEffect(() => {
    const controller = new AbortController()

    async function loadTracks() {
      try {
        const response = await fetch('/api/spotify/recently-played', { signal: controller.signal })
        if (!response.ok) throw new Error('Spotify tracks are unavailable.')
        const data = await response.json()
        setTracks(data.tracks)
      } catch {
        if (!controller.signal.aborted) setError(true)
      }
    }

    loadTracks()
    return () => controller.abort()
  }, [])

  return (
    <section className="section" id="recently-played" aria-labelledby="recently-played-title">
      <h2 id="recently-played-title">recently played on Spotify</h2>
      {error && <p role="status">Spotify tracks are temporarily unavailable.</p>}
      {!error && !tracks && <p role="status">Loading tracks…</p>}
      {tracks?.length === 0 && <p>No recent tracks to show.</p>}
      {!!tracks?.length && (
        <ul className="recent-tracks">
          {tracks.map((track) => (
            <li key={`${track.id}-${track.playedAt}`}>
              <a href={track.url} className="recent-track">
                {track.image && <img src={track.image} alt="" width="56" height="56" />}
                <span>
                  <strong>{track.name}</strong>
                  <span className="recent-track-artist">{track.artist}</span>
                </span>
              </a>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}
