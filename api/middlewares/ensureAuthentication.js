export const ensureAuthentication = (req, res, next) => {
  if (req.session.authenticated) {
    return next();
  }
  return res
    .status(403)
    .json({ msg: 'You are not authorized to view this page.' });
};
