import db from '../lib/dbConnect';
import StudioListing from '../models/StudioListing';
import User from '../models/UserModel';
import Head from 'next/head';
import { Latest10Listings } from '../components/Homepage/Latest10Listings';
import { HomepageHero } from '../components/Homepage/HomepageHero';
import { HomepageBanner } from '../components/Homepage/HomepageBanner';
import { HomepageStatsCounter } from '../components/Homepage/HomepageStatsCounter';
import Layout from '../components/Layout/Layout';
import StudioService from '../models/StudioService';
import { HomepageStudioServicesGrid } from '../components/Homepage/HomepageStudioServicesGrid';
import { HomepageStudioTypes } from '../components/Homepage/HomepageStudioTypes';

export default function Home({ latestListings, totalUsers, totalListings, studioServices }) {
  return (
    <div className="mb-20">
      <Head>
        <title>Tonstudio-Kleinanzeigen</title>
      </Head>
      <HomepageHero />
      <HomepageStatsCounter totalUsers={totalUsers} totalListings={totalListings} />
      <HomepageStudioServicesGrid studioServices={studioServices} />
      <Latest10Listings latestListings={latestListings} />
      <HomepageStudioTypes />
      <HomepageBanner />
    </div>
  );
}

Home.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export async function getStaticProps() {
  await db.connect();
  const totalListingsCount = await StudioListing.find().count();
  const totalUsersCount = await User.find().count();
  const latestAddedListings = await StudioListing.find().sort({ $natural: -1 }).limit(10).populate('studioService');
  const serializedLatestAddedListings = JSON.parse(JSON.stringify(latestAddedListings));
  const services = await StudioService.find();
  const sanitizedServices = services.map((service) => ({
    id: service.id,
    image: service.image,
    name: service.name,
    queryString: service.queryString,
    description: service.description,
  }));

  return {
    props: {
      latestListings: serializedLatestAddedListings || null,
      totalListings: totalListingsCount || null,
      totalUsers: totalUsersCount || null,
      studioServices: sanitizedServices || null,
    },
    revalidate: 60,
  };
}
