import React, { useState } from 'react';
//tools
import { DateRange } from 'react-date-range';
import { useRouter } from 'next/router';
//styles
import { MagnifyingGlassIcon, UsersIcon } from '@heroicons/react/24/solid';

function SearchBar() {
	//search
	const [searchInput, setSearchInput] = useState('');
	const router = useRouter();
	const search = () => {
		router.push({
			pathname: '/search',
			query: {
				location: searchInput !== '' ? searchInput : '',
				startDate: startDate.toISOString(),
				endDate: endDate.toISOString(),
				noOfGuests,
				servicesSelected,
			},
		});
		setSearchInput('');
	};
	//date
	const [dateButton, setDateButton] = useState('');
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

	//guests
	const [guestsButton, setGuestsButton] = useState('');
	const [noOfGuests, setNoOfGuest] = useState(1);
	//services
	const [servicesSelected, setServicesSelected] = useState('recording');
	const [servicesButton, setServicesButton] = useState('');
	const handleServicesSelect = (event) => {
		console.log(event.target.value);
		setServicesSelected(event.target.value);
	};
	//buttons
	const handleButtonDate = () => {
		if (guestsButton || servicesButton) {
			setServicesButton('');
			setGuestsButton('');
		}
		setDateButton((before) => !before);
	};
	const handleButtonGuests = () => {
		if (dateButton || servicesButton) {
			setDateButton('');
			setServicesButton('');
		}
		setGuestsButton((before) => !before);
	};
	const handleButtonServices = () => {
		if (dateButton || guestsButton) {
			setDateButton('');
			setGuestsButton('');
		}
		setServicesButton((before) => !before);
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
				<div className='absolute left-0 z-50 flex w-full flex-col gap-8 bg-white pb-5 pt-5'>
					<div className='flex flex-shrink-0 justify-center gap-2'>
						{dateButton ? (
							<button
								onClick={handleButtonDate}
								className='button-active '
							>
								When?
							</button>
						) : (
							<button
								onClick={handleButtonDate}
								className='button '
							>
								When?
							</button>
						)}

						{guestsButton ? (
							<button
								onClick={handleButtonGuests}
								className='button-active '
							>
								Guests?
							</button>
						) : (
							<button
								onClick={handleButtonGuests}
								className='button '
							>
								Guests?
							</button>
						)}

						{servicesButton ? (
							<button
								onClick={handleButtonServices}
								className='button-active '
							>
								Services?
							</button>
						) : (
							<button
								onClick={handleButtonServices}
								className='button '
							>
								Services?
							</button>
						)}
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
						)}
						{servicesButton && (
							<div className='mb-4 flex items-center border-b'>
								<h4 className='h4 flex-grow'>Services</h4>
								<select
									className='select-search ml-5'
									onChange={(event) => handleServicesSelect(event)}
									value={servicesSelected}
									name='services'
								>
									<option value='recording'>Recording</option>
									<option value='mix'>Mix</option>
									<option value='master'>Master</option>
									<option value='musicProduction'>Music Production</option>
									<option value='rentStudio'>Rent a Studio</option>
								</select>
							</div>
						)}
					</div>

					<div className='mx-5 flex items-center justify-between gap-2 border-t-2 pt-5'>
						<button
							onClick={() => setSearchInput('')}
							className='button flex-grow  justify-center border-none bg-red-500 text-white'
						>
							Cancel
						</button>
						<button
							onClick={search}
							className='button flex-grow justify-center border-none bg-green-500 text-white'
						>
							Search
						</button>
					</div>
				</div>
			)}
		</div>
	);
}

export default SearchBar;
