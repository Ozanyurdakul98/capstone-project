import bcrypt from 'bcrypt';
import User from '../../models/UserModel';

export default async function handler(req, res) {
  const body = req.body;
  const user = await User.findOne({ email: body.email });
  const patternEmail = /^([^\s@]+@[^\s@]+\.[^\s@]+$)$/i;
  if (!email) {
    throw new Error('You need to enter a Email!');
  }
  if (email.length > 50) {
    throw new Error('Email adress is too long!');
  }
  if (!patternEmail.test(email)) {
    throw new Error('Email format is not valid!');
  }
  if (user) {
    res.status(200).json({ message: 'already registered' });
    return;
  }
  const salt = await bcrypt.genSalt(10);
  const hashPass = await bcrypt.hash(body.password, salt);
  const newUser = new User({ email: body.email, password: hashPass });
  await newUser.save();
  res.status(200).json({ message: 'success' });
}
