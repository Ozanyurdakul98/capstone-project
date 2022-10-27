import React from 'react';
//db
import db from '../../lib/dbConnect';
import StudioListing from '../../models/StudioListing';
//components
import ListingCards from '../../components/ListingCard';

function Search({ listings }) {
	return (
		<>
			<h1>All Search results</h1>
			<>
				{listings.map(
					({
						id,
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
						<ListingCards
							key={id}
							title={title}
							img={img}
							studiotype={studiotype}
							services={services}
							soundEngineer={soundEngineer.available}
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

export async function getServerSideProps(context) {
	await db.connect();

	const fetchingListings = await StudioListing.find();
	const fetchedListings = JSON.parse(JSON.stringify(fetchingListings));

	return {
		props: {
			listings: fetchedListings || null,
		},
	};
}
