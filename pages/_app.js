//pages & components
import Layout from '../components/Layout';
import DashboardLayout from '../components/Layout/DashboardLayout';
import { Footer } from '../components/Footer';
//tools
import { SessionProvider } from 'next-auth/react';
//styles
import GlobalStyle from '../components/GlobalStyle';
import '../styles/globals.css';
import '../components/DatePicker/styles.css';
import '../components/DatePicker/default.css';

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  const isSignIn = ['Signup', 'Signin'].indexOf(Component.name) !== -1;
  const isDashboard = Component.name.includes('Dashboard');
  console.log(isDashboard);

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
        ) : isDashboard ? (
          <DashboardLayout>
            <Component {...pageProps} />
          </DashboardLayout>
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
