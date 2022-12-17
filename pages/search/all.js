import db from '../../lib/dbConnect';
import StudioListing from '../../models/StudioListing';
import ListingCards from '../../components/Result/ListingCardWideStudioService';
import Layout from '../../components/Layout/Layout';

function All({ listings }) {
  return (
    <>
      <h1>All Search results</h1>
      <>
        {listings.map(
          ({
            _id,
            listingTitle,
            images,
            studiotype,
            studioService,
            soundengineer,
            studioPricing,
            locationFeatures,
            studioLocation,
          }) => (
            <ListingCards
              key={_id}
              listingTitle={listingTitle}
              images={images}
              studiotype={studiotype}
              studioService={studioService}
              soundengineer={soundengineer}
              studioPricing={studioPricing}
              locationFeatures={locationFeatures}
              studioLocation={studioLocation}></ListingCards>
          )
        )}
      </>
    </>
  );
}

export default All;

All.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export async function getServerSideProps() {
  await db.connect();

  const fetchingListings = await StudioListing.find();
  const fetchedListings = JSON.parse(JSON.stringify(fetchingListings));

  return {
    props: {
      listings: fetchedListings || null,
    },
  };
}
