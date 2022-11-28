import { useSession } from "next-auth/react";
import db from "../lib/dbConnect";
import StudioListing from "../models/StudioListing";
import User from "../models/UserModel";
import Head from "next/head";
import "react-multi-carousel/lib/styles.css";
import { Latest10Listings } from "../components/Homepage/Latest10Listings";
import { HomepageHero } from "../components/Homepage/HomepageHero";
import { HomepageBanner } from "../components/Homepage/HomepageBanner";
import { HomepageStatsCounter } from "../components/Homepage/HomepageStatsCounter";
import Layout from "../components/Layout/Layout";
import StudioService from "../models/StudioService";
export default function Home({ latestListings, totalUsers, totalListings, studioServices }) {
  return (
    <div className='mb-20'>
      <Head>
        <title>Tonstudio-Kleinanzeigen</title>
      </Head>
      <HomepageHero />
      <HomepageStatsCounter
        totalUsers={totalUsers}
        totalListings={totalListings}></HomepageStatsCounter>
      <section className='grid grid-cols-2 '>
        {studioServices.map((service) => (
          <div key={service.id} className='flex justify-center'>
            <div className='max-w-sm rounded-lg bg-white shadow-lg'>
              <a href='#!'>
                <img
                  className='rounded-t-lg'
                  src='https://mdbootstrap.com/img/new/standard/nature/184.jpg'
                  alt=''
                />
              </a>
              <div className='p-6'>
                <h5 className='mb-2 text-xl font-medium text-gray-900'>{service.name}</h5>
                <p className='mb-4 text-base text-gray-700'>{service.description}</p>
                <button
                  type='button'
                  className=' inline-block rounded bg-blue-600 px-6 py-2.5 text-xs font-medium uppercase leading-tight text-white shadow-md transition duration-150 ease-in-out hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg'>
                  Button
                </button>
              </div>
            </div>
          </div>
        ))}
      </section>
      <Latest10Listings latestListings={latestListings} />
      <HomepageBanner />
    </div>
  );
}

Home.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export async function getStaticProps(context) {
  await db.connect();
  const totalListingsCount = await StudioListing.find().count();
  const totalUsersCount = await User.find().count();
  const latestAddedListings = await StudioListing.find()
    .sort({ $natural: -1 })
    .limit(10)
    .populate("studioService");
  const serializedLatestAddedListings = JSON.parse(JSON.stringify(latestAddedListings));
  // const all = await StudioListing.find({}).populate("studioService");
  // const alll = JSON.parse(JSON.stringify(all));
  // console.log("ALLLL", alll);
  const services = await StudioService.find();
  const sanitizedServices = services.map((service) => ({
    id: service.id,
    name: service.name,
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
