import { useEffect, useMemo, useState } from 'react'
import { buildApiUrl } from '../utils/api.js'

export default function Activities() {
  const [activities, setActivities] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    async function loadActivities() {
      try {
        const response = await fetch(buildApiUrl('activities'))
        if (!response.ok) throw new Error('Failed to load activities')
        const payload = await response.json()
        const data = Array.isArray(payload) ? payload : payload.activities ?? payload.results ?? []
        setActivities(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    loadActivities()
  }, [])

  const items = useMemo(() => activities.slice(0, 10), [activities])

  if (loading) return <p>Loading activities...</p>
  if (error) return <p role="alert">{error}</p>

  return (
    <section>
      <h2>Activities</h2>
      <ul>
        {items.map((activity) => (
          <li key={activity._id || activity.id || activity.type}>
            <strong>{activity.type}</strong> — {activity.durationMin} min
          </li>
        ))}
      </ul>
    </section>
  )
}
