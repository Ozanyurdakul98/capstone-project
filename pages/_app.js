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
  const isSignIn = ['signup', 'signin'].indexOf(Component.name) !== -1;

  return (
    <>
      <GlobalStyle />
      <SessionProvider session={session}>
        {!isSignIn ? (
          <Layout>
            <Component {...pageProps} />
          </Layout>
        ) : (
          <Component {...pageProps} />
        )}
      </SessionProvider>
    </>
  );
}
export default MyApp;
