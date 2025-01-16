import express from 'express';
import cors from 'cors';
import morgan from 'morgan';

const corsOptions = {
  origin: 'http://localhost:5173',
  credentials: true,
};

export const configureGlobalMiddleware = (app) => {
  // bodyparser setup to handle req and res
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());

  //enable cors globally
  app.use(cors(corsOptions));

  //set up http request logs
  app.use(morgan('dev'));
};
