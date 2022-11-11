import { useSession, signIn, signOut } from 'next-auth/react';
import db from '../lib/dbConnect';
import StudioListing from '../models/StudioListing';
import Head from 'next/head';
import Image from 'next/image';
import 'react-multi-carousel/lib/styles.css';
import { Latest10Listings } from '../components/Latest10Listings';
import { HomepageHero } from '../components/HomepageHero';

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
      <section className='sm:grid-cols- grid h-screen w-full grid-cols-1'>
        <div className='relative hidden sm:block'>
          <Image
            className='h-full w-full'
            src='/images/Thumbnail-signin.jpg'
            layout='fill'
            objectFit='cover'
            alt='login-image'
          />
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
  const query = context.query;
  await db.connect();

  const latestAddedListings = await StudioListing.find().sort({ $natural: -1 }).limit(10);
  const serializedLatestAddedListings = JSON.parse(JSON.stringify(latestAddedListings));
  console.log('ssr2', latestAddedListings);
  return {
    props: { latestListings: serializedLatestAddedListings || null },
  };
}
