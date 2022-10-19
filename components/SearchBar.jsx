import React, { useState } from 'react';
//tools
import { DateRange } from 'react-date-range';
//styles
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid';

function SearchBar() {
	const [searchInput, setSearchInput] = useState('');
	const [startDate, setStartDate] = useState(new Date());
	const [endDate, setEndDate] = useState(new Date());

	const selectionRange = {
		startDate: startDate,
		endDate: endDate,
		key: 'selection',
	};

	const handleSelect = (ranges) => {
		setStartDate(ranges.selection.startDate);
		setEndDate(ranges.selection.endDate);
	};

	return (
		<div>
			<form className='flex  flex-1 items-center space-x-2 rounded-full border border-gray-200 bg-gray-100 px-3 py-1 shadow-sm md:shadow-lg'>
				<MagnifyingGlassIcon className='h-6 w-6 shrink-0 cursor-pointer rounded-full bg-black/30 p-1 text-white' />
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
			<DateRange
				ranges={[selectionRange]}
				rangeColors={['#df1b1b']}
				showMonthAndYearPickers={false}
				onChange={handleSelect}
				minDate={new Date()}
				calendarFocus={'forwards'}
				moveRangeOnFirstSelection={true}
			/>
		</div>
	);
}

export default SearchBar;
