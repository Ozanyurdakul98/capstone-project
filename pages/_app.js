//pages & components
import Layout from '../components/Layout';
//tools
import { SessionProvider } from 'next-auth/react';
//styles
import GlobalStyle from '../components/GlobalStyle';
import '../styles/globals.css';
import '../components/DatePicker/styles.css';
import '../components/DatePicker/default.css';
import { Footer } from '../components/Homepage/Footer';

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  const isSignIn = ['Signup', 'Signin'].indexOf(Component.name) !== -1;
  const isDashboard = ['Dashboard'].indexOf(Component.name) !== -1;

  return (
    <>
      {/* <>
      <GlobalStyle />
      <SessionProvider session={session}>
        {isSignIn ? (
          <>
            <Component {...pageProps} />
            <Footer />
          </>
        ) : (
          <Layout>
            <Component {...pageProps} />
          </Layout>
        )}
      </SessionProvider>
    </>     */}
      <GlobalStyle />
      <SessionProvider session={session}>
        {isSignIn ? (
          <>
            <Component {...pageProps} />
            <Footer />
          </>
        ) : (
          <Layout>
            <Component {...pageProps} />
          </Layout>
        )}
      </SessionProvider>
    </>
  );
}
export default MyApp;
