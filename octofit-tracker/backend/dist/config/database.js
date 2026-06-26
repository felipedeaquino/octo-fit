import mongoose from 'mongoose';
export const MONGO_URL = process.env.MONGO_URL || 'mongodb://127.0.0.1:27017/octofit_db';
export async function connectDatabase(url = MONGO_URL) {
    if (mongoose.connection.readyState === 1) {
        return mongoose.connection;
    }
    await mongoose.connect(url);
    return mongoose.connection;
}
export async function disconnectDatabase() {
    if (mongoose.connection.readyState !== 0) {
        await mongoose.disconnect();
    }
}
export default {
    MONGO_URL,
    connectDatabase,
    disconnectDatabase
};
//# sourceMappingURL=database.js.map