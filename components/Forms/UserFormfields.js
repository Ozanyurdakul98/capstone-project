import React from 'react';
import { FormInput } from './FormInput';
import Image from 'next/image.js';
import { TbHandClick } from 'react-icons/tb';
import { MdDeleteForever } from 'react-icons/md';

export function UserFormfields(props) {
  return (
    <>
      {/* Avatar */}
      <fieldset className='listingForm '>
        <legend htmlFor='image' className=' label-form'>
          Avatar
        </legend>
        <label className=' cursor-pointer' htmlFor='avatar'>
          <input
            className='hidden'
            id='avatar'
            name='avatar'
            type='file'
            accept='.gif, .jpg, .jpeg, .jfif, .pjpeg, .pjp, .png, .webp'
            onChange={props.handleChange}
            required
          />
          <div
            className={
              'relative flex h-48 w-48 flex-shrink-0 flex-col items-center justify-center gap-2 rounded-full border-2 border-dotted text-white transition duration-75 ease-out  active:scale-95 sm:h-48 sm:w-48 md:h-56 md:w-56 md:px-2 lg:h-64 lg:w-64' +
              (props.form.avatar ? ' bg-site border-primary ' : ' bg-primary ')
            }>
            {props.form.avatar ? (
              <>
                <Image
                  src={props.form.avatar}
                  className='rounded-full'
                  layout='fill'
                  objectFit='cover'
                  alt='Thumbnail'
                />
                <button onClick={props.handleDeleteImage} className='absolute top-0 right-0'>
                  <MdDeleteForever className='h-8 w-8 text-red-500 hover:text-red-400' />
                </button>
              </>
            ) : (
              <>
                <p className='text-center text-lg'>No picture selected</p>
                <p className='text-center text-xs lg:text-sm'>
                  Accepted file formats: .gif, .jpg, .jpeg, .jfif, .pjpeg, .pjp, .png, .webp
                </p>
                <TbHandClick className='h-6 w-6 lg:h-8 lg:w-8' />
              </>
            )}
          </div>
          <p className='pl-2 text-sm md:pl-5'>{props.form.avatar ? props.form.avatar : 'Please select a picture'}</p>
        </label>
      </fieldset>
      {/* Name */}
      <fieldset className='listingForm '>
        <FormInput
          beforeLabel={{
            string: 'Profile Name',
            css: 'label-form ',
          }}
          className='input-editUser peer block '
          type='text'
          id='titel'
          placeholder='Listing Title here..'
          name='listingTitle'
          required
          autoComplete='off'
          pattern='^([a-zA-Z-])([a-zA-Z-0-9-!äöü,-_\s]){9,60}$'
          errorMessage={'Only 10-60 characters and (a-z, A-Z, 0-9, ! äöü ,-_) allowed!'}
          value={props.form.name}
          onChange={props.handleChange}></FormInput>
        <span className='errormessage '>{props.formErrors.name}</span>
      </fieldset>
      {/* Email */}
      <fieldset className='listingForm mb-52'>
        <FormInput
          beforeLabel={{
            string: 'Location',
            css: 'label-form ',
          }}
          className='input-form peer'
          type='text'
          name='studioLocation'
          placeholder='Type [City], [Address]'
          required
          autoComplete='off'
          errorMessage={'Only 5-60 characters and (a-z, A-Z, 0-9, äöü ,-) allowed!'}
          pattern='^([a-zA-Z-])([a-zA-Z-0-9-,äöü\s]){4,60}$'
          value={props.form.email}
          onChange={props.handleChange}
        />
        <span className='errormessage'>{props.formErrors.email}</span>
      </fieldset>
      {/* Errormessage */}
      <fieldset>
        {props.length !== 0 ? <p className='errormessage text-end'>Please resolve your errors first!</p> : null}
      </fieldset>
    </>
  );
}
