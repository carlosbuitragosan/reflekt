import { Router } from 'express';

const router = Router();

router.get('/diary-entry', (req, res, next) => {
  try {
    if (!req.isAuthenticated) {
      const error = new Error('You are not authorized to view this page.');
      error.statusCode = 403;
      return next(error);
    }
    return res.status(200).json({ user: req.user });
  } catch (err) {
    next(err);
  }
});

export default router;
