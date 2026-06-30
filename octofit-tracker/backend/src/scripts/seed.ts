import { connectToDatabase } from '../db';
import { Activity, LeaderboardEntry, Team, User, Workout } from '../models';

// Seed the octofit_db database with test data
const seedDatabase = async () => {
  try {
    await connectToDatabase();
    console.log('Connected to MongoDB for seeding');

    await Promise.all([
      User.deleteMany({}),
      Team.deleteMany({}),
      Activity.deleteMany({}),
      LeaderboardEntry.deleteMany({}),
      Workout.deleteMany({}),
    ]);

    const createdUsers = await User.insertMany([
      { name: 'Avery Chen', email: 'avery@example.com', role: 'member', fitnessGoal: 'Half marathon' },
      { name: 'Jordan Rivera', email: 'jordan@example.com', role: 'coach', fitnessGoal: 'Strength balance' },
      { name: 'Sam Patel', email: 'sam@example.com', role: 'member', fitnessGoal: 'Weight loss' },
    ]);

    await Team.insertMany([
      {
        name: 'Night Riders',
        goal: 'Train for a marathon relay',
        members: ['Avery Chen', 'Sam Patel'],
      },
      {
        name: 'Core Crew',
        goal: 'Build strength and endurance',
        members: ['Jordan Rivera'],
      },
    ]);

    await Activity.insertMany([
      {
        userId: createdUsers[0]._id,
        type: 'run',
        duration: 35,
        date: '2026-06-30',
      },
      {
        userId: createdUsers[1]._id,
        type: 'strength',
        duration: 45,
        date: '2026-06-29',
      },
      {
        userId: createdUsers[2]._id,
        type: 'cycling',
        duration: 60,
        date: '2026-06-28',
      },
    ]);

    await LeaderboardEntry.insertMany([
      { userId: createdUsers[0]._id, score: 92, streak: 7 },
      { userId: createdUsers[1]._id, score: 88, streak: 4 },
      { userId: createdUsers[2]._id, score: 84, streak: 5 },
    ]);

    await Workout.insertMany([
      { title: 'Morning Run', difficulty: 'easy', duration: 30, focus: 'endurance' },
      { title: 'Core Circuit', difficulty: 'moderate', duration: 40, focus: 'strength' },
      { title: 'HIIT Intervals', difficulty: 'hard', duration: 25, focus: 'cardio' },
    ]);

    console.log('Seed data inserted successfully');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database', error);
    process.exit(1);
  }
};

seedDatabase();
