import express from 'express';
import dotenv from 'dotenv';
import { connectToMongoClient, connectToMongoose } from './utils/database.js';
import { configureGlobalMiddleware } from './middlewares/global.js';
import { configureSession } from './middlewares/expressSession.js';
import { MongoClient } from 'mongodb';

dotenv.config();

const app = express();
const PORT = 4001;
const sessionSecret = process.env.SESSION_SECRET;
const mongoURI = process.env.MONGO_URI;

//global middleware
configureGlobalMiddleware(app);

const startServer = async () => {
  try {
    //connect to mongoDB with MongoClient is needed to interact with connect-mongo in express session
    const mongoClient = await connectToMongoClient(mongoURI);

    // use mongoose for easy interaction with mongoDB
    await connectToMongoose(mongoURI);

    // express session configuration
    app.use(configureSession(mongoClient, sessionSecret));

    app.post('/login', async (req, res) => {
      const { username, password } = req.body;
      const db = mongoClient.db('reflekt');
      const user = await db.collection('users').findOne({ username });

      if (!user) {
        return res.status(403).json({ msg: 'No user found.' });
      }
      if (user.password === password) {
        req.session.authenticated = true;
        req.session.user = { username, password };
        console.log(req.session);
        return res.status(200).json({ msg: 'Login successful.' });
      }
      return res.status(403).json({ msg: 'Bad credentials.' });
    });
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
