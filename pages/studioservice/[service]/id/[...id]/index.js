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

function StudioDetailpage({ serializedStudio, breadCrumb }) {
  const router = useRouter();
  const studio = serializedStudio[0];
  console.log(studio);
  console.log(breadCrumb);
  return (
    <>
      <Head>
        <title>Detailpage</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="relative h-24 w-screen sm:h-32 md:h-36 lg:h-[600px] ">
        <Image
          src={studio.images}
          layout="fill"
          objectFit="cover"
          objectPosition={'center'}
          className="rounded-xl"
          alt="Studio image"
        />
      </div>

      <section className="container mx-auto py-16 px-5 text-black">
        <div className="flex flex-col gap-2">
          <nav className="flex" aria-label="Breadcrumb">
            <ol className="inline-flex items-center space-x-1 md:space-x-3">
              <li className="inline-flex items-center">
                <MyLink
                  href="/"
                  className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
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
                    className="ml-1 text-sm font-medium text-gray-700 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white md:ml-2">
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
                  <span className="ml-1 text-sm font-medium text-gray-500 dark:text-gray-400 md:ml-2">Detailpage</span>
                </div>
              </li>
            </ol>
          </nav>
          <div>
            <h1 className="h1 text-black">{studio.listingTitle}</h1>
            <div className="relative flex h-10 w-10 sm:h-12 sm:w-12">
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
          <h3 className="flex gap-2 text-sm text-gray-700">
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
  console.log('BREADCRUMB', breadCrumb);
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
  // console.log('byid', fetchStudio);
  const serializeStudio = [JSON.parse(JSON.stringify(fetchStudio))];
  const serializedStudio = serializeStudio.map((studio) => ({
    ...studio,
    studioService: studio.studioService.map((service) => service.name),
    createdAt: moment(studio.createdAt).format('DD/MM/yyyy'),
    createdAtTime: moment(studio.createdAt).format('kk:mm'),
    updatedAt: moment(studio.updatedAt).format('DD/MM/yyyy'),
    updatedAtTime: moment(studio.updatedAt).format('kk:mm'),
  }));
  // console.log('SERIALIZEDSTUDIO', serializedStudio);
  // console.log('SERIALIZEDSTUDIO', serializedStudio[0].listingTitle);
  return {
    props: {
      serializedStudio: serializedStudio || null,
      breadCrumb: breadCrumb || null,
    },
  };
}
