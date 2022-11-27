import React from "react";
import { ArrowRightOnRectangleIcon } from "@heroicons/react/24/outline";
export function HeaderSignupButton({ setPreviewSigning }) {
  return (
    <button
      onClick={() => setPreviewSigning("signup")}
      className=' border-primary bg-primary flex flex-1 cursor-pointer items-center space-x-2 whitespace-nowrap rounded-md border p-2 '>
      <div className='h-5 w-5 flex-shrink-0'>
        <ArrowRightOnRectangleIcon className='text-white' />
      </div>
      <p className='text-white'>Become Member</p>
    </button>
  );
}
