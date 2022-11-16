import React from 'react';
//hooks
import { useEffect, useState, useRef } from 'react';
//tools
import Image from 'next/image';
//icons
import { FiHeart } from 'react-icons/fi';
import { TiTick } from 'react-icons/ti';
import { IoIosWifi } from 'react-icons/io';
import { RiParkingBoxLine } from 'react-icons/ri';
import { TbSmoking } from 'react-icons/tb';
import { MdBed } from 'react-icons/md';

function ListingCard({
  listingTitle,
  images,
  studiotype,
  services,
  soundengineer,
  studioPricing,
  locationFeatures,
  studioLocation,
}) {
  // const ref = useRef(null);
  const slicedServices = services.slice(0, 3);

  // const [width, setWidth] = useState(0);

  // useEffect(() => {
  //   setWidth(ref.current.offsetWidth);
  // }, []);

  return (
    <article>
      <div className='flex w-full cursor-pointer rounded-lg border-b py-7 px-2 first:border hover:opacity-80 hover:shadow-lg'>
        <div className='relative h-24 w-32  flex-shrink-0 sm:h-32 sm:w-48 md:h-36 md:w-56 lg:h-52 lg:w-80'>
          <Image
            src={images}
            // src=''
            layout='fill'
            objectFit='cover'
            className='rounded-xl'
            alt='Thumbnail'
          />
        </div>
        <div className='flex w-full flex-col justify-between pl-2 sm:pl-5'>
          <div className='flex flex-col md:gap-2'>
            <div className='flex items-center justify-between'>
              <p className='truncate text-xs text-gray-400'>{studioLocation}</p>
              <button>
                <FiHeart className='icon-sm' />
              </button>
            </div>
            <div className='flex gap-2'>
              <p className='text-xs sm:text-sm md:text-lg'>{studiotype}</p>
              <p className='flex text-xs sm:text-sm md:text-lg'>
                {soundengineer ? (
                  <>
                    Soundengineer <TiTick className='text-green-500' />
                  </>
                ) : (
                  '❌'
                )}
              </p>
            </div>
          </div>
          <h4 className='text-sm sm:text-xl md:text-2xl'>{listingTitle}</h4>
          <div className='flex items-center gap-2  '>
            {slicedServices.map((service) => (
              <p
                key={service}
                className='max-w-full rounded-full bg-red-200 px-[9px] text-xs line-clamp-1 sm:text-sm md:text-sm lg:text-base xl:text-lg'>
                {service}
              </p>
            ))}
          </div>
          <div className='flex items-center justify-between'>
            <div className='flex gap-2'>
              {locationFeatures.wifi ? <IoIosWifi className='icon' /> : null}
              {locationFeatures.parking ? <RiParkingBoxLine className='icon' /> : null}
              {locationFeatures.smoking ? <TbSmoking className='icon' /> : null}
              {locationFeatures.sleepover ? <MdBed className='icon' /> : null}
            </div>
            <p className='text-sm font-semibold sm:text-base md:text-lg lg:text-2xl'>
              {studioPricing.studioPricingHour
                ? studioPricing.studioPricingHour + '$ / Hour'
                : studioPricing.studioPricingDay
                ? studioPricing.studioPricingDay + '$ / Day'
                : studioPricing.studioPricingWeek
                ? studioPricing.studioPricingWeek + '$ / Week'
                : studioPricing.studioPricingMonth
                ? studioPricing.studioPricingMonth + '$ / Month'
                : null}
            </p>
          </div>
        </div>
      </div>
    </article>
  );
}

export default ListingCard;
