import React from 'react';
import Header from '../Header';
import { Footer } from '../Footer';
import Head from 'next/head';
import Navigation from '../Dashboard/Navigation';

export default function DashboardLayout({ children }) {
  return (
    <div className='bg-site relative overflow-x-hidden'>
      <Head>
        <title>Dashboard</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Header />
      <div className='flex min-h-screen'>
        <Navigation />
        <main className='my-2 mr-2 grow rounded-3xl bg-white p-5'>{children}</main>
      </div>
      <Footer />
    </div>
  );
}
