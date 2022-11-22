import React from 'react';
import { BackgroundOverlayFullscreen as ClickToCloseMax } from '../BackgroundOverlay';
import { Spinner } from '../Spinner';

export function MoreInfoModal(props) {
  const handleClickToCloseInfoModal = () => {
    props.setInfoModal(false);
  };
  return (
    <>
      <div className='searchFadein fixed inset-x-0 inset-y-0 top-0 left-0 right-0 z-50 my-auto mx-auto h-80 max-w-md rounded-2xl  bg-white shadow-xxl lg:h-80  '>
        <div className='flex h-full flex-col items-center justify-between gap-2 overflow-y-scroll pt-5'>
          <h2 className='h3 ml-5'>{props.moreInfoModalStrings.header}</h2>
          <div className='mb-20 flex w-full flex-col gap-1 px-5 text-center font-normal '>
            <p>
              {props.moreInfoModalStrings.message}
              {props.moreInfoModalStrings.error}
            </p>
            <p>
              StudioID: {props.moreInfoModalStrings.studioID ? props.moreInfoModalStrings.studioID : 'ID not found!'}
            </p>
            <p>
              Published by:
              {props.moreInfoModalStrings.publisherEmail
                ? ' ' + props.moreInfoModalStrings.publisherEmail
                : 'Publisher Email not found!'}
            </p>
            <p className='mt-2 flex flex-col gap-1 text-left font-thin'>
              Other information:
              <span>Studiolocation: {props.moreInfoModalStrings.others.studioLocation}</span>
              <span>Services: {props.moreInfoModalStrings.others.services}</span>
              <span>Max Guests: {props.moreInfoModalStrings.others.maxGuests}</span>
            </p>
            <p className='mt-2 flex flex-col gap-1 text-left font-normal'>
              <span>
                Created at: {props.moreInfoModalStrings.others.createdAtDate + ',  '}
                {'  ' + props.moreInfoModalStrings.others.createdAtTime}
              </span>
              <span>
                Last updated at: {props.moreInfoModalStrings.others.updatedAtDate + ',  '}
                {'  ' + props.moreInfoModalStrings.others.updatedAtTime}
              </span>
            </p>
          </div>
          <div className='absolute bottom-0 flex h-16 w-full items-center justify-between gap-3  rounded-2xl bg-white px-2 pb-1  md:px-5 '>
            <button
              className='modal-deleteButton bg-black'
              onClick={() => {
                props.setInfoModal(false);
              }}>
              Close
            </button>
            {props.loading ? (
              <div className=' flex-shrink-0'>
                <Spinner />
              </div>
            ) : null}
          </div>
        </div>
      </div>
      <ClickToCloseMax
        style={'bg-black/50 editModal  z-40 h-full'}
        onClick={(event) => handleClickToCloseInfoModal(event)}
      />
    </>
  );
}
