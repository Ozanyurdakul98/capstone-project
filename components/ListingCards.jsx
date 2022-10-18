import React from 'react';
//tools
import Image from 'next/image';

function ListingCards({ _id, title, img }) {
	return (
		<div>
			<div key={_id}>
				<div className='relative h-24 w-40 flex-shrink-0 md:h-52 md:w-80'>
					<Image
						src={img}
						layout='fill'
						objectFit='cover'
						alt=''
					/>
				</div>
				<div>
					<h4>{title}</h4>
				</div>
			</div>
		</div>
	);
}

export default ListingCards;
