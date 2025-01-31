import { MongoClient } from 'mongodb';
import mongoose from 'mongoose';

// MongoClient is needed to interact with connect-mongo in express session
export const connectToMongoClient = async (uri) => {
  const mongoClient = new MongoClient(uri);

  await mongoClient.connect();

  console.log('Connected to MongoDB');

  return mongoClient;
};

// use mongoose for easy interaction with mongoDB
export const connectToMongoose = async (uri) => {
  await mongoose.connect(uri);

  console.log('Mongoose connected to MongoDB');
};
