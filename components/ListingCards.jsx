import React from 'react';
//hooks
import { useEffect, useLayoutEffect, useState, useRef } from 'react';
//tools
import Image from 'next/image';
//icons
import { IconContext } from 'react-icons';
import { FiHeart } from 'react-icons/fi';

function ListingCards({ _id, title, img, studiotype, services, description, location }) {
	const ref = useRef(null);

	const slicedServices = services.slice(0, 3).map((service, index) => service);
	console.log(slicedServices);

	const [width, setWidth] = useState(0);
	const [height, setHeight] = useState(0);

	useLayoutEffect(() => {
		setWidth(ref.current.offsetWidth);
		setHeight(ref.current.offsetHeight);
	}, []);

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
				<div ref={ref}></div>

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
					<p className='text-xs sm:text-sm'>{studiotype}</p>
					<h4 className='text-sm sm:text-xl'>{title}</h4>
					<div
						className='flex gap-2 items-center'
						ref={ref}
					>
						{width <= 340 && services.length > 3 ? (
							<>
								{slicedServices.map((item, index) => (
									<p
										className='rounded-full bg-red-200 px-[9px] text-xs '
										key={`${index}`}
									>
										{item}
									</p>
								))}
								...
							</>
						) : (
							services.map((service, _id) => (
								<p
									key={_id}
									className='rounded-full bg-red-200 px-[9px] text-xs sm:text-sm '
								>
									{service}
								</p>
							))
						)}
					</div>
					<div>
						<p></p>
						<p></p>
					</div>
				</div>
			</div>
		</div>
	);
}

export default ListingCards;

//Get width of an Element inspired by @Borislav Hadzhiev at https://bobbyhadz.com/blog/react-get-width-of-element
