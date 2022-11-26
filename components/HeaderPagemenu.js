import React from "react";
import { ChevronDownIcon, HomeIcon } from "@heroicons/react/24/solid";
import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { MyLink } from "./MyLink";

export function HeaderPagemenu() {
  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }
  return (
    <ul className='mx-2  cursor-pointer  md:mx-5 xl:min-w-[300px]'>
      <li className='ml-2 flex items-center md:inline'>
        <Menu as='div' className='relative inline-block text-left outline-none'>
          <Menu.Button title='Go to page' className='flex items-center gap-1'>
            <HomeIcon className='mb-1 h-5 w-5' />
            <p className='hidden font-semibold sm:inline-flex'>Pages</p>
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
                        active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                        "block px-4 py-2 text-sm"
                      )}>
                      Home
                    </MyLink>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <MyLink
                      href='/search/recording'
                      className={classNames(
                        active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                        "block px-4 py-2 text-sm"
                      )}>
                      Recording
                    </MyLink>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <MyLink
                      href='/search/mixandmaster'
                      className={classNames(
                        active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                        "block px-4 py-2 text-sm"
                      )}>
                      Mix & Master
                    </MyLink>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <MyLink
                      href='/search/musicproduction'
                      className={classNames(
                        active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                        "block px-4 py-2 text-sm"
                      )}>
                      Musicproduction
                    </MyLink>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <MyLink
                      href='/search/rentstudio'
                      className={classNames(
                        active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                        "block px-4 py-2 text-sm"
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
  );
}
