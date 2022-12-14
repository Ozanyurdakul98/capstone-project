import { ArrowRightOnRectangleIcon } from '@heroicons/react/24/outline';
export function HeaderSigninButton({ setPreviewSigning }) {
  return (
    <button
      onClick={() => setPreviewSigning('signin')}
      className=" flex flex-1 cursor-pointer items-center space-x-2 whitespace-nowrap rounded-md border border-black bg-black p-2 ">
      <div className="h-5 w-5 shrink-0">
        <ArrowRightOnRectangleIcon className="text-white" />
      </div>
      <p className="text-white">Sign in</p>
    </button>
  );
}
