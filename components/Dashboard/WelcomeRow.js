export default function WelcomeRow() {
  return (
    <div className='mb-6 flex items-center'>
      <div className='w-1/2 grow'>
        <h1 className='text-primary text-xl'>
          Welcome, <b>Dawid</b>
        </h1>
      </div>
      <div className=''>
        <div className='flex items-center overflow-hidden rounded-md bg-gray-200'>
          <img
            className='h-8'
            src='https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80'
            alt=''
          />
          <span className='px-3'>Dawid</span>
        </div>
      </div>
    </div>
  );
}
