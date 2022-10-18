import React from 'react';
//tools
import Image from 'next/image';

function ListingCards({ _id, title, img, location }) {
	return (
		<div>
			<div className='flex'>
				<div className='relative h-24 w-36 flex-shrink-0 md:h-52 md:w-80'>
					<Image
						src={img}
						layout='fill'
						objectFit='cover'
						alt=''
					/>
				</div>
				<div className='flex flex-col pl-5'>
					<div>
						<p className='text-xs'>
							{location.length > 30 ? location.substring(0, 30) + '...' : location}
						</p>
					</div>
					<h4 className='text-sm'>{title}</h4>
				</div>
			</div>
		</div>
	);
}

export default ListingCards;
