import passport from 'passport';
import LocalStrategy from 'passport-local';
import User from '../models/User.js';
import bcrypt from 'bcrypt';
//js executes the import as a side effect, and the google & github strategies are registered with passport
import './googleOAuth.js';
import './githubOAuth.js';

//set up LocalStrategy to validate user's credentials. by default, LocalStrategy looks for a username. when using email, it needs to be specified explicitly.
passport.use(
  new LocalStrategy(
    { usernameField: 'email' },
    async (email, password, done) => {
      try {
        const user = await User.findOne({ email });
        if (!user) {
          return done(null, false, { message: 'No user found.' });
        }
        if (!bcrypt.compare(password, user.password)) {
          return done(null, false, { message: 'Incorrect password.' });
        }
        return done(null, user);
      } catch (err) {
        return done(err);
      }
    },
  ),
);

//Determines which data should be stored in the session
passport.serializeUser((user, done) => {
  try {
    done(null, user.id);
  } catch (err) {
    console.error('Error in serializing user: ', err);
    return done(err);
  }
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
