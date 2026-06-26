import { Router } from 'express';
import User from '../models/user.js';
const router = Router();
router.get('/', async (_req, res) => {
    const users = await User.find().select('-passwordHash').lean();
    res.json({ users });
});
router.post('/', async (req, res) => {
    const u = new User(req.body);
    await u.save();
    res.status(201).json({ message: 'user created', data: u });
});
export default router;
//# sourceMappingURL=users.js.map