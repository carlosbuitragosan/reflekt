import mongoose from 'mongoose';

export const connectToDatabase = async (uri) => {
  try {
    const connection = await mongoose.connect(uri);
    console.log('connected to mongoDB');
    return connection;
  } catch (err) {
    console.error('Error connecting to mongoDB: ', err);
    throw err;
  }
};
