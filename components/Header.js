import React from 'react';
import SearchBar from './SearchBar';
import { ChevronDownIcon, MagnifyingGlassIcon, HomeIcon } from '@heroicons/react/24/solid';
import {
  Square2StackIcon,
  GlobeAsiaAustraliaIcon,
  ChatBubbleBottomCenterTextIcon,
  HandRaisedIcon,
  BuildingOfficeIcon,
  PlusIcon,
  PlayPauseIcon,
  Bars2Icon,
  ArrowRightOnRectangleIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Logo from './Logo';

function Header() {
  return (
    <header id='top' className='mb-14'>
      <nav className='grid grid-cols-sm3 bg-white py-2 px-2 shadow-md md:py-4 md:px-4 lg:grid-cols-3'>
        {/* Left */}
        <div className='flex flex-auto'>
          {/* Logo */}
          <Link href='/'>
            <div className='relative hidden cursor-pointer sm:inline  sm:w-12'>
              <Logo />
            </div>
          </Link>
          {/* Pages navigation */}
          <div className='mx-2 flex cursor-pointer items-center md:mx-5 xl:min-w-[300px]'>
            <Link href='/'>
              <HomeIcon className='h-5 w-5' />
            </Link>
            <p className='flex-b1 ml-2 hidden md:inline'>Home</p>
            <ChevronDownIcon className='h-5 w-5' />
          </div>
        </div>
        {/* middle */}
        <SearchBar />
        {/* Righth */}
        <div className='flex flex-1 items-center justify-end'>
          {/* Icon's navigation */}
          <div className='mx-2 hidden items-center space-x-2 text-gray-500 lg:inline-flex xl:mx-6'>
            <Square2StackIcon className='icon' />
            <GlobeAsiaAustraliaIcon className='icon' />
            <PlayPauseIcon className='icon' />
            <hr className='h-10 border border-gray-100' />
            <HandRaisedIcon className='icon' />
            <Link href='/createlisting'>
              <PlusIcon className='icon' />
            </Link>
            <ChatBubbleBottomCenterTextIcon className='icon' />
            <BuildingOfficeIcon className='icon' />
          </div>

          {/* Burger menu */}
          <div className='ml-5 flex items-center  lg:hidden'>
            <Bars2Icon className='icon ' />
          </div>

          {/* Login menu */}
          <div
            onClick={() => router.push('login?redirect=/checkout')}
            className='hidden flex-shrink-0  cursor-pointer items-center space-x-2 rounded-md border border-gray-100 p-2 lg:flex'>
            <div className='h-5 w-5 flex-shrink-0'>
              <ArrowRightOnRectangleIcon className='text-gray-400' />
            </div>
            <p className='text-gray-400'>Sign in</p>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;
