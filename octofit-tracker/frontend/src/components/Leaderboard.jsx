import { useEffect, useMemo, useState } from 'react'
import { buildApiUrl } from '../utils/api.js'

export default function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    async function loadLeaderboard() {
      try {
        const response = await fetch(buildApiUrl('leaderboard'))
        if (!response.ok) throw new Error('Failed to load leaderboard')
        const payload = await response.json()
        const data = Array.isArray(payload) ? payload : payload.leaderboard ?? payload.results ?? []
        setLeaderboard(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    loadLeaderboard()
  }, [])

  const items = useMemo(() => leaderboard.slice(0, 10), [leaderboard])

  if (loading) return <p>Loading leaderboard...</p>
  if (error) return <p role="alert">{error}</p>

  return (
    <section>
      <h2>Leaderboard</h2>
      <ul>
        {items.map((entry) => (
          <li key={entry._id || entry.id || `${entry.subjectType}-${entry.score}`}>
            <strong>{entry.subjectType}</strong> — score {entry.score}
          </li>
        ))}
      </ul>
    </section>
  )
}

// TODO: usar https://scaling-umbrella-8000.app.github.dev/api/leaderboard