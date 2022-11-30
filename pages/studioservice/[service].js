//db
import db from '../../lib/dbConnect';
import StudioListing from '../../models/StudioListing';
//components
import Layout from '../../components/Layout/Layout';
import StudioService from '../../models/StudioService';
import { Resultpage } from '../../components/Result/Resultpage';

function StudioServiceResults({ studios, serviceName }) {
  return <Resultpage studios={studios} serviceName={serviceName}></Resultpage>;
}

export default StudioServiceResults;

StudioServiceResults.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export async function getServerSideProps(context) {
  await db.connect();
  const serviceQueryName = context.query.service;
  const serviceName = await StudioService.find({ queryString: serviceQueryName }).select('name -_id');
  const sanitizeServiceName = serviceName[0].name;
  const serviceID = await StudioService.find({ queryString: serviceQueryName }).select('_id');
  const serializedServiceID = JSON.parse(JSON.stringify(serviceID[0]._id));
  const studiosWithID = await StudioListing.find({ studioService: serializedServiceID })
    .populate({
      path: 'studioService',
      model: 'StudioService',
      select: 'name -_id',
    })
    .sort({ $natural: -1 });

  const serializingStudiosWithID = JSON.parse(JSON.stringify(studiosWithID));
  const serializedStudiosWithID = serializingStudiosWithID.map((studio) => ({
    ...studio,
    studioService: studio.studioService.map((service) => service.name),
  }));
  return {
    props: {
      studios: serializedStudiosWithID || null,
      serviceName: sanitizeServiceName || null,
    },
  };
}
