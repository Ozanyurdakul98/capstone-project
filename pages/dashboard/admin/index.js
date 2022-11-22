import DashboardAdminBoxes from '../../../components/Dashboard/DashboardAdminStatsToday';
import WelcomeRow from '../../../components/Dashboard/WelcomeRow';
import DashboardAdminStatsTotal from '../../../components/Dashboard/DashboardAdminStatsTotal';
import db from '../../../lib/dbConnect';
import StudioListing from '../../../models/StudioListing';
import User from '../../../models/UserModel';
import DashboardLayout from '../../../components/Layout/DashboardLayout';
// import SalesStats from './SalesStats';
// import TopSellingProducts from './TopSellingProducts';
import endOfDay from 'date-fns/endOfDay';
import startOfDay from 'date-fns/startOfDay';
import moment from 'moment';
import { RiContrastDropLine } from 'react-icons/ri';
import { startTransition } from 'react';
export default function Dashboard({
  latestListings,
  totalUsers,
  totalListings,
  studiosCreatedToday,
  usersCreatedToday,
}) {
  return (
    <>
      <WelcomeRow />
      <div className='gap-10 md:flex'>
        <div className='grow md:w-8/12'>
          <DashboardAdminStatsTotal totalUsers={totalUsers} totalListings={totalListings}></DashboardAdminStatsTotal>
          <DashboardAdminBoxes studiosCreatedToday={studiosCreatedToday} usersCreatedToday={usersCreatedToday} />
          {/*   <SalesStats /> */}
        </div>
        <div className='grow md:w-4/12'>{/* <TopSellingProducts /> */}</div>
      </div>
    </>
  );
}

Dashboard.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export async function getServerSideProps(context) {
  await db.connect();
  const startToday = new Date(new Date().setUTCHours(0, 0, 0, 0));
  const endToday = new Date(new Date().setUTCHours(23, 59, 59, 999));
  // const latestAddedListings = await StudioListing.find().sort({ $natural: -1 }).limit(10);
  // const serializedLatestAddedListings = JSON.parse(JSON.stringify(latestAddedListings));
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
  const totalListingsCount = await StudioListing.find().count();
  const totalUsersCount = await User.find().count();

  return {
    props: {
      // latestListings: serializedLatestAddedListings || null,
      totalListings: totalListingsCount || null,
      totalUsers: totalUsersCount || null,
      studiosCreatedToday: serializedStudiosCreatedToday || null,
      usersCreatedToday: serializedUsersCreatedToday || null,
    },
  };
}
