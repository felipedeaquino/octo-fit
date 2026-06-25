import mongoose, { Schema, Document, Model } from 'mongoose'

export interface IUser extends Document {
  name: string
  email: string
  passwordHash?: string
  teams: mongoose.Types.ObjectId[]
  createdAt: Date
}

const UserSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String },
  teams: [{ type: Schema.Types.ObjectId, ref: 'Team' }],
  createdAt: { type: Date, default: () => new Date() }
})

const User: Model<IUser> = mongoose.model<IUser>('User', UserSchema)
export default User
