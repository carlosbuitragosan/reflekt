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
router.post('/logout', (req, res) => {
  req.logout((err) => {
    if (err) {
      return res
        .status(500)
        .json({ success: false, msg: 'Logout failed.', error: err });
    }
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).json({
          success: false,
          msg: 'Error destroying session',
          error: err,
        });
      }
      res.clearCookie('connect.sid');
      return res.status(200).json({ success: true, msg: 'Logout successful.' });
    });
  });
});

// register route
router.post('/register', async (req, res) => {
  const { email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ success: false, msg: 'User already exists.' });
    }
    const newUser = new User({ email, password });
    await newUser.save();
    return res.status(201).json({
      success: true,
      msg: 'User registered successfully.',
      user: { email: newUser.email, password: newUser.password },
    });
  } catch (err) {
    return res
      .status(500)
      .json({ success: false, msg: 'Error registering user: ', error: err });
  }
});

export default router;
