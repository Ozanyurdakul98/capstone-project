import { useState } from 'react';
//Components
import {
  BackgroundOverlayFullscreen as ClickToCloseMax,
  BackgroundOverlay as ClickToCloseMin,
} from './BackgroundOverlay';
//tools
import { DateRange } from 'react-date-range';
import format from 'date-fns/format';
import { useRouter } from 'next/router';
//styles
import { MagnifyingGlassIcon, UsersIcon, PlusCircleIcon, MinusCircleIcon } from '@heroicons/react/24/solid';

function SearchBar() {
  //search
  const [searchInput, setSearchInput] = useState('');
  const [activePanel, setActivePanel] = useState('calendar');
  const router = useRouter();
  const handleSearch = (event) => {
    event.preventDefault();
    if (searchInput !== '') {
      router.push({
        pathname: '/search',
        query: {
          location: searchInput,
          startDate: startDate.toISOString(),
          endDate: endDate.toISOString(),
          noOfGuests,
          servicesSelected,
        },
      });

      setSearchInput('');
    } else {
      router.push({
        pathname: '/search/all-studioservices',
        query: {},
      });
    }
  };
  //date
  const [calenderOpen, setCalenderOpen] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const handleClickToCloseSearch = () => {
    setSearchInput('');
  };
  const handleClickToCloseCalendar = () => {
    setCalenderOpen(false);
  };
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
  const [noOfGuests, setNoOfGuest] = useState(1);
  const incrementNumberGuests = () => {
    setNoOfGuest((counter) => counter + 1);
  };
  const decrementNumberGuests = () => {
    setNoOfGuest((counter) => counter - 1);
  };
  //services
  const [servicesSelected, setServicesSelected] = useState('recording');
  const handleServicesSelect = (event) => {
    setServicesSelected(event.target.value);
  };
  return (
    <div className="flex w-[220px] items-center justify-center sm:w-full lg:pr-5 xl:pr-0">
      {/* SearchInput */}
      <form
        onSubmit={handleSearch}
        className="relative z-40 flex flex-1 items-center rounded-full border border-gray-300 bg-gray-100 px-3 py-1 shadow-sm sm:space-x-2 md:shadow-lg">
        <MagnifyingGlassIcon className="h-6 w-6 shrink-0 cursor-pointer rounded-full bg-black/30 p-1 text-white" />
        <input
          className="relative z-40 w-full flex-1 border-none bg-transparent outline-none"
          type="text"
          placeholder="type your location "
          value={searchInput}
          onChange={(event) => setSearchInput(event.target.value.toLowerCase())}
        />
      </form>
      {/* SearchInput-DropDown */}
      {searchInput && (
        <>
          <div className="searchFadein fixed top-16 z-40 mx-auto flex min-h-64 w-full flex-col  rounded-2xl  bg-white  py-5 shadow-xxl md:top-20 md:min-h-72 md:w-11/12 lg:inset-x-0 lg:w-10/12 xl:inset-x-auto  xl:w-6/12">
            <div className="relative  flex min-h-20  items-center justify-center gap-2">
              <button
                onClick={() => setActivePanel('calendar')}
                className={activePanel === 'calendar' ? 'button-active z-40' : 'button z-40'}>
                When?
              </button>
              <button
                onClick={() => setActivePanel('guests')}
                className={activePanel === 'guests' ? 'button-active z-40' : 'button z-40'}>
                Guests?
              </button>
              <button
                onClick={() => setActivePanel('services')}
                className={activePanel === 'services' ? 'button-active z-40' : 'button z-40'}>
                Services?
              </button>
            </div>
            <div className=" flex min-h-28 w-full  flex-col items-center ">
              {activePanel === 'calendar' && (
                <div className="flex max-w-min flex-col items-center justify-center">
                  <input
                    className="date-search "
                    value={format(startDate, 'dd/MM/yy') + ' - ' + format(endDate, 'dd/MM/yy')}
                    readOnly
                    onClick={() => {
                      setCalenderOpen((previous) => !previous);
                    }}
                  />
                  {calenderOpen && (
                    <>
                      <DateRange
                        className="relative z-40 max-w-min"
                        ranges={[selectionRange]}
                        rangeColors={['#df1b1b']}
                        showMonthAndYearPickers={false}
                        onChange={handleSelect}
                        minDate={new Date()}
                        calendarFocus={'forwards'}
                        moveRangeOnFirstSelection={false}
                      />
                      <ClickToCloseMin onClick={() => handleClickToCloseCalendar()} />
                    </>
                  )}
                </div>
              )}
              {activePanel === 'guests' && (
                <div className="mb-4 flex items-center border-b">
                  <h4 className="h4 grow">Number of Guests</h4>
                  <UsersIcon className="icon ml-5" />
                  <div className="ml-5 flex items-center">
                    <button
                      className="icon-big cursor-pointer"
                      onClick={decrementNumberGuests}
                      disabled={noOfGuests === 1}>
                      <MinusCircleIcon />
                    </button>
                    <input
                      className="number-search text-center disabled:text-white"
                      type="number"
                      min={1}
                      max={15}
                      value={noOfGuests}
                      disabled
                    />
                    <button className="icon-big" onClick={incrementNumberGuests} disabled={noOfGuests === 15}>
                      <PlusCircleIcon />
                    </button>
                  </div>
                </div>
              )}
              {activePanel === 'services' && (
                <div className="mb-4 flex items-center border-b">
                  <h4 className="h4 grow">Services</h4>
                  <select
                    className="select-search ml-5"
                    onChange={(event) => handleServicesSelect(event)}
                    value={servicesSelected}
                    name="services">
                    <option value="recording">Recording</option>
                    <option value="mix">Mix</option>
                    <option value="master">Master</option>
                    <option value="musicProduction">Music Production</option>
                    <option value="podcast & Audiobook">Podcast & Audiobook</option>
                    <option value="rent Studio">Rent a Studio</option>
                  </select>
                </div>
              )}
            </div>
            <div className="relative z-40 mx-5 flex h-16 items-center justify-between gap-2 border-t-2 pt-5">
              <button
                onClick={() => setSearchInput('')}
                className="button grow  justify-center border-none bg-red-500 text-white">
                Cancel
              </button>
              <button onClick={handleSearch} className="button grow justify-center border-none bg-green-500 text-white">
                Search
              </button>
            </div>
          </div>
          <ClickToCloseMax style={'bg-black/50 searchBarModal'} onClick={() => handleClickToCloseSearch()} />
        </>
      )}
    </div>
  );
}

export default SearchBar;
