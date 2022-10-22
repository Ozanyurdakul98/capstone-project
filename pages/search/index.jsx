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
	const router = useRouter();
	// console.log({ location });
	console.log('c', checkIn);
	console.log('dates', format(new Date(startDate), 'dd/MM/yyyy'), endDate);
	console.log('dates2', startDate, endDate);
	console.log('dates3', new Date(startDate).getDay(), endDate);
	// console.log(new Date(parseInt(endDate)).getDay());
	// console.log(Date.parse(startDate));

	if (router.query.location !== searchFilter.location) {
		//page is not reloading and firing the useEffect, so to be able to filter listings, without full page reload
		//therefore i use this function to activate the useEffect dependency and stilly have the Vorteile from fast pageload
		const refreshData = () => router.replace(router.asPath);
		setSearchFilter(router.query);
		console.log('refresh');
	}

	useEffect(() => {
		console.log('filterloco', searchFilter.location);
		console.log('filter', searchFilter);
		console.log('useeffect');

		if (searchFilter.location) {
			const filtered = listings.filter((listings) =>
				listings.location.toLowerCase().includes(searchFilter.location.toLocaleLowerCase())
			);
			return setSearch(filtered);
		}
	}, [searchFilter]);

	return (
		<>
			<h1>Search results</h1>
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
