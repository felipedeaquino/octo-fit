import mongoose, { Schema } from 'mongoose';
const ActivitySchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    type: { type: String, required: true },
    durationMin: { type: Number, required: true },
    calories: { type: Number, required: true },
    date: { type: Date, default: () => new Date() }
});
const Activity = mongoose.model('Activity', ActivitySchema);
export default Activity;
//# sourceMappingURL=activity.js.map