import session from 'express-session';
import MongoStore from 'connect-mongo';

//set up session managment with express
export const configureSession = (mongoClient, sessionSecret) => {
  console.log('Configuring session middleware');
  return session({
    secret: sessionSecret, //used to sign the session ID cookie
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      //saves sessions in mongoDB 'sessions' collection
      client: mongoClient,
    }),
    cookie: {
      secure: false, // cookie only sent through https if true
      httpOnly: true, //cookie cannot be accessed by js
      sameSite: 'lax', // needed for cross-origin requests
      maxAge: 1000 * 60 * 60 * 24,
    },
  });
};
