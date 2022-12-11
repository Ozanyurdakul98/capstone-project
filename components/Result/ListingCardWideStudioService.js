//tools
import Image from 'next/image';
//icons
import { IoIosWifi } from 'react-icons/io';
import { RiParkingBoxLine } from 'react-icons/ri';
import { TbSmoking } from 'react-icons/tb';
import { MdBed } from 'react-icons/md';
import Link from 'next/link';
import { IoPeopleCircle } from 'react-icons/io5';

function ListingCardWideStudioService({
  preview,
  id,
  path,
  listingTitle,
  images,
  studiotype,
  service,
  soundengineer,
  pricing,
  maxGuests,
  studio,
}) {
  const type = studiotype?.toLowerCase().replace(/ /g, '');
  const title = listingTitle?.toLowerCase().replace(/ /g, '-');
  return (
    <article>
      <Link
        href={
          preview
            ? '#'
            : {
                pathname: '/studioservice/[path]/id/[type]/[title]/[id]',
                query: { path: `${path}`, type: `${type}`, title: `${title}`, id: `${id}` },
              }
        }>
        <div className="flex w-full cursor-pointer rounded-lg border-b py-7 px-2 first:border hover:opacity-80 hover:shadow-lg">
          <div className="relative h-24 w-32  shrink-0 sm:h-32 sm:w-48 md:h-36 md:w-56 lg:h-36 lg:w-56">
            <Image src={images} layout="fill" objectFit="cover" className="rounded-xl" alt="Thumbnail" />
          </div>
          <div className="flex w-full flex-col justify-between pl-2 sm:pl-5">
            {/* location and studiotype */}
            <div className="flex flex-col md:gap-1">
              {/* location */}
              <div className="flex items-center justify-between">
                <p className="truncate text-xs text-gray-400">{studio.studioLocation}</p>
              </div>
              {/* type */}
              <div className="flex gap-2">
                <p className="bg-primary flex truncate rounded border border-slate-700 px-1 text-xs text-white md:text-sm">
                  {studio.studiotype}
                </p>
                <p
                  className={
                    soundengineer && soundengineer !== 'No Soundengineer'
                      ? 'bg-primary truncate  rounded border border-slate-700 px-1 text-xs text-white md:text-sm'
                      : ' rounded border border-red-600 bg-red-600 px-1 '
                  }>
                  {soundengineer && soundengineer !== 'No Soundengineer' ? (
                    <>
                      Engineer
                      {soundengineer.price ? ' ' + soundengineer.price + '€' : ' ' + soundengineer}
                    </>
                  ) : (
                    soundengineer
                  )}
                </p>
              </div>
            </div>
            {/* title and studioname*/}
            <div>
              <h4 className="text-sm line-clamp-1 sm:text-lg md:text-xl">{listingTitle}</h4>
              {/* studioname */}
              <h3 className="text-xs font-thin sm:text-sm">{studio.studioName}</h3>
            </div>
            {/* features */}
            <div className="flex items-center justify-between">
              <div className="flex gap-1">
                {studio.locationFeatures.includes('Sleepover') ? <MdBed className="icon" /> : null}
                {studio.locationFeatures.includes('Wi-Fi') ? <IoIosWifi className="icon" /> : null}
                {studio.locationFeatures.includes('Parking') ? <RiParkingBoxLine className="icon" /> : null}
                {studio.locationFeatures.includes('Smoking') ? <TbSmoking className="icon" /> : null}
              </div>
              <div className="flex items-center">
                <IoPeopleCircle className="icon" />
                <span className="text-sm sm:text-[15px] lg:text-lg">{maxGuests}</span>
              </div>
              <p className="text-sm font-semibold sm:text-base md:text-lg lg:text-2xl">
                {pricing.pricingHour
                  ? pricing.pricingHour + '$ / Hour'
                  : pricing.pricingDay
                  ? pricing.pricingDay + '$ / Day'
                  : pricing.pricingWeek
                  ? pricing.pricingWeek + '$ / Week'
                  : pricing.pricingMonth
                  ? pricing.pricingMonth + '$ / Month'
                  : null}
              </p>
            </div>
          </div>
        </div>
      </Link>
    </article>
  );
}

export default ListingCardWideStudioService;
