import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

//utils
//services
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

const fakeData = {
	studioListings: [
		{
			_id: '1',
			user: 'Admin',
			title: 'Premiumstudio for your perfect Sound',
			studioname: 'SoundDeluxe',
			openingOption: 'Custom',
			openingCustom: {
				monday: '08:00 - 18:00',
				thuesday: '08:00 - 18:00',
				wednesday: '08:00 - 18:00',
				thursday: '08:00 - 18:00',
				friday: '08:00 - 18:00',
				saturday: '08:00 - 18:00',
				sunday: '08:00 - 18:00',
			},
			img: 'https://unsplash.com/photos/uEGX88nVotU/download?ixid=MnwxMjA3fDB8MXxzZWFyY2h8MTR8fHJlY29yZGluZyUyMHN0dWRpb3xlbnwwfHx8fDE2NjU5MjI4MTU&force=true',
			studiotype: 'Premiumstudio',
			services: ['Recording', 'Mix', 'Master', 'Podcast/Audiobook'],
			soundEngineerAvailabilty: { available: true },
			soundEngineer: { preis: '5', pro: 'Stunde' },
			studioBooking: {
				perHour: '25',
				perDay: '125',
				perWeek: '300',
				perMonth: '1300',
			},

			description:
				' Lorem ipsum dolor sit, amet consectetur adipisicing elit. Adipisci, laboriosam dicta. Sed rerum totam delectus suscipit similique voluptatum repellat, maxime iure et modi, quam aliquid iste? Aperiam harum quod cumque quaerat eligendi delectus, fuga iure ut nobis pariatur veniam id et vitae hic quae rerum velit voluptatibus quasi unde sequi.',
			locationFeatures: {
				parking: true,
				snacks: true,
				wifi: true,
				wc: true,
				kitchen: true,
				sleepover: true,
				smoking: true,
			},
			equipment: [
				'equipment1',
				'equipment31',
				'equipment431',
				'equipment12',
				'equipment123',
				'equipment31',
			],
			references:
				' Lorem ipsum dolor sit, amet consectetur adipisicing elit. Adipisci, laboriosam dicta. Sed rerum totam delectus suscipit similique voluptatum repellat, maxime iure et modi, quam aliquid iste? Aperiam harum quod cumque quaerat eligendi delectus, fuga iure ut nobis pariatur veniam id et vitae hic quae rerum velit voluptatibus quasi unde sequi.',
			socialMedia: {
				facebook: 'facebookURL',
				twitter: 'TwitterURL',
				spotify: 'SpotifyURL',
			},
			location: 'Frankfurt am Main, Geht-der-Hase str.32',
		},

		{
			_id: '2',
			user: 'User1',
			title: 'I mix your tracks to perfection for a little price',
			studioname: 'Sound300',
			openingOption: 'Immer verfügbar',
			img: 'https://unsplash.com/photos/aLPY2rRTYQI/download?ixid=MnwxMjA3fDB8MXxzZWFyY2h8MTF8fG11c2ljJTIwc3R1ZGlvfGVufDB8fHx8MTY2NTg3MzU4Mw&force=true',
			studiotype: 'Home Studio',
			services: ['Recording', 'Podcast/Audiobook'],
			soundEngineerAvailabilty: { available: true },

			soundEngineer: { preis: '15', pro: 'Stunde' },
			studioBooking: {
				perHour: '15',
				perDay: '100',
			},

			description:
				' Lorem ipsum dolor sit, amet consectetur adipisicing elit. Adipisci, laboriosam dicta. Sed rerum totam delectus suscipit similique voluptatum repellat, maxime iure et modi, quam aliquid iste? Aperiam harum quod cumque quaerat eligendi delectus, fuga iure ut nobis pariatur veniam id et vitae hic quae rerum velit voluptatibus quasi unde sequi.',
			locationFeatures: {
				parking: true,
				snacks: true,
				wifi: true,
				wc: true,
				kitchen: true,
				sleepover: true,
				smoking: true,
			},
			equipment: [
				'equipment1',
				'equipment31',
				'equipment431',
				'equipment12',
				'equipment123',
				'equipment31',
			],
			references:
				' Lorem ipsum dolor sit, amet consectetur adipisicing elit. Adipisci, laboriosam dicta. Sed rerum totam delectus suscipit similique voluptatum repellat, maxime iure et modi, quam aliquid iste? Aperiam harum quod cumque quaerat eligendi delectus, fuga iure ut nobis pariatur veniam id et vitae hic quae rerum velit voluptatibus quasi unde sequi.',
			socialMedia: {
				facebook: 'facebookURL',
				twitter: 'TwitterURL',
				spotify: 'SpotifyURL',
			},

			location: 'Frankfurt am Main, Geht-der-Hase str.32',
		},

		{
			_id: '3',
			user: 'User2',
			title: 'Mediumstudio to fit your needs',
			studioname: 'SoundDeluxe',
			openingOption: 'Benutzerdefiniert',
			openingCustom: {
				monday: '08:00 - 18:00',
				thuesday: '08:00 - 18:00',
				wednesday: '08:00 - 18:00',
				thursday: '08:00 - 18:00',
				friday: '08:00 - 18:00',
				saturday: '08:00 - 18:00',
			},
			img: 'https://unsplash.com/photos/-qFWOJEEQh4/download?ixid=MnwxMjA3fDB8MXxzZWFyY2h8MTZ8fG11c2ljJTIwc3R1ZGlvfGVufDB8fHx8MTY2NTg3MzU4Mw&force=true',
			studiotype: 'Mediumstudio',
			services: ['Recording', 'Mix', 'Master', 'Podcast/Audiobook'],
			soundEngineerAvailabilty: { available: false },
			studioBooking: {
				perHour: '105',
				perDay: '1000',
			},

			description:
				' Lorem ipsum dolor sit, amet consectetur adipisicing elit. Adipisci, laboriosam dicta. Sed rerum totam delectus suscipit similique voluptatum repellat, maxime iure et modi, quam aliquid iste? Aperiam harum quod cumque quaerat eligendi delectus, fuga iure ut nobis pariatur veniam id et vitae hic quae rerum velit voluptatibus quasi unde sequi.',
			locationFeatures: {
				parking: true,
				snacks: true,
				wifi: true,
				wc: true,
				kitchen: true,
				sleepover: true,
				smoking: true,
			},
			equipment: [
				'equipment1',
				'equipment31',
				'equipment431',
				'equipment12',
				'equipment123',
				'equipment31',
			],
			references:
				' Lorem ipsum dolor sit, amet consectetur adipisicing elit. Adipisci, laboriosam dicta. Sed rerum totam delectus suscipit similique voluptatum repellat, maxime iure et modi, quam aliquid iste? Aperiam harum quod cumque quaerat eligendi delectus, fuga iure ut nobis pariatur veniam id et vitae hic quae rerum velit voluptatibus quasi unde sequi.',
			socialMedia: {
				facebook: 'facebookURL',
				twitter: 'TwitterURL',
				spotify: 'SpotifyURL',
			},
			location: 'Hamburg, Geht-der-Hase str.3',
		},
	],
};
const listings = fakeData.studioListings;

function Search({ location, startDate, endDate }) {
	const [search, setSearch] = useState(listings);
	const [searchFilter, setSearchFilter] = useState({ location, startDate });
	const router = useRouter();
	// console.log({ location });
	console.log('index');
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
			console.log('filtered', filtered);
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
