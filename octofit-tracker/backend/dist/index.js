"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.apiBaseUrl = exports.app = void 0;
const express_1 = __importDefault(require("express"));
const db_1 = require("./db");
const models_1 = require("./models");
const app = (0, express_1.default)();
exports.app = app;
const port = Number(process.env.PORT || 8000);
const codespaceName = process.env.CODESPACE_NAME;
const apiBaseUrl = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev`
    : 'http://localhost:8000';
exports.apiBaseUrl = apiBaseUrl;
app.use(express_1.default.json());
const sendJson = (res, data) => {
    res.json({ apiBaseUrl, data });
};
app.get('/api/health', (_req, res) => {
    sendJson(res, { status: 'ok', message: 'OctoFit Tracker backend is running' });
});
app.get(['/api/users', '/api/users/'], async (_req, res) => {
    await (0, db_1.connectToDatabase)();
    const users = await models_1.User.find({}).lean();
    sendJson(res, users);
});
app.get(['/api/teams', '/api/teams/'], async (_req, res) => {
    await (0, db_1.connectToDatabase)();
    const teams = await models_1.Team.find({}).lean();
    sendJson(res, teams);
});
app.get(['/api/activities', '/api/activities/'], async (_req, res) => {
    await (0, db_1.connectToDatabase)();
    const activities = await models_1.Activity.find({}).lean();
    sendJson(res, activities);
});
app.get(['/api/leaderboard', '/api/leaderboard/'], async (_req, res) => {
    await (0, db_1.connectToDatabase)();
    const leaderboard = await models_1.LeaderboardEntry.find({}).populate('userId').lean();
    sendJson(res, leaderboard);
});
app.get(['/api/workouts', '/api/workouts/'], async (_req, res) => {
    await (0, db_1.connectToDatabase)();
    const workouts = await models_1.Workout.find({}).lean();
    sendJson(res, workouts);
});
const startServer = async () => {
    try {
        await (0, db_1.connectToDatabase)();
        console.log('Connected to MongoDB');
        app.listen(port, () => {
            console.log(`Backend listening on port ${port}`);
            console.log(`API base URL: ${apiBaseUrl}`);
        });
    }
    catch (error) {
        console.error('Failed to start server', error);
        process.exit(1);
    }
};
startServer();
