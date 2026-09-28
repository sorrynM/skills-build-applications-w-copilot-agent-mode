import { Router } from 'express';
import type { Model } from 'mongoose';
import { Activity, LeaderboardEntry, Team, User, Workout } from '../models/index.js';

function createCollectionRouter<T>(resourceModel: Model<T>, sort: Record<string, 1 | -1> = {}) {
  const router = Router();

  router.get('/', async (_request, response) => {
    const records = await resourceModel.find().sort(sort).lean();
    response.json(records);
  });

  router.post('/', async (request, response) => {
    const record = await resourceModel.create(request.body);
    response.status(201).json(record);
  });

  return router;
}

export const usersRouter = createCollectionRouter(User);
export const teamsRouter = createCollectionRouter(Team);
export const activitiesRouter = createCollectionRouter(Activity);
export const leaderboardRouter = createCollectionRouter(LeaderboardEntry, { points: -1 });
export const workoutsRouter = createCollectionRouter(Workout);