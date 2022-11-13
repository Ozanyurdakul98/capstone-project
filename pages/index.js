import Head from 'next/head';
import Link from 'next/link';
import styled from 'styled-components';

import { useSession, signIn, signOut } from 'next-auth/react';
import Github from 'next-auth/providers/github';

export default function Home() {
  const { data: session, status } = useSession();
  // console.log(status, session);

  return (
    <>
      <h1>Tonstudio-Kleinanzeigen</h1>
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
