import passport from 'passport';

export const googleSignInHandler = passport.authenticate('google', {
  scope: ['email', 'profile'],
});

export const googleSignInCallbackHandler = (req, res) => {
  passport.authenticate('google', {
    session: false,
    failureRedirect: '/login',
  })(req, res, () => {
    if (req.user) {
      console.log('user authenticated: ', req.user);
      return res.redirect(
        `http://localhost:5173/login?email=${req.user.email}&googleId=${req.user.googleId}`,
      );
    }
    return res.status(401).json({ error: 'Google authentication failed' });
  });
};
