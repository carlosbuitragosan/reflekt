import passport from 'passport';
import LocalStrategy from 'passport-local';

//set up LocalStrategy to validate user's credentials
passport.use(
  new LocalStrategy(
    //req is not available here. passReqToCallback to access it.
    { passReqToCallback: true },
    async (req, username, password, done) => {
      try {
        const db = req.mongoClient.db('reflekt');
        const user = await db.collection('users').findOne({ username });

        if (!user) {
          return done(null, false, { messge: 'No user found.' });
        }
        if (user.password !== password) {
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
  return done(null, user._id);
});

//user can be retrieved from the session
passport.deserializeUser(async (req, id, done) => {
  const db = req.mongoClient.db('reflekt');
  const user = await db.collection('users').findOne({ _id: id });
  return done(null, user);
});

export default passport;
