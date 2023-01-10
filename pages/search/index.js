import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
//SSR
import db from '../../lib/dbConnect';
//tools
//components
import ResultpageLayout from '../../components/Layout/ResultpageLayout';
import { ResultpageWithFilter } from '../../components/Result/ResultpageWithFIlter';
import { useDispatch } from 'react-redux';
import { updateResults } from '../../slices/searchStudioServices';
import StudioService from '../../models/StudioService';
import { updateBBox, updateCenter } from '../../slices/searchWithFilters';

function Search({ listings, query, coordinates }) {
  const [searchFilter, setSearchFilter] = useState(query);
  const router = useRouter();
  const weekdays = ['sunday', 'monday', 'thuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
  const checkInDay = new Date(query.startDate).getDay();

  const dispatch = useDispatch();
  console.log(query);
  console.log(listings);

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
    .filter((studio) =>
      studio.studio.studioLocation.fullAddress?.toLowerCase().includes(searchFilter.location?.toLowerCase())
    )
    .filter((studio) => studio.maxGuests >= searchFilter.noOfGuests)
    .filter((studio) =>
      studio.service
        .map((studio) => {
          return studio.queryString.toLowerCase();
        })
        .includes(searchFilter.servicesSelected.toLowerCase())
    )
    .filter(
      (studio) =>
        studio.openingHours === 'Always Available' ||
        studio.openingHours === 'On Request' ||
        studio.openingHours[weekdays[checkInDay]]
    );

  useEffect(() => {
    dispatch(updateResults(filteredListings));
    dispatch(coordinates.bbox ? updateBBox(coordinates.bbox) : updateCenter(coordinates.geometry.coordinates));
  }, [filteredListings, coordinates]);

  // const date = query.startDate ? new Date(query.startDate) : new Date();
  return (
    <>
      <ResultpageWithFilter count={'Count'} header={'header'} />;
      {/* <h1>
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
      )} */}
    </>
  );
}
export default Search;

Search.getLayout = function getLayout(page) {
  return <ResultpageLayout>{page}</ResultpageLayout>;
};

export async function getServerSideProps(context) {
  const query = context.query;
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

  //  setMapview to bounds, get Listings from that coordinates, set Mapview.
  const fetchQueryCoordinates = await fetch(
    `https://api.mapbox.com/geocoding/v5/mapbox.places/${query.location}.json?limit=1&access_token=${process.env.mapbox_key}`
  );
  const getQueryCoordinates = await fetchQueryCoordinates.json();
  const centerCoordinates = getQueryCoordinates.features[0];
  console.log('getQueryCoordinattes', centerCoordinates);

  return {
    props: {
      listings: fetchedStudioServices || null,
      query: query,
      coordinates: centerCoordinates || null,
    },
  };
}
