import { formatValue } from 'react-currency-input-field';
import { BackgroundOverlayFullscreen as ClickToCloseMax } from '../BackgroundOverlay';

export default function StudioServiceInformation({ studioService, setOpenView }) {
  const handleClickToCloseInfoModal = () => {
    setOpenView('');
  };
  return (
    <>
      <div className="searchFadein fixed inset-0 z-50 m-auto h-96 max-w-md rounded-2xl bg-none text-black shadow-xxl lg:h-96">
        <div className="relative flex h-full flex-col gap-4 overflow-y-scroll rounded-2xl bg-white pt-5 text-sm">
          {/* heading */}
          <section className="mb-2 text-center text-black">
            <h2 className="h2 ml-5 text-black">{studioService.studio.studioName}</h2>
            <p>Everything you need to know about your Studioservice</p>
          </section>
          {/* maininfo */}
          <section className="mb-2 flex w-full flex-col gap-1 px-5 text-center font-normal ">
            <p>
              Studioservice id: <span className="font-semibold">{studioService._id}</span>
            </p>
            <p>
              Published by: <span className="font-semibold">{studioService.user.email}</span>
            </p>
            <div className="flex justify-center gap-2">
              <span className="text-xs">
                Created: <span className="font-semibold">{studioService.createdAtDate}</span>
              </span>
              <span className="text-xs">
                Changed: <span className="font-semibold">{studioService.updatedAtDate}</span>
              </span>
            </div>
          </section>
          {/* sideinfo */}
          <section className="grid grid-flow-row grid-cols-fr2fr pb-20 pl-5">
            <p className="flex gap-1">Studio id:</p>
            <p className="font-semibold">{studioService.studio._id}</p>
            <p className="flex gap-1">Location:</p>
            <p className="font-semibold">{studioService.studio.studioLocation}</p>
            <p className="flex gap-1">Listingtitle:</p>
            <p className="font-semibold">{studioService.listingTitle}</p>
            <p className="flex gap-1">Max Guests:</p>
            <p className="font-semibold">{studioService.maxGuests}</p>
            <p className="flex gap-1">Pricing:</p>
            <div className="grid grid-flow-row grid-cols-4">
              <p className="font-semibold">Hourly</p>
              <p className="font-semibold">Daily</p>
              <p className="font-semibold">Weekly</p>
              <p className="font-semibold">Monthly</p>
              <div className=" col-span-4 border-b"></div>
              <p className="">
                {formatValue({
                  value: studioService.pricing.pricingHour,
                  intlConfig: {
                    locale: studioService.subInformations.locale,
                    currency: studioService.subInformations.currency,
                  },
                })}
              </p>
              <p className="">
                {formatValue({
                  value: studioService.pricing.pricingDay,
                  intlConfig: {
                    locale: studioService.subInformations.locale,
                    currency: studioService.subInformations.currency,
                  },
                })}
              </p>
              <p className="">
                {formatValue({
                  value: studioService.pricing.pricingWeek,
                  intlConfig: {
                    locale: studioService.subInformations.locale,
                    currency: studioService.subInformations.currency,
                  },
                })}
              </p>
              <p className="">
                {formatValue({
                  value: studioService.pricing.pricingMonth,
                  intlConfig: {
                    locale: studioService.subInformations.locale,
                    currency: studioService.subInformations.currency,
                  },
                })}
              </p>
            </div>
          </section>
        </div>
        <div>
          {/* buttons */}
          <section className="absolute  left-2 bottom-2 flex items-center justify-between gap-3 rounded-full bg-black text-white">
            <button
              className="duration-75 ease-in-out hover:scale-110"
              onClick={() => {
                setOpenView('');
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
      <ClickToCloseMax style={'editModal backdrop-blur-sm z-40 h-full'} onClick={() => handleClickToCloseInfoModal()} />
    </>
  );
}
