import { Router, Request, Response } from 'express'
import Team from '../models/team.js'

const router = Router()

router.get('/', async (_req: Request, res: Response) => {
  const teams = await Team.find().lean()
  res.json({ teams })
})

router.post('/', async (req: Request, res: Response) => {
  const t = new Team(req.body)
  await t.save()
  res.status(201).json({ message: 'team created', data: t })
})

export default router
