import mongoose, { Schema, Document, Model } from 'mongoose'

export interface IWorkout extends Document {
  title: string
  description?: string
  exercises: { name: string; reps?: number; sets?: number; durationMin?: number }[]
  durationMin?: number
  difficulty?: 'easy' | 'medium' | 'hard'
  createdAt: Date
}

const WorkoutSchema = new Schema<IWorkout>({
  title: { type: String, required: true },
  description: { type: String },
  exercises: [{ name: String, reps: Number, sets: Number, durationMin: Number }],
  durationMin: Number,
  difficulty: { type: String, enum: ['easy', 'medium', 'hard'], default: 'medium' },
  createdAt: { type: Date, default: () => new Date() }
})

const Workout: Model<IWorkout> = mongoose.model<IWorkout>('Workout', WorkoutSchema)
export default Workout
