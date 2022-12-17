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
              pathname: '/studiotype/[type]/id/[title]/[id]',
              query: { type: `${type}`, title: `${title}`, id: `${id}` },
            }
      }>
      <article>
        <div className="flex w-full cursor-pointer items-center rounded-lg border-b bg-white p-2 first:border hover:opacity-80 hover:shadow-lg">
          {/* image */}
          <div className="flex h-24 w-32 shrink-0 justify-center sm:h-32 sm:w-48 md:h-36 md:w-56 lg:h-52 lg:w-80">
            <div className="relative h-24 w-24  shrink-0 sm:h-32 sm:w-32 md:h-36 md:w-36 lg:h-52 lg:w-52">
              <Image src={logo} layout="fill" objectFit="cover" className="rounded-full" alt="Thumbnail" />
            </div>
          </div>
          {/* informations */}
          <div className="flex w-full flex-col justify-between pl-2 sm:pl-5">
            <div className="flex flex-col md:gap-2">
              {/* studiolocation */}
              <div className="relative flex items-center justify-between">
                <p className="truncate text-xs text-gray-400">{studioLocation}</p>
                {/* user */}
                <div className="right-0 -top-2 hidden flex-col items-end truncate text-xs text-gray-400 sm:absolute sm:flex lg:-top-7">
                  <div className="relative h-8 w-8 shrink-0 md:h-10 md:w-10 lg:h-12 lg:w-12">
                    <Image src={user.avatar} layout="fill" objectFit="cover" className="rounded-full" alt="Thumbnail" />
                  </div>
                  <p className="truncate text-xs text-gray-400">{'uiwnd3uawndiuwadi98!'}</p>
                </div>
              </div>
              {/* studiotype */}
              <div className="flex gap-2">
                <p className="bg-secondary border-secondary flex truncate rounded border px-1  text-xs text-white sm:text-sm md:text-sm  ">
                  {studiotype}
                </p>
                <p
                  className={
                    'bg-primary truncate  rounded border border-slate-700 px-1 text-xs text-white sm:text-sm md:text-sm  '
                  }>
                  {openingHours}
                </p>
              </div>
            </div>
            {/* StudioName */}
            <h4 className="pt-1 text-[16px] sm:text-xl lg:text-2xl">{studioName}</h4>
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
