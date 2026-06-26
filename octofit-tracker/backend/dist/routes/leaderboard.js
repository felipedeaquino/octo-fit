import { Router } from 'express';
import Leaderboard from '../models/leaderboard.js';
const router = Router();
router.get('/', async (_req, res) => {
    const leaderboard = await Leaderboard.find().lean();
    res.json({ leaderboard });
});
export default router;
//# sourceMappingURL=leaderboard.js.map