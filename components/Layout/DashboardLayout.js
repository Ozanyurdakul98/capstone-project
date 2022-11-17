import React from 'react';
import Header from '../Header';
import { Footer } from '../Footer';
import Head from 'next/head';

export default function DashboardLayout({ children }) {
  return (
    <div className='bg-site relative overflow-x-hidden'>
      <Head>
        <title>Dashboard</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Header />
      <main className='container mx-auto'>{children}</main>
      <Footer />
    </div>
  );
}
