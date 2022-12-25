import Head from 'next/head';
//components
//styles
import Header from '../Header';
import { Footer } from '../Footer';

export default function ResultpageLayout({ children }) {
  return (
    <div className="bg-site relative w-full">
      <Head>
        <title>Studioservices</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
