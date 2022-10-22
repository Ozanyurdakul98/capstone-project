import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
//tools
import format from 'date-fns/format';
//db
import { fakeData } from '../../db/fakedata';
//components
import ListingCards from '../../components/ListingCards';
import { nanoid } from 'nanoid';

export async function getServerSideProps(context) {
	const query = JSON.parse(JSON.stringify(context.query));

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

	useEffect(() => {
		if (
			router.query.location !== searchFilter.location ||
			router.query.noOfGuests !== searchFilter.noOfGuests ||
			router.query.servicesSelected !== searchFilter.servicesSelected
		) {
			setSearchFilter(location);
			return refreshData();
		}
		const checkIn = new Date(location.startDate).getDay();
		if (searchFilter.location) {
			let filteredLoc = listings.filter((listings) =>
				listings.location.toLowerCase().includes(searchFilter.location.toLowerCase())
			);
			if (searchFilter.startDate) {
				if (searchFilter.noOfGuests > 1) {
					filteredLoc = filteredLoc.filter((studio) => studio.maxGuests >= searchFilter.noOfGuests);
				}
				if (searchFilter.servicesSelected) {
					filteredLoc = filteredLoc.filter((studio) =>
						studio.services
							.map((element) => {
								return element.toLowerCase();
							})
							.includes(searchFilter.servicesSelected.toLowerCase())
					);
				}
				if (checkIn === 0) {
					const filteredDay = filteredLoc.filter(
						(studio) =>
							studio.openingCustom?.sunday ||
							studio.openingOption === 'Always Available' ||
							studio.openingOption === 'On Request'
					);
					return setSearch(filteredDay);
				} else if (checkIn === 1) {
					const filteredDay = filteredLoc.filter(
						(studio) =>
							studio.openingCustom?.monday ||
							studio.openingOption === 'Always Available' ||
							studio.openingOption === 'On Request'
					);
					return setSearch(filteredDay);
				} else if (checkIn === 2) {
					const filteredDay = filteredLoc.filter(
						(studio) =>
							studio.openingCustom?.thuesday ||
							studio.openingOption === 'Always Available' ||
							studio.openingOption === 'On Request'
					);
					return setSearch(filteredDay);
				} else if (checkIn === 3) {
					const filteredDay = filteredLoc.filter(
						(studio) =>
							studio.openingCustom?.wednesday ||
							studio.openingOption === 'Always Available' ||
							studio.openingOption === 'On Request'
					);
					return setSearch(filteredDay);
				} else if (checkIn === 4) {
					const filteredDay = filteredLoc.filter(
						(studio) =>
							studio.openingCustom?.thursday ||
							studio.openingOption === 'Always Available' ||
							studio.openingOption === 'On Request'
					);
					return setSearch(filteredDay);
				} else if (checkIn === 5) {
					const filteredDay = filteredLoc.filter(
						(studio) =>
							studio.openingCustom?.friday ||
							studio.openingOption === 'Always Available' ||
							studio.openingOption === 'On Request'
					);
					return setSearch(filteredDay);
				} else if (checkIn === 6) {
					const filteredDay = filteredLoc.filter(
						(studio) =>
							studio.openingCustom?.saturday ||
							studio.openingOption === 'Always Available' ||
							studio.openingOption === 'On Request'
					);
					return setSearch(filteredDay);
				}
			}
			return setSearch(filteredLoc);
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
