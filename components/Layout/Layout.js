import Head from 'next/head';
//components
//styles
import Header from '../Header';

import { Footer } from '../Footer';
import { signOut, useSession } from 'next-auth/react';
import { useEffect } from 'react';

export default function Layout({ children }) {
  const { data: session, status } = useSession();
  useEffect(() => {
    if (status === 'loading') return;
    if (session && !session.token.id) {
      signOut({
        callbackUrl: '/signin',
      });
    }
    if (!session?.token) {
      signOut({
        callbackUrl: '/signin',
      });
    }
  }, [status]);
  return (
    <div className="bg-site relative w-full">
      <Head>
        <title>Tonstudio-Kleinanzeigen</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main className="container mx-auto">{children}</main>
      <Footer />
    </div>
  );
}
