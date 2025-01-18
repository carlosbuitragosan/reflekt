export const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    const db = req.mongoClient.db('reflekt');
    const user = await db.collection('users').findOne({ username });

    if (!user) {
      return res.status(403).json({ msg: 'No user found.' });
    }
    if (user.password === password) {
      console.log('session before authentication in loginUser: ', req.session);

      //set session data
      req.session.authenticated = true;
      req.session.user = { username };

      console.log('session after authentication in loginUser: ', req.session);

      return res.status(200).json({
        success: true,
        msg: 'Login successful.',
        user: req.session.user,
      });
    }
    return res.status(403).json({ msg: 'Bad credentials.' });
  } catch (err) {
    return res.status(500).json({ msg: 'Internal server error.' });
  }
};
