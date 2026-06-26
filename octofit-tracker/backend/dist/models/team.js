import mongoose, { Schema } from 'mongoose';
const TeamSchema = new Schema({
    name: { type: String, required: true },
    members: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    createdAt: { type: Date, default: () => new Date() }
});
const Team = mongoose.model('Team', TeamSchema);
export default Team;
//# sourceMappingURL=team.js.map