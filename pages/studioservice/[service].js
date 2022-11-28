import React from "react";
//db
import db from "../../lib/dbConnect";
import StudioListing from "../../models/StudioListing";
//components
import ListingCards from "../../components/ListingCardWide";
import Layout from "../../components/Layout/Layout";
import StudioService from "../../models/StudioService";

function Recording({ studios, serviceName }) {
  return (
    <div className='my-20'>
      <div>
        <h1 className='h2'>{serviceName}</h1>
      </div>
      <div className='mt-5'>
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
      </div>
    </div>
  );
}

export default Recording;

Recording.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export async function getServerSideProps(context) {
  await db.connect();
  const serviceQueryName = context.query.service;
  const serviceName = await StudioService.find({ queryString: serviceQueryName }).select(
    "name -_id"
  );
  const sanitizeServiceName = serviceName[0].name;
  const serviceID = await StudioService.find({ queryString: serviceQueryName }).select("_id");
  const serializedServiceID = JSON.parse(JSON.stringify(serviceID[0]._id));
  const studiosWithID = await StudioListing.find({ studioService: serializedServiceID }).populate({
    path: "studioService",
    model: "StudioService",
    select: "name -_id",
  });
  const serializingStudiosWithID = JSON.parse(JSON.stringify(studiosWithID));
  const serializedStudiosWithID = serializingStudiosWithID.map((studio) => ({
    ...studio,
    studioService: studio.studioService.map((service) => service.name),
  }));
  return {
    props: {
      studios: serializedStudiosWithID || null,
      serviceName: sanitizeServiceName || null,
    },
  };
}
