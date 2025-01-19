export const ensureAuthentication = (req, res, next) => {
  if (req.isAuthenticated) {
    return next();
  }
  return res
    .status(403)
    .json({ msg: 'You are not authorized to view this page.' });
};
