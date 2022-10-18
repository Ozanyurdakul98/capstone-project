import React from 'react';
import fakeData from '../../utils/FakeDB';

function search() {
	return <div>search</div>;
}

export default search;

export async function getServerSideProps(context) {
	const listings = fakeData;

	return {
		props: { listings: listings }, // will be passed to the page component as props
	};
}
