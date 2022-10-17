import Head from 'next/head';
import styled from 'styled-components';
export default function Home() {
	return (
		<di className='bg-red-300'>
			test
			<Main className=' w-2 bg-red-400'>Test</Main>
		</di>
	);
}

const Main = styled.main`
	width: 500px;
`;
