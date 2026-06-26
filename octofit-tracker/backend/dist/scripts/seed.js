/**
 * Seed the octofit_db database with test data
 */
import User from '../models/user.js';
import Team from '../models/team.js';
import Workout from '../models/workout.js';
import Activity from '../models/activity.js';
import Leaderboard from '../models/leaderboard.js';
import { connectDatabase, disconnectDatabase, MONGO_URL } from '../config/database.js';
async function seed() {
    console.log('Seed the octofit_db database with test data');
    await connectDatabase(MONGO_URL);
    console.log('Connected to', MONGO_URL);
    // Clear existing data
    await Promise.all([
        User.deleteMany({}),
        Team.deleteMany({}),
        Workout.deleteMany({}),
        Activity.deleteMany({}),
        Leaderboard.deleteMany({})
    ]);
    // Create users
    const users = await User.create([
        { name: 'Alice Perez', email: 'alice@example.com', passwordHash: 'hashed:alice' },
        { name: 'Bob Tan', email: 'bob@example.com', passwordHash: 'hashed:bob' },
        { name: 'Carla Gomez', email: 'carla@example.com', passwordHash: 'hashed:carla' }
    ]);
    // Create teams
    const teams = await Team.create([
        { name: 'Octo Runners', members: [users[0]._id, users[1]._id] },
        { name: 'Deep Sea Swimmers', members: [users[2]._id] }
    ]);
    await Promise.all([
        User.findByIdAndUpdate(users[0]._id, { $set: { teams: [teams[0]._id] } }),
        User.findByIdAndUpdate(users[1]._id, { $set: { teams: [teams[0]._id] } }),
        User.findByIdAndUpdate(users[2]._id, { $set: { teams: [teams[1]._id] } })
    ]);
    // Create workouts
    const workouts = await Workout.create([
        {
            title: 'Full Body Blast',
            description: 'A quick full-body routine that targets strength and core.',
            exercises: [
                { name: 'Push-ups', reps: 12, sets: 3 },
                { name: 'Squats', reps: 15, sets: 3 },
                { name: 'Plank', durationMin: 2, sets: 3 }
            ],
            durationMin: 30,
            difficulty: 'medium'
        },
        {
            title: 'Morning Run',
            description: 'Easy-paced 5km run to build endurance.',
            exercises: [],
            durationMin: 25,
            difficulty: 'easy'
        }
    ]);
    // Create activities
    const activities = await Activity.create([
        { user: users[0]._id, type: 'run', durationMin: 25, calories: 220, date: new Date('2026-06-20T06:30:00.000Z') },
        { user: users[1]._id, type: 'cycle', durationMin: 45, calories: 500, date: new Date('2026-06-21T18:10:00.000Z') },
        { user: users[2]._id, type: 'swim', durationMin: 30, calories: 350, date: new Date('2026-06-22T07:00:00.000Z') }
    ]);
    // Create leaderboard entries
    await Leaderboard.create([
        { subjectType: 'user', subject: users[0]._id, score: 320, period: 'weekly' },
        { subjectType: 'user', subject: users[1]._id, score: 280, period: 'weekly' },
        { subjectType: 'team', subject: teams[0]._id, score: 600, period: 'weekly' }
    ]);
    console.log('Seed complete:', { users: users.length, teams: teams.length, workouts: workouts.length, activities: activities.length });
    await disconnectDatabase();
}
seed().catch((err) => {
    console.error('Seed failed', err);
    process.exit(1);
});
//# sourceMappingURL=seed.js.map