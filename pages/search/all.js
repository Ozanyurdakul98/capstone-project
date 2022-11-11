import React from 'react';
//db
import db from '../../lib/dbConnect';
import StudioListing from '../../models/StudioListing';
//components
import ListingCards from '../../components/ListingCardWide';

function Search({ listings }) {
  console.log(listings);
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
            services,
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
              services={services}
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

export default Search;

export async function getServerSideProps(context) {
  await db.connect();

  const fetchingListings = await StudioListing.find();
  const fetchedListings = JSON.parse(JSON.stringify(fetchingListings));

  return {
    props: {
      listings: fetchedListings || null,
    },
  };
}
