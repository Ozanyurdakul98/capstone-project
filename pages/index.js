import { useSession, signIn, signOut } from 'next-auth/react';
import db from '../lib/dbConnect';
import StudioListing from '../models/StudioListing';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import Lottie from 'lottie-react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import ListingCard from '../components/ListingCardCarousell';
import musicStudio1 from '../public/animations/musicStudio1.json';

export default function Home({ latestListings }) {
  console.log(latestListings);
  const { data: session, status } = useSession();
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4,
      slidesToSlide: 3, // optional, default to 1.
    },
    Laptop: {
      breakpoint: { max: 1024, min: 750 },
      items: 3,
      slidesToSlide: 2, // optional, default to 1.
    },
    tablet: {
      breakpoint: { max: 750, min: 500 },
      items: 2,
      slidesToSlide: 2, // optional, default to 1.
    },
    mobile: {
      breakpoint: { max: 500, min: 0 },
      items: 2,
      slidesToSlide: 1, // optional, default to 1.
    },
  };
  return (
    <>
      <Head>
        <title>Tonstudio-Kleinanzeigen</title>
      </Head>
      <section className='shadow-bt-lg m-auto mt-4 flex flex-col-reverse items-center justify-center px-4 md:flex-row lg:gap-10 xl:gap-40'>
        <div className=' max-h-min max-w-md rounded-3xl bg-white p-2 px-10 pb-10 shadow-inner sm:flex sm:flex-col sm:items-center  sm:bg-none  md:shadow-xl'>
          <h1 className='mt-4 mb-2 text-4xl font-bold leading-tight '>Tonstudio-Kleinanzeigen</h1>
          <p className='text-sm'>
            Is made for the community of music producers and amateur musicians to offer the oppertunity for a free
            digital business card and therefore having more client traction and more efficient targetting.
          </p>
          <p className='pt-2 text-sm'>
            Describe your services & studio and let the users decide by comparing your listing with others.
            <br />
            <Link href='/search/all'>
              <button className=' button'>View all listings</button>
            </Link>
          </p>
        </div>
        <div className=' min-w-[420px]'>
          <Lottie animationData={musicStudio1} loop={true} className='' />
        </div>
      </section>
      <article className='mt-10 mb-80'>
        <h2 className='label-form text-lg'>The 10 latest added Studio Listings</h2>
        <Carousel
          swipeable={false}
          draggable={true}
          showDots={true}
          responsive={responsive}
          ssr={true} // means to render carousel on server-side.
          infinite={true}
          autoPlay={false}
          autoPlaySpeed={2000}
          // customTransition='all .5'
          transitionDuration={500}>
          {latestListings.map(
            ({
              _id,
              listingTitle,
              images,
              studiotype,
              services,
              soundengineer,
              studioPricing,
              openingHours,
              locationFeatures,
              studioLocation,
            }) => (
              <ListingCard
                key={_id}
                listingTitle={listingTitle}
                images={images}
                studiotype={studiotype}
                services={services}
                openingHours={openingHours}
                soundengineer={soundengineer}
                studioPricing={studioPricing}
                locationFeatures={locationFeatures}
                studioLocation={studioLocation}
                className='mr-10'
              />
            )
          )}
        </Carousel>
      </article>

      {/* {session ? (
          <>
            <p>Signed in as {session.user.email}</p>
            <button className='text-blue-500' onClick={() => signOut()}>
              Sign out
            </button>
          </>
        ) : (
          <>
            <p>Not signed in</p>
            <button className='text-blue-500' onClick={() => signIn()}>
              Sign in
            </button>
            <br />
          </>
        )}
      </div>
      <div className=' mt-10 w-80 border-4 border-red-300'>
        {session ? (
          <Link href={`/forms/listings`}>
            <a className='text-blue-500'> Produkt hinzufügen (loggedIn=allowed)</a>
          </Link>
        ) : (
          <button className='block text-blue-500' onClick={() => signIn(Github, { callbackUrl: '/forms/listings' })}>
            <a>Produkt hinzufügen (AuthRequire)</a>
          </button>
        )}
        <Link href={`/forms/listings`}>
          <a className='text-blue-500'> Produkt hinzufügen (SSR check/redirect)</a>
        </Link> */}
    </>
  );
}

export async function getServerSideProps(context) {
  const query = context.query;
  await db.connect();

  const latestAddedListings = await StudioListing.find().sort({ $natural: -1 }).limit(10);
  const serializedLatestAddedListings = JSON.parse(JSON.stringify(latestAddedListings));
  console.log('ssr2', latestAddedListings);
  return {
    props: { latestListings: serializedLatestAddedListings || null },
  };
}
