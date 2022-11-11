import Head from 'next/head';
import React from 'react';
//components
//styles
import Header from './Header';

import { Footer } from './Homepage/Footer';

export default function Layout({ children }) {
  return (
    <div className='bg-site  relative'>
      <Head>
        <title>Tonstudio-Kleinanzeigen</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Header />
      <main className='container mx-auto'>{children}</main>
      <Footer />
    </div>
  );
}
