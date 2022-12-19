import db from '../lib/dbConnect';
import StudioListing from '../models/StudioListing';
import StudioService from '../models/StudioService';
import User from '../models/User';
import Head from 'next/head';
import { Latest10Studios } from '../components/Homepage/Latest10Studios';
import { HomepageHero } from '../components/Homepage/HomepageHero';
import { HomepageBanner } from '../components/Homepage/HomepageBanner';
import { HomepageStatsCounter } from '../components/Homepage/HomepageStatsCounter';
import Layout from '../components/Layout/Layout';
import AdminStudioService from '../models/AdminCreateStudioService';
import { HomepageStudioServicesGrid } from '../components/Homepage/HomepageStudioServicesGrid';
import { HomepageStudioTypesGrid } from '../components/Homepage/HomepageStudioTypesGrid';

export default function Home({ latestStudios, totalUsers, totalStudios, totalStudioservices, studioServices }) {
  return (
    <div className="mb-20">
      <Head>
        <title>Tonstudio-Kleinanzeigen</title>
      </Head>
      <HomepageHero />
      <HomepageStatsCounter
        totalUsers={totalUsers}
        totalStudioservices={totalStudioservices}
        totalListings={totalStudios}
      />
      <Latest10Studios latestListings={latestStudios} />
      <HomepageStudioServicesGrid studioServices={studioServices} />
      <HomepageStudioTypesGrid />
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
  const totalStudioServicesCount = await StudioService.find().count();
  const totalUsersCount = await User.find().count();

  const latestAddedStudios = await StudioListing.find().sort({ $natural: -1 }).limit(10);
  const serializedLatestAddedStudios = JSON.parse(JSON.stringify(latestAddedStudios));
  const services = await AdminStudioService.find();
  const sanitizedServices = services.map((service) => ({
    id: service.id,
    image: service.image,
    name: service.name,
    queryString: service.queryString,
    description: service.description,
  }));

  return {
    props: {
      latestStudios: serializedLatestAddedStudios || null,
      totalStudios: totalListingsCount || null,
      totalStudioservices: totalStudioServicesCount || null,
      totalUsers: totalUsersCount || null,
      studioServices: sanitizedServices || null,
    },
    revalidate: 60,
  };
}
