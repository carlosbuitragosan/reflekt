import express from 'express';
import passport from 'passport';
import User from '../models/user.js';

const router = express.Router();

//login route
router.post('/login', passport.authenticate('local'), (req, res) => {
  return res.status(200).json({
    success: true,
    msg: 'Login successful',
    user: req.user,
  });
});

// logout route
router.post('/logout', (req, res, next) => {
  req.logout((err) => {
    if (err) return next();

    req.session.destroy((err) => {
      if (err) return next();

      res.clearCookie('connect.sid');
      return res.status(200).json({ success: true, msg: 'Logout successful.' });
    });
  });
});

// register route
router.post('/register', async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      const error = new Error('User already exists.');
      error.statusCode = 400;
      throw error;
    }
    const newUser = new User({ email, password });
    await newUser.save();
    return res.status(201).json({
      success: true,
      msg: 'User registered successfully.',
      user: { email: newUser.email },
    });
  } catch (err) {
    next(err);
  }
});

export default router;
