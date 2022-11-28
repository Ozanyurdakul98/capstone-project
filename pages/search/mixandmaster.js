import React from "react";
//db
import db from "../../lib/dbConnect";
import StudioListing from "../../models/StudioListing";
//components
import ListingCards from "../../components/ListingCardWide";
import Layout from "../../components/Layout/Layout";

function MixAndMaster({ listings }) {
  return (
    <div className='mb-20'>
      <h1>Mix & Master Studios</h1>
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
    </div>
  );
}

export default MixAndMaster;

MixAndMaster.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export async function getServerSideProps(context) {
  await db.connect();
  //fetch after category schema not like this anymore
  const fetchingListings = await StudioListing.find({
    studioService: "Mix",
    studioService: "Master",
  });
  const fetchedListings = JSON.parse(JSON.stringify(fetchingListings));
  return {
    props: {
      listings: fetchedListings || null,
    },
  };
}
