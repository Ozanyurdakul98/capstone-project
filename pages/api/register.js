import bcrypt from 'bcrypt';
import User from '../../models/UserModel';

export default async function handler(req, res) {
  const body = req.body;
  const email = body.email;
  const password = body.password;
  const matchpassword = body.matchpassword;
  const isMatch = password === matchpassword;
  const patternEmail = /^([^\s@]+@[^\s@]+\.[^\s@]+$)$/i;
  const patternPassword = /^([a-zA-Z-0-9-!äöü#@.,-_]){8,60}$/i;
  if (!email) {
    throw new Error('You need to enter a Email!');
  }
  if (email.length > 50) {
    throw new Error('Email adress is too long!');
  }
  if (email.length < 3) {
    throw new Error('Email adress is too short!');
  }
  if (!patternEmail.test(email)) {
    throw new Error('Email format is not valid!');
  }
  const user = await User.findOne({ email: body.email });
  if (user) {
    res.status(200).json({ message: 'already registered' });
    return;
  }
  if (!password) {
    throw new Error('Please enter password');
  } else if (!patternPassword.test(password)) {
    throw new Error('Incorrect format! Only (a-zA-Z-0-9-!äöü#@.,-_) and 8-20 characters');
  }
  if (!matchpassword) {
    throw new Error('Enter your Password again!');
  } else if (!isMatch) {
    throw new Error('Password not matching!');
  }
  try {
    const salt = await bcrypt.genSalt(10);
    const hashPass = await bcrypt.hash(body.password, salt);
    const newUser = new User({ email: body.email, password: hashPass });
    await newUser.save();
    res.status(200).json({ message: 'success' });
  } catch (error) {
    return res.status(400).json({ success: false, message: 'Unauthorized', error });
  }
}
