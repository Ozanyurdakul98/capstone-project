import DashboardAdminBoxes from '../../../components/Dashboard/DashboardAdminStatsToday';
import WelcomeRow from '../../../components/Dashboard/WelcomeRow';
import DashboardAdminStatsTotal from '../../../components/Dashboard/DashboardAdminStatsTotal';
import db from '../../../lib/dbConnect';
import StudioListing from '../../../models/StudioListing';
import User from '../../../models/UserModel';
import DashboardLayout from '../../../components/Layout/DashboardLayout';
export default function AdminDashboard({ totalUsers, totalListings, studiosCreatedToday, usersCreatedToday }) {
  return (
    <div className="flex flex-col gap-14">
      <div>
        <h1 className="mt-4 mb-2 text-center text-4xl font-bold leading-tight text-secondary-color">Dashboard</h1>
        <WelcomeRow />
      </div>
      <div className="gap-10 md:flex">
        <div className="grow md:w-8/12">
          <DashboardAdminStatsTotal totalUsers={totalUsers} totalListings={totalListings}></DashboardAdminStatsTotal>
          <DashboardAdminBoxes studiosCreatedToday={studiosCreatedToday} usersCreatedToday={usersCreatedToday} />
        </div>
        <div className="grow md:w-4/12">{/* <TopSellingProducts /> */}</div>
      </div>
    </div>
  );
}

AdminDashboard.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export async function getServerSideProps() {
  await db.connect();

  const totalListingsCount = await StudioListing.find().count();
  const totalUsersCount = await User.find().count();
  const startToday = new Date(new Date().setUTCHours(0, 0, 0, 0));
  const endToday = new Date(new Date().setUTCHours(23, 59, 59, 999));
  const studiosCreatedToday = await StudioListing.find({
    createdAt: {
      $gte: startToday,
      $lte: endToday,
    },
  }).count();
  const serializedStudiosCreatedToday = JSON.parse(JSON.stringify(studiosCreatedToday));
  const UsersCreatedToday = await User.find({
    createdAt: {
      $gte: startToday,
      $lte: endToday,
    },
  }).count();
  const serializedUsersCreatedToday = JSON.parse(JSON.stringify(UsersCreatedToday));

  return {
    props: {
      totalListings: totalListingsCount || null,
      totalUsers: totalUsersCount || null,
      studiosCreatedToday: serializedStudiosCreatedToday || null,
      usersCreatedToday: serializedUsersCreatedToday || null,
    },
  };
}
