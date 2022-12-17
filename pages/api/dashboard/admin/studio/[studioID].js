import db from '../../../../../lib/dbConnect';
import StudioListing from '../../../../../models/StudioListing';
import { getToken } from 'next-auth/jwt';
import moment from 'moment';

export default async function handler(req, res) {
  const token = await getToken({ req });
  if (token.role !== 'admin') {
    return res.status(401).json({
      success: false,
      message: 'Not an admin!',
    });
  }
  if (req.method === 'GET') {
    try {
      const { studioID } = req.query;
      const fetchingStudio = await StudioListing.find({ _id: studioID }).populate({
        path: 'user',
        model: 'users',
        select: 'avatar email name lastname username',
      });
      const serializing = JSON.parse(JSON.stringify(fetchingStudio));
      const serializedStudio = serializing.map((studio) => ({
        ...studio,
        createdAtDate: moment(studio.createdAt).format('DD/MM/yyyy'),
        createdAtTime: moment(studio.createdAt).format('kk:mm'),
        updatedAtDate: moment(studio.updatedAt).format('DD/MM/yyyy'),
        updatedAtTime: moment(studio.updatedAt).format('kk:mm'),
      }));
      return res.status(200).json({ success: true, data: serializedStudio });
    } catch (error) {
      return res.status(400).json({ success: false, message: 'Studio not found' });
    }
  } else if (req.method === 'PATCH') {
    await db.connect();
    try {
      const { studioID } = req.query;
      const listing = await StudioListing.findByIdAndUpdate(studioID, req.body);
      return res.status(201).json({ success: true, data: listing });
    } catch (error) {
      return res.status(400).json({ success: false, message: 'Unauthorized', error });
    }
  } else if (req.method === 'DELETE') {
    await db.connect();
    try {
      const { studioID } = req.query;
      const status = await StudioListing.findByIdAndDelete(studioID);
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
