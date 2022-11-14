import React from 'react';
import { ArrowRightOnRectangleIcon } from '@heroicons/react/24/outline';
import { useRouter } from 'next/router';

export function HeaderSignupButton() {
  const router = useRouter();
  return (
    <button
      onClick={() => router.push('/signin')}
      className=' flex flex-1 cursor-pointer items-center space-x-2 rounded-md border border-black bg-black p-2 '>
      <div className='h-5 w-5 flex-shrink-0'>
        <ArrowRightOnRectangleIcon className='text-white' />
      </div>
      <p className='text-white'>Sign in</p>
    </button>
  );
}