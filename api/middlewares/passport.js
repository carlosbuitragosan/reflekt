import passport from 'passport';
import LocalStrategy from 'passport-local';
import User from '../models/user.js';

//set up LocalStrategy to validate user's credentials
passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const user = await User.findOne({ username });
      if (!user) {
        return done(null, false, { message: 'No user found.' });
      }
      if (user.password !== password) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user);
    } catch (err) {
      return done(err);
    }
  }),
);

//Determines which data should be stored in the session
passport.serializeUser((user, done) => {
  return done(null, user.id);
});

//user can be retrieved from the session
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    if (!user) {
      console.log('no user found with id: ', id);
      return done(null, false);
    }
    return done(null, user);
  } catch (err) {
    console.error('Error in deserializing user: ', err);
    return done(err);
  }
});

export default passport;
