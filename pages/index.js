import Head from 'next/head';
import Link from 'next/link';
import styled from 'styled-components';

import { useSession, signIn, signOut } from 'next-auth/react';
import Github from 'next-auth/providers/github';

export default function Home() {
  const { data: session, status } = useSession();
  console.log(status);

  console.log(session);
  return (
    <>
      <Head>
        <title>Homepage</title>
      </Head>
      <h1>Tonstudio-Kleinanzeigen</h1>
      <p className='mt-20 text-blue-500 underline'>Log dich ein</p>
      {session ? (
        <>
          <p>Signed in as {session.user.email}</p>
          <button onClick={() => signOut()}>Sign out</button>
        </>
      ) : (
        <>
          <p>Not signed in</p>
          <button onClick={() => signIn()}>Sign in</button>
          <br />
        </>
      )}
      {session ? (
        <Link href={`/forms/listings`}>
          <a> Produkt hinzufügen (loggedIn)</a>
        </Link>
      ) : (
        <button onClick={() => signIn(Github, { callbackUrl: '/forms/listings' })}>
          <a>Produkt hinzufügen (authCheck)</a>
        </button>
      )}{' '}
      <br />
      <Link href={`/forms/listings`}>
        <a> Produkt hinzufügen (just href)</a>
      </Link>
    </>
  );
}
