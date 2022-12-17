import db from '../../../../lib/dbConnect';
import StudioService from '../../../../models/StudioService';
import { getToken } from 'next-auth/jwt';
import moment from 'moment';

export default async function handler(req, res) {
  const token = await getToken({ req });
  const { serviceID } = req.query;
  if (token.role !== 'user' && token.role !== 'admin') {
    return res.status(401).json({
      success: false,
      message: 'Your session is invalid. You are not authorized to do this action!',
    });
  }
  if (req.method === 'GET') {
    try {
      const fetchingStudioservice = await StudioService.find({ _id: serviceID })
        .populate({
          path: 'user',
          model: 'users',
          select: 'avatar email name lastname username',
        })
        .populate({
          path: 'service',
          model: 'AdminStudioService',
          select: '_id',
        })
        .populate({
          path: 'studio',
          model: 'StudioListing',
          select: '',
        });
      const serializingServices = JSON.parse(JSON.stringify(fetchingStudioservice));
      const serializedAndUpdatedStudioServices = serializingServices.map((service) => ({
        ...service,
        createdAtDate: moment(service.createdAt).format('DD/MM/yyyy'),
        createdAtTime: moment(service.createdAt).format('kk:mm'),
        updatedAtDate: moment(service.updatedAt).format('DD/MM/yyyy'),
        updatedAtTime: moment(service.updatedAt).format('kk:mm'),
      }));
      return res.status(200).json({ success: true, data: serializedAndUpdatedStudioServices });
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
      console.error(error);
      return res.status(400).json({ success: false, message: 'Unauthorized' });
    }
  } else if (req.method === 'PATCH') {
    await db.connect();
    try {
      const listing = await StudioService.findByIdAndUpdate(serviceID, req.body);
      return res.status(201).json({ success: true, data: listing });
    } catch (error) {
      return res.status(400).json({ success: false, message: 'Unauthorized', error });
    }
  } else if (req.method === 'DELETE') {
    await db.connect();
    try {
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
