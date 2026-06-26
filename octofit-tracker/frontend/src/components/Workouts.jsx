import { useEffect, useMemo, useState } from 'react'
import { buildApiUrl } from '../utils/api.js'

export default function Workouts() {
  const [workouts, setWorkouts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    async function loadWorkouts() {
      try {
        const response = await fetch(buildApiUrl('workouts'))
        if (!response.ok) throw new Error('Failed to load workouts')
        const payload = await response.json()
        const data = Array.isArray(payload) ? payload : payload.workouts ?? payload.results ?? []
        setWorkouts(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    loadWorkouts()
  }, [])

  const items = useMemo(() => workouts.slice(0, 10), [workouts])

  if (loading) return <p>Loading workouts...</p>
  if (error) return <p role="alert">{error}</p>

  return (
    <section>
      <h2>Workouts</h2>
      <ul>
        {items.map((workout) => (
          <li key={workout._id || workout.id || workout.title}>
            <strong>{workout.title}</strong> — {workout.difficulty}
          </li>
        ))}
      </ul>
    </section>
  )
}

// TODO: usar https://scaling-umbrella-8000.app.github.dev/api/workouts