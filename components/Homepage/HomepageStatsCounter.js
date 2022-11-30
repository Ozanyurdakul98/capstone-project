export function HomepageStatsCounter(props) {
  return (
    <section className="mb-40">
      <div className=" flex flex-col rounded-xl border-2 border-b-4 border-b-[color:var(--primary-color)]   py-2  ">
        <div className="flex items-center justify-evenly ">
          <div className="relative flex h-40 w-36 flex-col items-center justify-center rounded-xl border border-[color:var(--primary-color-hover)] bg-white shadow-inner xl:w-48">
            <span className=" text-5xl">{props.totalListings}</span>
            <h3 className=" absolute bottom-2 text-lg font-normal">Total Listings</h3>
          </div>
          <div className="relative flex h-40 w-36 flex-col items-center justify-center rounded-xl border border-[color:var(--primary-color-hover)] bg-white shadow-inner xl:w-48">
            <span className=" text-5xl">{props.totalUsers}</span>
            <h3 className=" absolute bottom-2 text-lg font-normal">Total Users</h3>
          </div>
        </div>
      </div>
    </section>
  );
}
