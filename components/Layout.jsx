import Head from 'next/head';
import React from 'react';
import styled from 'styled-components';

export default function Layout({ children }) {
	return (
		<div>
			<Head>
				<title>Tonstudio-Kleinanzeigen</title>
				<link
					rel='icon'
					href='/favicon.ico'
				/>
			</Head>
			<StyledHeader>Navigation()</StyledHeader>
			<StyledMain className='container'>{children}</StyledMain>
			<StyledFooter>@Copyright Tonstudio-Kleinanzeigen 2022</StyledFooter>
		</div>
	);
}

const StyledHeader = styled.header``;
const StyledMain = styled.main`
	margin: 0 auto;
`;
const StyledFooter = styled.footer``;
