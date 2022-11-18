export default function DashboardStats(props) {
  return (
    <section className='mb-20 text-secondary-color'>
      <div className=' border-primary  flex flex-col rounded-xl border-b-4 bg-white/60 py-2 '>
        <div className='flex items-center justify-evenly '>
          <div className='border-secondary bg-secondary relative flex h-40 w-36 flex-col items-center justify-center rounded-full border-4 text-white shadow-inner xl:w-48'>
            <div className='flex flex-col '>
              <span className=' text-center text-5xl'>{props.totalListings}</span>
              <h3 className='text-lg font-normal '>Total Listings</h3>
            </div>
          </div>
          <div className='border-secondary bg-secondary relative flex h-40 w-36 flex-col items-center justify-center rounded-full border-4 text-white shadow-inner xl:w-48'>
            <div className='flex flex-col '>
              <span className=' text-center text-5xl'>{props.totalUsers}</span>
              <h3 className='text-lg  font-normal'>Total Users</h3>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
