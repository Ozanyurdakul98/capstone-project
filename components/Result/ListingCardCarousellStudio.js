//tools
import Image from 'next/image';
//icons
import { IoIosWifi } from 'react-icons/io';
import { RiParkingBoxLine } from 'react-icons/ri';
import { TbSmoking } from 'react-icons/tb';
import { MdBed, MdFastfood } from 'react-icons/md';
import Link from 'next/link';

function ListingCard({ preview, id, logo, studioName, studiotype, openingHours, locationFeatures, studioLocation }) {
  const studiotypeSanitized = studiotype?.toLowerCase().replace(/ /g, '');
  const studioNameSanitized = studioName?.toLowerCase().replace(/ /g, '');
  console.log('location', studioLocation);
  return (
    <Link href={preview ? '#' : `/studiotype/${studiotypeSanitized}/id/${studioNameSanitized}/${id}`}>
      <div className="mx-1">
        <article className="relative mx-auto mb-10   flex min-h-[333px] w-full max-w-[250px] cursor-pointer flex-col items-center rounded-lg bg-white shadow-xl hover:opacity-90 hover:shadow-lg">
          <div className="relative h-40 w-40 shrink-0">
            <Image src={logo} layout="fill" objectFit="cover" className="rounded-full" alt="Thumbnail" />
          </div>
          <div className="mb-3 flex w-full grow flex-col justify-between px-1 sm:px-2">
            <div className="flex flex-col gap-[6px] md:gap-2">
              <div className="flex items-center justify-between pt-1">
                <p className="truncate text-xs text-gray-400">
                  {studioLocation.city + ' ' + studioLocation.postalcode + ', ' + studioLocation.country}
                </p>
              </div>
              <div className="-mt-1 flex min-w-0 grow gap-2">
                <p className="truncate rounded border border-slate-700 bg-black px-1 text-xs text-white  md:text-sm">
                  {studiotype}
                </p>
              </div>
            </div>
            <div className="mt-1 flex flex-1 items-center md:min-h-[60px]">
              <h4 className="text-black line-clamp-2 sm:text-base md:text-lg">{studioName}</h4>
            </div>
            <div className="flex items-center justify-between pb-2">
              <ul className="flex gap-2">
                {locationFeatures.includes('Wi-Fi') ? (
                  <li>
                    <IoIosWifi className="icon-carousell" title="Wi-Fi" />
                  </li>
                ) : null}
                {locationFeatures.includes('Sleepover') ? (
                  <li>
                    <MdBed className="icon-carousell" title="Sleepover" />
                  </li>
                ) : locationFeatures.includes('Snacks') ? (
                  <li>
                    <MdFastfood className="icon-carousell" title="Snacks" />
                  </li>
                ) : null}
                {locationFeatures.includes('Parking') ? (
                  <li>
                    <RiParkingBoxLine className="icon-carousell" title="Parking" />
                  </li>
                ) : null}
                {locationFeatures.includes('Smoking') ? (
                  <li>
                    <TbSmoking className="icon-carousell" title="Smoking" />
                  </li>
                ) : null}
              </ul>
            </div>
            <div title="Opening hours" className="flex w-full  items-end justify-between gap-1 text-right ">
              <p className="truncate rounded-xl border border-slate-700 bg-black px-[6px] text-xs text-white">
                {openingHours}
              </p>
            </div>
          </div>
        </article>
      </div>
    </Link>
  );
}

export default ListingCard;
