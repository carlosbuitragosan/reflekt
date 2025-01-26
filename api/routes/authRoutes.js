import express from 'express';
import passport from 'passport';
import User from '../utils/user.js';
import bcrypt from 'bcrypt';
import { passwordRegex } from '../utils/passwordRegex.js';

const router = express.Router();

//login route
router.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) return next(err);

    if (!user) {
      return res.status(401).json({
        success: false,
        msg: info.message || 'Login failed.',
      });
    }

    //Login user to create a session
    req.login(user, (err) => {
      if (err) return next(err);

      return res.status(200).json({
        success: true,
        msg: 'Login successful',
        user: { email: user.email },
      });
    });
  })(req, res, next);
});

// logout route
router.post('/logout', (req, res, next) => {
  console.log('Logging out user:', req.user);
  req.logout((err) => {
    console.log('Error logging out:', err);
    if (err) return next();

    // Remove session data
    req.session.destroy((err) => {
      if (err) {
        console.log('Error destroying session:', err);
        return next();
      }
      console.log('Session destroyed:', req.session);
      // Clear the session cookie
      res.clearCookie('connect.sid');
      console.log('Response cookies:', res.getHeader('Set-Cookie'));
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
      return next(error);
    }

    if (!passwordRegex.test(password)) {
      const error = new Error(
        'Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number, and one special character (@$!%*?&)',
      );
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
