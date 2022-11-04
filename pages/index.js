import Head from 'next/head';
import Image from 'next/image';
import styled from 'styled-components';

import { useSession, signIn, signOut } from 'next-auth/react';

export default function Home() {
  const { data: session } = useSession();
  console.log({ session });
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
        </>
      )}
      <Background>
        <Image
          src='https://unsplash.com/photos/9y7y26C-l4Y/download?ixid=MnwxMjA3fDB8MXxhbGx8fHx8fHx8fHwxNjU5MjcwNjYw&force=true&w=2400'
          alt='Schöne Fische'
          layout='responsive'
          width={2400}
          height={1800}
        />
      </Background>
    </>
  );
}
const Background = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  overflow-y: hidden;
  top: 0;
  left: 0;
  z-index: -10;
  @media (max-width: 600px) {
    display: none;
  }
`;
