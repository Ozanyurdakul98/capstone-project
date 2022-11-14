import React from 'react';
import SearchBar from './SearchBar';
import { ChevronDownIcon, MagnifyingGlassIcon, HomeIcon } from '@heroicons/react/24/solid';
import {
  Square2StackIcon,
  GlobeAsiaAustraliaIcon,
  HandRaisedIcon,
  BuildingOfficeIcon,
  ChatBubbleBottomCenterTextIcon,
  PlusIcon,
  PlayPauseIcon,
  Bars2Icon,
  ArrowRightOnRectangleIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Logo from './Logo';
import { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { useSession, signIn, signOut } from 'next-auth/react';
import { MyLink } from './MyLink';

function Header() {
  const { data: session, status } = useSession();

  function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
  }
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
          {/* Pages navigation */}
          <ul className='mx-2 flex cursor-pointer items-center md:mx-5 xl:min-w-[300px]'>
            <li className='flex-b1 ml-2 md:inline'>
              <Menu as='div' className='relative inline-block text-left outline-none'>
                <Menu.Button className='flex items-center gap-1'>
                  <Link href='/'>
                    <HomeIcon className='mb-1 h-5 w-5' />
                  </Link>
                  <p className='font-semibold'>Pages</p>
                  <ChevronDownIcon className='h-5 w-5' />
                </Menu.Button>
                <Transition
                  as={Fragment}
                  enter='transition ease-out duration-100'
                  enterFrom='transform opacity-0 scale-95'
                  enterTo='transform opacity-100 scale-100'
                  leave='transition ease-in duration-75'
                  leaveFrom='transform opacity-100 scale-100'
                  leaveTo='transform opacity-0 scale-95'>
                  <Menu.Items className='absolute left-0 z-50 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg  focus:outline-none'>
                    <div className='py-1'>
                      <Menu.Item>
                        {({ active }) => (
                          <MyLink
                            href='/'
                            className={classNames(
                              active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                              'block px-4 py-2 text-sm'
                            )}>
                            Home
                          </MyLink>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <MyLink
                            href='#'
                            className={classNames(
                              active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                              'block px-4 py-2 text-sm'
                            )}>
                            Recording
                          </MyLink>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <MyLink
                            href='#'
                            className={classNames(
                              active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                              'block px-4 py-2 text-sm'
                            )}>
                            Mix & Master
                          </MyLink>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <MyLink
                            href='#'
                            className={classNames(
                              active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                              'block px-4 py-2 text-sm'
                            )}>
                            Musicproduction
                          </MyLink>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <MyLink
                            href='#'
                            className={classNames(
                              active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                              'block px-4 py-2 text-sm'
                            )}>
                            Rent Studio
                          </MyLink>
                        )}
                      </Menu.Item>
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu>
            </li>
          </ul>
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

          {/* Burger menu */}
          <ul className='mx-2 flex cursor-pointer items-center md:mx-5 xl:min-w-[300px]'>
            <li className='flex-b1 ml-2 md:inline'>
              <Menu as='div' className='relative  mt-2 inline-block text-left outline-none'>
                <Menu.Button className='flex justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none '>
                  <div className='hidden sm:inline-flex'>
                    Options
                    <ChevronDownIcon className='-mr-1 ml-2 h-5 w-5' aria-hidden='true' />
                  </div>
                  <div className='sm:hidden'>
                    <Bars2Icon className='icon ' />
                  </div>
                </Menu.Button>
                <Transition
                  as={Fragment}
                  enter='transition ease-out duration-100'
                  enterFrom='transform opacity-0 scale-95'
                  enterTo='transform opacity-100 scale-100'
                  leave='transition ease-in duration-75'
                  leaveFrom='transform opacity-100 scale-100'
                  leaveTo='transform opacity-0 scale-95'>
                  <Menu.Items className='absolute right-0 z-50 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg  focus:outline-none'>
                    {session ? (
                      <>
                        <div className='py-1'>
                          <Menu.Item>
                            {({ active }) => (
                              <a
                                href='#'
                                className={classNames(
                                  active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                  'block px-4 py-2 text-sm'
                                )}>
                                My Profile
                              </a>
                            )}
                          </Menu.Item>
                        </div>
                        <div className='py-1'>
                          <Menu.Item>
                            {({ active }) => (
                              <a
                                href='#'
                                className={classNames(
                                  active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                  'block px-4 py-2 text-sm'
                                )}>
                                Create Studio-Listing
                              </a>
                            )}
                          </Menu.Item>
                        </div>
                        <div className='py-1'>
                          <Menu.Item>
                            {({ active }) => (
                              <a
                                href='#'
                                className={classNames(
                                  active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                  'block px-4 py-2 text-sm'
                                )}>
                                Favorites
                              </a>
                            )}
                          </Menu.Item>
                        </div>
                        <div className='py-1'>
                          <Menu.Item>
                            {({ active }) => (
                              <a
                                href='#'
                                className={classNames(
                                  active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                  'block px-4 py-2 text-sm'
                                )}>
                                Settings
                              </a>
                            )}
                          </Menu.Item>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className='bg-secondary flex justify-center rounded-t-lg '>
                          <Menu.Item>
                            {({ active }) => (
                              <MyLink
                                href='/signin'
                                className={classNames(
                                  active ? 'bg-black text-white' : 'text-white',
                                  'block h-full w-full rounded-t-lg px-4 py-3 text-center text-base'
                                )}>
                                Sign in
                              </MyLink>
                            )}
                          </Menu.Item>
                        </div>
                        <div className='bg-primary flex justify-center rounded-b-lg '>
                          <Menu.Item>
                            {({ active }) => (
                              <MyLink
                                href='/signup'
                                className={classNames(
                                  active ? 'bg-black text-white' : 'text-white',
                                  'block h-full w-full rounded-b-lg px-4 py-3 text-center text-base'
                                )}>
                                Become a Member
                              </MyLink>
                            )}
                          </Menu.Item>
                        </div>
                      </>
                    )}
                  </Menu.Items>
                </Transition>
              </Menu>
            </li>
          </ul>
          {/* Login menu */}
          <div
            onClick={() => router.push('login?redirect=/checkout')}
            className=' flex hidden flex-shrink-0  cursor-pointer items-center space-x-2 rounded-md border border-gray-100 p-2 lg:flex'>
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
