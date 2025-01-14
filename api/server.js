import express from 'express';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import { connectToDatabase } from './utils/database.js';
import { MongoClient } from 'mongodb';
dotenv.config();

const app = express();
const PORT = 4001;
const sessionSecret = process.env.SESSION_SECRET;
const mongoURI = process.env.MONGO_URI;

app.use(cors());

const mongoClient = new MongoClient(mongoURI);

const startServer = async () => {
  try {
    await mongoClient.connect();
    console.log('Connected to MongoDB');

    await mongoose.connect(mongoURI);
    console.log('Mongoose connected to MongoDB');

    app.use(
      session({
        secret: sessionSecret,
        resave: false,
        saveUninitialized: false,
        store: MongoStore.create({
          client: mongoClient,
          dbName: 'reflekt-cluster',
        }),
        cookie: {
          secure: true,
          httpOnly: true,
          maxAge: 1000 * 60 * 60 * 24,
        },
      }),
    );

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error('Failed to start server: ', err);
    process.exit(1);
  }
};

startServer();
