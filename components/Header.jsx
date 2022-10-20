import React from 'react';
import SearchBar from './SearchBar';

function Header() {
	return (
		<header>
			<nav>
				<div className='flex justify-center'>
					<SearchBar />
				</div>
			</nav>
		</header>
	);
}

export default Header;
