import { useEffect, useMemo, useState } from 'react'
import { buildApiUrl } from '../utils/api.js'

export default function Users() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    async function loadUsers() {
      try {
        const response = await fetch(buildApiUrl('users'))
        if (!response.ok) throw new Error('Failed to load users')
        const payload = await response.json()
        const data = Array.isArray(payload) ? payload : payload.users ?? payload.results ?? []
        setUsers(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    loadUsers()
  }, [])

  const items = useMemo(() => users.slice(0, 10), [users])

  if (loading) return <p>Loading users...</p>
  if (error) return <p role="alert">{error}</p>

  return (
    <section>
      <h2>Users</h2>
      <ul>
        {items.map((user) => (
          <li key={user._id || user.id || user.email}>
            <strong>{user.name}</strong> — {user.email}
          </li>
        ))}
      </ul>
    </section>
  )
}
