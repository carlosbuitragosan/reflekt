import express from 'express';
import dotenv from 'dotenv';
import { initializeDatabase } from './utils/initializeDatabase.js';
import { configureApp } from './utils/configureApp.js';

dotenv.config();

const app = express();
const PORT = 4001;
const sessionSecret = process.env.SESSION_SECRET;
const mongoURI = process.env.MONGO_URI;

const startServer = async () => {
  try {
    // Initialize database
    const mongoClient = initializeDatabase(mongoURI);

    // Configure express app
    configureApp(app, mongoClient, sessionSecret);

    // start express server
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error('Failed to start server: ', err);

    // terminate with an error code 1: error
    process.exit(1);
  }
};

startServer();

export default app;
