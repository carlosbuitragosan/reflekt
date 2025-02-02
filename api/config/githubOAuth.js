import passport from 'passport';
import GitHubStrategy from 'passport-github2';
import User from '../models/User.js';
import dotenv from 'dotenv';

dotenv.config();

passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: 'http://localhost:4001/api/auth/github/callback',
    },
    async (accessToken, refreshToken, profile, done) => {
      console.log('github profile: ', profile);
      try {
        const user = await User.findOne({ githubId: profile.id });

        if (user) {
          return done(null, user);
        }

        const newUser = new User({
          githubId: profile.id,
          email: profile.emails[0].value,
        });

        await newUser.save();
        return done(null, newUser);
      } catch (err) {
        return done(err, null);
      }
    },
  ),
);

export default passport;
