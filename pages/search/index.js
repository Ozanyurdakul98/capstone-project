import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
//tools
import format from 'date-fns/format';
//db
import { fakeData } from '../../db/fakedata';
//components
import ListingCards from '../../components/ListingCards';

export async function getServerSideProps(context) {
	const query = context.query;

	return {
		props: {
			location: query.location || null,
			startDate: query.startDate || null,
			endDate: query.endDate || null,
			noOfGuests: query.noOfGuests || null,
			servicesSelected: query.servicesSelected || null,
		},
	};
}

const listings = fakeData.studioListings;
function Search(location) {
	const [search, setSearch] = useState(listings);
	const [searchFilter, setSearchFilter] = useState('');
	const router = useRouter();
	const refreshData = () => {
		router.replace(router.asPath);
	};
	console.log('router', router.query.startDate);
	console.log('state', searchFilter.startDate);

	useEffect(() => {
		const weekdays = [
			'sunday',
			'monday',
			'thuesday',
			'wednesday',
			'thursday',
			'friday',
			'saturday',
		];
		const weekdayNumbers = [0, 1, 2, 3, 4, 5, 6];
		const weekdayMap = weekdayNumbers.map((day) => {
			return day;
		});
		const checkInDay = new Date(location.startDate).getDay();
		if (
			router.query.location !== searchFilter.location ||
			router.query.noOfGuests !== searchFilter.noOfGuests ||
			router.query.servicesSelected !== searchFilter.servicesSelected ||
			router.query.startDate !== searchFilter.startDate
		) {
			console.log('firing');
			setSearchFilter(location);
			return refreshData();
		}
		if (searchFilter.location || checkInDay === weekdayMap[checkInDay]) {
			const filteredLocation = listings
				.filter((studio) =>
					studio.location.toLowerCase().includes(searchFilter.location.toLowerCase())
				)
				.filter((studio) => studio.maxGuests >= searchFilter.noOfGuests)
				.filter((studio) =>
					studio.services
						.map((element) => {
							return element.toLowerCase();
						})
						.includes(searchFilter.servicesSelected.toLowerCase())
				)
				.filter(
					(studio) =>
						studio.openingCustom?.[weekdays[checkInDay]] ||
						studio.openingOption === 'Always Available' ||
						studio.openingOption === 'On Request'
				);
			console.log(
				listings.filter(
					(studio) =>
						studio.openingCustom?.[weekdays[checkInDay]] ||
						studio.openingOption === 'Always Available' ||
						studio.openingOption === 'On Request'
				)
			);
			setSearch(filteredLocation);
		}
	}, [router.query, searchFilter]);

	const date = new Date(location.startDate);
	return (
		<>
			<h1>
				Search results for
				{format(date, ' dd/MM/yyyy')} and {location.location}
			</h1>
			<>
				{search.map(
					({
						_id,
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
							key={_id}
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
