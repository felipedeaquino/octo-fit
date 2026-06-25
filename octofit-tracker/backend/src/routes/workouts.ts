import { Router, Request, Response } from 'express'
import Workout from '../models/workout.js'

const router = Router()

router.get('/', async (_req: Request, res: Response) => {
  const workouts = await Workout.find().lean()
  res.json({ workouts })
})

router.post('/', async (req: Request, res: Response) => {
  const w = new Workout(req.body)
  await w.save()
  res.status(201).json({ message: 'workout created', data: w })
})

export default router
