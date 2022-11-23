//tools
import { SessionProvider } from 'next-auth/react';
import { useEffect } from 'react';
//styles
import GlobalStyle from '../components/GlobalStyle';
import '../styles/globals.css';
import '../components/DatePicker/styles.css';
import '../components/DatePicker/default.css';

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  const getLayout = Component.getLayout || ((page) => page);

  useEffect(() => {
    const use = async () => {
      (await import('tw-elements')).default;
    };
    use();
  }, []);

  return (
    <>
      <GlobalStyle />
      <SessionProvider session={session}>{getLayout(<Component {...pageProps} />)}</SessionProvider>
    </>
  );
}
export default MyApp;
