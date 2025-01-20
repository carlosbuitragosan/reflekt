import { Router } from 'express';

const router = Router();

router.get('/diary-entry', (req, res) => {
  console.log('get endpoint hit');
  if (req.isAuthenticated) {
    return res.status(200).json({ user: req.user });
  }
  return res
    .status(403)
    .json({ msg: 'You are not authorized to view this page.' });
});

export default router;
