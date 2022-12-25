//db
import db from '../../../lib/dbConnect';
// import StudioListing from '../../../models/StudioListing';
//components
import ResultpageLayout from '../../../components/Layout/ResultpageLayout';
import StudioService from '../../../models/StudioService';
import { ResultpageStudioservices } from '../../../components/Result/ResultpageStudioservices';
import AdminStudioService from '../../../models/AdminCreateStudioService';

function StudioServiceResults({ studioServices, studioServicesCount, header }) {
  return <ResultpageStudioservices count={studioServicesCount} studioServices={studioServices} header={header} />;
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
      header: adminServiceName || null,
    },
  };
}
