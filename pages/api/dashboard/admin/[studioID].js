import db from '../../../../lib/dbConnect';
import StudioListing from '../../../../models/StudioListing';

export default async function handler(req, res) {
  // const session = await unstable_getServerSession(req, res, authOptions);
  //MAKE ACCESS ONLY TO ADMIN
  if (req.method === 'GET') {
    try {
      const { studioID } = req.query;
      const fetchingStudio = await StudioListing.find({ _id: studioID });
      return res.status(200).json({ success: true, data: fetchingStudio });
    } catch (error) {
      return res.status(400).json({ success: false, message: 'Studio not found' });
    }
  } else if (req.method === 'PATCH') {
    console.log('1');
    await db.connect();
    console.log('2');
    try {
      const { studioID } = req.query;
      console.log('studioidRoute', studioID);
      const listing = await StudioListing.findByIdAndUpdate(studioID, req.body);
      console.log(listing);
      return res.status(201).json({ success: true, data: listing });
    } catch (error) {
      return res.status(400).json({ success: false, message: 'Unauthorized', error });
    }
  }
  return res.status(400).json({ success: false, message: 'HTTP method is not allowed, Unauthorized' });
}
