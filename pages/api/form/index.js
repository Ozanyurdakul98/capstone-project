import db from '../../../lib/dbConnect';
import StudioListing from '../../../models/StudioListing';
import { unstable_getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]';

export default async function handler(req, res) {
  const session = await unstable_getServerSession(req, res, authOptions);
  const { method } = req;

  if (req.method === 'GET') {
    try {
      const listing = await StudioListing.find({}); /* find all the data in our database */
      return res.status(200).json({ success: true, data: listing });
    } catch (error) {
      return res.status(400).json({ success: false });
    }
  } else if (req.method === 'POST') {
    if (session) {
      await db.connect();

      try {
        const listing = await StudioListing.create(req.body); /* create a new model in the database */
        return res.status(201).json({ success: true, data: listing });
      } catch (error) {
        console.log('error', error);
        return res.status(400).json({ success: false.valueOf, message: 'Unauthorized' });
      }
    }
  }
  return res.status(400).json({ success: false, message: 'HTTP method is not allowed' });
}
