//pages & components
import Layout from '../components/Layout';
//tools
import { SessionProvider } from 'next-auth/react';
//styles
import GlobalStyle from '../components/GlobalStyle';
import '../styles/globals.css';
import '../components/DatePicker/styles.css';
import '../components/DatePicker/default.css';

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <>
      <GlobalStyle />
      <SessionProvider session={session}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </SessionProvider>
    </>
  );
}
export default MyApp;
