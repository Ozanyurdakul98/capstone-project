import React from 'react';
import { BackgroundOverlayFullscreen as ClickToCloseMax } from '../BackgroundOverlay';
import { Spinner } from '../Spinner';

export function DeleteModal(props) {
  const handleClickToCloseDeleteModal = () => {
    props.setDeleteModal(false);
  };
  return (
    <>
      <div className='searchFadein fixed inset-x-0 inset-y-0 top-0 left-0 right-0 z-50 my-auto mx-auto h-48 max-w-md rounded-2xl  bg-white shadow-xxl lg:h-56  '>
        <div className='flex h-full flex-col items-center justify-between gap-2 pt-5'>
          <h2 className='h3 ml-5'>{props.deleteModalStrings.header}</h2>
          <div className='flex w-full flex-col gap-1 px-5 text-center font-thin '>
            <p>
              {props.deleteModalStrings.message}
              {props.deleteModalStrings.error}
            </p>
            <p>StudioID: {props.deleteModalStrings.studioID ? props.deleteModalStrings.studioID : 'no ID'}</p>
          </div>
          <div className=' flex h-16 w-full items-center  justify-between gap-3 px-2 pb-1  md:px-5 '>
            <button
              className='modal-deleteButton bg-black'
              onClick={() => {
                props.setDeleteModal(false);
              }}>
              Cancel
            </button>
            {props.loading ? (
              <div className=' flex-shrink-0'>
                <Spinner />
              </div>
            ) : null}
            <button
              onClick={() => props.deleteFunction('adminStudioTable', props.studioID)}
              disabled={props.loading ? true : false}
              className='modal-deleteButton bg-red-600'>
              Delete
            </button>
          </div>
        </div>
      </div>
      <ClickToCloseMax
        style={'bg-black/50 editModal  z-40 h-full'}
        onClick={(event) => handleClickToCloseDeleteModal(event)}
      />
    </>
  );
}
