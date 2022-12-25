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
          <div className="flex h-20 w-24 shrink-0 items-center sm:h-24 sm:w-32 md:h-28 md:w-36 lg:h-44 lg:w-52">
            <div className="relative h-20 w-24 shrink-0 sm:h-24 sm:w-32 md:h-28 md:w-36 lg:h-36 lg:w-52">
              <Image src={images.primary} layout="fill" objectFit="cover" className="rounded-xl" alt="Thumbnail" />
            </div>
          </div>
          {/* informations */}
          <div className="flex w-full flex-col justify-between pl-2 sm:pl-5">
            <div className="flex flex-col">
              {/* studiolocation */}
              <div className="relative mb-1 flex items-center justify-between">
                <p className="flex gap-1 truncate text-xs text-gray-400 sm:mt-2">
                  <MdLocationPin className="h-[15px] w-[15px]" />
                  {studio.studioLocation.fullAddress}
                </p>
                {/* user */}
                <div className="right-0 top-0 hidden flex-col items-end truncate text-xs text-gray-400 sm:absolute sm:-top-1 sm:flex lg:-top-3">
                  <div className="relative h-8 w-8 shrink-0 md:h-9 md:w-9 lg:h-11 lg:w-11">
                    <Image src={user.avatar} layout="fill" objectFit="cover" className="rounded-full" alt="Thumbnail" />
                  </div>
                  <p className="w-full truncate text-center text-xxs text-gray-400 lg:text-[0.65rem]">
                    {user.username}
                  </p>
                </div>
              </div>
              {/* studiotype */}
              <div className="flex gap-2">
                <p className="bg-secondary border-secondary flex truncate rounded border px-1 text-xs text-white">
                  {studio.studiotype}
                </p>
                <p
                  title="soundengineer pricing"
                  className={'bg-primary truncate  rounded border border-slate-700 px-1 text-xs text-white'}>
                  {soundengineer}
                </p>
              </div>
            </div>
            {/* title */}
            <h4 className="pt-1 text-[16px] line-clamp-1 sm:text-[1.1rem] lg:text-[1.3rem]">{listingTitle}</h4>
            {/* languages */}
            <div className="flex flex-col justify-center">
              <p className=" pr-1 text-xs font-semibold line-clamp-1 lg:text-sm">{service.name}</p>
              <p className=" pr-1 text-xs line-clamp-1 lg:text-sm">{studio.studioLanguages.join('  ')}</p>
            </div>
            {/* features */}
            <div className="flex items-center justify-between">
              <div className="flex gap-[0.4rem] pt-2 md:gap-0">
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
              </div>
              <div className="flex w-full items-center justify-start pt-2 pl-2">
                <p
                  title="opening hours"
                  className="bg-secondary border-secondary rounded-xl border px-[6px] text-xs text-white">
                  {studio.openingHours}
                </p>
              </div>
              <div className="flex items-end text-right ">
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
