import { useEffect, useMemo, useState } from 'react'
import { buildApiUrl } from '../utils/api.js'

export default function Teams() {
  const [teams, setTeams] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    async function loadTeams() {
      try {
        const response = await fetch(buildApiUrl('teams'))
        if (!response.ok) throw new Error('Failed to load teams')
        const payload = await response.json()
        const data = Array.isArray(payload) ? payload : payload.teams ?? payload.results ?? []
        setTeams(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    loadTeams()
  }, [])

  const items = useMemo(() => teams.slice(0, 10), [teams])

  if (loading) return <p>Loading teams...</p>
  if (error) return <p role="alert">{error}</p>

  return (
    <section>
      <h2>Teams</h2>
      <ul>
        {items.map((team) => (
          <li key={team._id || team.id || team.name}>
            <strong>{team.name}</strong>
          </li>
        ))}
      </ul>
    </section>
  )
}

// TODO: usar https://scaling-umbrella-8000.app.github.dev/api/teams