import React from 'react';
import SearchBar from './SearchBar';

function Header() {
  return (
    <header id='top' className='mb-14'>
      <nav>
        <div className='flex justify-center'>
          <SearchBar />
        </div>
      </nav>
    </header>
  );
}

export default Header;
