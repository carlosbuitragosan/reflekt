import express from 'express';
import passport from 'passport';

const router = express.Router();

//define the post route
router.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      return res.status(500).json({ msg: 'Internal server error.' });
    }
    if (!user) {
      return res.status(403).json({ msg: 'Invalid user.', details: info });
    }
    req.login(user, (err) => {
      if (err) {
        return res.status(500).json({ msg: 'Failed to create session.' });
      }
      return res.status(200).json({
        success: true,
        msg: 'Login successful',
        user: req.user,
      });
    });
  })(req, res, next);
});

export default router;
