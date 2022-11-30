//tools
import Image from 'next/image';
//icons
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
    <div className="mx-1">
      <article className="relative mb-10  flex min-h-[333px] w-full max-w-[250px] cursor-pointer flex-col rounded-lg border border-b border-slate-500 bg-white shadow-md hover:opacity-90 hover:shadow-lg">
        <div className="relative h-40 w-full  shrink-0">
          <Image src={images} layout="fill" objectFit="cover" className="rounded-xl" alt="Thumbnail" />
        </div>
        <div className="mb-3 flex w-full grow flex-col justify-between px-1 sm:px-2">
          <div className="flex flex-col gap-[6px] md:gap-2">
            <div className="flex items-center justify-between pt-1">
              <p className="truncate text-xs text-gray-400">{studioLocation}</p>
            </div>
            <div className="-mt-1 flex min-w-0 grow gap-2">
              <p
                style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}
                className="truncate rounded border border-slate-700 bg-black px-1 text-xs text-white  md:text-sm">
                {studiotype}
              </p>
              <p className="bg-primary truncate rounded border border-slate-700 px-1 text-xs text-white  md:text-sm">
                {soundengineer ? 'Soundengineer' : ''}
              </p>
            </div>
          </div>
          <div className="mt-1 flex flex-1 items-center md:min-h-[60px]">
            <h4 className="line-clamp-2 sm:text-base md:text-lg">{listingTitle}</h4>
          </div>
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
            <div className="flex gap-1">
              <IoPeopleCircleSharp className="icon-bookmark" />
              <p className=" font-semibold">{maxGuests}</p>
            </div>
          </div>
          <div className="  flex w-full  items-end justify-between gap-1 text-right ">
            <p className="truncate rounded-xl border border-slate-700 bg-black px-[6px] text-xs text-white">
              {openingHours}
            </p>
            <p className="relative top-1 whitespace-nowrap text-lg font-semibold  sm:text-xl md:text-xl lg:text-2xl">
              {studioPricing.studioPricingHour ? (
                <>
                  {studioPricing.studioPricingHour}$ <span className="text-base sm:text-lg lg:text-xl">/Hour</span>
                </>
              ) : studioPricing.studioPricingDay ? (
                <>
                  {studioPricing.studioPricingDay}$ <span className="text-base sm:text-lg">/Day</span>
                </>
              ) : studioPricing.studioPricingWeek ? (
                <>
                  {studioPricing.studioPricingWeek}$ <span className="text-base sm:text-lg">/Week</span>
                </>
              ) : studioPricing.studioPricingMonth ? (
                <>
                  {studioPricing.studioPricingMonth}$ <span className="text-base sm:text-lg">/Month</span>
                </>
              ) : null}
            </p>
          </div>
        </div>
      </article>
    </div>
  );
}

export default ListingCard;
