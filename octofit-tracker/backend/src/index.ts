import express from 'express'
import { pathToFileURL } from 'node:url'
import usersRouter from './routes/users.js'
import teamsRouter from './routes/teams.js'
import activitiesRouter from './routes/activities.js'
import leaderboardRouter from './routes/leaderboard.js'
import workoutsRouter from './routes/workouts.js'
import { connectDatabase, MONGO_URL } from './config/database.js'

const PORT = process.env.PORT ? Number(process.env.PORT) : 8000

function getPublicBaseUrl() {
  const codespaceName = process.env.CODESPACE_NAME
  return codespaceName
    ? `https://${codespaceName}-${PORT}.app.github.dev`
    : `http://localhost:${PORT}`
}

const PUBLIC_URL = getPublicBaseUrl()

export const app = express()
app.use(express.json())

// Mount API routers
app.use('/api/users', usersRouter)
app.use('/api/teams', teamsRouter)
app.use('/api/activities', activitiesRouter)
app.use('/api/leaderboard', leaderboardRouter)
app.use('/api/workouts', workoutsRouter)

app.get('/', (_req, res) => res.json({ status: 'ok', api: `${PUBLIC_URL}/api` }))

export async function startServer() {
  try {
    await connectDatabase(MONGO_URL)
    console.log('Connected to MongoDB', MONGO_URL)
    app.listen(PORT, '0.0.0.0', () => console.log(`Server listening on ${PUBLIC_URL}`))
  } catch (err) {
    console.error('Failed to start server', err)
    process.exit(1)
  }
}

const isMainModule = process.argv[1] !== undefined && import.meta.url === pathToFileURL(process.argv[1]).href

if (isMainModule) {
  startServer()
}
