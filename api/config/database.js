import { MongoClient } from 'mongodb';
import mongoose from 'mongoose';

export const connectToMongoClient = async (uri) => {
  const mongoClient = new MongoClient(uri);

  await mongoClient.connect();
  console.log('Connected to MongoDB');
  return mongoClient;
};

export const connectToMongoose = async (uri) => {
  await mongoose.connect(uri);
  console.log('Mongoose connected to MongoDB');
};
