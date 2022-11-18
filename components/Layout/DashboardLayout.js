import React from 'react';
import Header from '../Header';
import { Footer } from '../Footer';
import Head from 'next/head';
import Navigation from '../Dashboard/Navigation';

export default function DashboardLayout({ children }) {
  return (
    <>
      <Head>
        <title>Dashboard</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Header />
      <div className='bg-primary relative flex min-h-screen  overflow-x-hidden'>
        <Navigation />
        <main className='my-2 mr-2 grow rounded-3xl bg-white px-5 2xl:mr-[175px]'>{children}</main>
      </div>
      <Footer />
    </>
  );
}
