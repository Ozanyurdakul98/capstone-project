import React, { useState } from 'react';
//tools
import { DateRange } from 'react-date-range';
//styles
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { MagnifyingGlassIcon, UsersIcon } from '@heroicons/react/24/solid';

function SearchBar() {
	const [searchInput, setSearchInput] = useState('');
	//date
	const [dateButton, setDateButton] = useState('');
	const [startDate, setStartDate] = useState(new Date());
	const [endDate, setEndDate] = useState(new Date());
	const selectionRange = {
		startDate: startDate,
		endDate: endDate,
		key: 'selection',
	};
	//guests
	const [guestsButton, setGuestsButton] = useState('');
	const [noOfGuests, setNoOfGuest] = useState(1);
	//services
	const [servicesButton, setServicesButton] = useState('');

	const handleButtonDate = () => setDateButton((before) => !before);
	const handleButtonGuests = () => setGuestsButton((before) => !before);
	const handleButtonServices = () => setServicesButton((before) => !before);

	const handleSelect = (ranges) => {
		setStartDate(ranges.selection.startDate);
		setEndDate(ranges.selection.endDate);
	};

	return (
		<div className='relative w-full'>
			{/* SearchInput */}
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

			{/* SearchInput-DropDown */}
			<div className='absolute left-0 flex  w-full gap-2 bg-white '>
				{searchInput && (
					<>
						<div className='flex-shrink-0'>
							<div onClick={handleButtonDate}>
								<button className=' max-h-8 border border-black'>Check In</button>
							</div>
							<div onClick={handleButtonGuests}>
								<button className=' max-h-8 border border-black'>Guests</button>
							</div>{' '}
							<div onClick={handleButtonServices}>
								<button className=' max-h-8 border border-black'>Services</button>
							</div>
						</div>
						<div className='flex w-full flex-col justify-center'>
							{dateButton && (
								<DateRange
									className='transition'
									ranges={[selectionRange]}
									rangeColors={['#df1b1b']}
									showMonthAndYearPickers={false}
									onChange={handleSelect}
									minDate={new Date()}
									calendarFocus={'forwards'}
									moveRangeOnFirstSelection={false}
								/>
							)}
							{guestsButton && (
								<div className='mb-4 flex items-center border-b'>
									<h4 className='flex-grow text-lg font-semibold'>Number of Guests</h4>
									<UsersIcon className='h-5 ' />
									<input
										className='w-12 border-none pl-2 text-lg outline-none'
										type='number'
										min={1}
										value={noOfGuests}
										onChange={(e) => setNoOfGuest(e.target.value)}
									/>
								</div>
							)}{' '}
							{servicesButton && (
								<div className='mb-4 flex items-center border-b'>
									<h4 className='flex-grow text-lg font-semibold'>Services</h4>
									<input type='text' />
								</div>
							)}
						</div>
					</>
				)}
			</div>
		</div>
	);
}

export default SearchBar;
