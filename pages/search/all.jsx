import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
//tools
import format from 'date-fns/format';

//utils
import { fakeData } from '../../db/fakedata';

//services
//components
import ListingCards from '../../components/ListingCards';
import { nanoid } from 'nanoid';

export async function getServerSideProps(context) {
	const query = JSON.parse(JSON.stringify(context.query));
	const checkInDay = new Date(query.startDate).getDay();
	return {
		props: {
			location: query.location || null,
			startDate: query.startDate || null,
			checkIn: checkInDay || null,
			endDate: query.endDate || null,
			noOfGuests: query.noOfGuests || null,
			servicesSelected: query.servicesSelected || null,
		},
	};
}

const listings = fakeData.studioListings;

function Search({ location, startDate, checkIn, endDate }) {
	const [search, setSearch] = useState(listings);
	const [searchFilter, setSearchFilter] = useState({ location, startDate });

	return (
		<>
			<h1>All Search results</h1>
			<>
				{search.map(
					({
						title,
						img,
						studiotype,
						services,
						soundEngineerAvailabilty,
						studioBooking,
						description,
						locationFeatures,
						location,
					}) => (
						<ListingCards
							key={nanoid()}
							title={title}
							img={img}
							studiotype={studiotype}
							services={services}
							soundEngineerAvailabilty={soundEngineerAvailabilty.available}
							studioBooking={studioBooking.perHour}
							description={description}
							locationFeatures={locationFeatures}
							location={location}
						></ListingCards>
					)
				)}
			</>
		</>
	);
}

export default Search;
