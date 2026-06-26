import mongoose, { Schema, Document, Model } from 'mongoose'

export interface IActivity extends Document {
  user: mongoose.Types.ObjectId
  type: string
  durationMin: number
  calories: number
  date: Date
}

const ActivitySchema = new Schema<IActivity>({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  type: { type: String, required: true },
  durationMin: { type: Number, required: true },
  calories: { type: Number, required: true },
  date: { type: Date, default: () => new Date() }
})

const Activity: Model<IActivity> = mongoose.model<IActivity>('Activity', ActivitySchema)
export default Activity
