import User from '../models/User.js';
import bcrypt from 'bcrypt';

export const logoutUser = async (req, res) => {
  return new Promise((resolve, reject) => {
    req.logout((err) => {
      if (err) reject(err);

      // Remove session data
      req.session.destroy((err) => {
        if (err) reject(err);
        // Clear the session cookie
        res.clearCookie('connect.sid');
        resolve();
      });
    });
  });
};

export const registerUser = async ({ email, password }) => {
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    const error = new Error('User already exists.');
    error.statusCode = 400;
    throw error;
  }

  // Hash the password
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  // create a new user
  const newUser = new User({ email, password: hash });
  return await newUser.save();
};
