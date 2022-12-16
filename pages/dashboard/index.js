import WelcomeRow from '../../components/Dashboard/WelcomeRow';
import DashboardStats from '../../components/Dashboard/DashboardStatsTotal';
import db from '../../lib/dbConnect';
import StudioListing from '../../models/StudioListing';
import StudioService from '../../models/StudioService';
import DashboardLayout from '../../components/Layout/DashboardLayout';
import MyStudiosTable from '../../components/Dashboard/Tables/MyStudiosTable';
import StudioServicesTable from '../../components/Dashboard/Tables/StudioServicesTable';
import moment from 'moment';
import { getToken } from 'next-auth/jwt';
export default function Dashboard({ totalListings, fetchedStudios, fetchedStudioServices, role }) {
  return (
    <div className="flex flex-col gap-14">
      <div>
        <h1 className="mt-4 mb-2 text-center text-4xl font-bold leading-tight text-secondary-color">Dashboard</h1>
        <WelcomeRow />
      </div>
      <div className="gap-10 md:flex">
        <div className="grow md:w-8/12">
          <DashboardStats totalListings={totalListings}></DashboardStats>
        </div>
      </div>
      <section>
        <h1 className="mt-4 text-2xl font-bold leading-tight text-secondary-color">My Studios</h1>
        <MyStudiosTable role={role} fetchedStudios={fetchedStudios} />
      </section>
      <section>
        <h1 className="mt-4 text-2xl font-bold leading-tight text-secondary-color">My Studioservices</h1>
        <StudioServicesTable role={role} fetchedStudioServices={fetchedStudioServices} />
      </section>
    </div>
  );
}

Dashboard.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export async function getServerSideProps({ req }) {
  await db.connect();
  const session = await getToken({ req });
  const userID = session.id;
  const role = session.role;
  const totalListingsCount = await StudioListing.find().count();

  const fetchingStudios = await StudioListing.find({ user: userID }).populate({
    path: 'user',
    model: 'users',
    select: 'avatar email name lastname username',
  });
  const serializing = JSON.parse(JSON.stringify(fetchingStudios));
  const serializedAndUpdatedStudios = serializing.map((studio) => ({
    ...studio,
    createdAtDate: moment(studio.createdAt).format('DD/MM/yyyy'),
    createdAtTime: moment(studio.createdAt).format('kk:mm'),
    updatedAtDate: moment(studio.updatedAt).format('DD/MM/yyyy'),
    updatedAtTime: moment(studio.updatedAt).format('kk:mm'),
  }));

  const fetchingStudioServices = await StudioService.find({ user: userID })
    .populate({
      path: 'user',
      model: 'users',
      select: 'avatar email name lastname username',
    })
    .populate({
      path: 'service',
      model: 'AdminStudioService',
      select: 'name -_id',
    })
    .populate({
      path: 'studio',
      model: 'StudioListing',
      select: 'studioName _id',
    });
  console.log(fetchingStudioServices);
  const serializingServices = JSON.parse(JSON.stringify(fetchingStudioServices));
  const serializedAndUpdatedStudioServices = serializingServices.map((service) => ({
    ...service,
    createdAtDate: moment(service.createdAt).format('DD/MM/yyyy'),
    createdAtTime: moment(service.createdAt).format('kk:mm'),
    updatedAtDate: moment(service.updatedAt).format('DD/MM/yyyy'),
    updatedAtTime: moment(service.updatedAt).format('kk:mm'),
  }));

  return {
    props: {
      fetchedStudios: serializedAndUpdatedStudios || null,
      fetchedStudioServices: serializedAndUpdatedStudioServices || null,
      totalListings: totalListingsCount || null,
      role: role || null,
    },
  };
}
