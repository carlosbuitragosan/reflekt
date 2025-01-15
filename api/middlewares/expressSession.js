import session from 'express-session';
import MongoStore from 'connect-mongo';

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
      secure: true, // cookie only sent through https
      httpOnly: true, //access through hhtp(s) and not js
      maxAge: 1000 * 60 * 60 * 24,
    },
  });