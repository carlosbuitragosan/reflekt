import session from 'express-session';
import MongoStore from 'connect-mongo';

const isProduction = process.env.NODE_ENV === 'production';

//set up session managment with express
export const configureSession = (mongoClient, sessionSecret) =>
  session({
    secret: sessionSecret, //used to sign the session ID cookie
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      //saves sessions in mongoDB 'sessions' collection
      client: mongoClient,
      dbName: 'reflekt', // creates db if no db with that name is found
    }),
    cookie: {
      secure: false, // cookie only sent through https if true
      httpOnly: true, //cookie cannot be accessed by js
      sameSite: 'lax', // needed for cross-origin requests
      maxAge: 1000 * 60 * 60 * 24,
    },
  });
