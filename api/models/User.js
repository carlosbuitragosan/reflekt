import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  email: { type: String, unique: true },
  password: { type: String },
  // sparse since not all users will have google or github id
  googleId: { type: String, unique: true, sparse: true },
  githubId: { type: String, unique: true, sparse: true },
});

const User = mongoose.model('User', userSchema);

export default User;
