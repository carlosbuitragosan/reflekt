import express from 'express';

import {
  loginHandler,
  logoutHandler,
  registerHandler,
} from '../controllers/authController.js';

const router = express.Router();

//login route
router.post('/login', loginHandler);

// logout route
router.post('/logout', logoutHandler);

// register route
router.post('/register', registerHandler);

export default router;
