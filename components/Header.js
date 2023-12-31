import React, { useState } from 'react';
import Image from 'next/image';

import LanguageIcon from '@mui/icons-material/Language';
import SearchIcon from '@mui/icons-material/Search';
import MenuIcon from '@mui/icons-material/Menu';
import PersonIcon from '@mui/icons-material/Person';
import PeopleIcon from '@mui/icons-material/People';

import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file

import { DateRangePicker } from 'react-date-range';
import { useRouter } from 'next/router';

function Header({ placeholder }) {
  const [searchInput, setSearchInput] = useState('');
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [numOfGuests, setNumOfGuests] = useState(1);
  const router = useRouter();

  const selectionRange = {
    startDate: startDate,
    endDate: endDate,
    key: 'selection',
  };

  const handleSelect = (ranges) => {
    setStartDate(ranges.selection.startDate);
    setEndDate(ranges.selection.endDate);
  };

  const resetInput = () => {
    setSearchInput('');
    setStartDate(new Date());
    setEndDate(new Date());
    setNumOfGuests(1);
  };

  const search = () => {
    router.push({
      pathname: '/search',
      query: {
        location: searchInput,
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
        numOfGuests: numOfGuests,
      },
    });
  };

  return (
    <header className='sticky top-0 z-50 grid grid-cols-3 bg-white shadow-md p-5 md:px-10'>
      <div
        onClick={() => router.push('/')}
        className='relative flex items-center h-10 cursor-pointer my-auto '
      >
        <Image
          src='https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/Airbnb_Logo_B%C3%A9lo.svg/2560px-Airbnb_Logo_B%C3%A9lo.svg.png'
          sizes='max-height:2.5rem,
              '
          alt=''
          fill
          className='object-contain object-left'
        />
      </div>

      <div className='flex items-center border-2 rounded-full py-2 md:shadow-sm'>
        <input
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          className='flex-grow pl-5 bg-transparent outline-none text-sm text-gray-600 placeholder-gray-400'
          type='text'
          placeholder={placeholder || 'Start your search'}
        />
        <SearchIcon className='md:mx-2 hidden md:inline h-6 bg-red-400 text-white cursor-pointer rounded-full text' />
      </div>

      <div className='flex items-center space-x-4 justify-end'>
        <p className='hidden md:inline cursor-pointer'>Become a host</p>
        <LanguageIcon className='cursor-pointer' />

        <div className='flex items-center space-x-2 border-2 p-2 rounded-full'>
          <MenuIcon className='h-6 cursor-pointer' />
          <PersonIcon className='h-6 cursor-pointer' />
        </div>
      </div>
      {searchInput && (
        <div className='flex flex-col col-span-3 mx-auto mt-2'>
          <DateRangePicker
            ranges={[selectionRange]}
            minDate={new Date()}
            rangeColors={['#FD5B61']}
            onChange={handleSelect}
          />

          <div className='flex items-center border-b mb-4'>
            <h2 className='text-2xl flex-grow font-semibold'>
              Number of Guests
            </h2>
            <PeopleIcon className='h-5' />
            <input
              value={numOfGuests}
              type='number'
              min={1}
              max={12}
              className='w-12 pl-2 text-lg outline-none text-red-400'
              onChange={(e) => setNumOfGuests(e.target.value)}
            />
          </div>
          <div className='flex'>
            <button className='flex-grow text-gray-500' onClick={resetInput}>
              Cancel
            </button>
            <button className='flex-grow text-red-400' onClick={search}>
              Search
            </button>
          </div>
        </div>
      )}
    </header>
  );
}

export default Header;
