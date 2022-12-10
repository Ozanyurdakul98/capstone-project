import { BackgroundOverlayFullscreen as ClickToCloseMax } from '../BackgroundOverlay';

export default function StudioInformation({ studio, setOpenModal }) {
  const handleClickToCloseInfoModal = () => {
    setOpenModal(false);
  };
  return (
    <>
      <div className="searchFadein fixed inset-0 z-50 m-auto h-96 max-w-md rounded-2xl bg-none text-black shadow-xxl lg:h-96">
        <div className="relative flex h-full flex-col gap-4 overflow-y-scroll rounded-2xl bg-white pt-5 text-sm">
          {/* heading */}
          <section className="mb-2 text-center text-black">
            <h2 className="h2 ml-5 text-black">{studio.studioName}</h2>
            <p>Check if this is the Studio you want to add a Studioservice to</p>
          </section>
          {/* maininfo */}
          <section className="mb-2 flex w-full flex-col gap-1 px-5 text-center font-normal ">
            <p>
              Studio id: <span className="font-semibold">{studio._id}</span>
            </p>
            <p>
              Published by: <span className="font-semibold">{studio.user.email}</span>
            </p>
            <div className="flex justify-center gap-2">
              <span className="text-xs">
                Created: <span className="font-semibold">{studio.createdAtDate}</span>
              </span>
              <span className="text-xs">
                Changed: <span className="font-semibold">{studio.updatedAtDate}</span>
              </span>
            </div>
          </section>
          {/* sideinfo */}
          <section className="pb-20 pl-5">
            {/* location */}
            <p className="flex gap-1">
              Location: <span className="font-semibold">{studio.studioLocation}</span>
            </p>
            {/* OpeningHours */}
            <p className="flex gap-1">
              Opening Hours: <span className="font-semibold">{studio.openingHours}</span>
            </p>
            {/* StudioType */}
            <p className="flex gap-1">
              Studio Type: <span className="font-semibold">{studio.studiotype}</span>
            </p>
            {/* StudioSocials */}
            <p className="flex gap-1 whitespace-nowrap">
              Studio Languages:
              <span className="whitespace-normal font-semibold">{studio.studioLanguages.join(', ')}</span>
            </p>
          </section>
        </div>
        <div>
          {/* buttons */}
          <section className="absolute  left-2 bottom-2 flex items-center justify-between gap-3 rounded-full bg-black text-white">
            <button
              className="duration-75 ease-in-out hover:scale-110"
              onClick={() => {
                setOpenModal(false);
              }}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="h-14 w-14">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </button>
          </section>
        </div>
      </div>
      <ClickToCloseMax style={'editModal  z-40 h-full'} onClick={(event) => handleClickToCloseInfoModal(event)} />
    </>
  );
}
