import Head from 'next/head';
import Link from 'next/link';
import Lottie from 'lottie-react';
import { useSession, signIn, signOut } from 'next-auth/react';
import musicStudio1 from '../public/animations/musicStudio1.json';
export default function Home() {
  const { data: session, status } = useSession();
  return (
    <>
      <Head>
        <title>Tonstudio-Kleinanzeigen</title>
      </Head>
      <section className='m-auto mt-4 flex flex-col-reverse items-center justify-center px-4 shadow-sm md:flex-row lg:gap-10'>
        <div className=' mb-10 max-h-min max-w-md rounded-3xl bg-white p-2 px-10 pb-10 shadow-xl sm:flex sm:flex-col sm:items-center  sm:bg-none md:shadow-none'>
          <h1 className='mt-4 mb-2 text-4xl font-bold leading-tight '>Tonstudio-Kleinanzeigen</h1>
          <p className='text-sm'>
            Is made for the community of music producers and amateur musicians to offer the oppertunity for a free
            digital business card and therefore having more client traction and more efficient targetting.
          </p>
          <p className='pt-2 text-sm'>
            Describe your services & studio and let the users decide by comparing your listing with others.
            <br />
            <Link href='/search'>
              <a className=' text-blue-600 hover:underline' href=''>
                View all listings
              </a>
            </Link>
          </p>
        </div>
        <div className='flex-shrink-0'>
          <Lottie animationData={musicStudio1} loop={true} className='' />
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
