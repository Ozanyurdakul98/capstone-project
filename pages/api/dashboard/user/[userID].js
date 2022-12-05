import db from '../../../../lib/dbConnect';
import User from '../../../../models/ User';
import { getToken } from 'next-auth/jwt';

export default async function handler(req, res) {
  const token = await getToken({ req });
  if (token.role !== 'user' && token.role !== 'admin') {
    return res.status(401).json({
      success: false,
      message: 'Your session is invalid. You are not authorized to do this action!',
    });
  }
  if (req.method === 'GET') {
    try {
      const { userID } = req.query;
      const fetchedUser = await User.find({ _id: userID });
      return res.status(200).json({ success: true, data: fetchedUser });
    } catch (error) {
      return res.status(400).json({ success: false, message: 'User not found' });
    }
  } else if (req.method === 'PATCH') {
    await db.connect();
    try {
      const { userID } = req.query;
      const user = await User.findByIdAndUpdate(userID, req.body);
      return res.status(201).json({ success: true, data: user });
    } catch (error) {
      return res.status(400).json({ success: false, message: 'Unauthorized', error });
    }
  } else if (req.method === 'DELETE') {
    await db.connect();
    try {
      const { userID } = req.query;
      const status = await User.findByIdAndDelete(userID);
      return res.status(201).json({ success: true, status });
    } catch (error) {
      return res.status(400).json({ success: false, message: 'Unauthorized', error });
    }
  }
  return res.status(400).json({
    success: false,
    message: 'HTTP method is not allowed, Unauthorized',
  });
}
