import { configureSession } from '../middlewares/expressSession.js';
import { configureGlobalMiddleware } from '../middlewares/global.js';
import authRoute from '../routes/authRoutes.js';
import diaryRoute from '../routes/diaryRoutes.js';
import errorHandler from '../middlewares/errorHandler.js';

export const configureApp = (app, mongoClient, sessionSecret) => {
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

  // Error handling middleware
  app.use(errorHandler);
};
