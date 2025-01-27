export const logoutUser = async (req, res) => {
  return new Promise((resolve, reject) => {
    req.logout((err) => {
      if (err) reject(err);

      // Remove session data
      req.session.destroy((err) => {
        if (err) reject(err);
        // Clear the session cookie
        res.clearCookie('connect.sid');
        resolve();
      });
    });
  });
};
