import mongoose, { Schema, Document, Model } from 'mongoose'

export interface ITeam extends Document {
  name: string
  members: mongoose.Types.ObjectId[]
  createdAt: Date
}

const TeamSchema = new Schema<ITeam>({
  name: { type: String, required: true },
  members: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  createdAt: { type: Date, default: () => new Date() }
})

const Team: Model<ITeam> = mongoose.model<ITeam>('Team', TeamSchema)
export default Team
