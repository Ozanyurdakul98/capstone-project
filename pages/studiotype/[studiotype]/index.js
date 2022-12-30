//
import db from '../../../lib/dbConnect';
import StudioListing from '../../../models/StudioListing';
//
import ResultpageLayout from '../../../components/Layout/ResultpageLayout';
import { ResultpageStudios } from '../../../components/Result/ResultpageStudios';
import { wordCapitalize } from '../../../utils';
import { useDispatch } from 'react-redux';
import { updateResults } from '../../../slices/searchSlice';
import { useEffect } from 'react';

function StudioTypeResults({ studios, studiosCount, studioType }) {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(updateResults(studios));
  }, [studios]);
  return <ResultpageStudios count={studiosCount} header={studioType}></ResultpageStudios>;
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
