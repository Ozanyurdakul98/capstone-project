//
import db from '../../../lib/dbConnect';
import StudioService from '../../../models/StudioService';
import AdminStudioService from '../../../models/AdminCreateStudioService';
//
import ResultpageLayout from '../../../components/Layout/ResultpageLayout';
import { ResultpageStudioservices } from '../../../components/Result/ResultpageStudioservices';
import { useDispatch } from 'react-redux';
import { updateResults } from '../../../slices/searchStudioServices';
import { useEffect } from 'react';

function StudioServiceResults({ studioServices, studioServicesCount, serviceName }) {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(updateResults(studioServices));
  }, [studioServices]);
  return <ResultpageStudioservices count={studioServicesCount} header={serviceName} />;
}
export default StudioServiceResults;

StudioServiceResults.getLayout = function getLayout(page) {
  return <ResultpageLayout>{page}</ResultpageLayout>;
};

export async function getServerSideProps(context) {
  await db.connect();
  const serviceQueryName = context.query.service;

  const adminService = await AdminStudioService.find({ queryString: serviceQueryName });
  const adminServiceName = adminService[0].name;
  const adminServiceId = adminService[0]._id;
  const serializedadminServiceId = JSON.parse(JSON.stringify(adminServiceId));

  const StudioservicesByService = await StudioService.find({ service: serializedadminServiceId })
    .populate({
      path: 'service',
      model: 'AdminStudioService',
    })
    .populate({
      path: 'studio',
      model: 'StudioListing',
    })
    .populate({
      path: 'user',
      model: 'users',
    })
    .sort({ $natural: -1 });
  const serializedStudioservicesByService = JSON.parse(JSON.stringify(StudioservicesByService));

  const StudioservicesByServiceCount = await StudioService.find({ service: serializedadminServiceId }).count();

  return {
    props: {
      studioServices: serializedStudioservicesByService || null,
      studioServicesCount: StudioservicesByServiceCount,
      serviceName: adminServiceName || null,
    },
  };
}
