//db
import db from '../../../../../lib/dbConnect';
import StudioListing from '../../../../../models/StudioListing';
import StudioService from '../../../../../models/StudioService';
//components
import StudiosDetailpage from '../../../../../components/Layout/StudiosDetailpage';
import ListingCardCarousellStudioService from '../../../../../components/Result/ListingCardCarousellStudioService';
import moment from 'moment';
import Image from 'next/image';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { MyLink } from '../../../../../components/MyLink';
import { MdLocationPin } from 'react-icons/md';
import { DetailpageMap } from '../../../../../components/Mapbox/DetailpageMap';

function StudioDetailpage({
  serializedStudio,
  studioServicesCount,
  studioServicesByUserCount,
  studioListingsCount,
  serializedStudioservices,
}) {
  // eslint-disable-next-line no-unused-vars
  const router = useRouter();
  const studio = serializedStudio;
  return (
    <div className="relative">
      <Head>
        <title>Detailpage</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* HeaderImage */}
      <section className="relative h-[450px] w-screen sm:h-[450px] md:h-[450px] lg:h-[450px] xl:h-[600px] ">
        <Image
          src={studio.logo}
          layout="fill"
          objectFit="cover"
          objectPosition={'center'}
          className=""
          alt="Studio image"
        />
      </section>
      {/* Main*/}
      <section className="container relative bottom-52 mx-auto px-[15px] lg:gap-5">
        {/* WelcomeSection */}
        <section className="mb-4 justify-center rounded-md bg-white pt-16 text-black shadow-lg md:flex">
          {/* Headersection */}
          <section className="flex flex-col gap-2 px-7 text-xs">
            <div className="flex flex-wrap justify-center">
              {/* ProfilePic */}
              <div className="absolute top-1 -m-16 -ml-20 h-[150px] w-[150px] rounded-full border-none align-middle shadow-xl">
                <Image
                  src={studio.logo}
                  alt="profile picture"
                  className="rounded-full "
                  layout="fill"
                  objectFit="cover"
                />
              </div>
              {/* HeaderSection */}
              <div className="mt-10 w-full text-center">
                {/* headerh1 and h3 */}
                <div className="flex w-full flex-col items-center px-10">
                  <div className="max-w-max">
                    <h3 className="flex items-center justify-start gap-1 truncate text-gray-500">
                      <MdLocationPin className="h-[15px] w-[15px] text-black" />
                      {studio.studioLocation.fullAddress}
                    </h3>
                    <h1 className="h1LandingP">{studio.studioName}</h1>
                  </div>
                </div>
                {/* CounterSection */}
                <div className="flex justify-center pb-0 md:pt-2 lg:pt-4">
                  <div className="p-3 text-center">
                    <span className="block text-xl font-bold uppercase tracking-wide text-slate-700">
                      {studioServicesCount ? studioServicesCount : '0'}
                    </span>
                    <span className="text-sm text-slate-400">Services</span>
                  </div>
                </div>
              </div>
            </div>
          </section>
          {/* Profiledescription */}
          <section className="mx-auto mb-5 flex max-w-lg flex-col justify-center overflow-x-hidden px-7  pb-5 text-sm text-gray-600 md:mx-0 md:pb-0">
            <h2 className="h2LandingP">About this Studio</h2>
            <p className="break-words">{studio.profileText}</p>
          </section>
        </section>
        {/* StudioservicesSection */}
        <section className="min-h-[350px] px-7">
          <h2 className="h2LandingP">Our Studio services</h2>
          <section className="flex ">
            {serializedStudioservices.map(
              ({ _id, listingTitle, description, service, maxGuests, images, soundengineer, pricing }) => (
                <ListingCardCarousellStudioService
                  key={_id}
                  id={_id}
                  listingTitle={listingTitle}
                  images={images}
                  service={service}
                  studiotype={studio.studiotype}
                  maxGuests={maxGuests}
                  description={description}
                  soundengineer={soundengineer}
                  pricing={pricing}
                  locationFeatures={studio.locationFeatures}
                  studio={studio}
                />
              )
            )}
          </section>
        </section>
        {/* DetailsSection */}
        <section className="rounded-md bg-white py-16 text-black shadow-lg">
          {/* Details */}
          <section className="mb-14 px-7 text-xs text-gray-600 md:text-sm">
            <ul className="grid grid-cols-smbg grid-rows-6 gap-2 sm:grid-cols-smbgbg sm:grid-rows-4">
              <li className="h2LandingP col-start-1 row-span-2 text-sm font-bold lg:text-base">Details</li>
              <li className="col-start-2 row-start-1 flex items-center">
                <svg
                  className="mr-1 h-4 w-4"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg">
                  <path
                    fillRule="evenodd"
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    clipRule="evenodd"></path>
                </svg>
                ID: <span className=" pl-1 font-semibold">{studio._id}</span>
              </li>
              <li className="col-start-2 row-start-2 flex items-center">
                <svg
                  className="mr-1 h-4 w-4"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg">
                  <path
                    fillRule="evenodd"
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    clipRule="evenodd"></path>
                </svg>
                Beds:
                <span className="pl-1 font-semibold">
                  {studio.sleepOver ? studio.sleepOver.bedsCount : 'No Sleepover'}
                </span>
              </li>
              <li className="col-start-2 row-start-3 flex items-center">
                <svg
                  className="mr-1 h-4 w-4"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg">
                  <path
                    fillRule="evenodd"
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    clipRule="evenodd"></path>
                </svg>
                Max Sleepover Guests:
                <span className="pl-1 font-semibold">
                  {studio.sleepOver ? studio.sleepOver.maxPeople : 'No Sleepover'}
                </span>
              </li>
              <li className="col-start-2 row-start-5 flex items-center sm:col-start-3 sm:row-start-1">
                <svg
                  className="mr-1 h-4 w-4"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg">
                  <path
                    fillRule="evenodd"
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    clipRule="evenodd"></path>
                </svg>
                Studio size:
                <span className="pl-1 font-semibold">
                  {studio.studioInformation.studioSize ? studio.studioInformation.studioSize : '/'}
                </span>
              </li>
              <li className="col-start-2 row-start-6 flex items-center sm:col-start-3 sm:row-start-2">
                <svg
                  className="mr-1 h-4 w-4"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg">
                  <path
                    fillRule="evenodd"
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    clipRule="evenodd"></path>
                </svg>
                Studio Rooms:
                <span className="pl-1 font-semibold">
                  {studio.studioInformation.studioRooms ? studio.studioInformation.studioRooms : '/'}
                </span>
              </li>
              <li className="col-start-2 row-start-7 flex items-center sm:col-start-3 sm:row-start-3">
                <svg
                  className="mr-1 h-4 w-4"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg">
                  <path
                    fillRule="evenodd"
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    clipRule="evenodd"></path>
                </svg>
                Studio type: <span className="pl-1 font-semibold">{studio.studiotype}</span>
              </li>
            </ul>
          </section>
          {/* Studiofeatures */}
          <section className="mb-14 px-7 text-xs text-gray-600 md:text-sm">
            <ul className="grid grid-cols-smbg gap-2 sm:grid-cols-smbgbg ">
              <li className="h2LandingP col-start-1 row-span-2 text-sm font-bold lg:text-base">Studio Features</li>
              <ul className="grid grid-cols-2 gap-2">
                {studio.locationFeatures.map((feature) => (
                  <li key={feature} className="col-auto flex items-center">
                    <svg
                      className="mr-1 h-4 w-4"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg">
                      <path
                        fillRule="evenodd"
                        d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                        clipRule="evenodd"></path>
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
            </ul>
          </section>
          {/* StudioLocation */}
          <section className="mb-14 border-b px-7 pb-14 text-xs text-gray-600 lg:text-sm">
            <div className="container h-96 w-full">
              <DetailpageMap
                mapFor={'studios'}
                results={studio}
                style={{ width: '100%', height: '100%', borderRadius: '10px' }}
              />
            </div>
            <div className="flex gap-3">
              <p className="font-semibold ">{studio.studioLocation.fullAddress}</p>
              <MyLink
                className="text-blue-500 underline"
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                  studio.studioLocation.fullAddress
                )}`}>
                Open maps
              </MyLink>
            </div>
          </section>
          {/* StudioRules */}
          <section className="mb-7 px-7 text-xs text-gray-600 lg:text-sm">
            <ul className="grid grid-cols-smbg gap-2 sm:grid-cols-smbgbg">
              <li className="h2LandingP col-start-1 row-span-2 text-sm font-bold lg:text-base">Studio Rules</li>
              <ul className="grid max-w-md list-inside gap-2 space-y-1 dark:text-gray-400 sm:col-span-2">
                {/* smoking */}
                <li className="flex items-center justify-between">
                  <span className="flex">
                    {studio.studioRules.includes('Smoking') ? (
                      <svg
                        className="mr-1.5 h-5 w-5 shrink-0 text-green-500 dark:text-green-400"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg">
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"></path>
                      </svg>
                    ) : (
                      <svg
                        className="mr-1.5 h-5 w-5 shrink-0 text-red-400"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg">
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                          clipRule="evenodd"></path>
                      </svg>
                    )}
                    Smoking allowed:
                  </span>
                  <span className="font-semibold">{studio.studioRules.includes('Smoking') ? 'Yes' : 'No'}</span>
                </li>
                {/* pets */}
                <li className="flex items-center justify-between">
                  <span className="flex">
                    {studio.studioRules.includes('Pets') ? (
                      <svg
                        className="mr-1.5 h-5 w-5 shrink-0 text-green-500 dark:text-green-400"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg">
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"></path>
                      </svg>
                    ) : (
                      <svg
                        className="mr-1.5 h-5 w-5 shrink-0 text-red-400"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg">
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                          clipRule="evenodd"></path>
                      </svg>
                    )}
                    Pets allowed:
                  </span>
                  <span className="font-semibold">{studio.studioRules.includes('Pets') ? 'Yes' : 'No'}</span>
                </li>
                {/* kids */}
                <li className="flex items-center justify-between">
                  <span className="flex">
                    {studio.studioRules.includes('Kids') ? (
                      <svg
                        className="mr-1.5 h-5 w-5 shrink-0 text-green-500 dark:text-green-400"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg">
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"></path>
                      </svg>
                    ) : (
                      <svg
                        className="mr-1.5 h-5 w-5 shrink-0 text-red-400"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg">
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                          clipRule="evenodd"></path>
                      </svg>
                    )}
                    Kids allowed:
                  </span>
                  <span className="font-semibold">{studio.studioRules.includes('Kids') ? 'Yes' : 'No'}</span>
                </li>
                <li className="flex items-center justify-between">
                  <span className="flex">
                    {studio.studioRules.includes('Eating') ? (
                      <svg
                        className="mr-1.5 h-5 w-5 shrink-0 text-green-500 dark:text-green-400"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg">
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"></path>
                      </svg>
                    ) : (
                      <svg
                        className="mr-1.5 h-5 w-5 shrink-0 text-red-400"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg">
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                          clipRule="evenodd"></path>
                      </svg>
                    )}
                    Eating allowed:
                  </span>
                  <span className="font-semibold">{studio.studioRules.includes('Eating') ? 'Yes' : 'No'}</span>
                </li>
                <li className="mb-5 flex items-center justify-between">
                  <span className="flex">
                    {studio.studioRules.includes('Party') ? (
                      <svg
                        className="mr-1.5 h-5 w-5 shrink-0 text-green-500 dark:text-green-400"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg">
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"></path>
                      </svg>
                    ) : (
                      <svg
                        className="mr-1.5 h-5 w-5 shrink-0 text-red-400"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg">
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                          clipRule="evenodd"></path>
                      </svg>
                    )}
                    Party allowed:
                  </span>
                  <span className="font-semibold">{studio.studioRules.includes('Party') ? 'Yes' : 'No'}</span>
                </li>
                {/* Additional StudioRules */}
                {studio.additionalStudioRules ? (
                  <li>
                    <section className="px-2 text-xs text-gray-600 lg:text-sm">
                      <h4 className="font-semibold text-black">Additional Rules</h4>
                      <p className="">{studio.additionalStudioRules}</p>
                    </section>
                  </li>
                ) : null}
              </ul>
            </ul>
          </section>
        </section>
      </section>
      {/* StudioOwner Card */}
      <section className="container relative bottom-44 mx-auto mt-28 mb-10 px-[30px] lg:mt-20">
        <div className="relative mx-auto my-6 mt-16 w-full min-w-0 break-words rounded-xl bg-white shadow-lg ">
          <div className="px-6">
            {/* top */}
            <div className="flex flex-wrap justify-center">
              {/* ProfilePic */}
              <div className="flex w-full justify-center">
                <div className="relative">
                  <div className="absolute -m-16 -ml-20 h-[150px] w-[150px] rounded-full border-none align-middle shadow-xl">
                    <Image
                      src={studio.user.avatar}
                      alt="profile picture"
                      className="rounded-full "
                      layout="fill"
                      objectFit="cover"
                    />
                  </div>
                </div>
              </div>
              {/* CounterSection */}
              <div className="mt-20 w-full text-center">
                <div className="flex justify-center pt-8 pb-0 lg:pt-4">
                  <div className="p-3 text-center">
                    <span className="block text-xl font-bold uppercase tracking-wide text-slate-700">
                      {studioListingsCount}
                    </span>
                    <span className="text-sm text-slate-400">Studios</span>
                  </div>
                  {/* <div className="p-3 text-center">
                    <span className="block text-xl font-bold uppercase tracking-wide text-slate-700">2,454</span>
                    <span className="text-sm text-slate-400">Followers</span>
                  </div> */}
                  <div className="p-3 text-center">
                    <span className="block text-xl font-bold uppercase tracking-wide text-slate-700">
                      {studioServicesByUserCount}
                    </span>
                    <span className="text-sm text-slate-400">Services</span>
                  </div>
                </div>
              </div>
            </div>
            {/* middle */}
            <div className="mt-2 text-center">
              <h3 className="mb-4 text-2xl font-bold leading-normal text-slate-700">{studio.user.username}</h3>
            </div>
            {/* buttons */}
            <div className="mt-3 flex gap-3 text-slate-400">
              <MyLink
                href={`mailto:${encodeURIComponent(studio.user.email)}?subject=${encodeURIComponent(
                  'Request for ' + studio.studioName
                )}&body=${encodeURIComponent('Hello, I am interested in in your Studio ' + studio.studioName + '.')}`}
                className="w-full rounded-md border py-2 text-center hover:bg-gray-200/70 hover:text-gray-400/70">
                Contact User
              </MyLink>
              <MyLink
                href={`/#`}
                className="w-full rounded-md border py-2 text-center hover:bg-gray-200/70 hover:text-gray-400/70">
                View Profile
              </MyLink>
            </div>
            {/* bottom */}
            <div className="mt-3 border-t border-slate-200 py-6 text-center">
              <div className="flex flex-wrap justify-center">
                <div className="w-full px-4">
                  <p className="mb-4 font-light leading-relaxed text-slate-600">
                    An artist of considerable range, Mike is the name taken by Melbourne-raised, Brooklyn-based Nick
                    Murphy writes, performs and records all of his own music, giving it a warm...
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default StudioDetailpage;

StudioDetailpage.getLayout = function getLayout(page) {
  return <StudiosDetailpage>{page}</StudiosDetailpage>;
};

export async function getServerSideProps(context) {
  await db.connect();
  const id = context.query.id[1];

  const fetchStudio = await StudioListing.findById(id).populate({
    path: 'user',
    model: 'users',
    select: 'avatar email name lastname username',
  });
  const serializeStudio = [JSON.parse(JSON.stringify(fetchStudio))];
  const serializedStudio = serializeStudio.map((studio) => ({
    ...studio,
    createdAt: moment(studio.createdAt).format('DD/MM/yyyy'),
    createdAtTime: moment(studio.createdAt).format('kk:mm'),
    updatedAt: moment(studio.updatedAt).format('DD/MM/yyyy'),
    updatedAtTime: moment(studio.updatedAt).format('kk:mm'),
  }))[0];
  console.log('AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA', serializedStudio);
  const userId = serializedStudio?.user._id;
  const studioServicesByStudioCount = await StudioService.find({ studio: id }).count();
  const studioServicesByUserCount = await StudioService.find({ user: userId }).count();
  const studioListingsCount = await StudioListing.find({ user: userId }).count();

  const fetchStudioservices = await StudioService.find({ studio: id })
    .populate({
      path: 'user',
      model: 'users',
      select: 'avatar email name lastname username',
    })
    .populate({
      path: 'service',
      model: 'AdminStudioService',
      select: 'name queryString -_id',
    });
  const serializeStudioservices = JSON.parse(JSON.stringify(fetchStudioservices));
  return {
    props: {
      serializedStudio: serializedStudio,
      serializedStudioservices: serializeStudioservices || null,
      studioServicesCount: studioServicesByStudioCount || null,
      studioServicesByUserCount: studioServicesByUserCount || null,
      studioListingsCount: studioListingsCount || null,
    },
  };
}
