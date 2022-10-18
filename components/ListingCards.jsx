import React from 'react';

function ListingCards({ _id, title }) {
	return (
		<div>
			<div key={_id}>
				<div></div>
				<div>
					<h4>{title}</h4>
				</div>
			</div>
		</div>
	);
}

export default ListingCards;
