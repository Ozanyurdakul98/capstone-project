//db
import db from '../../../lib/dbConnect';
import StudioListing from '../../../models/StudioListing';
//components
import Layout from '../../../components/Layout/Layout';
import { Resultpage } from '../../../components/Result/Resultpage';

function StudioTypeResults({ studios, studioType }) {
  return <Resultpage studios={studios} header={studioType}></Resultpage>;
}

export default StudioTypeResults;

StudioTypeResults.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export async function getServerSideProps(context) {
  await db.connect();
  const { studiotype } = context.query;
  let type;
  if (studiotype === 'homestudio') {
    type = 'Home Studio';
  } else if (studiotype === 'mediumstudio') {
    type = 'Medium Studio';
  } else if (studiotype === 'premiumstudio') {
    type = 'Premium Studio';
  }
  const getStudiosWithType = await StudioListing.find({ studiotype: type })
    .populate({
      path: 'user',
      model: 'users',
      select: 'username avatar -_id',
    })
    .sort({ $natural: -1 });
  const serializedStudios = JSON.parse(JSON.stringify(getStudiosWithType));

  return {
    props: {
      studios: serializedStudios || null,
      studioType: type || null,
    },
  };
}
