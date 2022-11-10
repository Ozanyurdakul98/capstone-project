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
  openingHours,
  soundengineer,
  studioPricing,
  locationFeatures,
  studioLocation,
}) {
  console.log(locationFeatures.includes('Wi-Fi'));
  return (
    <article className='mx-1 mb-10'>
      <div className='relative  flex min-h-[333px] w-full max-w-[250px] cursor-pointer flex-col rounded-lg border border-b border-slate-500 px-2 shadow-md hover:opacity-80 hover:shadow-lg'>
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
        <div className='flex w-full flex-col justify-between pl-2'>
          <div className='flex flex-col md:gap-2'>
            <div className='flex items-center justify-between'>
              <p className='truncate text-xs text-gray-400'>{studioLocation}</p>
              <button>
                <FiHeart className='icon-sm' />
              </button>
            </div>
            <div className='-mt-1 flex  gap-2'>
              <p className='bg-primary rounded border border-slate-700 px-1 text-xs text-white  md:text-lg'>
                {studiotype}
              </p>
              <p className='flex rounded border border-slate-700 px-1 text-xs  md:text-lg'>
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
          <h4 className='text-md mt-1 max-h-[45px] min-h-[40px] truncate font-semibold sm:text-base md:text-2xl'>
            {listingTitle}
          </h4>
          <div className='mt-2 flex items-center justify-between'>
            <ul className='flex min-h-[20px]  gap-2'>
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
          </div>
          <div className='relative top-2 flex w-full items-end justify-between gap-1 text-right '>
            <p className='bg-primary truncate rounded-xl border border-slate-700 px-1 text-xs text-white'>
              {openingHours}
            </p>
            <p className='relative top-1 whitespace-nowrap text-lg font-semibold sm:text-base md:text-lg lg:text-2xl'>
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
