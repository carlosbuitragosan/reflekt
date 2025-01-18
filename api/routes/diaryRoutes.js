import { Router } from 'express';
import { ensureAuthentication } from '../middlewares/ensureAuthentication.js';

const router = Router();

router.get('/diary-entry', ensureAuthentication, (req, res) => {
  return res.status(200).json({ user: req.session.user });
});

export default router;
