import React from 'react';
import { ChevronDownIcon } from '@heroicons/react/24/solid';
import { Bars2Icon } from '@heroicons/react/24/outline';
import { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { signOut } from 'next-auth/react';
import { MyLink } from './MyLink';
import Image from 'next/image';
import { RiAdminLine } from 'react-icons/ri';

export function HeaderUsermenu(props) {
  const { session } = props;
  const name = session?.user.name;
  const email = session?.user.email;
  const avatar = session?.user.avatar;

  function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
  }
  return (
    <ul className='mr-2 flex cursor-pointer items-center md:mx-5 2xl:min-w-[200px]'>
      <li className='ml-2 md:inline'>
        <Menu as='div' className='relative inline-block text-left outline-none'>
          <Menu.Button className='flex justify-center bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none sm:rounded-md sm:border sm:border-gray-300 '>
            <div className='hidden sm:inline-flex'>
              Account
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
            <Menu.Items className='absolute right-2 z-50 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg  focus:outline-none'>
              {session ? (
                <>
                  <div className='grid grid-cols-3 px-1 py-1'>
                    <div className='relative flex h-10 w-10 sm:h-12 sm:w-12'>
                      <Image
                        src={avatar}
                        layout='fill'
                        className='rounded-full bg-gray-200 '
                        objectFit='contain'
                        alt='avatar'
                      />
                    </div>
                    <div className=' col-span-2 flex w-full flex-col items-start justify-center pl-1'>
                      <p className='block text-sm'>
                        Welcome <strong>{name}</strong>
                      </p>
                      <div className='w-full'>
                        <p className='block truncate text-xs sm:text-sm'>{email}</p>
                      </div>
                    </div>
                  </div>
                  <div>
                    <Menu.Item>
                      {({ active }) => (
                        <MyLink
                          href='/dashboard/admin'
                          className={classNames(
                            active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                            'flex gap-2 px-4 py-3 text-sm'
                          )}>
                          <RiAdminLine className='h-4 w-4' /> Admin Dashboard
                        </MyLink>
                      )}
                    </Menu.Item>
                  </div>
                  <div>
                    <Menu.Item>
                      {({ active }) => (
                        <MyLink
                          href='/dashboard/admin/studios'
                          title='studios table'
                          className={classNames(
                            active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                            'flex gap-2 px-4 py-3 text-sm'
                          )}>
                          <RiAdminLine className='h-4 w-4' /> Studios
                        </MyLink>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <MyLink
                          href='/dashboard/admin/users'
                          title='users table'
                          className={classNames(
                            active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                            'flex gap-2 px-4 py-3 text-sm'
                          )}>
                          <RiAdminLine className='h-4 w-4' /> Users
                        </MyLink>
                      )}
                    </Menu.Item>
                  </div>
                  <div>
                    <Menu.Item>
                      {({ active }) => (
                        <MyLink
                          href='/dashboard'
                          className={classNames(
                            active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                            'block px-4 py-3 text-sm'
                          )}>
                          Dashboard
                        </MyLink>
                      )}
                    </Menu.Item>
                  </div>
                  <div>
                    <Menu.Item>
                      {({ active }) => (
                        <MyLink
                          href='/dashboard/mystudios'
                          title='see all your studios'
                          className={classNames(
                            active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                            'block px-4 py-3 text-sm'
                          )}>
                          My Studios
                        </MyLink>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <MyLink
                          href='/dashboard/addstudio'
                          title='add a studio'
                          className={classNames(
                            active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                            'block px-4 py-3 text-sm'
                          )}>
                          Add Studio
                        </MyLink>
                      )}
                    </Menu.Item>
                  </div>
                  <div>
                    <Menu.Item>
                      {({ active }) => (
                        <MyLink
                          href='/dashboard/settings'
                          title='see all your studios'
                          className={classNames(
                            active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                            'block px-4 py-3 text-sm'
                          )}>
                          Settings
                        </MyLink>
                      )}
                    </Menu.Item>
                  </div>
                  <div>
                    <Menu.Item>
                      {() => (
                        <button
                          onClick={() => signOut()}
                          className={classNames('block w-full rounded-b-lg px-4 py-3 text-left text-sm text-red-500')}>
                          Logout
                        </button>
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
  );
}
