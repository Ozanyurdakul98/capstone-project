//tools
import Image from 'next/image';
//icons
import { IoIosWifi } from 'react-icons/io';
import { RiParkingBoxLine } from 'react-icons/ri';
import { TbSmoking } from 'react-icons/tb';
import { MdBed, MdFastfood, MdLocationPin } from 'react-icons/md';
import { MyLink } from '../MyLink';

function ListingCardWideStudioService({
  id,
  preview,
  listingTitle,
  service,
  images,
  soundengineer,
  pricing,
  studio,
  user,
}) {
  const title = listingTitle.toLowerCase().replace(/ /g, '-');
  return (
    <MyLink href={preview ? '#' : `/studioservice/${service.queryString}/id/${title}/${id}`}>
      <article>
        <div className="flex w-full cursor-pointer items-center rounded-lg border-b bg-white p-2 first:border hover:opacity-80 hover:shadow-lg">
          {/* image */}
          <div className="relative h-20 w-24  shrink-0 sm:h-24 sm:w-32 md:h-28 md:w-36 lg:h-44 lg:w-52">
            <div className="relative h-20 w-24  shrink-0 sm:h-24 sm:w-32 md:h-28 md:w-36 lg:h-44 lg:w-52">
              <Image src={images.primary} layout="fill" objectFit="cover" className="rounded-xl" alt="Thumbnail" />
            </div>
          </div>
          {/* informations */}
          <div className="flex w-full flex-col justify-between pl-2 sm:pl-5">
            <div className="flex flex-col">
              {/* studiolocation */}
              <div className="relative mb-1 flex items-center justify-between">
                <p className="flex gap-1 truncate text-xs text-gray-400">
                  <MdLocationPin className="h-[15px] w-[15px]" />
                  {studio.studioLocation}
                </p>
                {/* user */}
                <div className="right-0 top-0 hidden flex-col items-end truncate text-xs text-gray-400 sm:absolute sm:flex lg:-top-4">
                  <div className="relative h-8 w-8 shrink-0 md:h-10 md:w-10 lg:h-12 lg:w-12">
                    <Image src={user.avatar} layout="fill" objectFit="cover" className="rounded-full" alt="Thumbnail" />
                  </div>
                  <p className="w-full truncate text-center text-xs text-gray-400">{user.username}</p>
                </div>
              </div>
              {/* studiotype */}
              <div className="flex gap-2">
                <p className="bg-secondary border-secondary flex truncate rounded border px-1 text-xs text-white md:text-sm  ">
                  {studio.studiotype}
                </p>
                <p
                  title="soundengineer pricing"
                  className={'bg-primary truncate  rounded border border-slate-700 px-1 text-xs text-white md:text-sm'}>
                  {soundengineer}
                </p>
              </div>
            </div>
            {/* title */}
            <h4 className="pt-1 text-[16px] line-clamp-1 sm:text-xl lg:text-2xl">{listingTitle}</h4>
            {/* languages */}
            <div className="flex flex-col justify-center">
              <p className=" pr-1 text-xs font-semibold line-clamp-1 lg:text-sm">{service.name}</p>
              <p className=" pr-1 text-xs line-clamp-1 lg:text-sm">{studio.studioLanguages.join('  ')}</p>
            </div>
            {/* features */}
            <div className="flex items-center justify-between">
              <div className="flex gap-2 pt-2">
                {studio.locationFeatures.includes('Wi-Fi') ? <IoIosWifi className="icon" title="Wi-Fi" /> : null}
                {studio.locationFeatures.includes('Sleepover') ? (
                  <MdBed className="icon" title="Sleepover" />
                ) : studio.locationFeatures.includes('Snacks') ? (
                  <MdFastfood className="icon" title="Snacks" />
                ) : null}
                {studio.locationFeatures.includes('Parking') ? (
                  <RiParkingBoxLine className="icon" title="Parking" />
                ) : null}
                {studio.locationFeatures.includes('Smoking') ? <TbSmoking className="icon" title="Smoking" /> : null}
                <p
                  title="opening hours"
                  className="bg-secondary border-secondary truncate rounded-xl border px-[6px] text-xs text-white">
                  {studio.openingHours}
                </p>
              </div>
              <div className="flex items-end justify-between gap-2 text-right ">
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
          </div>
        </div>
      </article>
    </MyLink>
  );
}
export default ListingCardWideStudioService;
