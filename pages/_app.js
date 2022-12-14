//tools
import { SessionProvider } from 'next-auth/react';
import { useEffect } from 'react';
import ProgressBar from '@badrap/bar-of-progress';
import Router from 'next/router';
import { store } from '../slices/index';
import { Provider } from 'react-redux';
//styles
import GlobalStyle from '../components/GlobalStyle';
import '../styles/globals.css';
import '../components/DatePicker/styles.css';
import '../components/DatePicker/default.css';
import 'mapbox-gl/dist/mapbox-gl.css';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  const progress = new ProgressBar({
    size: 3,
    color: '#0f3c69',
    className: 'z-50',
    delay: 100,
  });
  const getLayout = Component.getLayout || ((page) => page);

  Router.events.on('routeChangeStart', progress.start);
  Router.events.on('routeChangeComplete', progress.finish);
  Router.events.on('routeChangeError', progress.finish);

  useEffect(() => {
    const use = async () => {
      (await import('tw-elements')).default;
    };
    use();
  }, []);

  return (
    <>
      <GlobalStyle />
      <Provider store={store}>
        <SessionProvider session={session}>{getLayout(<Component {...pageProps} />)}</SessionProvider>
      </Provider>
    </>
  );
}
export default MyApp;
