//db
import db from '../../../../../lib/dbConnect';
// import StudioListing from '../../../../../models/StudioListing';
//components
import StudiosDetailpage from '../../../../../components/Layout/StudiosDetailpage';
// import moment from 'moment';
import Image from 'next/image';
import Head from 'next/head';
import { MyLink } from '../../../../../components/MyLink';
import { useRouter } from 'next/router';
import { HomeIcon, MinusCircleIcon, PlusCircleIcon, UserIcon, WifiIcon } from '@heroicons/react/24/solid';

import { MdLocationPin } from 'react-icons/md';
import { GiCigarette } from 'react-icons/gi';
import {
  ImFacebook,
  ImTwitter,
  ImPinterest,
  ImYoutube,
  ImLinkedin2,
  ImInstagram,
  ImSpotify,
  ImSoundcloud,
} from 'react-icons/im';
import { useState } from 'react';
import { BackgroundOverlayFullscreen as ClickToCloseMax } from '../../../../../components/BackgroundOverlay';
//tools
import { DateRange } from 'react-date-range';
import format from 'date-fns/format';
import { FormInput } from '../../../../../components/Forms/FormInput';
import StudioService from '../../../../../models/StudioService';
import { formatValue } from 'react-currency-input-field';

function StudioDetailpage({ serializedStudioservice, studioServicesCount }) {
  const Service = serializedStudioservice;
  console.log('Serivce', Service);
  const router = useRouter();
  const imgs = [
    { id: 0, value: Service.images.primary },
    // { id: 1, value: studio.images },
    // { id: 2, value: studio.images },
    // { id: 3, value: 'https://source.unsplash.com/user/c_v_r/1900x800' },
    // { id: 4, value: 'https://source.unsplash.com/user/c_v_r/100x100' },
    // { id: 5, value: studio.images },
  ];
  const [wordData, setWordData] = useState(imgs[0]);
  const [openPanel, setOpenPanel] = useState('');
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const locale = Service.subInformations.locale;
  const currency = Service.subInformations.currency;

  const handleClick = (index) => {
    const wordSlider = imgs[index];
    setWordData(wordSlider);
  };
  const selectionRange = {
    startDate: startDate,
    endDate: endDate,
    key: 'selection',
  };
  const handleSelect = (ranges) => {
    setStartDate(ranges.selection.startDate);

    setEndDate(ranges.selection.endDate);
  };
  //guests
  const [noOfGuests, setNoOfGuest] = useState(1);
  const incrementNumberGuests = () => {
    setNoOfGuest((counter) => counter + 1);
  };
  const decrementNumberGuests = () => {
    setNoOfGuest((counter) => counter - 1);
  };
  return (
    <>
      <Head>
        <title>Detailpage</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* HeaderImage */}
      <section className="relative h-[250px] w-full sm:h-[250px] md:h-[350px] lg:h-[450px] xl:h-[600px] ">
        <Image
          src={Service.images.primary}
          layout="fill"
          objectFit="cover"
          objectPosition={'center'}
          className=""
          alt="Studio image"
        />
      </section>
      {/* MainAndSidebar */}
      <section className="container my-10 mx-auto lg:grid lg:grid-cols-landingpage lg:gap-5">
        {/* Main */}
        <section className="rounded-md bg-white py-16 text-black shadow-lg">
          {/* Headersection */}
          <section className="mb-14 flex flex-col gap-2 px-7 text-xs">
            {/* breadcrumb */}
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
                      type="button"
                      onClick={() => router.back()}
                      className="ml-1 font-medium text-gray-700 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white md:ml-2">
                      {Service.service.name}
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
            {/* title and location and avatar */}
            <section className="flex items-center justify-between gap-5 sm:pr-7">
              {/* title etc. */}
              <section className="flex flex-col gap-1">
                <h1 className="h1LandingP">{Service.listingTitle}</h1>
                <div className="flex gap-1 text-gray-500">
                  <MdLocationPin className="h-[15px] w-[15px] text-black" />
                  <h3 className="pt-[1px]">{Service.studio.studioLocation}</h3>
                </div>
              </section>
              {/* avatar username */}
              <section className="flex flex-col gap-1 text-center text-gray-500">
                <div className="relative flex h-14 w-14 shrink-0 md:h-16 md:w-16 xl:h-20 xl:w-20">
                  <Image
                    src={Service.user.avatar}
                    layout="fill"
                    className="rounded-full bg-gray-200 "
                    objectFit="cover"
                    objectPosition={'center'}
                    alt="avatar"
                  />
                </div>
                <p>{Service.user.username}</p>
              </section>
            </section>
          </section>
          {/* FeatureSection */}
          <section className=" mb-14 text-sm text-gray-600">
            <div className="grid grid-cols-4 text-xs sm:text-sm [&>*]:whitespace-nowrap [&>*]:text-center [&>div]:border [&>div]:border-r-0 [&>div]:p-5 [&>div]:md:py-7 [&>_:last-child]:border-r-0 [&>_:first-child]:border-l-0">
              <div className="flex flex-col items-center justify-center gap-1">
                <HomeIcon className="landingP-icon" />
                <p>Studio Type</p>
                <p className="font-bold">{Service.studio.studiotype}</p>
              </div>
              <div className="flex flex-col items-center justify-center gap-1">
                <UserIcon className="landingP-icon" />
                <p>Capacity</p>
                <p className="font-bold">{Service.maxGuests + ' Guests'}</p>
              </div>
              <div className="flex flex-col items-center justify-center gap-1">
                <WifiIcon className="landingP-icon" />
                <p>Wifi</p>
                <p className="font-bold">{Service.studio.locationFeatures.includes('Wi-Fi') ? 'Yes' : 'No'}</p>
              </div>
              <div className="flex flex-col items-center justify-center gap-1">
                <GiCigarette className="landingP-icon" />
                <p>Smoking</p>
                <p className="font-bold">{Service.studio.locationFeatures.includes('Smoking') ? 'Yes' : 'No'}</p>
              </div>
            </div>
          </section>
          {/* Studiodescription */}
          <section className=" mb-14 border-b px-7 pb-14 text-sm text-gray-600">
            <div>
              <h2 className="h2LandingP">About the Studioservice</h2>
            </div>
            <div>
              <p className="pt-5">{Service.description}</p>
            </div>
          </section>
          {/* Details */}
          <section className="mb-7 px-7 text-xs text-gray-600 md:text-sm">
            <ul className="grid grid-cols-smbg grid-rows-6 gap-2 sm:grid-cols-smbgbg sm:grid-rows-4">
              <li className="h2LandingP col-start-1 row-span-2 text-sm font-bold lg:text-base">Details</li>
              {/* id */}
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
                ID: <span className=" pl-1 font-semibold">{Service._id}</span>
              </li>
              {/* type */}
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
                Studiotype: <span className="pl-1 font-semibold">{Service.studio.studiotype}</span>
              </li>
              {/* service */}
              <li className="col-start-2 row-start-3 flex items-center">
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
                  <span className="whitespace-nowrap">Studioservice:</span>
                  <span className="pl-1 font-semibold">{Service.service.name}</span>
                </div>
              </li>
              {/* size */}
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
                Studiosize: <span className="pl-1 font-semibold">78 sqm</span>
              </li>
              {/* rooms */}
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
                Studiorooms: <span className="pl-1 font-semibold">3</span>
              </li>
              {/* guests */}
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
                Servicecapacity: <span className="pl-1 font-semibold">{Service.maxGuests + ' Guests'}</span>
              </li>
              {/* Sleepover */}
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
                Sleepover:
                <span className="pl-1 font-semibold">
                  {Service.studio.sleepOver.bedsCount
                    ? Service.studio.sleepOver.bedsCount + ' beds, ' + Service.studio.sleepOver.maxPeople + ' People'
                    : '/'}
                </span>
              </li>
            </ul>
          </section>
          {/* languages */}
          <section className="mb-14 px-7 text-xs text-gray-600 md:text-sm">
            <ul className="grid grid-cols-smbg grid-rows-1 gap-2 sm:grid-cols-smbgbg sm:grid-rows-1">
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
                  <span className="whitespace-nowrap">Languages:</span>
                </div>
                <span className="pl-1 font-semibold">{Service.studio.studioLanguages.join(', ')}</span>
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
          <section className="mb-7 truncate px-7 text-xs text-gray-600 md:text-sm">
            <ul className="grid w-full grid-cols-smbg grid-rows-[9] gap-2 sm:grid-cols-smbgbg sm:grid-rows-3 sm:space-x-0">
              <li className="h2LandingP col-start-1 text-sm font-bold lg:text-base">Prices</li>
              {/* hour */}
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
                <span className=" pl-1 font-semibold">
                  {Service.pricing.pricingHour
                    ? formatValue({
                        value: Service.pricing.pricingHour,
                        intlConfig: {
                          locale: locale,
                          currency: currency,
                        },
                      })
                    : '/'}
                </span>
              </li>
              {/* day */}
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
                <span className=" pl-1 font-semibold">
                  {Service.pricing.pricingDay
                    ? formatValue({
                        value: Service.pricing.pricingDay,
                        intlConfig: {
                          locale: locale,
                          currency: currency,
                        },
                      })
                    : '/'}
                </span>
              </li>
              {/* weekends */}
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
                On Weekend:
                <span className=" pl-1 font-semibold">
                  {Service.pricing.pricingWeekend
                    ? formatValue({
                        value: Service.pricing.pricingWeekend,
                        intlConfig: {
                          locale: locale,
                          currency: currency,
                        },
                      })
                    : 'as daily'}
                </span>
              </li>
              {/* week */}
              <li className="col-start-2 row-start-7 flex items-center sm:col-start-3 sm:row-start-1">
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
                <span className=" pl-1 font-semibold">
                  {Service.pricing.pricingWeek
                    ? formatValue({
                        value: Service.pricing.pricingWeek,
                        intlConfig: {
                          locale: locale,
                          currency: currency,
                        },
                      })
                    : '/'}
                </span>
              </li>
              {/* month */}
              <li className="col-start-2 row-start-[8] flex items-center sm:col-start-3 sm:row-start-2">
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
                <span className=" pl-1 font-semibold">
                  {Service.pricing.pricingMonth
                    ? formatValue({
                        value: Service.pricing.pricingMonth,
                        intlConfig: {
                          locale: locale,
                          currency: currency,
                        },
                      })
                    : '/'}
                </span>
              </li>
              {/* deposit */}
              <li className="col-start-2 row-start-[9] flex items-center sm:col-start-3 sm:row-start-3">
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
                Deposit:
                <span className=" pl-1 font-semibold">
                  {Service.pricing.pricingDeposit
                    ? formatValue({
                        value: Service.pricing.pricingDeposit,
                        intlConfig: {
                          locale: locale,
                          currency: currency,
                        },
                      })
                    : '/'}
                </span>
              </li>
            </ul>
          </section>
          {/* Soundengineer */}
          <section className="mb-14 px-7 text-xs text-gray-600 md:text-sm">
            <ul className="grid grid-cols-smbg grid-rows-1 gap-2 sm:grid-cols-smbgbg sm:grid-rows-1">
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
                  <span className="whitespace-nowrap">Soundengineer:</span>
                </div>
                <span className="pl-1 font-semibold">
                  {Service.soundengineer.priceOption
                    ? formatValue({
                        value: Service.soundengineer.price,
                        intlConfig: {
                          locale: locale,
                          currency: currency,
                        },
                      }) +
                      ' ' +
                      Service.soundengineer.priceOption
                    : Service.soundengineer}
                </span>
              </li>
            </ul>
          </section>
          {/* AdditionalServices */}
          <section className="mb-14 border-b px-7 pb-14 text-xs text-gray-600 md:text-sm">
            <ul className="grid w-full grid-cols-smbg gap-2 space-x-10 sm:grid-cols-smbgbg sm:space-x-0">
              <ul className="col-start-2 col-end-4 grid grid-cols-2 gap-2 lg:pl-5">
                <li className="col-span-2 font-semibold text-black">
                  <h3>Additional Services</h3>
                </li>
                {Service.additionalServices?.map(({ name, description, priceOption, price }) => (
                  <li key={name} className="col-span-2 flex flex-col">
                    <h4 className="font-semibold">{name}</h4>
                    <p>{description}</p>
                    <p className="flex w-full gap-10 text-[11px] md:text-xs">
                      <span>{priceOption}</span>
                      <span>
                        {formatValue({
                          value: price,
                          intlConfig: {
                            locale: locale,
                            currency: currency,
                          },
                        })}
                      </span>
                    </p>
                  </li>
                ))}
              </ul>
            </ul>
          </section>
          {/* Studiofeatures */}
          <section className="mb-7 px-7 text-xs text-gray-600 md:text-sm">
            <ul className="grid grid-cols-smbg gap-2 sm:grid-cols-smbgsm ">
              <li className="h2LandingP col-start-1 row-span-2 text-sm font-bold lg:text-base">Studio Features</li>
              <ul className="grid grid-cols-2 gap-2 lg:pl-5">
                {Service.studio.locationFeatures.map((feature) => (
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
            <ul className="grid grid-cols-smbg gap-2  sm:grid-cols-smbgsm">
              <ul className="col-start-2 grid grid-cols-2 gap-2 lg:pl-5">
                <li className="col-span-2 font-semibold text-black">
                  <h3>Equipment</h3>
                </li>
                <li className="col-span-2">{Service.equipment}</li>
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
                {/* smoking */}
                <li className="flex items-center justify-between">
                  <span className="flex">
                    {Service.studio.studioRules.includes('Smoking') ? (
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
                  <span className="font-semibold">{Service.studio.studioRules.includes('Smoking') ? 'Yes' : 'No'}</span>
                </li>
                {/* pets */}
                <li className="flex items-center justify-between">
                  <span className="flex">
                    {Service.studio.studioRules.includes('Pets') ? (
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
                  <span className="font-semibold">{Service.studio.studioRules.includes('Pets') ? 'Yes' : 'No'}</span>
                </li>
                {/* kids */}
                <li className="flex items-center justify-between">
                  <span className="flex">
                    {Service.studio.studioRules.includes('Kids') ? (
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
                  <span className="font-semibold">{Service.studio.studioRules.includes('Kids') ? 'Yes' : 'No'}</span>
                </li>
                <li className="flex items-center justify-between">
                  <span className="flex">
                    {Service.studio.studioRules.includes('Eating') ? (
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
                  <span className="font-semibold">{Service.studio.studioRules.includes('Eating') ? 'Yes' : 'No'}</span>
                </li>
                <li className="mb-5 flex items-center justify-between">
                  <span className="flex">
                    {Service.studio.studioRules.includes('Party') ? (
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
                  <span className="font-semibold">{Service.studio.studioRules.includes('Party') ? 'Yes' : 'No'}</span>
                </li>
                {/* Additional StudioRules */}
                {Service.studio.additionalStudioRules ? (
                  <li>
                    <section className="px-2 text-xs text-gray-600 lg:text-sm">
                      <h4 className="font-semibold text-black">Additional Rules</h4>
                      <p className="">{Service.studio.additionalStudioRules}</p>
                    </section>
                  </li>
                ) : null}
              </ul>
            </ul>
          </section>
        </section>
        {/* SideTable */}
        <section className="hidden h-full w-full text-black lg:block">
          <form noValidate={true} className="sticky top-10 grid h-[400px] w-full grid-rows-smbgsm bg-white shadow-lg">
            {/* Top */}
            <section className="flex items-center rounded-t-sm bg-gray-400 text-white">
              <div className="flex items-center pl-5">
                <span className="text-2xl">
                  {formatValue({
                    value: Service.pricing.pricingHour
                      ? Service.pricing.pricingHour
                      : Service.pricing.pricingDay
                      ? Service.pricing.pricingDay
                      : Service.pricing.pricingWeek
                      ? Service.pricing.pricingWeek
                      : Service.pricing.pricingMonth
                      ? Service.pricing.pricingMonth
                      : '',
                    intlConfig: {
                      locale: locale,
                      currency: currency,
                    },
                  })}
                </span>
                <span className="pt-[2px] text-xl">/</span>
                <span className="pt-1">
                  {Service.pricing.pricingHour
                    ? 'Hour'
                    : Service.pricing.pricingDay
                    ? 'Day'
                    : Service.pricing.pricingWeek
                    ? 'Week'
                    : Service.pricing.pricingMonth
                    ? 'Month'
                    : null}
                </span>
              </div>
            </section>
            {/* Middle */}
            <section className="px-8 py-4">
              <div className=" grid w-full grid-cols-2 grid-rows-5 gap-2">
                {/* Date */}
                <div className="col-span-2 row-start-1">
                  <div className="relative flex w-full flex-col items-center justify-center">
                    <div className="flex w-full items-center gap-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="h-6 w-6">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5"
                        />
                      </svg>
                      <FormInput
                        beforeLabel={{ css: 'sideBarLP-label', string: 'Date' }}
                        className="inputOpenCalendarLP w-full rounded-md"
                        id="date"
                        value={format(startDate, 'dd/MM/yy') + ' - ' + format(endDate, 'dd/MM/yy')}
                        readOnly
                        onClick={() => {
                          setOpenPanel('calendar');
                        }}
                      />
                    </div>
                    {openPanel === 'calendar' && (
                      <>
                        <DateRange
                          className="absolute top-12 right-0 z-50 max-w-min rounded-xl border border-gray-400"
                          ranges={[selectionRange]}
                          rangeColors={['#df1b1b']}
                          showMonthAndYearPickers={false}
                          onChange={handleSelect}
                          minDate={new Date()}
                          calendarFocus={'forwards'}
                          moveRangeOnFirstSelection={false}
                        />
                        <ClickToCloseMax style={'editModal z-40 h-full'} onClick={() => setOpenPanel('')} />
                      </>
                    )}
                  </div>
                </div>
                {/* Guests */}
                <div className="col-span-2 row-start-2">
                  <div className="relative flex w-full flex-col items-center justify-center">
                    <div className="flex w-full items-center gap-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="h-6 w-6">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"
                        />
                      </svg>
                      <FormInput
                        beforeLabel={{ css: 'sideBarLP-label px-2', string: 'Guests' }}
                        readOnly
                        id="guests"
                        className="inputOpenGuestsLP"
                        placeholder="Guests"
                        value={noOfGuests + ' Guests '}
                        onClick={() => {
                          setOpenPanel('guests');
                        }}
                      />
                    </div>
                    {openPanel === 'guests' && (
                      <>
                        <div className="absolute -bottom-16 z-50 flex items-center rounded-xl border border-gray-400 bg-white p-2">
                          <button
                            type="button"
                            className="icon-big cursor-pointer"
                            onClick={decrementNumberGuests}
                            disabled={noOfGuests === 1}>
                            <MinusCircleIcon />
                          </button>
                          <input
                            className="number-search text-center disabled:text-white"
                            type="number"
                            min={1}
                            max={Service.maxGuests}
                            value={noOfGuests}
                            disabled
                          />
                          <button
                            type="button"
                            className="icon-big"
                            onClick={incrementNumberGuests}
                            disabled={noOfGuests === Service.maxGuests}>
                            <PlusCircleIcon />
                          </button>
                        </div>
                        <ClickToCloseMax style={'editModal z-40 h-full'} onClick={() => setOpenPanel('')} />
                      </>
                    )}
                  </div>
                </div>
                {/* Message */}
                <div className="col-span-2 row-span-2">
                  <div className="flex w-full items-center gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="h-6 w-6">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155"
                      />
                    </svg>
                    <textarea
                      type="textarea"
                      rows={'3'}
                      style={{ height: 'initial' }}
                      className="h-full w-full resize-none "
                      name="description"
                      id="description"
                      placeholder="Introduce yourself and what you need here.."
                      required
                      maxLength="250"
                      autoComplete="off"
                      // value={''}
                      // onChange={''}
                    ></textarea>
                  </div>
                </div>
                {/* Button */}
                <div className="col-span-2 row-start-5">
                  <div className="flex h-full w-full flex-col gap-[2px]">
                    <MyLink
                      href={`mailto:${encodeURIComponent(Service.user.email)}?subject=${encodeURIComponent(
                        'Booking request for ' + Service.studio.studioName
                      )}&body=${encodeURIComponent(
                        'Hello, I am interested in a ' +
                          Service.service.name +
                          ' session in your Studio ' +
                          Service.studio.studioName +
                          '.'
                      )}`}
                      type="button"
                      className="bg-primary h-8 w-full rounded-md text-white">
                      Submit booking request
                    </MyLink>
                    <p className="flex items-center justify-center gap-1 text-center text-xs text-gray-400">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="h-4 w-4">
                        <path
                          fillRule="evenodd"
                          d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 01.67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 11-.671-1.34l.041-.022zM12 9a.75.75 0 100-1.5.75.75 0 000 1.5z"
                          clipRule="evenodd"
                        />
                      </svg>
                      Non-binding request
                    </p>
                  </div>
                </div>
              </div>
            </section>
            {/* Bottom */}
            <section className="flex w-full items-center justify-evenly rounded-b-sm bg-gray-200 text-gray-400 [&>*]:h-4 [&>*]:w-4 [&>*]:cursor-pointer">
              <ImSoundcloud title="Soundcloud" />
              <ImSpotify title="Spotify" />
              <ImYoutube title="Youtube" />
              <ImFacebook title="Facebook" />
              <ImInstagram title="Instagram" />
              <ImTwitter title="Twitter" />
              <ImPinterest title="Pinterest" />
              <ImLinkedin2 title="LinkedIn" />
            </section>
          </form>
        </section>
      </section>
      {/* StudioOwner Card */}
      <section className="container mx-auto mt-28 mb-10 lg:mt-20 lg:grid lg:grid-cols-landingpage lg:gap-5">
        <div className="relative mx-auto my-6 mt-16 w-full min-w-0 break-words rounded-xl bg-white shadow-lg ">
          <div className="px-6">
            {/* top */}
            <div className="flex flex-wrap justify-center">
              {/* studiologo */}
              <div className="flex w-full justify-center">
                <div className="relative">
                  <div className="absolute -m-16 -ml-20 h-[150px] w-[150px] rounded-full border-none align-middle shadow-xl">
                    <Image
                      src={Service.studio.logo}
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
                  {/* studios
                  <div className="p-3 text-center">
                    <span className="block text-xl font-bold uppercase tracking-wide text-slate-700">33</span>
                    <span className="text-sm text-slate-400">Studios</span>
                  </div>
                  followers
                  <div className="p-3 text-center">
                    <span className="block text-xl font-bold uppercase tracking-wide text-slate-700">2,454</span>
                    <span className="text-sm text-slate-400">Followers</span>
                  </div> */}
                  {/* servicesCount */}
                  <div className="p-3 text-center">
                    <span className="block text-xl font-bold uppercase tracking-wide text-slate-700">
                      {studioServicesCount}
                    </span>
                    <span className="text-sm text-slate-400">Services</span>
                  </div>
                </div>
              </div>
            </div>
            {/* middle */}
            <div className="mt-2 mb-4 text-center">
              <h3 className="mb-1 text-2xl font-bold leading-normal text-slate-700">{Service.studio.studioName}</h3>
              <div className="mt-0 text-xs font-bold uppercase text-slate-400">
                <i className="mr-2 text-slate-400 opacity-75">{Service.studio.studioLocation}</i>
              </div>
            </div>
            <div className="mt-0 mb-2 text-xs font-bold uppercase text-slate-400">
              Languages:
              <span className="text-xs font-thin uppercase">{' ' + Service.studio.studioLanguages.join(', ')}</span>
            </div>
            {/* buttons */}
            <div className="mt-3 flex gap-3 text-slate-400">
              <MyLink
                href={`mailto:${encodeURIComponent(Service.user.email)}?subject=${encodeURIComponent(
                  'Booking request for ' + Service.studio.studioName
                )}&body=${encodeURIComponent(
                  'Hello, I am interested in a ' +
                    Service.service.name +
                    ' session in your Studio ' +
                    Service.studio.studioName +
                    '.'
                )}`}
                className="w-full rounded-md border py-2 text-center hover:bg-gray-200/70 hover:text-gray-400/70">
                Contact Studio
              </MyLink>
              <MyLink
                href={`/studiotype/${
                  Service.studio.studiotype.toLowerCase().replace(/ /g, '-') +
                  '/' +
                  'id' +
                  '/' +
                  Service.studio.studioName.toLowerCase().replace(/ /g, '-') +
                  '/' +
                  Service.studio._id
                }`}
                className="w-full rounded-md border py-2 text-center hover:bg-gray-200/70 hover:text-gray-400/70">
                View Studio
              </MyLink>
            </div>
            {/* bottom */}
            <div className="mt-3 border-t border-slate-200 py-6 text-center">
              <div className="flex flex-wrap justify-center">
                <div className="w-full px-4">
                  <p className="mb-4 font-light leading-relaxed text-slate-600">{Service.studio.profileText} </p>
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
  const id = context.query.id[1];
  console.log('id', id);
  // const fetchStudio = await StudioListing.findById(id).populate({
  //   path: 'user',
  //   model: 'users',
  //   select: 'avatar email name lastname username',
  // });
  // const serializeStudio = [JSON.parse(JSON.stringify(fetchStudio))];
  // const serializedStudio = serializeStudio.map((studio) => ({
  //   ...studio,
  //   createdAt: moment(studio.createdAt).format('DD/MM/yyyy'),
  //   createdAtTime: moment(studio.createdAt).format('kk:mm'),
  //   updatedAt: moment(studio.updatedAt).format('DD/MM/yyyy'),
  //   updatedAtTime: moment(studio.updatedAt).format('kk:mm'),
  // }));

  // const userId = serializeStudio[0].user._id;
  // const studioServicesByUserCount = await StudioService.find({ user: userId }).count();
  // const studioListingsCount = await StudioListing.find({ user: userId }).count();

  const fetchStudioservice = await StudioService.findById(id)
    .populate({
      path: 'user',
      model: 'users',
      select: 'avatar email name lastname username',
    })
    .populate({
      path: 'studio',
      model: 'StudioListing',
      select: '',
    })
    .populate({
      path: 'service',
      model: 'AdminStudioService',
      select: 'name queryString -_id',
    });
  const serializeStudioservice = JSON.parse(JSON.stringify(fetchStudioservice));

  const studioID = serializeStudioservice.studio._id;
  const studioServicesByStudioCount = await StudioService.find({ studio: studioID }).count();

  return {
    props: {
      // serializedStudio: serializedStudio,
      serializedStudioservice: serializeStudioservice || null,
      studioServicesCount: studioServicesByStudioCount || null,
      // studioServicesByUserCount: studioServicesByUserCount || null,
      // studioListingsCount: studioListingsCount || null,
    },
  };
}
