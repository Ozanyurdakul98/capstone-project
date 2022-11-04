import db from '../../../lib/dbConnect';
import StudioListing from '../../../models/StudioListing';

export default async function handler(req, res) {
	const { method } = req;

	await db.connect();

	switch (method) {
		case 'GET':
			try {
				const listing = await StudioListing.find({}); /* find all the data in our database */
				res.status(200).json({ success: true, data: listing });
			} catch (error) {
				res.status(400).json({ success: false });
			}
			break;
		case 'POST':
			try {
				const listing = await StudioListing.create(req.body); /* create a new model in the database */
				res.status(201).json({ success: true, data: listing });
			} catch (error) {
				res.status(400).json({ success: false });
				console.log('error', error);
			}
			break;
		default:
			res.status(400).json({ success: false });
			break;
	}
}
