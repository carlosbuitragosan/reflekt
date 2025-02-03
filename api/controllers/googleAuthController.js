import passport from 'passport';

export const googleSignInHandler = passport.authenticate('google', {
  scope: ['email', 'profile'],
});

export const googleSignInCallbackHandler = (req, res, next) => {
  passport.authenticate('google', { session: false }, (err, user, info) => {
    if (err) {
      console.log('Error during Google authentication: ', err);
      return res.status(500).json({ error: 'Internal server error.' });
    }
    if (!user) {
      console.log('Google authentication failed: ', info);
      return res.redirect('/login');
    }
    req.user = user;

    return res.redirect(
      `http://localhost:5173/login?email=${req.user.email}&googleId=${req.user.googleId}`,
    );
  })(req, res, next);
};
// export const googleSignInCallbackHandler = (req, res) => {
//   passport.authenticate('google', {
//     session: false,
//     failureRedirect: '/login',
//   })(req, res, () => {
//     if (req.user) {
//       console.log('user authenticated: ', req.user);
//       return res.redirect(
//         `http://localhost:5173/login?email=${req.user.email}&googleId=${req.user.googleId}`,
//       );
//     }
//     return res.status(401).json({ error: 'Google authentication failed' });
//   });
// };
