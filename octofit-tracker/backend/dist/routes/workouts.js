import { Router } from 'express';
import Workout from '../models/workout.js';
const router = Router();
router.get('/', async (_req, res) => {
    const workouts = await Workout.find().lean();
    res.json({ workouts });
});
router.post('/', async (req, res) => {
    const w = new Workout(req.body);
    await w.save();
    res.status(201).json({ message: 'workout created', data: w });
});
export default router;
//# sourceMappingURL=workouts.js.map