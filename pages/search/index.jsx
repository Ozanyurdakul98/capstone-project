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
import { check } from 'prettier';

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
		console.log('effect');
		console.log('searchFilter', searchFilter);
		if (router.query.location !== searchFilter.location) {
			//page is not reloading and firing the useEffect, so to be able to filter listings, without full page reload
			//therefore i use this function to activate the useEffect dependency and stilly have the Vorteile from fast pageload
			console.log('rerender');
			setSearchFilter(location);
			return refreshData();
		}
		const date = new Date(searchFilter.startDate).getDay();
		const checkIn = new Date(location.startDate).getDay();
		console.log('checkIn', checkIn);
		console.log('checkIn2', date);
		if (searchFilter.location) {
			const filteredLoc = listings.filter((listings) =>
				listings.location.toLowerCase().includes(searchFilter.location.toLocaleLowerCase())
			);
			if (searchFilter.startDate) {
				if (checkIn === 0) {
					const filteredDay = filteredLoc.filter(
						(studio) =>
							studio.openingCustom?.sunday ||
							studio.openingOption === 'Always Available' ||
							studio.openingOption === 'On Request'
					);
					console.log('Sunday', filteredDay);
					return setSearch(filteredDay);
				} else if (checkIn === 1) {
					const filteredDay = filteredLoc.filter(
						(studio) =>
							studio.openingCustom?.monday ||
							studio.openingOption === 'Always Available' ||
							studio.openingOption === 'On Request'
					);
					console.log('Monday', filteredDay);
					return setSearch(filteredDay);
				} else if (checkIn === 2) {
					const filteredDay = filteredLoc.filter(
						(studio) =>
							studio.openingCustom?.thuesday ||
							studio.openingOption === 'Always Available' ||
							studio.openingOption === 'On Request'
					);
					console.log('Thuesday', filteredDay);
					return setSearch(filteredDay);
				} else if (checkIn === 3) {
					const filteredDay = filteredLoc.filter(
						(studio) =>
							studio.openingCustom?.wednesday ||
							studio.openingOption === 'Always Available' ||
							studio.openingOption === 'On Request'
					);
					console.log('Wednesday', filteredDay);
					return setSearch(filteredDay);
				} else if (checkIn === 4) {
					const filteredDay = filteredLoc.filter(
						(studio) =>
							studio.openingCustom?.thursday ||
							studio.openingOption === 'Always Available' ||
							studio.openingOption === 'On Request'
					);
					console.log('Thursday', filteredDay);
					return setSearch(filteredDay);
				} else if (checkIn === 5) {
					const filteredDay = filteredLoc.filter(
						(studio) =>
							studio.openingCustom?.friday ||
							studio.openingOption === 'Always Available' ||
							studio.openingOption === 'On Request'
					);
					console.log('Friday', filteredDay);
					return setSearch(filteredDay);
				} else if (checkIn === 6) {
					const filteredDay = filteredLoc.filter(
						(studio) =>
							studio.openingCustom?.saturday ||
							studio.openingOption === 'Always Available' ||
							studio.openingOption === 'On Request'
					);
					console.log('Saturday', filteredDay);
					return setSearch(filteredDay);
				}
			}
			console.log('outer return ELSE');
			return setSearch(filteredLoc);
		}
	}, [router.query, searchFilter]);
	const date = new Date(location.startDate);
	console.log('date', date);

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
