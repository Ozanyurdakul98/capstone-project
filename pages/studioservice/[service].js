import React from "react";
//db
import db from "../../lib/dbConnect";
import StudioListing from "../../models/StudioListing";
//components
import ListingCards from "../../components/ListingCardWide";
import Layout from "../../components/Layout/Layout";
import StudioService from "../../models/StudioService";

function Recording({}) {
  return (
    <div className='mb-20'>
      <h1>Recording Studios</h1>
      {/* <>
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
      </> */}
    </div>
  );
}

export default Recording;

Recording.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export async function getServerSideProps(context) {
  await db.connect();
  const serviceName = context.query.service;
  const serviceID = await StudioService.find({ name: serviceName }).select("_id");
  const serializedServiceID = JSON.parse(JSON.stringify(serviceID[0]._id));
  console.log("idSearchqueryID", serializedServiceID);
  const studiosWithID = await StudioListing.find({ studioService: serializedServiceID });
  console.log("fetchedStudios", studiosWithID);
  //   const fetchedStudios = JSON.parse(JSON.stringify(fetchingStudios));
  return {
    props: {
      //   listings: fetchedListings || null,
    },
  };
}
