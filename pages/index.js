import { useSession, signIn, signOut } from 'next-auth/react';
import db from '../lib/dbConnect';
import StudioListing from '../models/StudioListing';
import Head from 'next/head';
import 'react-multi-carousel/lib/styles.css';
import { Latest10Listings } from '../components/Homepage/Latest10Listings';
import { HomepageHero } from '../components/Homepage/HomepageHero';
import { HomepageBanner } from '../components/Homepage/HomepageBanner';

export default function Home({ latestListings }) {
  console.log(latestListings);
  const { data: session, status } = useSession();

  return (
    <>
      <Head>
        <title>Tonstudio-Kleinanzeigen</title>
      </Head>
      <HomepageHero />
      <Latest10Listings latestListings={latestListings} />
      <HomepageBanner />
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
