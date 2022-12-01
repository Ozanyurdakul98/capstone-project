//db
import db from '../../lib/dbConnect';
import StudioListing from '../../models/StudioListing';
//components
import Layout from '../../components/Layout/Layout';
import { Resultpage } from '../../components/Result/Resultpage';

function StudioTypeResults({ studios, studioType }) {
  return <Resultpage studios={studios} header={studioType}></Resultpage>;
}

export default StudioTypeResults;

StudioTypeResults.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export async function getServerSideProps(context) {
  await db.connect();
  const { type } = context.query;
  let sanitizedStudios;
  let studioType;
  if (type === 'homestudio') {
    studioType = 'Home Studio';
  } else if (type === 'mediumstudio') {
    studioType = 'Medium Studio';
  } else if (type === 'premiumstudio') {
    studioType = 'Premium Studio';
  }
  const getStudiosWithType = await StudioListing.find({ studiotype: 'Home Studio' })
    .populate({
      path: 'studioService',
      model: 'StudioService',
      select: 'name -_id',
    })
    .sort({ $natural: -1 });
  const serializing = JSON.parse(JSON.stringify(getStudiosWithType));
  sanitizedStudios = serializing.map((studio) => ({
    ...studio,
    studioService: studio.studioService.map((service) => service.name),
  }));
  return {
    props: {
      studios: sanitizedStudios || null,
      studioType: studioType || null,
    },
  };
}
