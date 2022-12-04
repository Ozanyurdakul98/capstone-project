//db
import db from '../../../../../lib/dbConnect';
import StudioListing from '../../../../../models/StudioListing';
//components
import StudiosDetailpage from '../../../../../components/Layout/StudiosDetailpage';
import moment from 'moment';
import Image from 'next/image';
import Head from 'next/head';
import { MyLink } from '../../../../../components/MyLink';
import { useRouter } from 'next/router';
import { HomeIcon, UserIcon, WifiIcon } from '@heroicons/react/24/solid';
import { GiCigarette } from 'react-icons/gi';
import { useState } from 'react';
function StudioDetailpage({ serializedStudio, breadCrumb }) {
  const router = useRouter();
  const studio = serializedStudio[0];
  console.log(studio);
  const imgs = [
    { id: 0, value: studio.images },
    { id: 1, value: studio.images },
    { id: 2, value: studio.images },
    { id: 3, value: 'https://source.unsplash.com/user/c_v_r/1900x800' },
    { id: 4, value: 'https://source.unsplash.com/user/c_v_r/100x100' },
    { id: 5, value: studio.images },
  ];
  const [wordData, setWordData] = useState(imgs[0]);
  const handleClick = (index) => {
    // console.log(index);
    const wordSlider = imgs[index];
    setWordData(wordSlider);
  };
  return (
    <>
      <Head>
        <title>Detailpage</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* HeaderImage */}
      <section className="relative h-[250px] w-screen sm:h-[250px] md:h-[350px] lg:h-[450px] xl:h-[600px] ">
        <Image
          src={studio.images}
          layout="fill"
          objectFit="cover"
          objectPosition={'center'}
          className="rounded-xl"
          alt="Studio image"
        />
      </section>
      {/* MainAndSidebar */}
      <section className="container my-10 mx-auto lg:grid lg:grid-cols-landingpage lg:gap-5">
        {/* Main */}
        <section className="rounded-md bg-white py-16 text-black shadow-lg">
          {/* Headersection */}
          <section className="mb-14 flex flex-col gap-2 px-7 text-xs">
            <nav className="flex" aria-label="Breadcrumb">
              <ol className="inline-flex items-center space-x-1 md:space-x-3">
                <li className="inline-flex items-center">
                  <MyLink
                    href="/"
                    className="inline-flex items-center font-medium text-gray-700 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
                    <svg
                      className="mr-2 h-4 w-4"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg">
                      <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path>
                    </svg>
                    Home
                  </MyLink>
                </li>
                <li>
                  <div className="flex items-center">
                    <svg
                      className="h-6 w-6 text-gray-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg">
                      <path
                        fillRule="evenodd"
                        d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                        clipRule="evenodd"></path>
                    </svg>
                    <button
                      onClick={() => router.back()}
                      className="ml-1 font-medium text-gray-700 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white md:ml-2">
                      {breadCrumb}
                    </button>
                  </div>
                </li>
                <li aria-current="page">
                  <div className="flex items-center">
                    <svg
                      className="h-6 w-6 text-gray-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg">
                      <path
                        fillRule="evenodd"
                        d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                        clipRule="evenodd"></path>
                    </svg>
                    <span className="ml-1 font-medium text-gray-500 dark:text-gray-400 md:ml-2">Detailpage</span>
                  </div>
                </li>
              </ol>
            </nav>
            <div className="flex items-center justify-between gap-5 sm:pr-7">
              <div className="flex flex-col gap-1">
                <h1 className="h1LandingP">{studio.listingTitle}</h1>
                <h3 className="flex items-center gap-2 text-gray-500">
                  <svg
                    className="h-5 w-5 text-black"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                  </svg>
                  {studio.studioLocation}
                </h3>
              </div>
              <div className="relative flex h-14 w-14 shrink-0 md:h-16 md:w-16 xl:h-20 xl:w-20">
                <Image
                  src={studio.user.avatar}
                  layout="fill"
                  className="rounded-full bg-gray-200 "
                  objectFit="cover"
                  objectPosition={'center'}
                  alt="avatar"
                />
              </div>
            </div>
          </section>
          {/* FeatureSection */}
          <section className=" mb-14 text-sm text-gray-600">
            <div className="grid grid-cols-4 text-xs sm:text-sm [&>div]:border [&>div]:border-r-0 [&>div]:p-5 [&>div]:md:py-7 [&>_:last-child]:border-r-0 [&>_:first-child]:border-l-0 [&>*]:whitespace-nowrap [&>*]:text-center">
              <div className="flex flex-col items-center justify-center gap-1">
                <HomeIcon className="landingP-icon" />
                <p>Studio Type</p>
                <p className="font-bold">{studio.studiotype}</p>
              </div>
              <div className="flex flex-col items-center justify-center gap-1">
                <UserIcon className="landingP-icon" />
                <p>Capacity</p>
                <p className="font-bold">{studio.maxGuests + ' Guests'}</p>
              </div>
              <div className="flex flex-col items-center justify-center gap-1">
                <WifiIcon className="landingP-icon" />
                <p>Wifi</p>
                <p className="font-bold">{studio.locationFeatures.includes('Wi-Fi') ? 'Available' : 'Not available'}</p>
              </div>
              <div className="flex flex-col items-center justify-center gap-1">
                <GiCigarette className="landingP-icon" />
                <p>Smoking</p>
                <p className="font-bold">{studio.locationFeatures.includes('Smoking') ? 'Allowed' : 'Not allowed'}</p>
              </div>
            </div>
          </section>
          {/* Studiodescription */}
          <section className=" mb-14 border-b px-7 pb-14 text-sm text-gray-600">
            <div>
              <h2 className="h2LandingP">About the Studio</h2>
            </div>
            <div>
              <p className="pt-5">
                Ut cillum dolore qui velit enim velit minim commodo est voluptate velit ea pariatur sunt. Ullamco
                incididunt aliqua magna fugiat eiusmod in velit nisi ex Lorem pariatur nostrud. Nisi laborum laborum
                nulla occaecat. Velit ea dolore ex nostrud aute. Officia sit ipsum minim quis minim labore eu deserunt
                elit elit enim cillum labore et. Ea dolore velit officia velit anim velit ipsum velit nulla. Commodo
                sint non commodo do culpa voluptate ea anim irure eu quis minim ipsum et. Esse qui esse nulla in tempor
                ea proident proident ea. Qui sit esse magna labore id irure aliquip. Eiusmod occaecat laborum ex elit.
                Id commodo nisi est mollit sit eiusmod magna exercitation laborum cillum anim. Aliquip ea officia qui
                voluptate tempor in ea Lorem. Laborum laborum aliqua sit in cillum dolore eiusmod consectetur amet nulla
                magna duis sit minim.
              </p>
            </div>
          </section>
          {/* Details */}
          <section className="mb-7 px-7 text-xs text-gray-600 md:text-sm">
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
                Capacity: <span className="pl-1 font-semibold">{studio.maxGuests + ' Guests max'}</span>
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
                Beds: <span className="pl-1 font-semibold">No Sleepover</span>
              </li>
              <li className="col-start-2 row-start-4 flex items-center">
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
                Studio rooms: <span className="pl-1 font-semibold">3</span>
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
                Studio size: <span className="pl-1 font-semibold">78 sqm</span>
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
                Studio type: <span className="pl-1 font-semibold">{studio.studiotype}</span>
              </li>
            </ul>
          </section>
          {/* Studioservices */}
          <section className="mb-14 px-7 text-xs text-gray-600 md:text-sm">
            <ul className="grid grid-cols-smbg grid-rows-1 gap-2 sm:grid-cols-smbgbg sm:grid-rows-1">
              {/* <li className="h2LandingP col-start-1 row-span-2 text-sm font-bold lg:text-base">Studio services</li> */}
              <li className="col-start-2 row-start-1 flex items-start sm:col-span-2 sm:col-start-2 sm:row-start-1">
                <div className="flex items-center">
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
                  <span className="whitespace-nowrap">Studio services:</span>
                </div>
                <span className="pl-1 font-semibold">{studio.studioService.join(', ')}</span>
                {/* <span className="pl-1 font-semibold">{studio.studioService.map((service) => service + ', ')}</span> */}
              </li>
            </ul>
          </section>
          {/* ImageSection */}
          <section className="mb-14">
            <div className="studioImgsLP relative h-80 w-full md:h-[450px]">
              <Image src={wordData.value} alt="" layout="fill" objectFit="cover" />
              {/* <Image src={wordData.value} alt="" height="300" width="500" /> */}
            </div>
            <div className="flex_row">
              {imgs.map((data, i) => (
                <div className={`thumbnail relative h-[70px] w-[100px]`} onClick={() => handleClick(i)} key={i}>
                  <Image src={data.value} layout="fill" objectFit="cover" alt="studio image" />
                  <div className={`absolute h-full w-full bg-black/50  ${wordData.id == i ? 'hidden' : ''}`}></div>
                </div>
              ))}
            </div>
          </section>
          {/* PricingSection */}
          <section className="mb-14 truncate border-b px-7 pb-14 text-xs text-gray-600 md:text-sm">
            <ul className="grid w-full grid-cols-smbg grid-rows-[8] gap-2 space-x-10 sm:grid-cols-smbgbg sm:grid-rows-4 sm:space-x-0">
              <li className="h2LandingP col-start-1 text-sm font-bold lg:text-base">Prices</li>
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
                Hourly:
                <span className=" pl-1 font-semibold">{studio.studioPricing.studioPricingHour + '€' || '/'}</span>
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
                Daily:
                <span className=" pl-1 font-semibold">{studio.studioPricing.studioPricingDay + '€' || '/'}</span>
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
                Weekends (Sat & Sun):
                <span className=" pl-1 font-semibold">as daily</span>
              </li>
              <li className="col-start-2 row-start-4 flex items-center">
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
                Weekly (7 Days):
                <span className=" pl-1 font-semibold">{studio.studioPricing.studioPricingWeek + '€' || '/'}</span>
              </li>
              <li className="col-start-2 row-start-5 flex items-center">
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
                Monthly (30 Days):
                <span className=" pl-1 font-semibold">{studio.studioPricing.studioPricingMonth + '€' || '/'}</span>
              </li>
              <li className="col-start-2 row-start-6 flex items-center sm:col-start-3 sm:row-start-1">
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
                Additional Guests: <span className="pl-1 font-semibold">15€</span>
              </li>
              <li className="col-start-2 row-start-7 flex items-center sm:col-start-3 sm:row-start-2">
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
                Cleaning costs: <span className="pl-1 font-semibold">30€ per day</span>
              </li>
              <li className="col-start-2 row-start-[8] flex items-center sm:col-start-3 sm:row-start-3">
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
                Deposit: <span className="pl-1 font-semibold">300€</span>
              </li>
            </ul>
          </section>
          {/* Studiofeatures */}
          <section className="mb-7 px-7 text-xs text-gray-600 md:text-sm">
            <ul className="grid grid-cols-smbg gap-2 sm:grid-cols-smbgbg lg:space-x-4">
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
          {/* Equipment */}
          <section className="mb-14 border-b px-7 pb-14 text-xs text-gray-600 md:text-sm">
            <ul className="grid grid-cols-smbg gap-2 sm:grid-cols-smbgbg">
              <ul className="col-start-2 grid grid-cols-2 gap-2">
                <li className="col-span-2 font-semibold text-black">Equipment</li>
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
                    {'Equipment XYZ'}
                  </li>
                ))}
              </ul>
            </ul>
          </section>
          {/* StudioLocation */}
          <section className="mb-14 border-b px-7 pb-14 text-xs text-gray-600 lg:text-sm">
            <div className="container h-96 w-full bg-blue-400"></div>
          </section>
          {/* StudioRules */}
          <section className="mb-7 px-7 text-xs text-gray-600 lg:text-sm">
            <ul className="grid grid-cols-smbg gap-2 sm:grid-cols-smbgbg">
              <li className="h2LandingP col-start-1 row-span-2 text-sm font-bold lg:text-base">Studio Rules</li>
              <ul className="grid max-w-md list-inside gap-2 space-y-1 dark:text-gray-400 sm:col-span-2">
                <li className="flex items-center justify-between">
                  <span className="flex">
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
                    Smoking allowed:
                  </span>
                  <span className="font-semibold">No</span>
                </li>
                <li className="flex items-center justify-between">
                  <span className="flex">
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
                    Pets allowed:
                  </span>
                  <span className="font-semibold">Yes</span>
                </li>
                <li className="flex items-center justify-between">
                  <span className="flex">
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
                    Party allowed:
                  </span>
                  <span className="font-semibold">Yes</span>
                </li>
                <li className="flex items-center justify-between">
                  <span className="flex">
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
                    Kids allowed:
                  </span>
                  <span className="font-semibold">Yes</span>
                </li>
              </ul>
            </ul>
          </section>
          {/* Additional StudioRules */}
          <section className="mb-14 border-b px-7 pb-14 text-xs text-gray-600 lg:text-sm">
            <div className="grid grid-cols-smbg gap-2 sm:grid-cols-smbgbg">
              <div className="col-span-2 col-start-2 flex flex-col gap-2">
                <h4 className="font-semibold text-black">Additional Rules</h4>
                <p className="">
                  Adipisicing quis sint nisi occaecat nisi adipisicing Lorem sunt tempor anim excepteur. Cupidatat
                  eiusmod consectetur aute exercitation commodo anim nulla esse incididunt culpa dolore in sint.
                </p>
              </div>
            </div>
          </section>
          {/* Availability */}
          <section className="px-7 pb-10 text-xs text-gray-600 lg:text-sm">
            <ul className="grid grid-cols-smbg gap-2 space-x-10 sm:grid-cols-smbgbg sm:space-x-0">
              <li className="h2LandingP col-start-1 text-sm font-bold lg:text-base">Availability</li>
              <li className="col-start-2 flex items-center gap-2 sm:col-start-2 sm:row-start-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="h-5 w-5">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5"
                  />
                </svg>
                Minimum Hourly: <span className="font-semibold">2 hours</span>
              </li>
              <li className="col-start-2 flex items-center gap-2 sm:col-start-3 sm:row-start-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="h-5 w-5">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5"
                  />
                </svg>
                Maximum Hourly: <span className="font-semibold">/</span>
              </li>
              <li className="col-start-2 flex items-center gap-2 sm:col-start-2 sm:row-start-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="h-5 w-5">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5"
                  />
                </svg>
                Minimum Daily: <span className="font-semibold">1 day</span>
              </li>
              <li className="col-start-2 flex items-center gap-2 sm:col-start-3 sm:row-start-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="h-5 w-5">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5"
                  />
                </svg>
                Maximum Daily: <span className="font-semibold">5 days</span>
              </li>
              <li className="col-start-2 flex items-center gap-2 sm:col-start-2 sm:row-start-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="h-5 w-5">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5"
                  />
                </svg>
                Minimum Weekly: <span className="font-semibold">1 week</span>
              </li>
              <li className="col-start-2 flex items-center gap-2 sm:col-start-3 sm:row-start-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="h-5 w-5">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5"
                  />
                </svg>
                Maximum Weekly: <span className="font-semibold">4 weeks</span>
              </li>
              <li className="col-start-2 flex items-center gap-2 sm:col-start-2 sm:row-start-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="h-5 w-5">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5"
                  />
                </svg>
                Minimum Monthly: <span className="font-semibold">1 month</span>
              </li>
              <li className="col-start-2 flex items-center gap-2 sm:col-start-3 sm:row-start-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="h-5 w-5">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5"
                  />
                </svg>
                Maximum Monthly: <span className="font-semibold">3 months</span>
              </li>
            </ul>
          </section>
        </section>
        {/* SideTable */}
        <section className="hidden h-full w-full lg:block">
          <div className=" sticky top-10 h-96 w-full bg-white shadow-lg"></div>
        </section>
      </section>
      {/* StudioOwner Card */}
      <section className="container mx-auto mt-28 mb-10 lg:grid lg:grid-cols-landingpage lg:gap-5">
        <div className="relative mx-auto my-6 mt-16 w-full min-w-0 break-words rounded-xl bg-white shadow-lg ">
          <div className="px-6">
            {/* top */}
            <div className="flex flex-wrap justify-center">
              {/* ProfilePic */}
              <div className="flex w-full justify-center">
                <div className="relative">
                  <div className="absolute -m-16 -ml-20 h-[150px] w-[150px] rounded-full border-none align-middle shadow-xl">
                    <Image src={studio.user.avatar} className="rounded-full " layout="fill" objectFit="cover" />
                  </div>
                </div>
              </div>
              {/* CounterSection */}
              <div className="mt-20 w-full text-center">
                <div className="flex justify-center pt-8 pb-0 lg:pt-4">
                  <div className="p-3 text-center">
                    <span className="block text-xl font-bold uppercase tracking-wide text-slate-700">60</span>
                    <span className="text-sm text-slate-400">Studios</span>
                  </div>
                  <div className="p-3 text-center">
                    <span className="block text-xl font-bold uppercase tracking-wide text-slate-700">2,454</span>
                    <span className="text-sm text-slate-400">Followers</span>
                  </div>
                  <div className="p-3 text-center">
                    <span className="block text-xl font-bold uppercase tracking-wide text-slate-700">54</span>
                    <span className="text-sm text-slate-400">Services</span>
                  </div>
                </div>
              </div>
            </div>
            {/* middle */}
            <div className="mt-2 text-center">
              <h3 className="mb-1 text-2xl font-bold leading-normal text-slate-700">Marvellous Soundstudio 24</h3>
              <div className="mt-0 mb-2 text-xs font-bold uppercase text-slate-400">
                <i className="mr-2 text-slate-400 opacity-75">Paris, France</i>
              </div>
            </div>
            <div className="mt-0 mb-2 text-xs font-bold uppercase text-slate-400">
              Languages: <span className="text-sm font-thin normal-case">English, Francais, German</span>
            </div>
            {/* buttons */}
            <div className="mt-3 flex gap-3 text-slate-400">
              <button className="w-full rounded-md border py-2 hover:bg-gray-200/70 hover:text-gray-400/70">
                Contact Studio
              </button>
              <button className="w-full rounded-md border py-2 hover:bg-gray-200/70 hover:text-gray-400/70">
                View Profile
              </button>
            </div>
            {/* bottom */}
            <div className="mt-3 border-t border-slate-200 py-6 text-center">
              <div className="flex flex-wrap justify-center">
                <div className="w-full px-4">
                  <p className="mb-4 font-light leading-relaxed text-slate-600">
                    An artist of considerable range, Mike is the name taken by Melbourne-raised, Brooklyn-based Nick
                    Murphy writes, performs and records all of his own music, giving it a warm...
                  </p>
                  <button className="rounded-md border bg-green-400/80 py-2 px-2 font-normal text-white">
                    Follow Account
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default StudioDetailpage;

StudioDetailpage.getLayout = function getLayout(page) {
  return <StudiosDetailpage>{page}</StudiosDetailpage>;
};

export async function getServerSideProps(context) {
  await db.connect();
  const id = context.query.id[2];
  let breadCrumb = context.query.service;
  if (breadCrumb === 'recording') breadCrumb = 'Recording';
  const fetchStudio = await StudioListing.findById(id)
    .populate({
      path: 'studioService',
      model: 'StudioService',
      select: 'name -_id',
    })
    .populate({
      path: 'user',
      model: 'users',
      select: 'avatar email name lastname username',
    });
  const serializeStudio = [JSON.parse(JSON.stringify(fetchStudio))];
  const serializedStudio = serializeStudio.map((studio) => ({
    ...studio,
    studioService: studio.studioService.map((service) => service.name),
    createdAt: moment(studio.createdAt).format('DD/MM/yyyy'),
    createdAtTime: moment(studio.createdAt).format('kk:mm'),
    updatedAt: moment(studio.updatedAt).format('DD/MM/yyyy'),
    updatedAtTime: moment(studio.updatedAt).format('kk:mm'),
  }));
  return {
    props: {
      serializedStudio: serializedStudio || null,
      breadCrumb: breadCrumb || null,
    },
  };
}
