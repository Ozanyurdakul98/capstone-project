//tools
import Image from 'next/image';
//icons
import { IoIosWifi } from 'react-icons/io';
import { RiParkingBoxLine } from 'react-icons/ri';
import { TbSmoking } from 'react-icons/tb';
import { MdBed } from 'react-icons/md';
import Link from 'next/link';

function ListingCard({
  id,
  path,
  listingTitle,
  images,
  studiotype,
  studioService,
  soundengineer,
  studioPricing,
  locationFeatures,
  studioLocation,
}) {
  const type = studiotype?.toLowerCase().replace(/ /g, '');
  const title = listingTitle?.toLowerCase().replace(/ /g, '-');
  return (
    <article>
      <Link
        href={{
          pathname: '/studioservice/[path]/id/[type]/[title]/[id]',
          query: { path: `${path}`, type: `${type}`, title: `${title}`, id: `${id}` },
        }}>
        <div className="flex w-full cursor-pointer rounded-lg border-b py-7 px-2 first:border hover:opacity-80 hover:shadow-lg">
          <div className="relative h-24 w-32  shrink-0 sm:h-32 sm:w-48 md:h-36 md:w-56 lg:h-52 lg:w-80">
            <Image src={images} layout="fill" objectFit="cover" className="rounded-xl" alt="Thumbnail" />
          </div>
          <div className="flex w-full flex-col justify-between pl-2 sm:pl-5">
            <div className="flex flex-col md:gap-2">
              <div className="flex items-center justify-between">
                <p className="truncate text-xs text-gray-400">{studioLocation}</p>
              </div>
              <div className="flex gap-2">
                <p className="bg-primary flex truncate rounded border border-slate-700 px-1  text-xs text-white sm:text-sm md:text-sm  ">
                  {studiotype}
                </p>
                <p
                  className={
                    soundengineer && soundengineer !== 'No Soundengineer'
                      ? 'bg-primary truncate  rounded border border-slate-700 px-1  text-xs text-white sm:text-sm md:text-sm  '
                      : ' truncate rounded border border-red-600 bg-red-600 px-1  text-xs text-white sm:text-sm md:text-sm  '
                  }>
                  {soundengineer && soundengineer !== 'No Soundengineer' ? (
                    <>
                      Engineer
                      {soundengineer.soundengineerPrice
                        ? ' ' + soundengineer.soundengineerPrice + '€'
                        : ' ' + soundengineer}
                    </>
                  ) : (
                    soundengineer
                  )}
                </p>
              </div>
            </div>
            <h4 className="text-sm sm:text-xl md:text-2xl">{listingTitle}</h4>
            <div className="flex   items-center  ">
              <p className=" pr-1 text-sm line-clamp-1 sm:text-sm md:text-sm lg:text-base xl:text-lg">
                {studioService.map((service) => service + ' | ')}
              </p>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex gap-2">
                {locationFeatures.wifi ? <IoIosWifi className="icon" /> : null}
                {locationFeatures.parking ? <RiParkingBoxLine className="icon" /> : null}
                {locationFeatures.smoking ? <TbSmoking className="icon" /> : null}
                {locationFeatures.sleepover ? <MdBed className="icon" /> : null}
              </div>
              <p className="text-sm font-semibold sm:text-base md:text-lg lg:text-2xl">
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
      </Link>
    </article>
  );
}

export default ListingCard;
