"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("../db");
const models_1 = require("../models");
// Seed the octofit_db database with test data
const seedDatabase = async () => {
    try {
        await (0, db_1.connectToDatabase)();
        console.log('Connected to MongoDB for seeding');
        await Promise.all([
            models_1.User.deleteMany({}),
            models_1.Team.deleteMany({}),
            models_1.Activity.deleteMany({}),
            models_1.LeaderboardEntry.deleteMany({}),
            models_1.Workout.deleteMany({}),
        ]);
        const createdUsers = await models_1.User.insertMany([
            { name: 'Avery Chen', email: 'avery@example.com', role: 'member', fitnessGoal: 'Half marathon' },
            { name: 'Jordan Rivera', email: 'jordan@example.com', role: 'coach', fitnessGoal: 'Strength balance' },
            { name: 'Sam Patel', email: 'sam@example.com', role: 'member', fitnessGoal: 'Weight loss' },
        ]);
        await models_1.Team.insertMany([
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
        await models_1.Activity.insertMany([
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
        await models_1.LeaderboardEntry.insertMany([
            { userId: createdUsers[0]._id, score: 92, streak: 7 },
            { userId: createdUsers[1]._id, score: 88, streak: 4 },
            { userId: createdUsers[2]._id, score: 84, streak: 5 },
        ]);
        await models_1.Workout.insertMany([
            { title: 'Morning Run', difficulty: 'easy', duration: 30, focus: 'endurance' },
            { title: 'Core Circuit', difficulty: 'moderate', duration: 40, focus: 'strength' },
            { title: 'HIIT Intervals', difficulty: 'hard', duration: 25, focus: 'cardio' },
        ]);
        console.log('Seed data inserted successfully');
        process.exit(0);
    }
    catch (error) {
        console.error('Error seeding database', error);
        process.exit(1);
    }
};
seedDatabase();
