import db from '../../../../lib/dbConnect';
import StudioService from '../../../../models/StudioService';
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
      const { studioID } = req.query;
      const fetchingStudio = await StudioService.find({ _id: studioID });
      return res.status(200).json({ success: true, data: fetchingStudio });
    } catch (error) {
      console.error(error);
      return res.status(400).json({ success: false, message: 'Studio not found' });
    }
  } else if (req.method === 'POST') {
    await db.connect();
    try {
      const studioService = await StudioService.create(req.body); /* create a new model in the database */

      return res.status(201).json({ success: true, data: studioService });
    } catch (error) {
      return res.status(400).json({ success: false, message: 'Unauthorized' });
    }
  } else if (req.method === 'PATCH') {
    await db.connect();
    try {
      const { serviceID } = req.query;
      const listing = await StudioService.findByIdAndUpdate(serviceID, req.body);
      return res.status(201).json({ success: true, data: listing });
    } catch (error) {
      return res.status(400).json({ success: false, message: 'Unauthorized', error });
    }
  } else if (req.method === 'DELETE') {
    await db.connect();
    try {
      const { serviceID } = req.query;
      const status = await StudioService.findByIdAndDelete(serviceID);
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
