//tools
import Image from 'next/image';
//icons
import { IoIosWifi } from 'react-icons/io';
import { RiParkingBoxLine } from 'react-icons/ri';
import { TbSmoking } from 'react-icons/tb';
import { MdBed, MdFastfood, MdLocationPin } from 'react-icons/md';
import { MyLink } from '../MyLink';

function ListingCardWideStudio({
  id,
  preview,
  logo,
  studioName,
  studiotype,
  studioLanguages,
  profileText,
  openingHours,
  locationFeatures,
  studioLocation,
  // user,
}) {
  const type = studiotype?.toLowerCase().replace(/ /g, '');
  const name = studioName?.toLowerCase().replace(/ /g, '-');
  return (
    <MyLink
      href={
        preview
          ? '#'
          : {
              pathname: '/studiotype/[type]/id/[name]/[id]',
              query: { type: `${type}`, name: `${name}`, id: `${id}` },
            }
      }>
      <article className="relative">
        <div className="flex w-full cursor-pointer items-center rounded-lg border-b bg-white p-2 first:border hover:opacity-80 hover:shadow-lg">
          {/* image */}
          <div className="relative flex h-20 w-24 shrink-0 items-center justify-center sm:h-24 sm:w-32 md:h-28 md:w-36">
            <div className="relative h-20 w-20  shrink-0 sm:h-24 sm:w-24 md:h-28 md:w-28">
              <Image src={logo} layout="fill" objectFit="cover" className="rounded-full" alt="Thumbnail" />
            </div>
          </div>
          {/* informations */}
          <div className="flex w-full flex-col justify-between pl-2 sm:pl-5">
            {/* user */}
            {/* <div
              title="user information"
              className="right-2 top-2 hidden flex-col items-end truncate text-xs text-gray-400 sm:absolute sm:flex ">
              <div className="relative h-8 w-8 shrink-0 md:h-10 md:w-10">
                <Image src={user.avatar} layout="fill" objectFit="cover" className="rounded-full" alt="Thumbnail" />
              </div>
              <p className="w-full truncate text-center text-xxs text-gray-400">{user.username}</p>
            </div> */}
            {/* firstline */}
            <section className="flex flex-col md:gap-2">
              {/* studiolocation */}
              <div className="relative flex items-center justify-between">
                <p className="flex gap-1 truncate text-xs text-gray-400">
                  <MdLocationPin className="h-[15px] w-[15px]" />
                  {studioLocation.fullAddress}
                </p>
              </div>
              {/* studiotype and openinghours*/}
              <div className="flex gap-2">
                <p className="bg-secondary border-secondary flex truncate rounded border px-1 text-xs text-white">
                  {studiotype}
                </p>
                <p
                  title="studio openinghours"
                  className={'bg-primary border-primary  truncate rounded border px-1 text-xs text-white'}>
                  {openingHours}
                </p>
              </div>
            </section>
            {/* middle */}
            <section className="flex w-full max-w-md flex-col justify-between">
              {/* StudioName */}
              <h3 title="studio name" className="pt-1 text-[16px] sm:text-xl lg:text-xl">
                {studioName}
              </h3>
              {/* languages and profiletext*/}
              <div className="flex flex-col justify-center">
                <p title="languages the studio speaks" className="pr-1 text-xs line-clamp-1">
                  {studioLanguages.join(' ° ')}
                </p>
                <p title="studio profiletext" className="max-w-sm break-words text-xs text-gray-400 line-clamp-2">
                  {profileText}
                </p>
              </div>
            </section>
            {/* icons */}
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
    </MyLink>
  );
}

export default ListingCardWideStudio;
