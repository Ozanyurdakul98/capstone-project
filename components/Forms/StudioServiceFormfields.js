import React from "react";
import { FormInput } from "./FormInput";
import Image from "next/image.js";
import { TbHandClick } from "react-icons/tb";
import { MdDeleteForever } from "react-icons/md";

export function StudioServiceFormfields(props) {
  return (
    <>
      {/* Image */}
      <fieldset className='fset-editUser'>
        <legend htmlFor='image' className=' label-form'>
          Image
        </legend>
        <div className=' relative flex h-48 w-48 flex-col sm:h-48 sm:w-48 md:h-56 md:w-56 lg:h-64 lg:w-64 '>
          <label
            className='flex h-48 w-48 cursor-pointer rounded-md transition duration-75  ease-out active:scale-95 sm:h-48 sm:w-48 md:h-56 md:w-56 md:px-2 lg:h-64 lg:w-64 '
            htmlFor='image'>
            <input
              className='hidden'
              id='image'
              name='image'
              type='file'
              accept='.gif, .jpg, .jpeg, .jfif, .pjpeg, .pjp, .png, .webp'
              onChange={props.handleChange}
              required
            />
            <div
              className={
                "relative flex h-48 w-48 flex-shrink-0 flex-col items-center justify-center gap-2 rounded-md border-2 border-dotted text-white transition duration-75 ease-out  active:scale-95 sm:h-48 sm:w-48 md:h-56 md:w-56 md:px-2 lg:h-64 lg:w-64" +
                (props.form.image ? " bg-site border-primary " : " bg-primary ")
              }>
              {props.form.image ? (
                <>
                  <Image
                    src={props.checked.imagePreview ? props.checked.imagePreview : props.form.image}
                    className='rounded-md'
                    layout='fill'
                    objectFit='cover'
                    alt='Thumbnail'
                  />
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
          </label>
          <button
            type='button'
            onClick={props.handleDeleteImage}
            className='absolute top-0 right-0'>
            <MdDeleteForever className='h-8 w-8 text-red-500 hover:text-red-400' />
          </button>
          <div>
            <p className='pl-2 text-sm line-clamp-1 md:pl-5'>
              {props.checked.imageName ? props.checked.imageName : "Please select a picture"}
            </p>
          </div>
        </div>
      </fieldset>
      {/* Name */}
      <fieldset className='fset-editUser flex gap-3'>
        <div className='flex w-full flex-col sm:w-2/3 lg:w-2/3'>
          <FormInput
            beforeLabel={{
              string: "Servicename",
              css: "label-form",
            }}
            className='input-editUserName peer block '
            type='text'
            id='name'
            placeholder='Type your name here...'
            name='name'
            required
            autoComplete='off'
            pattern='^([a-zA-Z-])([a-zA-Z-!äöü,-_\s]){3,25}$'
            errorMessage={"Only 4-25 normal letters!"}
            value={props.form.name}
            onChange={props.handleChange}></FormInput>
          <span className='errormessage '>{props.formErrors.name}</span>
        </div>
      </fieldset>
      {/* QueryString */}
      <fieldset className='fset-editUser'>
        <div className='flex w-full flex-col sm:w-2/3 lg:w-2/3'>
          <FormInput
            beforeLabel={{
              string: "Querystring",
              css: "label-form",
            }}
            className='input-editUserName peer block '
            type='text'
            id='queryString'
            placeholder='Type your name here...'
            name='queryString'
            required
            autoComplete='off'
            pattern='^([a-zA-Z-])([a-zA-Z-!äöü,-_\s]){3,25}$'
            errorMessage={"Only 4-25 normal letters!"}
            value={props.form.queryString}
            onChange={props.handleChange}></FormInput>
          <span className='errormessage '>{props.formErrors.queryString}</span>
        </div>
      </fieldset>
      {/* Description */}
      <fieldset className='fset-editUser mb-52'>
        <div className='flex w-full flex-col sm:w-2/3 lg:w-2/3'>
          <FormInput
            beforeLabel={{
              string: "Service description",
              css: "label-form",
            }}
            className='input-editUserName peer block '
            textarea={true}
            id='name'
            placeholder='Type your name here...'
            name='name'
            required
            autoComplete='off'
            pattern='^([a-zA-Z-])([a-zA-Z-!äöü,-_\s]){3,25}$'
            errorMessage={"Only 4-25 normal letters!"}
            value={props.form.description}
            onChange={props.handleChange}></FormInput>
          <span className='errormessage '>{props.formErrors.name}</span>
        </div>
      </fieldset>
      {/* Errormessage */}
      <fieldset>
        {props.length !== 0 ? (
          <p className='errormessage text-end'>Please resolve your errors first!</p>
        ) : null}
      </fieldset>
    </>
  );
}
