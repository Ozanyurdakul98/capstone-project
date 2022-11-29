import { FormInput } from './FormInput';
import Image from 'next/image.js';
import { TbHandClick } from 'react-icons/tb';
import { MdDeleteForever } from 'react-icons/md';

export function UserFormfields(props) {
  return (
    <>
      {/* Avatar */}
      <fieldset className="fset-editUser">
        <legend htmlFor="image" className=" label-form">
          Avatar
        </legend>
        <div className=" relative flex h-48 w-48 flex-col sm:h-48 sm:w-48 md:h-56 md:w-56 lg:h-64 lg:w-64 ">
          <label
            className="flex h-48 w-48 cursor-pointer rounded-full transition duration-75  ease-out active:scale-95 sm:h-48 sm:w-48 md:h-56 md:w-56 md:px-2 lg:h-64 lg:w-64 "
            htmlFor="avatar">
            <input
              className="hidden"
              id="avatar"
              name="avatar"
              type="file"
              accept=".gif, .jpg, .jpeg, .jfif, .pjpeg, .pjp, .png, .webp"
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
                    src={props.checked.avatarPreview ? props.checked.avatarPreview : props.form.avatar}
                    className="rounded-full"
                    layout="fill"
                    objectFit="cover"
                    alt="Thumbnail"
                  />
                </>
              ) : (
                <>
                  <p className="text-center text-lg">No picture selected</p>
                  <p className="text-center text-xs lg:text-sm">
                    Accepted file formats: .gif, .jpg, .jpeg, .jfif, .pjpeg, .pjp, .png, .webp
                  </p>
                  <TbHandClick className="h-6 w-6 lg:h-8 lg:w-8" />
                </>
              )}
            </div>
          </label>
          <button type="button" onClick={props.handleDeleteImage} className="absolute top-0 right-0">
            <MdDeleteForever className="h-8 w-8 text-red-500 hover:text-red-400" />
          </button>
          <div>
            <p className="pl-2 text-sm line-clamp-1 md:pl-5">
              {props.checked.avatarName ? props.checked.avatarName : 'Please select a picture'}
            </p>
          </div>
        </div>
      </fieldset>
      {/* Username */}
      {/* <fieldset className='fset-editUser pt-4'>
        <FormInput
          beforeLabel={{
            string: 'Username',
            css: 'label-form ',
          }}
          className='input-editUser peer block '
          type='text'
          id='username'
          placeholder='Type your username here...'
          name='username'
          required
          autoComplete='off'
          pattern='^([a-zA-Z-])([a-zA-Z-0-9-!äöü,-_\s]){3,25}$'
          errorMessage={'Only 4-25 letters and (a-z, A-Z, 0-9, ! äöü ,-_) !'}
          value={props.form.username}
          onChange={props.handleChange}></FormInput>
        <span className='errormessage '>{props.formErrors.username}</span>
      </fieldset> */}
      {/* Name */}
      <fieldset className="fset-editUser flex gap-3">
        <div className="flex w-full flex-col sm:w-2/3 lg:w-2/3">
          <FormInput
            divClassAll={'flex flex-col'}
            beforeLabel={{
              string: 'Name',
              css: 'label-form',
            }}
            className="input-editUserName peer block "
            type="text"
            id="name"
            placeholder="Type your name here..."
            name="name"
            required
            autoComplete="off"
            pattern="^([a-zA-Z-])([a-zA-Z-!äöü,-_\s]){3,25}$"
            errorMessage={'Only 4-25 normal letters!'}
            value={props.form.name}
            onChange={props.handleChange}></FormInput>
          <span className="errormessage ">{props.formErrors.name}</span>
        </div>
        {/* <div className='flex w-full flex-col sm:w-2/3 lg:w-2/3'>
          <FormInput
            divClassAll={'flex flex-col'}
            beforeLabel={{
              string: 'Lastname',
              css: 'label-form',
            }}
            className='input-editUserName peer block '
            type='text'
            id='username'
            placeholder='Type your lastname here...'
            name='lastname'
            required
            autoComplete='off'
            pattern='^([a-zA-Z-])([a-zA-Z-!äöü,-_\s]){3,25}$'
            errorMessage={'Only 4-25 letters!'}
            value={props.form.lastname}
            onChange={props.handleChange}></FormInput>
          <span className='errormessage '>{props.formErrors.lastname}</span>
        </div> */}
      </fieldset>
      {/* Email */}
      <fieldset className="fset-editUser mb-52">
        <FormInput
          beforeLabel={{
            string: 'Email',
            css: 'label-form ',
          }}
          className="input-editUserName peer"
          type="email"
          name="email"
          id="email"
          placeholder="Type your email here.."
          required
          autoComplete="off"
          pattern="^([^\s@]+@[^\s@]+\.[^\s@]+$)"
          errorMessage={'Not a valid email adress'}
          value={props.form.email}
          onChange={props.handleChange}
        />
        <span className="errormessage">{props.formErrors.email}</span>
      </fieldset>
      {/* Errormessage */}
      <fieldset>
        {props.length !== 0 ? <p className="errormessage text-end">Please resolve your errors first!</p> : null}
      </fieldset>
    </>
  );
}
