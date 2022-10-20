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
	//buttons
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
			<form className='flex  flex-1 items-center space-x-2 rounded-full border border-gray-300 bg-gray-100 px-3 py-1 shadow-sm md:shadow-lg'>
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
			{searchInput && (
				<div className='absolute left-0 flex w-full flex-col gap-8 bg-white pb-5 pt-5 '>
					<>
						<div className='ml-5 flex flex-shrink-0  gap-2'>
							<div onClick={handleButtonDate}>
								{dateButton ? (
									<button className='button-active '>When?</button>
								) : (
									<button className='button '>When?</button>
								)}
							</div>
							<div onClick={handleButtonGuests}>
								{guestsButton ? (
									<button className='button-active '>Guests?</button>
								) : (
									<button className='button '>Guests?</button>
								)}
							</div>
							<div onClick={handleButtonServices}>
								{servicesButton ? (
									<button className='button-active '>Services?</button>
								) : (
									<button className='button '>Services?</button>
								)}
							</div>
						</div>
						<div className=' flex w-screen flex-col items-center justify-center'>
							{dateButton && (
								<DateRange
									className='max-w-min px-10'
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
									<h4 className='h4 flex-grow'>Number of Guests</h4>
									<UsersIcon className='icon ml-5' />
									<input
										className='number-search'
										type='number'
										min={1}
										max={20}
										value={noOfGuests}
										onChange={(e) => setNoOfGuest(e.target.value)}
									/>
								</div>
							)}{' '}
							{servicesButton && (
								<div className='mb-4 flex items-center border-b'>
									<h4 className='h4 flex-grow'>Services</h4>
									<select
										className='select-search ml-5'
										name='services'
									>
										<option
											className=''
											value='recording'
										>
											Recording
										</option>
										<option value='mix'>Mix</option>
										<option value='master'>Master</option>
										<option value='musicProduction'>Music Production</option>
										<option value='rentStudio'>Rent a Studio</option>
									</select>
								</div>
							)}
						</div>
					</>
					<div className='flex justify-between'>
						<button>Cancel</button>
						<button>Search</button>
					</div>
				</div>
			)}
		</div>
	);
}

export default SearchBar;
