import React from "react";
//db
import db from "../../lib/dbConnect";
import StudioListing from "../../models/StudioListing";
//components
import ListingCards from "../../components/ListingCardWide";
import Layout from "../../components/Layout/Layout";
import StudioService from "../../models/StudioService";

function Recording({ studios }) {
  return (
    <div className='mb-20'>
      <h1>Recording Studios</h1>
      <>
        {studios.map(
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

export default Recording;

Recording.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export async function getServerSideProps(context) {
  await db.connect();
  const serviceName = context.query.service;
  const serviceID = await StudioService.find({ queryString: serviceName }).select("_id");
  const serializedServiceID = JSON.parse(JSON.stringify(serviceID[0]._id));
  const studiosWithID = await StudioListing.find({ studioService: serializedServiceID }).populate({
    path: "studioService",
    model: "StudioService",
    select: "name -_id",
  });
  const test = studiosWithID.map((studio) =>
    JSON.parse(JSON.stringify(studio.studioService[0].name))
  );
  //   console.log("test", test[0].name);
  //   console.log("test", test[0]);
  //   console.log("test", test);
  //   console.log("fetchedStudios", studiosWithID);
  const serializingStudiosWithID = JSON.parse(JSON.stringify(studiosWithID));
  const serializedStudiosWithID = serializingStudiosWithID.map((studio) => ({
    ...studio,
    studioService: studio.studioService.map((service) => service.name),
  }));
  console.log("fetchedStudios", serializedStudiosWithID);
  return {
    props: {
      studios: serializedStudiosWithID || null,
    },
  };
}
