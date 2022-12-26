//db
import db from '../../../lib/dbConnect';
import StudioListing from '../../../models/StudioListing';
//components
import ResultpageLayout from '../../../components/Layout/ResultpageLayout';
import { ResultpageStudios } from '../../../components/Result/ResultpageStudios';
import { wordCapitalize } from '../../../utils';

function StudioTypeResults({ studios, studiosCount, studioType }) {
  return <ResultpageStudios count={studiosCount} studios={studios} header={studioType}></ResultpageStudios>;
}

export default StudioTypeResults;

StudioTypeResults.getLayout = function getLayout(page) {
  return <ResultpageLayout>{page}</ResultpageLayout>;
};

export async function getServerSideProps(context) {
  await db.connect();
  const { studiotype } = context.query;
  const type = wordCapitalize(studiotype.replace(/-/g, ' '));

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
