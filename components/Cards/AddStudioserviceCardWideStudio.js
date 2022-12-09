//tools
import Image from 'next/image';
//icons
import { IoIosWifi } from 'react-icons/io';
import { RiParkingBoxLine } from 'react-icons/ri';
import { TbSmoking } from 'react-icons/tb';
import { MdBed, MdFastfood } from 'react-icons/md';

function AddStudioserviceCardWideStudio(props) {
  const {
    selectingStudio,
    selectedStudio,
    logo,
    studioName,
    id,
    studiotype,
    openingHours,
    locationFeatures,
    studioLocation,
  } = props;
  return (
    <button className="block w-full" onClick={() => selectingStudio(props)}>
      <article>
        <div
          className={`${
            selectedStudio === id ? 'bg-secondary text-white' : null
          } flex w-full cursor-pointer items-center rounded-lg p-2 shadow-lg hover:opacity-80`}>
          <div className="flex h-24 w-28 shrink-0 items-center justify-center sm:h-32 sm:w-44 md:h-36 md:w-52">
            <div className="relative h-20 w-20  shrink-0 sm:h-28 sm:w-28 md:h-32 md:w-32  ">
              <Image src={logo} layout="fill" objectFit="cover" className="rounded-full" alt="Thumbnail" />
            </div>
          </div>
          <div className="flex w-full flex-col justify-between pl-2 sm:pl-5">
            <div className="flex flex-col md:gap-2">
              {/* studiolocation */}
              <div className="flex items-center justify-between">
                <p className={`${selectedStudio === id ? 'text-white' : 'text-gray-400'}truncate text-xs `}>
                  {studioLocation}
                </p>
              </div>
              {/* studiotype */}
              <div className="flex gap-2">
                <p
                  className={`${
                    selectedStudio === id
                      ? 'text-primary border-white bg-white'
                      : 'border-secondary bg-secondary text-white'
                  }  flex truncate rounded border px-1 text-xs sm:text-sm md:text-sm`}>
                  {studiotype}
                </p>
                <p
                  className={`${
                    selectedStudio === id
                      ? 'text-primary border-white  bg-white'
                      : 'bg-primary border-slate-700 text-white'
                  } truncate rounded border px-1 text-xs sm:text-sm md:text-sm`}>
                  {openingHours}
                </p>
              </div>
            </div>
            {/* StudioName */}
            <h4 className="pt-1 text-start text-[16px] sm:text-xl md:text-2xl">{studioName}</h4>
            <div className="flex items-center justify-between">
              <div className="flex gap-2 pt-2 text-white">
                {locationFeatures.includes('Wi-Fi') ? (
                  <IoIosWifi className={`${selectedStudio === id ? 'text-white' : null} icon`} title="Wi-Fi" />
                ) : null}
                {locationFeatures.includes('Sleepover') ? (
                  <MdBed className={`${selectedStudio === id ? 'text-white' : null} icon`} title="Sleepover" />
                ) : locationFeatures.includes('Snacks') ? (
                  <MdFastfood className={`${selectedStudio === id ? 'text-white' : null} icon`} title="Snacks" />
                ) : null}
                {locationFeatures.includes('Parking') ? (
                  <RiParkingBoxLine className={`${selectedStudio === id ? 'text-white' : null} icon`} title="Parking" />
                ) : null}
                {locationFeatures.includes('Smoking') ? (
                  <TbSmoking className={`${selectedStudio === id ? 'text-white' : null} icon`} title="Smoking" />
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </article>
    </button>
  );
}

export default AddStudioserviceCardWideStudio;
