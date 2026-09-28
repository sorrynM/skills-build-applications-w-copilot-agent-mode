import express from 'express';
import './config/database.js';
import {
  activitiesRouter,
  leaderboardRouter,
  teamsRouter,
  usersRouter,
  workoutsRouter,
} from './routes/index.js';

const app = express();
const port = 8000;
const codespaceName = process.env.CODESPACE_NAME;
const apiBaseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : `http://localhost:${port}`;

app.use(express.json());

app.get('/api', (_request, response) => {
  response.json({
    baseUrl: apiBaseUrl,
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

app.listen(port, () => {
  console.log(`OctoFit API listening at ${apiBaseUrl}`);
});