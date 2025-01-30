import express from 'express';
import {
  googleSignInCallbackHandler,
  googleSignInHandler,
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

//Redirect to google sign in
router.get('/google', googleSignInHandler);

// Handle google sign in callback, process user data, and redirect to the client
router.get('/google/callback', googleSignInCallbackHandler);

export default router;
