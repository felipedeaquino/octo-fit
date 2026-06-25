/**
 * Seed the octofit_db database with test data
 */
import mongoose from 'mongoose'
import User from '../models/user.js'
import Team from '../models/team.js'
import Workout from '../models/workout.js'
import Activity from '../models/activity.js'
import Leaderboard from '../models/leaderboard.js'

const MONGO = process.env.MONGO_URL || 'mongodb://127.0.0.1:27017/octofit_db'

async function seed() {
  console.log('Seed the octofit_db database with test data')
  await mongoose.connect(MONGO)
  console.log('Connected to', MONGO)

  // Clear existing data
  await Promise.all([
    User.deleteMany({}),
    Team.deleteMany({}),
    Workout.deleteMany({}),
    Activity.deleteMany({}),
    Leaderboard.deleteMany({})
  ])

  // Create users
  const users = await User.create([
    { name: 'Alice Perez', email: 'alice@example.com' },
    { name: 'Bob Tan', email: 'bob@example.com' },
    { name: 'Carla Gomez', email: 'carla@example.com' }
  ])

  // Create teams
  const teams = await Team.create([
    { name: 'Octo Runners', members: [users[0]._id, users[1]._id] },
    { name: 'Deep Sea Swimmers', members: [users[2]._id] }
  ])

  // Create workouts
  const workouts = await Workout.create([
    {
      title: 'Full Body Blast',
      description: 'A quick full-body routine',
      exercises: [
        { name: 'Push-ups', reps: 12, sets: 3 },
        { name: 'Squats', reps: 15, sets: 3 }
      ],
      durationMin: 30,
      difficulty: 'medium'
    },
    {
      title: 'Morning Run',
      description: 'Easy-paced 5km run',
      exercises: [],
      durationMin: 25,
      difficulty: 'easy'
    }
  ])

  // Create activities
  const activities = await Activity.create([
    { user: users[0]._id, type: 'run', durationMin: 25, calories: 220, date: new Date() },
    { user: users[1]._id, type: 'cycle', durationMin: 45, calories: 500, date: new Date() },
    { user: users[2]._id, type: 'swim', durationMin: 30, calories: 350, date: new Date() }
  ])

  // Create leaderboard entries (simple scores)
  await Leaderboard.create([
    { subjectType: 'user', subject: users[0]._id, score: 320 },
    { subjectType: 'user', subject: users[1]._id, score: 280 },
    { subjectType: 'team', subject: teams[0]._id, score: 600 }
  ])

  console.log('Seed complete:', { users: users.length, teams: teams.length, workouts: workouts.length, activities: activities.length })
  await mongoose.disconnect()
}

seed().catch((err) => {
  console.error('Seed failed', err)
  process.exit(1)
})
