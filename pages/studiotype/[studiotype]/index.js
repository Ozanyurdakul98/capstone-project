//db
import db from '../../../lib/dbConnect';
import StudioListing from '../../../models/StudioListing';
//components
import Layout from '../../../components/Layout/Layout';
import { ResultpageStudios } from '../../../components/Result/ResultpageStudios';

function StudioTypeResults({ studios, studiosCount, studioType }) {
  return <ResultpageStudios count={studiosCount} studios={studios} header={studioType}></ResultpageStudios>;
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
    })
    .sort({ $natural: -1 });
  const serializedStudios = JSON.parse(JSON.stringify(getStudiosWithType));

  const getStudiosWithTypeCount = await StudioListing.find({ studiotype: type }).count();

  return {
    props: {
      studios: serializedStudios || null,
      studiosCount: getStudiosWithTypeCount,
      studioType: type || null,
    },
  };
}
