//pages & components
import Layout from '../components/Layout';
//styles
import GlobalStyle from '../components/GlobalStyle';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
	return (
		<>
			<GlobalStyle />
			<Layout>
				<Component {...pageProps} />
			</Layout>
		</>
	);
}
export default MyApp;