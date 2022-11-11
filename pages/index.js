import { useSession, signIn, signOut } from 'next-auth/react';
import db from '../lib/dbConnect';
import StudioListing from '../models/StudioListing';
import Head from 'next/head';
import Image from 'next/image';
import 'react-multi-carousel/lib/styles.css';
import { Latest10Listings } from '../components/Latest10Listings';
import { HomepageHero } from '../components/HomepageHero';
import Link from 'next/link';

export default function Home({ latestListings }) {
  console.log(latestListings);
  const { data: session, status } = useSession();

  return (
    <>
      <Head>
        <title>Tonstudio-Kleinanzeigen</title>
      </Head>
      <HomepageHero></HomepageHero>
      <Latest10Listings latestListings={latestListings}></Latest10Listings>
      <section className='relative grid h-screen w-full'>
        <div className='relative grid h-screen w-full '>
          <Image
            src='/images/Banner-homepage1.jpg'
            objectPosition='top'
            layout='fill'
            objectFit='cover'
            alt='login-image'
          />
        </div>
        <div className='absolute top-1/2 left-1/2 w-80 -translate-x-1/2 -translate-y-1/2 transform rounded-lg bg-white/90 py-10 px-6 font-thin md:left-1/3 lg:left-1/3 lg:text-lg xl:text-xl'>
          <p className='mb-4'>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam ipsa ipsam est quo atque quaerat veritatis
            expedita adipisci soluta, ab veniam delectus sequi, ipsum accusantium explicabo non laudantium facere
            commodi.
          </p>
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Libero quas officiis accusamus corporis odio
            voluptatem quidem iure earum, cupiditate voluptates consequatur. Vero architecto amet provident delectus,
            similique consequuntur harum blanditiis incidunt distinctio libero omnis ullam sapiente cumque.
          </p>
          <Link href='/signup'>
            <button className=' button mt-4 text-base font-semibold'>Become a Host</button>
          </Link>
        </div>
      </section>
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
  await db.connect();

  const latestAddedListings = await StudioListing.find().sort({ $natural: -1 }).limit(10);
  const serializedLatestAddedListings = JSON.parse(JSON.stringify(latestAddedListings));
  return {
    props: { latestListings: serializedLatestAddedListings || null },
  };
}
