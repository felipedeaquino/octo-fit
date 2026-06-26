import mongoose, { Schema } from 'mongoose';
const WorkoutSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String },
    exercises: [{ name: String, reps: Number, sets: Number, durationMin: Number }],
    durationMin: Number,
    difficulty: { type: String, enum: ['easy', 'medium', 'hard'], default: 'medium' },
    createdAt: { type: Date, default: () => new Date() }
});
const Workout = mongoose.model('Workout', WorkoutSchema);
export default Workout;
//# sourceMappingURL=workout.js.map