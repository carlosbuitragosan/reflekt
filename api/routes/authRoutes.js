import express from 'express';
import passport from 'passport';

const router = express.Router();

//define the post route
router.post('/login', passport.authenticate('local'), (req, res) => {
  return res.status(200).json({
    success: true,
    msg: 'Login successful',
    user: req.user,
  });
});

router.post('/logout', (req, res) => {
  req.logout((err) => {
    if (err) {
      return res
        .status(500)
        .json({ success: false, msg: 'Logout failed.', error: err });
    }
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).json({
          success: false,
          msg: 'Error destroying session',
          error: err,
        });
      }
      res.clearCookie('connect.sid');
      return res.status(200).json({ success: true, msg: 'Logout successful.' });
    });
  });
});

export default router;
