import mongoose, { Schema } from 'mongoose';
const LeaderboardSchema = new Schema({
    subjectType: { type: String, enum: ['user', 'team'], required: true },
    subject: { type: Schema.Types.ObjectId, required: true },
    score: { type: Number, required: true },
    period: { type: String, default: 'global' }
});
const Leaderboard = mongoose.model('Leaderboard', LeaderboardSchema);
export default Leaderboard;
//# sourceMappingURL=leaderboard.js.map