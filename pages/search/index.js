import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
//tools
import format from 'date-fns/format';
//db
import { fakeData } from '../../db/fakedata';
//components
import ListingCard from '../../components/ListingCard';

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

function Search(location) {
	const listings = fakeData.studioListings;
	const [searchFilter, setSearchFilter] = useState('');
	const router = useRouter();

	function filterStudioListings() {
		const weekdays = [
			'sunday',
			'monday',
			'thuesday',
			'wednesday',
			'thursday',
			'friday',
			'saturday',
		];
		const checkInDay = new Date(location.startDate).getDay();
		if (
			router.query.location !== searchFilter.location ||
			router.query.noOfGuests !== searchFilter.noOfGuests ||
			router.query.servicesSelected !== searchFilter.servicesSelected ||
			router.query.startDate !== searchFilter.startDate
		) {
			setSearchFilter(location);
		}
		const filteredLocation = listings
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
		return filteredLocation;
	}
	const date = new Date(location.startDate);
	return (
		<>
			<h1>
				Search results for
				{format(date, 'dd/MM/yyyy')} and {location.location}
			</h1>
			<>
				{filterStudioListings().map(
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
						<ListingCard
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
						></ListingCard>
					)
				)}
			</>
		</>
	);
}

export default Search;
