import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import db from '../../lib/dbConnect';
import ResultpageLayout from '../../components/Layout/ResultpageLayout';
import { ResultpageWithFilter } from '../../components/Result/ResultpageWithFilter';
import { useDispatch } from 'react-redux';
import { updateResults } from '../../slices/searchStudioServices';
import StudioService from '../../models/StudioService';
import { updateBBox, updateCenter } from '../../slices/searchWithFilters';
import { format } from 'date-fns';

function Search({ listings, query }) {
  const [searchFilter, setSearchFilter] = useState(query);
  const router = useRouter();
  const locationParam = router.query.location;
  // filter for listings with same openingdays as in searchParam
  // const weekdays = ['sunday', 'monday', 'thuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
  // const checkInDay = new Date(query.startDate).getDay();

  const dispatch = useDispatch();

  //refresh routerParams inside state
  if (
    router.query.noOfGuests !== searchFilter.noOfGuests ||
    router.query.servicesSelected !== searchFilter.servicesSelected ||
    router.query.startDate !== searchFilter.startDate
  ) {
    const routerQueryFilters = router.query;
    setSearchFilter(routerQueryFilters);
  }

  const filteredListings = listings
    // .filter((studio) =>
    //   studio.studio.studioLocation.fullAddress?.toLowerCase().includes(searchFilter.location?.toLowerCase())
    // )
    .filter((studio) => studio.maxGuests >= searchFilter.noOfGuests)
    .filter((studio) => studio.service.queryString.toLowerCase() === searchFilter.servicesSelected.toLowerCase());
  // .filter(
  //   (studio) =>
  //     studio.openingHours === 'Always Available' ||
  //     studio.openingHours === 'On Request' ||
  //     studio.openingHours[weekdays[checkInDay]]
  // );

  useEffect(() => {
    async function callGeoAPI() {
      try {
        const fetchQueryCoordinates = await fetch(
          `https://api.mapbox.com/geocoding/v5/mapbox.places/${router.query.location}.json?limit=1&access_token=${process.env.mapbox_key}`
        );
        const getQueryCoordinates = await fetchQueryCoordinates.json();
        const coordinates = getQueryCoordinates.features[0];
        dispatch(coordinates.bbox ? updateBBox(coordinates.bbox) : updateCenter(coordinates.geometry.coordinates));
        setSearchFilter({ ...searchFilter, address: coordinates.place_name });
      } catch (err) {
        console.error(err);
      }
    }
    callGeoAPI();
    dispatch(updateResults(filteredListings));
  }, [locationParam]);

  const date = query.startDate ? new Date(query.startDate) : new Date();

  return (
    <>
      <ResultpageWithFilter
        count={filteredListings.length}
        header={format(date, ' dd/MM/yyyy') + ' - ' + searchFilter.address}
      />
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

  return {
    props: {
      listings: fetchedStudioServices || null,
      query: query,
    },
  };
}
