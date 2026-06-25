import { Router, Request, Response } from 'express'
import User from '../models/user.js'

const router = Router()

router.get('/', async (_req: Request, res: Response) => {
  const users = await User.find().select('-passwordHash').lean()
  res.json({ users })
})

router.post('/', async (req: Request, res: Response) => {
  const u = new User(req.body)
  await u.save()
  res.status(201).json({ message: 'user created', data: u })
})

export default router
