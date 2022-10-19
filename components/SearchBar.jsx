import React, { useState } from 'react';
//styles
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid';

function SearchBar() {
	const [searchInput, setSearchInput] = useState('');
	return (
		<div>
			<form className='flex  flex-1 items-center space-x-2 rounded-full border border-gray-200 bg-gray-100 px-3 py-1 shadow-sm md:shadow-lg'>
				<MagnifyingGlassIcon className='h-6 w-6 flex-shrink-0 cursor-pointer rounded-full bg-black/30 p-1 text-white' />
				<input
					className='flex-1 border-none bg-transparent outline-none'
					type='text'
					value={searchInput}
					onChange={(e) => setSearchInput(e.target.value.toLowerCase())}
				/>
				<button
					hidden
					type='submit'
				></button>
			</form>
		</div>
	);
}

export default SearchBar;
