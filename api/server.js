import express from 'express';
import dotenv from 'dotenv';
import { connectToMongoClient, connectToMongoose } from './utils/database.js';
import { configureGlobalMiddleware } from './middlewares/global.js';
import { configureSession } from './middlewares/expressSession.js';
import authRoute from './routes/authRoutes.js';
import diaryRoute from './routes/diaryRoutes.js';

dotenv.config();

const app = express();
const PORT = 4001;
const sessionSecret = process.env.SESSION_SECRET;
const mongoURI = process.env.MONGO_URI;

const startServer = async () => {
  try {
    //connect to mongoDB with MongoClient is needed to interact with connect-mongo in express session
    const mongoClient = await connectToMongoClient(mongoURI);

    // use mongoose for easy interaction with mongoDB
    await connectToMongoose(mongoURI);

    //Attach mongoClient to req in middleware
    app.use((req, res, next) => {
      req.mongoClient = mongoClient;
      next();
    });

    // express session configuration
    app.use(configureSession(mongoClient, sessionSecret));

    //global middleware (cors, passport and others)
    configureGlobalMiddleware(app);

    //Routes
    app.use('/api/auth', authRoute);
    app.use('/api', diaryRoute);

    // start express server
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (err) {
    //handle errors during server or db initialization
    console.error('Failed to start server: ', err);

    // terminate with an error code 1: error
    process.exit(1);
  }
};

startServer();
