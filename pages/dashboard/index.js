import WelcomeRow from '../../components/Dashboard/WelcomeRow';
import DashboardStats from '../../components/Dashboard/DashboardStatsTotal';
import db from '../../lib/dbConnect';
import StudioListing from '../../models/StudioListing';
import User from '../../models/UserModel';
import DashboardLayout from '../../components/Layout/DashboardLayout';
// import SalesStats from './SalesStats';
// import TopSellingProducts from './TopSellingProducts';

export default function Dashboard({ latestListings, totalUsers, totalListings }) {
  return (
    <div className='flex flex-col gap-14'>
      <div>
        <h1 className='mt-4 mb-2 text-center text-4xl font-bold leading-tight text-secondary-color'>Dashboard</h1>
        <WelcomeRow />
      </div>
      <div className='gap-10 md:flex'>
        <div className='grow md:w-8/12'>
          <DashboardStats totalUsers={totalUsers} totalListings={totalListings}></DashboardStats>
          {/*   <SalesStats /> */}
        </div>
        <div className='grow md:w-4/12'>{/* <TopSellingProducts /> */}</div>
      </div>
    </div>
  );
}

Dashboard.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export async function getServerSideProps(context) {
  await db.connect();
  // const latestAddedListings = await StudioListing.find().sort({ $natural: -1 }).limit(10);
  // const serializedLatestAddedListings = JSON.parse(JSON.stringify(latestAddedListings));

  const totalListingsCount = await StudioListing.find().count();
  const totalUsersCount = await User.find().count();
  return {
    props: {
      // latestListings: serializedLatestAddedListings || null,
      totalListings: totalListingsCount || null,
      totalUsers: totalUsersCount || null,
    },
  };
}
