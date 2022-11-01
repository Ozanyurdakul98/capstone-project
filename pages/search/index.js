import React, { useState } from 'react';
import { useRouter } from 'next/router';
//SSR
import db from '../../lib/dbConnect';
import StudioListing from '../../models/StudioListing';
//tools
import format from 'date-fns/format';

//db
// import { fakeData } from '../../db/fakedata';
//components
import ListingCard from '../../components/ListingCard';

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
		.filter((studio) =>
			studio.location?.toLowerCase().includes(searchFilter.location?.toLowerCase())
		)
		.filter((studio) => studio.maxGuests >= searchFilter.noOfGuests)
		.filter((studio) =>
			studio.services
				.map((studio) => {
					return studio.toLowerCase();
				})
				.includes(searchFilter.servicesSelected.toLowerCase())
		)
		.filter(
			(studio) =>
				studio.openingOption === 'Always Available' ||
				studio.openingOption === 'On Request' ||
				studio.openingCustom[weekdays[checkInDay]]
		);

	const date = new Date(query.startDate);
	return (
		<>
			<h1>
				Search results for
				{format(date, ' dd/MM/yyyy')} and {query.location}
			</h1>

			{filteredListings.map(
				({
					_id,
					title,
					img,
					studiotype,
					services,
					soundEngineer,
					studioBooking,
					description,
					locationFeatures,
					location,
				}) => (
					<ListingCard
						key={_id}
						title={title}
						img={img}
						studiotype={studiotype}
						services={services}
						soundEngineer={soundEngineer.available}
						studioBooking={studioBooking.perHour}
						description={description}
						locationFeatures={locationFeatures}
						location={location}
					></ListingCard>
				)
			)}
		</>
	);
}
export default Search;

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
