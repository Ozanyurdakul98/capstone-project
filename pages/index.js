import db from '../lib/dbConnect';
import StudioListing from '../models/StudioListing';
import User from '../models/UserModel';
import Head from 'next/head';
import 'react-multi-carousel/lib/styles.css';
import { Latest10Listings } from '../components/Homepage/Latest10Listings';
import { HomepageHero } from '../components/Homepage/HomepageHero';
import { HomepageBanner } from '../components/Homepage/HomepageBanner';
import { HomepageStatsCounter } from '../components/Homepage/HomepageStatsCounter';
import Layout from '../components/Layout/Layout';
import StudioService from '../models/StudioService';
import { useRouter } from 'next/router';
export default function Home({ latestListings, totalUsers, totalListings, studioServices }) {
  const router = useRouter();
  return (
    <div className="mb-20">
      <Head>
        <title>Tonstudio-Kleinanzeigen</title>
      </Head>
      <HomepageHero />
      <HomepageStatsCounter totalUsers={totalUsers} totalListings={totalListings}></HomepageStatsCounter>
      <div className="mb-40 flex flex-col gap-10 px-2">
        <div className="px-5">
          <h2 className="h2">Studio services</h2>
        </div>
        <section className="grid grid-cols-2 gap-5 md:grid-cols-3">
          {studioServices.map((service) => (
            <article key={service.id} className="flex justify-center">
              <div className="max-w-sm rounded-lg bg-white shadow-lg">
                <a href="#!">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img className="rounded-t-lg" src={service.image} alt="" />
                </a>
                <div className="p-6">
                  <h5 className=" h3 mb-2 text-sm font-medium md:text-lg">{service.name}</h5>
                  <p className=" mb-4 text-xs text-gray-700 line-clamp-3 md:text-base">{service.description}</p>
                  <button
                    type="button"
                    onClick={() =>
                      router.push({
                        pathname: `/studioservice/${service.queryString}`,
                      })
                    }
                    className=" bg-primary inline-block rounded-xl px-6 py-2.5 text-xs font-medium uppercase leading-tight text-white shadow-md transition duration-150 ease-in-out hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg">
                    Show me
                  </button>
                </div>
              </div>
            </article>
          ))}
        </section>
      </div>
      <Latest10Listings latestListings={latestListings} />
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
