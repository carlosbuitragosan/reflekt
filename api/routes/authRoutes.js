import express from 'express';
import passport from 'passport';
import User from '../utils/user.js';
import bcrypt from 'bcrypt';

const router = express.Router();

//login route
router.post('/login', passport.authenticate('local'), (req, res) => {
  return res.status(200).json({
    success: true,
    msg: 'Login successful',
    user: { email: req.user.email },
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
  console.log('Session in register:', req.session);
  const { email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      const error = new Error('User already exists.');
      error.statusCode = 400;
      return next(error);
    }
    const salt = await bcrypt.genSalt(10);
    console.log('Generated salt:', salt);
    const hash = await bcrypt.hash(password, salt);
    console.log('Generated hash:', hash);

    const newUser = new User({ email, password: hash });
    await newUser.save();
    console.log('Is session available:', req.session ? true : false);
    console.log('Response cookies:', res.getHeader('Set-Cookie'));

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
