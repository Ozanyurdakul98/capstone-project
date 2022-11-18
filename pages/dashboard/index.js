import DashboardBoxes from '../../components/Dashboard/DashboardBoxes';
import WelcomeRow from '../../components/Dashboard/WelcomeRow';
// import SalesStats from './SalesStats';
// import TopSellingProducts from './TopSellingProducts';

export default function Dashboard() {
  return (
    <>
      <WelcomeRow />
      <div className='gap-10 md:flex'>
        <div className='grow md:w-8/12'>
          <DashboardBoxes />
          {/*   <SalesStats /> */}
        </div>
        <div className='grow md:w-4/12'>{/* <TopSellingProducts /> */}</div>
      </div>
    </>
  );
}
