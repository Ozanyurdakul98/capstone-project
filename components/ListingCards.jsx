import React from 'react';
//tools
import Image from 'next/image';
//icons
import { IconContext } from 'react-icons';
import { FiHeart } from 'react-icons/fi';

function ListingCards({ _id, title, img, services, description, location }) {
	return (
		<div>
			<div className='flex w-full'>
				<div className='relative h-24 w-36 flex-shrink-0 md:h-52 md:w-80'>
					<Image
						src={img}
						layout='fill'
						objectFit='cover'
						alt=''
					/>
				</div>
				<div className='flex flex-col pl-5 w-full'>
					<div className='flex justify-between items-center'>
						<p className='text-xs'>
							{location.length > 30 ? location.substring(0, 30) + '...' : location}
						</p>
						<button>
							<IconContext.Provider
								value={{
									color: 'black',
									size: '18px',
									className: 'global-class-name ',
								}}
							>
								<FiHeart />
							</IconContext.Provider>
						</button>
					</div>
					<h4 className='text-sm sm:text-xl'>{title}</h4>
					<div className='flex gap-2 '>
						{services.map((service, _id) => (
							<p
								key={_id}
								className='rounded-full bg-red-200 px-[9px] text-xs sm:text-base '
							>
								{service}
							</p>
						))}
					</div>
				</div>
			</div>
		</div>
	);
}

export default ListingCards;
