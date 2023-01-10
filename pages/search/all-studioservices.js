import db from '../../lib/dbConnect';
import StudioService from '../../models/StudioService';
import ResultpageLayout from '../../components/Layout/ResultpageLayout';
import { ResultpageStudioservices } from '../../components/Result/ResultpageStudioservices';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { updateResults } from '../../slices/searchStudioServices';

//all studioservices resultpage
function All({ studioServices, studioServicesCount, header }) {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(updateResults(studioServices));
  }, [studioServices]);
  return <ResultpageStudioservices count={studioServicesCount} header={header} />;
}

export default All;

All.getLayout = function getLayout(page) {
  return <ResultpageLayout>{page}</ResultpageLayout>;
};

export async function getServerSideProps() {
  await db.connect();

  const fetchingStudioServices = await StudioService.find()
    .populate({
      path: 'studio',
      model: 'StudioListing',
    })
    .populate({
      path: 'service',
      model: 'AdminStudioService',
      select: 'name queryString -_id',
    })
    .populate({
      path: 'user',
      model: 'users',
      select: 'avatar email name lastname username',
    });
  const fetchedStudioServices = JSON.parse(JSON.stringify(fetchingStudioServices));

  const studioServicesCount = await StudioService.find().count();

  const header = 'All Studioservices';
  return {
    props: {
      studioServices: fetchedStudioServices || null,
      studioServicesCount: studioServicesCount || null,
      header: header || null,
    },
  };
}
