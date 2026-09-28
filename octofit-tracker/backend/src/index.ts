import express from 'express';
import './config/database.js';
import {
  activitiesRouter,
  leaderboardRouter,
  teamsRouter,
  usersRouter,
  workoutsRouter,
} from './routes/index.js';
import { API_BASE_URL, API_PORT } from './server.js';

const app = express();

app.use(express.json());

app.get('/api', (_request, response) => {
  response.json({
    baseUrl: API_BASE_URL,
    endpoints: ['/api/users/', '/api/teams/', '/api/activities/', '/api/leaderboard/', '/api/workouts/'],
  });
});

app.get('/api/health', (_request, response) => {
  response.json({ status: 'ok' });
});

app.use('/api/users', usersRouter);
app.use('/api/teams', teamsRouter);
app.use('/api/activities', activitiesRouter);
app.use('/api/leaderboard', leaderboardRouter);
app.use('/api/workouts', workoutsRouter);

app.use((error: Error, _request: express.Request, response: express.Response, _next: express.NextFunction) => {
  const status = error.name === 'ValidationError' || error.name === 'CastError' ? 400 : 500;
  response.status(status).json({ error: error.message });
});

app.listen(API_PORT, () => {
  console.log(`OctoFit API listening at ${API_BASE_URL}`);
});