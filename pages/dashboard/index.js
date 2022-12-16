import WelcomeRow from '../../components/Dashboard/WelcomeRow';
import DashboardStats from '../../components/Dashboard/DashboardStatsTotal';
import db from '../../lib/dbConnect';
import StudioListing from '../../models/StudioListing';
import DashboardLayout from '../../components/Layout/DashboardLayout';
import MyStudiosTable from '../../components/Dashboard/Tables/MyStudiosTable';
import moment from 'moment';
import { getToken } from 'next-auth/jwt';
export default function Dashboard({ totalListings, fetchedStudios, role }) {
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
        <h1 className="mt-4 text-2xl font-bold leading-tight text-secondary-color">My Studios</h1>
        <MyStudiosTable role={role} fetchedStudios={fetchedStudios} />
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
  const role = session.role;
  const totalListingsCount = await StudioListing.find().count();

  const email = session.email;
  const fetchingStudios = await StudioListing.find({ userEmail: email }).populate({
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

  return {
    props: {
      fetchedStudios: serializedAndUpdatedStudios || null,
      totalListings: totalListingsCount || null,
      role: role || null,
    },
  };
}
