"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Workout = exports.LeaderboardEntry = exports.Activity = exports.Team = exports.User = void 0;
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    role: { type: String, required: true },
    fitnessGoal: { type: String, required: true },
});
const teamSchema = new mongoose_1.Schema({
    name: { type: String, required: true, unique: true },
    goal: { type: String, required: true },
    members: [{ type: String, required: true }],
});
const activitySchema = new mongoose_1.Schema({
    userId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User', required: true },
    type: { type: String, required: true },
    duration: { type: Number, required: true },
    date: { type: String, required: true },
});
const leaderboardSchema = new mongoose_1.Schema({
    userId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User', required: true },
    score: { type: Number, required: true },
    streak: { type: Number, required: true },
});
const workoutSchema = new mongoose_1.Schema({
    title: { type: String, required: true, unique: true },
    difficulty: { type: String, required: true },
    duration: { type: Number, required: true },
    focus: { type: String, required: true },
});
exports.User = (0, mongoose_1.model)('User', userSchema);
exports.Team = (0, mongoose_1.model)('Team', teamSchema);
exports.Activity = (0, mongoose_1.model)('Activity', activitySchema);
exports.LeaderboardEntry = (0, mongoose_1.model)('LeaderboardEntry', leaderboardSchema);
exports.Workout = (0, mongoose_1.model)('Workout', workoutSchema);
