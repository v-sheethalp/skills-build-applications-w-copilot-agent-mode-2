import express, { type Request, type Response } from 'express';
import { connectToDatabase } from './db';
import { Activity, LeaderboardEntry, Team, User, Workout } from './models';

const app = express();
const port = Number(process.env.PORT || 8000);
const codespaceName = process.env.CODESPACE_NAME;
const apiBaseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000';

app.use(express.json());

const sendJson = (res: Response, data: unknown) => {
  res.json({ apiBaseUrl, data });
};

app.get('/api/health', (_req: Request, res: Response) => {
  sendJson(res, { status: 'ok', message: 'OctoFit Tracker backend is running' });
});

app.get(['/api/users', '/api/users/'], async (_req: Request, res: Response) => {
  await connectToDatabase();
  const users = await User.find({}).lean();
  sendJson(res, users);
});

app.get(['/api/teams', '/api/teams/'], async (_req: Request, res: Response) => {
  await connectToDatabase();
  const teams = await Team.find({}).lean();
  sendJson(res, teams);
});

app.get(['/api/activities', '/api/activities/'], async (_req: Request, res: Response) => {
  await connectToDatabase();
  const activities = await Activity.find({}).lean();
  sendJson(res, activities);
});

app.get(['/api/leaderboard', '/api/leaderboard/'], async (_req: Request, res: Response) => {
  await connectToDatabase();
  const leaderboard = await LeaderboardEntry.find({}).populate('userId').lean();
  sendJson(res, leaderboard);
});

app.get(['/api/workouts', '/api/workouts/'], async (_req: Request, res: Response) => {
  await connectToDatabase();
  const workouts = await Workout.find({}).lean();
  sendJson(res, workouts);
});

const startServer = async () => {
  try {
    await connectToDatabase();
    console.log('Connected to MongoDB');

    app.listen(port, () => {
      console.log(`Backend listening on port ${port}`);
      console.log(`API base URL: ${apiBaseUrl}`);
    });
  } catch (error) {
    console.error('Failed to start server', error);
    process.exit(1);
  }
};

startServer();

export { app, apiBaseUrl };
