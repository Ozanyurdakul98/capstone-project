import React from 'react';
import SearchBar from './SearchBar';
import {
  GlobeAsiaAustraliaIcon,
  BuildingOfficeIcon,
  ChatBubbleBottomCenterTextIcon,
  PlusIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import Logo from './Logo';
import { useSession } from 'next-auth/react';
import { MyLink } from './MyLink';
import { HeaderUsermenu } from './HeaderUsermenu';
import { HeaderPagemenu } from './HeaderPagemenu';
import { HeaderSignupButton } from './HeaderSignupButton';

function Header() {
  const { data: session, status } = useSession();

  return (
    <header id='top' className='relative z-50'>
      <nav className='grid grid-cols-sm3 bg-white py-2 px-2 shadow-md md:py-4 md:px-4 lg:grid-cols-3'>
        {/* Left */}
        <div className='mt-2 flex flex-auto'>
          {/* Logo */}
          <Link href='/'>
            <div className='relative hidden cursor-pointer sm:inline  sm:w-12'>
              <Logo width={'45px'} height={'45px'} />
            </div>
          </Link>
          <HeaderPagemenu />
        </div>
        {/* middle */}
        <SearchBar />
        {/* Righth */}
        <div className='flex flex-1 items-center justify-end'>
          <div className='mx-2 hidden items-center space-x-2 text-gray-500 lg:inline-flex xl:mx-6'>
            <Link href='/search/all'>
              <GlobeAsiaAustraliaIcon className='icon' />
            </Link>
            <hr className='h-10 border border-gray-100' />
            <MyLink href='/dashboard/addstudio' className=''>
              <PlusIcon className='icon' />
            </MyLink>
          </div>
          <HeaderUsermenu session={session} />
          {session ? null : (
            <div className='hidden 2xl:block'>
              <HeaderSignupButton />
            </div>
          )}
        </div>
      </nav>
    </header>
  );
}

export default Header;
