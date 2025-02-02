import passport from 'passport';

// Github sign in handler
export const githubSignInHandler = passport.authenticate('github', {
  scope: ['user:email'],
});

// Github sign in callback handler
export const githubSignInCallbackHandler = (req, res, next) => {
  passport.authenticate('github', {
    session: false,
    failureRedirect: '/login',
  })(req, res, () => {
    console.log('user from callback: ', req.user);
    if (req.user) {
      console.log('Github user authenticated: ', req.user);
      return res.redirect(
        `http://localhost:5173/login?email=${req.user.email}&githubId=${req.user.githubId}`,
      );
    }
    return res.status(401).json({ error: 'GitHub authentication failed.' });
  });
};
