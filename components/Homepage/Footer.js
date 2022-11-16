import React from 'react';
import Link from 'next/link';
import LogoWhite from '../LogoWhite';

export function Footer() {
  return (
    <footer aria-label='Site Footer' className='bg-primary mt-20'>
      <div className='relative mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8 lg:pt-24'>
        <div className='absolute top-4 right-4 sm:top-6 sm:right-6 lg:top-8 lg:right-8'>
          <a
            className='inline-block rounded-full bg-white p-2 text-primary-color shadow transition-all duration-300 hover:scale-110 sm:p-3 lg:p-4'
            href='#top'>
            <svg xmlns='http://www.w3.org/2000/svg' className='h-6 w-6' viewBox='0 0 20 20' fill='currentColor'>
              <path
                fillRule='evenodd'
                d='M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z'
                clipRule='evenodd'
              />
            </svg>
          </a>
        </div>
        <div className='lg:flex lg:items-end lg:justify-between'>
          <div>
            <div className='flex items-end justify-center lg:justify-start'>
              <LogoWhite width={'80'} height={'80'} />
              <h2 className='label-form text-xl text-white underline'>Tonstudio-Kleinanzeigen</h2>
            </div>

            <p className='mx-auto mt-6 max-w-md text-center leading-relaxed text-gray-400 lg:text-left'>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Incidunt consequuntur amet culpa cum itaque
              neque.
            </p>
          </div>

          <nav aria-label='Footer Nav' className='mt-12 lg:mt-0'>
            <ul className='flex flex-wrap justify-center gap-6 md:gap-8 lg:justify-end lg:gap-12'>
              <li>
                <Link href='/'>
                  <a className='text-white transition hover:text-gray-200/75'>About</a>
                </Link>
              </li>
              <li>
                <Link href='/'>
                  <a className='text-white transition hover:text-gray-200/75'>Services</a>
                </Link>
              </li>
              <li>
                <Link href='/'>
                  <a className='text-white transition hover:text-gray-200/75'>Projects</a>
                </Link>
              </li>
              <li>
                <Link href='/'>
                  <a className='text-white transition hover:text-gray-200/75'>Blog</a>
                </Link>
              </li>
            </ul>
          </nav>
        </div>

        <p className='mt-12 text-center text-sm text-gray-400 lg:text-right'>
          Copyright @ 2022 Tonstudio-Kleinanzeigen. All rights reserved
        </p>
      </div>
    </footer>
  );
}
