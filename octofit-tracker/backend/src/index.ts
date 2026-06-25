import express from 'express'
import mongoose from 'mongoose'
import usersRouter from './routes/users.js'
import teamsRouter from './routes/teams.js'
import activitiesRouter from './routes/activities.js'
import leaderboardRouter from './routes/leaderboard.js'
import workoutsRouter from './routes/workouts.js'

const PORT = process.env.PORT ? Number(process.env.PORT) : 8000
const MONGO_URL = process.env.MONGO_URL || 'mongodb://127.0.0.1:27017/octofit'

// Codespaces-aware public URL (if CODESPACE_NAME set, GitHub provides a preview URL)
const CODESPACE_NAME = process.env.CODESPACE_NAME
const PUBLIC_URL = CODESPACE_NAME
  ? `https://${CODESPACE_NAME}-${PORT}.githubpreview.dev`
  : `http://localhost:${PORT}`

const app = express()
app.use(express.json())

// Mount API routers
app.use('/api/users', usersRouter)
app.use('/api/teams', teamsRouter)
app.use('/api/activities', activitiesRouter)
app.use('/api/leaderboard', leaderboardRouter)
app.use('/api/workouts', workoutsRouter)

app.get('/', (_req, res) => res.json({ status: 'ok', api: `${PUBLIC_URL}/api` }))

async function start() {
  try {
    await mongoose.connect(MONGO_URL)
    console.log('Connected to MongoDB', MONGO_URL)
    app.listen(PORT, '0.0.0.0', () => console.log(`Server listening on ${PUBLIC_URL}`))
  } catch (err) {
    console.error('Failed to start server', err)
    process.exit(1)
  }
}

start()
