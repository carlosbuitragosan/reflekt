import { configureSession } from '../middlewares/expressSession.js';
import { configureGlobalMiddleware } from '../middlewares/global.js';
import authRoute from '../routes/authRoutes.js';
import diaryRoute from '../routes/diaryRoutes.js';
import errorHandler from '../middlewares/errorHandler.js';

export const configureApp = (app, mongoClient, sessionSecret) => {
  console.log('Configuring app');
  //Attach mongoClient to req in middleware
  app.use((req, res, next) => {
    console.log('Session before middleware: ', req.session);
    req.mongoClient = mongoClient;
    next();
  });

  // express session configuration
  app.use(configureSession(mongoClient, sessionSecret));

  //test
  app.use((req, res, next) => {
    console.log('Session after middleware: ', req.session);
    next();
  });
  //global middleware (cors, passport and others)
  configureGlobalMiddleware(app);

  //Routes
  app.use('/api/auth', authRoute);
  app.use('/api', diaryRoute);

  // Error handling middleware
  app.use(errorHandler);
};
