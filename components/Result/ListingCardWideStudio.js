//tools
import Image from 'next/image';
//icons
import { IoIosWifi } from 'react-icons/io';
import { RiParkingBoxLine } from 'react-icons/ri';
import { TbSmoking } from 'react-icons/tb';
import { MdBed, MdFastfood } from 'react-icons/md';
import Link from 'next/link';

function ListingCardWideStudio({
  id,
  path,
  preview,
  logo,
  studioName,
  profileText,
  studiotype,
  studioInformation,
  studioLanguages,
  openingHours,
  locationFeatures,
  studioLocation,
  user,
}) {
  const type = studiotype?.toLowerCase().replace(/ /g, '');
  const title = studioName?.toLowerCase().replace(/ /g, '-');
  return (
    <Link
      href={
        preview
          ? '#'
          : {
              pathname: '/studiotype/[path]/id/[type]/[title]/[id]',
              query: { path: `${path}`, type: `${type}`, title: `${title}`, id: `${id}` },
            }
      }>
      <article>
        <div className="flex w-full cursor-pointer items-center rounded-lg border-b py-7 px-2 first:border hover:opacity-80 hover:shadow-lg">
          <div className="flex h-24 w-32 shrink-0 justify-center sm:h-32 sm:w-48 md:h-36 md:w-56 lg:h-52 lg:w-80">
            <div className="relative h-24 w-24  shrink-0 sm:h-32 sm:w-32 md:h-36 md:w-36 lg:h-52 lg:w-52">
              <Image src={logo} layout="fill" objectFit="cover" className="rounded-full" alt="Thumbnail" />
            </div>
          </div>
          <div className="flex w-full flex-col justify-between pl-2 sm:pl-5">
            <div className="flex flex-col md:gap-2">
              {/* studiolocation */}
              <div className="flex items-center justify-between">
                <p className="truncate text-xs text-gray-400">{studioLocation}</p>
              </div>
              {/* studiotype */}
              <div className="flex gap-2">
                <p className="bg-secondary border-secondary flex truncate rounded border px-1  text-xs text-white sm:text-sm md:text-sm  ">
                  {studiotype}
                </p>
                <p
                  className={
                    'bg-primary truncate  rounded border border-slate-700 px-1  text-xs text-white sm:text-sm md:text-sm  '
                  }>
                  {openingHours}
                </p>
              </div>
            </div>
            {/* StudioName */}
            <h4 className="pt-1 text-[16px] sm:text-xl md:text-2xl">{studioName}</h4>
            <div className="flex   items-center  ">
              <p className=" pr-1 text-sm line-clamp-1 sm:text-sm md:text-sm lg:text-base xl:text-lg">
                {studioLanguages.join('  ')}
              </p>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex gap-2 pt-2">
                {locationFeatures.includes('Wi-Fi') ? <IoIosWifi className="icon" title="Wi-Fi" /> : null}
                {locationFeatures.includes('Sleepover') ? (
                  <MdBed className="icon" title="Sleepover" />
                ) : locationFeatures.includes('Snacks') ? (
                  <MdFastfood className="icon" title="Snacks" />
                ) : null}
                {locationFeatures.includes('Parking') ? <RiParkingBoxLine className="icon" title="Parking" /> : null}
                {locationFeatures.includes('Smoking') ? <TbSmoking className="icon" title="Smoking" /> : null}
              </div>
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
}

export default ListingCardWideStudio;
