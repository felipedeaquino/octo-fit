import mongoose, { Schema, Document, Model } from 'mongoose'

export interface ILeaderboard extends Document {
  subjectType: 'user' | 'team'
  subject: mongoose.Types.ObjectId
  score: number
  period: string
}

const LeaderboardSchema = new Schema<ILeaderboard>({
  subjectType: { type: String, enum: ['user', 'team'], required: true },
  subject: { type: Schema.Types.ObjectId, required: true },
  score: { type: Number, required: true },
  period: { type: String, default: 'global' }
})

const Leaderboard: Model<ILeaderboard> = mongoose.model<ILeaderboard>('Leaderboard', LeaderboardSchema)
export default Leaderboard
