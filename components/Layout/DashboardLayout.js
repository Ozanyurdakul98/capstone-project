import Header from '../Header';
import { Footer } from '../Footer';
import Head from 'next/head';
import Navigation from '../Dashboard/Navigation';
import { signOut, useSession } from 'next-auth/react';
import { useEffect } from 'react';

export default function DashboardLayout({ children }) {
  const { data: session, status } = useSession();
  useEffect(() => {
    if (status === 'loading') return;
    if (session && !session?.token.id) {
      signOut({
        callbackUrl: '/signin',
      });
    }
  }, [status]);
  return (
    <div className="bg-secondary">
      <Head>
        <title>Dashboard</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <div className="bg-secondary relative flex min-h-screen 2xl:container  2xl:mx-auto">
        <Navigation />
        <main className="my-2 mr-2 grow overflow-x-hidden rounded-3xl bg-white p-5 2xl:mr-[175px]">{children}</main>
      </div>
      <Footer dashboard={true} />
    </div>
  );
}
