import Image from 'next/image';

export default function WelcomeRow() {
  return (
    <div className='mb-6 flex items-center text-secondary-color'>
      <div className='w-1/2 grow'>
        <h1 className='text-xl'>
          Welcome, <b>Dawid</b>
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
