import express from 'express';
import passport from 'passport';

const router = express.Router();

//define the post route
router.post('/login', passport.authenticate('local'), (req, res) => {
  console.log('user from backend POST login: ', req.user);
  return res.status(200).json({
    success: true,
    msg: 'Login successful',
    user: req.user,
  });
});

export default router;
