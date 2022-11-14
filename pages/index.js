import { useSession, signIn, signOut } from 'next-auth/react';
import db from '../lib/dbConnect';
import StudioListing from '../models/StudioListing';
import User from '../models/UserModel';
import Head from 'next/head';
import 'react-multi-carousel/lib/styles.css';
import { Latest10Listings } from '../components/Homepage/Latest10Listings';
import { HomepageHero } from '../components/Homepage/HomepageHero';
import { HomepageBanner } from '../components/Homepage/HomepageBanner';
import { HomepageStatsCounter } from '../components/Homepage/HomepageStatsCounter';
import Link from 'next/link';

export default function Home({ latestListings, totalUsers, totalListings }) {
  const { data: session, status } = useSession();
  console.log(status, '1', session);
  return (
    <>
      <Head>
        <title>Tonstudio-Kleinanzeigen</title>
      </Head>
      <HomepageHero />
      <HomepageStatsCounter totalUsers={totalUsers} totalListings={totalListings}></HomepageStatsCounter>
      <Latest10Listings latestListings={latestListings} />
      <HomepageBanner />
      <div className=' mt-10 w-60 border-4 border-red-300'>
        {session ? (
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
        </Link>
      </div>
    </>
  );
}

export async function getServerSideProps(context) {
  await db.connect();
  const latestAddedListings = await StudioListing.find().sort({ $natural: -1 }).limit(10);
  const serializedLatestAddedListings = JSON.parse(JSON.stringify(latestAddedListings));
  const totalListingsCount = await StudioListing.find().count();
  const totalUsersCount = await User.find().count();
  return {
    props: {
      latestListings: serializedLatestAddedListings || null,
      totalListings: totalListingsCount || null,
      totalUsers: totalUsersCount || null,
    },
  };
}
