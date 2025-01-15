import express from 'express';
import cors from 'cors';

export const configureGlobalMiddleware = (app) => {
  // bodyparser setup to handle req and res
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());

  //enable cors globally
  app.use(cors());
};
