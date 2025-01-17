export const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    const db = req.mongoClient.db('reflekt');
    const user = await db.collection('users').findOne({ username });

    if (!user) {
      return res.status(403).json({ msg: 'No user found.' });
    }
    if (user.password === password) {
      req.session.authenticated = true;
      req.session.user = { username, password };
      return res.status(200).json({ msg: 'Login successful.' });
    }
    return res.status(403).json({ msg: 'Bad credentials.' });
  } catch (err) {
    return res.status(500).json({ msg: 'Internal server error.' });
  }
};
