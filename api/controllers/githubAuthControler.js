import passport from 'passport';

// Github sign in handler
export const githubSignInHandler = passport.authenticate('github', {
  scope: ['user:email'],
});

// Github sign in callback handler using passport.authenticate custom callback (err, user, info) which helps logging errors
export const githubSignInCallbackHandler = (req, res, next) => {
  passport.authenticate('github', { session: false }, (err, user, info) => {
    if (err) {
      console.log('Error during GitHub authentication: ', err);
      return res.status(500).json({ error: 'Internal server error.' });
    }
    if (!user) {
      console.log('GitHub authentication failed: ', info);
      return res.redirect('/login');
    }
    req.user = user;

    return res.redirect(
      `http://localhost:5173/login?email=${req.user.email}&githubId=${req.user.githubId}`,
    );
  })(req, res, next); // <-- call passport middleware
};
