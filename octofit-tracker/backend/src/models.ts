import mongoose, { Schema, model, type Model } from 'mongoose';

export interface IUser {
  name: string;
  email: string;
  role: string;
  fitnessGoal: string;
}

export interface ITeam {
  name: string;
  goal: string;
  members: string[];
}

export interface IActivity {
  userId: mongoose.Types.ObjectId;
  type: string;
  duration: number;
  date: string;
}

export interface ILeaderboardEntry {
  userId: mongoose.Types.ObjectId;
  score: number;
  streak: number;
}

export interface IWorkout {
  title: string;
  difficulty: string;
  duration: number;
  focus: string;
}

const userSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  role: { type: String, required: true },
  fitnessGoal: { type: String, required: true },
});

const teamSchema = new Schema<ITeam>({
  name: { type: String, required: true, unique: true },
  goal: { type: String, required: true },
  members: [{ type: String, required: true }],
});

const activitySchema = new Schema<IActivity>({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  type: { type: String, required: true },
  duration: { type: Number, required: true },
  date: { type: String, required: true },
});

const leaderboardSchema = new Schema<ILeaderboardEntry>({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  score: { type: Number, required: true },
  streak: { type: Number, required: true },
});

const workoutSchema = new Schema<IWorkout>({
  title: { type: String, required: true, unique: true },
  difficulty: { type: String, required: true },
  duration: { type: Number, required: true },
  focus: { type: String, required: true },
});

export const User: Model<IUser> = model<IUser>('User', userSchema);
export const Team: Model<ITeam> = model<ITeam>('Team', teamSchema);
export const Activity: Model<IActivity> = model<IActivity>('Activity', activitySchema);
export const LeaderboardEntry: Model<ILeaderboardEntry> = model<ILeaderboardEntry>('LeaderboardEntry', leaderboardSchema);
export const Workout: Model<IWorkout> = model<IWorkout>('Workout', workoutSchema);
