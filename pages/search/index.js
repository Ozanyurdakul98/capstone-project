import { useState } from 'react';
import { useRouter } from 'next/router';
//SSR
import db from '../../lib/dbConnect';
import StudioListing from '../../models/StudioListing';
//tools
import format from 'date-fns/format';
//components
import ListingCard from '../../components/Result/ListingCardWideStudioService';
import Layout from '../../components/Layout/Layout';

function Search({ listings, query }) {
  const [searchFilter, setSearchFilter] = useState(query);
  const router = useRouter();
  const weekdays = ['sunday', 'monday', 'thuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
  const checkInDay = new Date(query.startDate).getDay();
  if (
    router.query.location !== searchFilter.location ||
    router.query.noOfGuests !== searchFilter.noOfGuests ||
    router.query.servicesSelected !== searchFilter.servicesSelected ||
    router.query.startDate !== searchFilter.startDate
  ) {
    const routerQueryFilters = router.query;
    setSearchFilter(routerQueryFilters);
  }
  const filteredListings = listings
    .filter((studio) => studio.studioLocation?.toLowerCase().includes(searchFilter.location?.toLowerCase()))
    .filter((studio) => studio.maxGuests >= searchFilter.noOfGuests)
    .filter((studio) =>
      studio.studioService
        .map((studio) => {
          return studio.toLowerCase();
        })
        .includes(searchFilter.servicesSelected.toLowerCase())
    )
    .filter(
      (studio) =>
        studio.openingHours === 'Always Available' ||
        studio.openingHours === 'On Request' ||
        studio.openingHours[weekdays[checkInDay]]
    );

  const date = query.startDate ? new Date(query.startDate) : new Date();
  return (
    <>
      <h1>
        Search results for
        {format(date, ' dd/MM/yyyy')} and {query.location}
      </h1>

      {filteredListings.map(
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
          <ListingCard
            key={_id}
            listingTitle={listingTitle}
            images={images}
            studiotype={studiotype}
            studioService={studioService}
            soundengineer={soundengineer}
            studioPricing={studioPricing}
            locationFeatures={locationFeatures}
            studioLocation={studioLocation}></ListingCard>
        )
      )}
    </>
  );
}
export default Search;

Search.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export async function getServerSideProps(context) {
  const query = context.query;
  await db.connect();
  const fetchingListings = await StudioListing.find();
  const fetchedListings = JSON.parse(JSON.stringify(fetchingListings));
  return {
    props: {
      listings: fetchedListings || null,
      query: query,
    },
  };
}
