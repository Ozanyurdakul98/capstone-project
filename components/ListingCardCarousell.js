import React from 'react';
//hooks
import { useEffect, useState, useRef } from 'react';
//tools
import Image from 'next/image';
//icons
import { FiHeart } from 'react-icons/fi';
import { TiTick } from 'react-icons/ti';
import { IoIosWifi } from 'react-icons/io';
import { IoPeopleCircleSharp } from 'react-icons/io5';
import { RiParkingBoxLine } from 'react-icons/ri';
import { TbSmoking } from 'react-icons/tb';
import { MdBed } from 'react-icons/md';

function ListingCard({
  listingTitle,
  images,
  studiotype,
  openingHours,
  soundengineer,
  maxGuests,
  studioPricing,
  locationFeatures,
  studioLocation,
}) {
  return (
    <article className='mx-1 mb-10'>
      <div className='relative   flex min-h-[333px] w-full max-w-[250px] cursor-pointer flex-col rounded-lg border border-b border-slate-500 px-2 shadow-md hover:opacity-90 hover:shadow-lg'>
        <div className='relative h-40 w-full  flex-shrink-0'>
          <Image
            src={images}
            // src=''
            layout='fill'
            objectFit='cover'
            className='rounded-xl'
            alt='Thumbnail'
          />
        </div>
        <div className='mb-3 flex w-full flex-grow flex-col justify-between pl-2'>
          <div className='flex flex-col gap-[6px] md:gap-2'>
            <div className='flex items-center justify-between'>
              <p className='truncate text-xs text-gray-400'>{studioLocation}</p>
              <button>
                <FiHeart className='icon-bookmark mt-1' />
              </button>
            </div>
            <div className='-mt-1 flex  gap-2'>
              <p className='bg-primary truncate rounded border border-slate-700 px-1 text-xs text-white  md:text-sm'>
                {studiotype}
              </p>
              <p className='flex truncate rounded border border-slate-700 px-1 text-xs  md:text-sm'>
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
          <div className='mt-1 flex flex-1 md:min-h-[60px]'>
            <h4 className=' line-clamp-2 sm:text-base md:text-lg'>{listingTitle}</h4>
          </div>
          <div className='flex items-center justify-between'>
            <ul className='flex gap-2'>
              {locationFeatures.includes('Wi-Fi') ? (
                <li>
                  <IoIosWifi className='icon-carousell' />
                </li>
              ) : null}
              {locationFeatures.includes('Parking') ? (
                <li>
                  <RiParkingBoxLine className='icon-carousell' />
                </li>
              ) : null}
              {locationFeatures.includes('Smoking') ? (
                <li>
                  <TbSmoking className='icon-carousell' />
                </li>
              ) : null}
              {locationFeatures.includes('Sleepover') ? (
                <li>
                  <MdBed className='icon-carousell' />
                </li>
              ) : null}
            </ul>
            <div className='flex gap-1'>
              <IoPeopleCircleSharp className='icon-bookmark' />
              <p className=' font-semibold'>{maxGuests}</p>
            </div>
          </div>
          <div className='  flex w-full  items-end justify-between gap-1 text-right '>
            <p className='bg-primary truncate rounded-xl border border-slate-700 px-[6px] text-xs text-white'>
              {openingHours}
            </p>
            <p className='relative top-1 whitespace-nowrap text-lg font-semibold sm:text-xl md:text-xl lg:text-2xl'>
              {studioPricing.studioPricingHour ? (
                <>
                  {studioPricing.studioPricingHour}$ <span className='text-base sm:text-lg lg:text-xl'>/Hour</span>
                </>
              ) : studioPricing.studioPricingDay ? (
                <>
                  {studioPricing.studioPricingDay}$ <span className='text-base sm:text-lg'>/Day</span>
                </>
              ) : studioPricing.studioPricingWeek ? (
                <>
                  {studioPricing.studioPricingWeek}$ <span className='text-base sm:text-lg'>/Week</span>
                </>
              ) : studioPricing.studioPricingMonth ? (
                <>
                  {studioPricing.studioPricingMonth}$ <span className='text-base sm:text-lg'>/Month</span>
                </>
              ) : null}
            </p>
          </div>
        </div>
      </div>
    </article>
  );
}

export default ListingCard;
