import passport from 'passport';
import User from '../models/User.js';
import bcrypt from 'bcrypt';

export const loginHandler = (req, res, next) => {
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
};

export const logoutHandler = (req, res, next) => {
  req.logout((err) => {
    if (err) return next();

    // Remove session data
    req.session.destroy((err) => {
      if (err) {
        return next();
      }
      // Clear the session cookie
      res.clearCookie('connect.sid');
      return res.status(200).json({ success: true, msg: 'Logout successful.' });
    });
  });
};

export const registerHandler = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      const error = new Error('User already exists.');
      error.statusCode = 400;
      return next(error);
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    console.log(hash);
    const newUser = new User({ email, password: hash });
    console.log(newUser);
    await newUser.save();

    //Login user to create a session
    req.login(newUser, (err) => {
      if (err) return next(err);

      return res.status(201).json({
        success: true,
        msg: 'User registered successfully.',
        user: { email: newUser.email },
      });
    });
  } catch (err) {
    next(err);
  }
};
