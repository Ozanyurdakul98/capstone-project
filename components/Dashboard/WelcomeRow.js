import { format } from 'date-fns';
import Image from 'next/image';
import { useEffect, useState } from 'react';

export default function WelcomeRow() {
  const [greeting, setGreeting] = useState('');
  useEffect(() => {
    setGreeting(greetingUser());
  }, []);

  function greetingUser() {
    const date = new Date();
    const time = date.getHours();
    if (time <= 1) {
      return "it's midnight, did you know that";
    } else if (time <= 3) {
      return "It's middle in the night";
    } else if (time <= 6) {
      return "Good morning to you, it's early";
    } else if (time <= 9) {
      return 'Good morning';
    } else if (time <= 11) {
      return "It's late but, good morning";
    } else if (time <= 12) {
      return 'Good noon';
    } else if (time <= 15) {
      return 'Good afternoon';
    } else if (time <= 16) {
      return 'Good late afternoon';
    } else if (time <= 20) {
      return 'Good evening';
    } else if (time <= 23) {
      return 'Good evening for the night';
    }
  }
  return (
    <div className='mb-6 flex items-center text-secondary-color'>
      <div className='w-1/2 grow'>
        <h1 className='text-xl'>
          {greeting}, <b>Dawid</b>
        </h1>
      </div>
      <div className=''>
        <div className='bg-secondary flex h-10 items-center overflow-hidden rounded-md px-2 text-white sm:h-12'>
          <div className='relative flex h-8 w-8 sm:h-10 sm:w-10'>
            <Image
              src='https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80'
              layout='fill'
              className='bg-secondary rounded-full '
              objectFit='contain'
              alt='avatar'
            />
          </div>
          <span className='px-3'>Dawid</span>
        </div>
      </div>
    </div>
  );
}
