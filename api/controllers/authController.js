import passport from 'passport';
import { logoutUser, registerUser } from '../services/userService.js';

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

export const logoutHandler = async (req, res, next) => {
  try {
    await logoutUser(req, res);
    return res.status(200).json({ success: true, msg: 'Logout successful.' });
  } catch (err) {
    next(err);
  }
};

export const registerHandler = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const newUser = await registerUser({ email, password });

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
