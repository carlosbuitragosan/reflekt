import express from 'express';
import {
  loginHandler,
  logoutHandler,
  registerHandler,
} from '../controllers/localAuthController.js';
import {
  googleSignInCallbackHandler,
  googleSignInHandler,
} from '../controllers/googleAuthController.js';
import {
  githubSignInCallbackHandler,
  githubSignInHandler,
} from '../controllers/githubAuthControler.js';
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

// Github routes
router.get('/github', githubSignInHandler);
router.get('/github/callback', githubSignInCallbackHandler);

export default router;
