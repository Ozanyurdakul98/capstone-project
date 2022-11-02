//DbConnect
import db from '../../lib/dbConnect';
//Model
import StudioListing from '../../models/StudioListing';
//Data
import fakeData from '../../db/fakedata';

const handler = async (req, res) => {
	await db.connect();
	await StudioListing.deleteMany();
	// await StudioListing.insertMany(fakeData.studioListings);
	await db.disconnect();
	res.send({ message: 'seeded successfully' });
};
export default handler;
