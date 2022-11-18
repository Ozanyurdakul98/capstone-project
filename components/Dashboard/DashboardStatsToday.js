import { FaUsers } from 'react-icons/fa';
import { BsViewList } from 'react-icons/bs';
export default function DashboardBoxes() {
  return (
    <div className='flex gap-5'>
      <div className='text-primary flex w-1/2 grow items-center gap-3 rounded-tl-3xl rounded-br-3xl rounded-tr-md rounded-bl-md bg-blue-200 p-5'>
        <BsViewList className='h-8 w-8' />
        <div>
          <h2 className='text-2xl font-bold leading-4'>345</h2>
          <h3 className='text-xs'>New Studios today</h3>
        </div>
      </div>
      <div className='text-primary flex w-1/2 grow items-center gap-3 rounded-tr-3xl rounded-bl-3xl rounded-tl-md rounded-br-md bg-blue-300 p-5'>
        <FaUsers className='h-8 w-8' />
        <div>
          <h2 className='text-2xl font-bold leading-4'>21 392</h2>
          <h3 className='text-xs'>New Users today</h3>
        </div>
      </div>
    </div>
  );
}
