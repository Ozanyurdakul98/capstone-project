import React from 'react';
import SearchBar from './SearchBar';
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid';
import {
  Square2StackIcon,
  GlobeAsiaAustraliaIcon,
  HandRaisedIcon,
  BuildingOfficeIcon,
  ChatBubbleBottomCenterTextIcon,
  PlusIcon,
  PlayPauseIcon,
  ArrowRightOnRectangleIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Logo from './Logo';
import { useSession, signIn } from 'next-auth/react';
import { MyLink } from './MyLink';
import { HeaderUsermenu } from './HeaderUsermenu';
import { HeaderPagemenu } from './HeaderPagemenu';

function HeaderSignupButton() {
  return (
    <div
      onClick={() => router.push('login?redirect=/checkout')}
      className=' flex hidden flex-shrink-0  cursor-pointer items-center space-x-2 rounded-md border border-gray-100 p-2 lg:flex'>
      <div className='h-5 w-5 flex-shrink-0'>
        <ArrowRightOnRectangleIcon className='text-gray-400' />
      </div>
      <p className='text-gray-400'>Sign in</p>
    </div>
  );
}

function Header() {
  const { data: session, status } = useSession();

  return (
    <header id='top' className='mb-14'>
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
          {/* Icon's navigation */}

          <div className='mx-2 hidden items-center space-x-2 text-gray-500 lg:inline-flex xl:mx-6'>
            <Link href='/search/all'>
              <GlobeAsiaAustraliaIcon className='icon' />
            </Link>
            <hr className='h-10 border border-gray-100' />
            <MyLink href='/listingform' className=''>
              <PlusIcon className='icon' />
            </MyLink>
            <ChatBubbleBottomCenterTextIcon className='icon' />
            <BuildingOfficeIcon className='icon' />
          </div>
          {session ? <HeaderUsermenu session={session} /> : <HeaderSignupButton />}
          {/* Login Button */}
        </div>
      </nav>
    </header>
  );
}

export default Header;
