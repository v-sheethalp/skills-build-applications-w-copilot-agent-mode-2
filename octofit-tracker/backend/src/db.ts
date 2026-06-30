import mongoose from 'mongoose';

export const MONGO_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/octofit_db';

export const connectToDatabase = async () => {
  if (mongoose.connection.readyState === 1) {
    return mongoose.connection;
  }

  await mongoose.connect(MONGO_URI, {
    serverSelectionTimeoutMS: 5000,
  });

  return mongoose.connection;
};
