//tools
import Image from 'next/image';
//icons
import { IoIosWifi } from 'react-icons/io';
import { IoPeopleCircleSharp } from 'react-icons/io5';
import { RiParkingBoxLine } from 'react-icons/ri';
import { TbSmoking } from 'react-icons/tb';
import { MdBed } from 'react-icons/md';

function ListingCardCarousellStudioService({
  listingTitle,
  images,
  studiotype,
  soundengineer,
  service,
  description,
  maxGuests,
  pricing,
  locationFeatures,
  studio,
}) {
  return (
    <div className="mx-1">
      <article className="relative mb-10  flex min-h-[392px] w-full max-w-[250px] cursor-pointer flex-col rounded-lg bg-white shadow-lg hover:opacity-90 hover:shadow-lg">
        {/* image */}
        <div className="relative h-40 w-full  shrink-0">
          <Image src={images.primary} layout="fill" objectFit="cover" className="rounded-xl" alt="Thumbnail" />
        </div>
        <div className="mb-3 flex w-full grow flex-col justify-between px-1 sm:px-2">
          {/* location, type, soundenginner */}
          <div className="flex flex-col gap-[6px] md:gap-2">
            <div className="flex items-center justify-between pt-1">
              <p className="flex gap-1 truncate text-xs text-gray-400">
                <svg
                  className="h-4 w-4 text-black"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                </svg>
                {studio.studioLocation}
              </p>
            </div>
            <div className="-mt-1 flex min-w-0 grow gap-2">
              <p
                style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}
                className="truncate rounded border border-black bg-black px-1 text-xs text-white shadow-lg  md:text-sm">
                {studiotype}
              </p>
              <p className="border-primary truncate  rounded border  px-1 text-xs shadow-md  shadow-[var(--primary-color)] md:text-sm">
                {soundengineer ? 'Soundengineer' : ''}
              </p>
            </div>
          </div>
          {/* title */}
          <div className="mt-1 mb-[10px] flex flex-1 flex-col justify-center md:min-h-[60px]">
            <h4 className="line-clamp-2 sm:text-base md:text-lg">{listingTitle}</h4>
            <p className="truncate text-xs font-semibold">{service.name}</p>
            <p className="text-xs line-clamp-2">{description}</p>
          </div>
          {/* icons & guests */}
          <div className="flex items-center justify-between">
            <ul className="flex gap-2">
              {locationFeatures.includes('Wi-Fi') ? (
                <li>
                  <IoIosWifi className="icon-carousell" />
                </li>
              ) : null}
              {locationFeatures.includes('Parking') ? (
                <li>
                  <RiParkingBoxLine className="icon-carousell" />
                </li>
              ) : null}
              {locationFeatures.includes('Smoking') ? (
                <li>
                  <TbSmoking className="icon-carousell" />
                </li>
              ) : null}
              {locationFeatures.includes('Sleepover') ? (
                <li>
                  <MdBed className="icon-carousell" />
                </li>
              ) : null}
            </ul>
            <div className="flex items-center gap-1">
              <IoPeopleCircleSharp className="icon-carousell" />
              <p className=" font-semibold">{maxGuests}</p>
            </div>
          </div>
          <div className="flex w-full  items-end justify-between gap-1 text-right ">
            <p className="truncate rounded-xl border border-slate-700 bg-black px-[6px] text-xs text-white">
              {studio.openingHours}
            </p>
            <p className="relative top-1 whitespace-nowrap text-lg font-semibold sm:text-xl md:text-xl lg:text-2xl">
              {pricing.pricingHour ? (
                <>
                  {pricing.pricingHour}$ <span className="text-base sm:text-lg lg:text-xl">/Hour</span>
                </>
              ) : pricing.pricingDay ? (
                <>
                  {pricing.pricingDay}$ <span className="text-base sm:text-lg">/Day</span>
                </>
              ) : pricing.pricingWeek ? (
                <>
                  {pricing.pricingWeek}$ <span className="text-base sm:text-lg">/Week</span>
                </>
              ) : pricing.pricingMonth ? (
                <>
                  {pricing.pricingMonth}$ <span className="text-base sm:text-lg">/Month</span>
                </>
              ) : null}
            </p>
          </div>
        </div>
      </article>
    </div>
  );
}

export default ListingCardCarousellStudioService;
