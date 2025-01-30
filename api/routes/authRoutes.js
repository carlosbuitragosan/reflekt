import express from 'express';
import passport from 'passport';

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

router.get(
  '/google',
  passport.authenticate('google', { scope: ['email', 'profile'] }),
);

router.get(
  '/google/callback',
  passport.authenticate('google', {
    session: false,
    failureRedirect: '/login',
  }),
  (req, res) => {
    console.log('received google callback');

    if (req.user) {
      console.log('user authenticated: ', req.user);
      return res.redirect(
        `http://localhost:5173/login?email=${req.user.email}&googleId=${req.user.googleId}`,
      );
    }
    return res.status(401).json({ error: 'Google authentication failed' });
  },
);

export default router;
