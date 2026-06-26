import { Router } from 'express';
import Activity from '../models/activity.js';
const router = Router();
router.get('/', async (_req, res) => {
    const activities = await Activity.find().populate('user', 'name email').lean();
    res.json({ activities });
});
router.post('/', async (req, res) => {
    const a = new Activity(req.body);
    await a.save();
    res.status(201).json({ message: 'activity logged', data: a });
});
export default router;
//# sourceMappingURL=activities.js.map