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
  return (
    <div className='mb-20'>
      <Head>
        <title>Tonstudio-Kleinanzeigen</title>
      </Head>
      <HomepageHero />
      <HomepageStatsCounter totalUsers={totalUsers} totalListings={totalListings}></HomepageStatsCounter>
      <Latest10Listings latestListings={latestListings} />
      <HomepageBanner />
    </div>
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
