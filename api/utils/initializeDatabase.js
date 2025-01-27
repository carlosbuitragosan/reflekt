import { connectToMongoClient, connectToMongoose } from '../config/database.js';

export const initializeDatabase = async (mongoURI) => {
  //connect to mongoDB with MongoClient is needed to interact with connect-mongo in express session
  const mongoClient = await connectToMongoClient(mongoURI);

  // use mongoose for easy interaction with mongoDB
  await connectToMongoose(mongoURI);

  return mongoClient;
};
