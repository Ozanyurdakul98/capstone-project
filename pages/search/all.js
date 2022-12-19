import db from '../../lib/dbConnect';
import StudioService from '../../models/StudioService';
import Layout from '../../components/Layout/Layout';
import ListingCardWideStudioService from '../../components/Result/ListingCardWideStudioService';

function All({ services }) {
  return (
    <section className="min-h-screen">
      <div>
        <h1 className="h2 mb-14 mt-10">All Search results</h1>
      </div>
      <section>
        {services.map(
          ({ _id, listingTitle, description, service, maxGuests, images, user, soundengineer, pricing, studio }) => (
            <ListingCardWideStudioService
              key={_id}
              id={_id}
              listingTitle={listingTitle}
              images={images}
              service={service}
              maxGuests={maxGuests}
              description={description}
              soundengineer={soundengineer}
              pricing={pricing}
              studio={studio}
              user={user}
            />
          )
        )}
      </section>
    </section>
  );
}

export default All;

All.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export async function getServerSideProps() {
  await db.connect();

  const fetchingStudioServices = await StudioService.find()
    .populate({
      path: 'studio',
      model: 'StudioListing',
    })
    .populate({
      path: 'service',
      model: 'AdminStudioService',
      select: 'name queryString -_id',
    })
    .populate({
      path: 'user',
      model: 'users',
      select: 'avatar email name lastname username',
    });

  const fetchedStudioServices = JSON.parse(JSON.stringify(fetchingStudioServices));
  console.log(fetchedStudioServices);
  return {
    props: {
      services: fetchedStudioServices || null,
    },
  };
}
