import React from 'react';
//hooks
import { useEffect, useLayoutEffect, useState, useRef } from 'react';
//tools
import Image from 'next/image';
//icons
import { IconContext } from 'react-icons';
import { FiHeart } from 'react-icons/fi';
import { TiTick } from 'react-icons/ti';
import { IoIosWifi } from 'react-icons/io';
import { RiParkingBoxLine } from 'react-icons/ri';
import { TbSmoking } from 'react-icons/tb';
import { MdBed } from 'react-icons/md';

function ListingCards({
	_id,
	title,
	img,
	studiotype,
	services,
	soundEngineerAvailabilty,
	studioBooking,
	description,
	locationFeatures,
	location,
}) {
	const ref = useRef(null);

	const slicedServices = services.slice(0, 3).map((service, index) => service);
	console.log(slicedServices);

	const [width, setWidth] = useState(0);
	// const [height, setHeight] = useState(0);

	useLayoutEffect(() => {
		setWidth(ref.current.offsetWidth);
		// setHeight(ref.current.offsetHeight);
	}, []);

	return (
		<div>
			<div className='flex w-full cursor-pointer rounded-lg border-b py-7 px-2 first:border hover:opacity-80 hover:shadow-lg'>
				<div className='relative h-24 w-32  flex-shrink-0 sm:h-32 sm:w-48 md:h-36 md:w-56 lg:h-52 lg:w-80'>
					<Image
						src={img}
						layout='fill'
						objectFit='cover'
						className='rounded-xl'
						alt=''
					/>
				</div>
				<div ref={ref}></div>

				<div className='flex w-full flex-col justify-between pl-2 sm:pl-5'>
					<div className='flex flex-col md:gap-2'>
						<div className='flex items-center justify-between'>
							<p className='text-xs text-gray-400'>
								{location.length > 30 ? location.substring(0, 30) + '...' : location}
							</p>
							<button>
								<IconContext.Provider
									value={{
										color: 'blue',
										size: '18px',
										className: 'global-class-name ',
									}}
								>
									<FiHeart />
								</IconContext.Provider>
							</button>
						</div>
						<div className='flex gap-2'>
							<p className='text-xs sm:text-sm md:text-lg'>{studiotype}</p>
							<p className='md:text- flex text-xs sm:text-sm'>
								{soundEngineerAvailabilty ? (
									<>
										Soundengineer <TiTick className='text-green-500' />
									</>
								) : (
									''
								)}
							</p>
						</div>
					</div>
					<h4 className='text-sm sm:text-xl md:text-3xl'>{title}</h4>
					<div
						className='flex items-center gap-2'
						ref={ref}
					>
						{width <= 340 && services.length > 3 ? (
							<>
								{slicedServices.map((item, index) => (
									<p
										className='rounded-full bg-red-200 px-[9px] text-xs sm:text-sm md:text-lg'
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
									className='rounded-full bg-red-200 px-[9px] text-xs sm:text-sm md:text-lg'
								>
									{service}
								</p>
							))
						)}
					</div>
					<div className='flex items-center justify-between'>
						<div className='flex gap-2'>
							{locationFeatures.wifi ? <IoIosWifi className='sm:h-6 sm:w-6' /> : ''}
							{locationFeatures.parking ? <RiParkingBoxLine className='sm:h-6 sm:w-6' /> : ''}
							{locationFeatures.smoking ? <TbSmoking className='sm:h-6 sm:w-6' /> : ''}
							{locationFeatures.sleepover ? <MdBed className='sm:h-6 sm:w-6' /> : ''}
						</div>
						<p className='text-sm font-semibold sm:text-base md:text-lg lg:text-2xl'>
							{studioBooking}$ / Hour
						</p>
					</div>
				</div>
			</div>
		</div>
	);
}

export default ListingCards;

//Get width of an Element inspired by @Borislav Hadzhiev at https://bobbyhadz.com/blog/react-get-width-of-element
