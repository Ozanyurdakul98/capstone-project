import React from 'react';
import { useState } from 'react';

// import { useSession, getSession } from 'next-auth/react';
export function FormInput(props) {
  const [focused, setFocused] = useState(false);
  const { label, errorMessage, onChange, beforeLabel, afterLabel, divClass, ...inputProps } = props;
  const handleFocus = (event) => {
    setFocused(true);
  };
  return (
    <>
      <label htmlFor={props.id} className={beforeLabel ? 'label-form block' : 'hidden'}>
        {beforeLabel}
      </label>
      {divClass ? (
        <div className={divClass}>
          <input {...inputProps} onChange={onChange} onBlur={handleFocus} data-focused={focused.toString()} />
          <label htmlFor={props.id} className={afterLabel ? 'mr-2 block' : 'hidden'}>
            {afterLabel}
          </label>
        </div>
      ) : (
        <>
          <input {...inputProps} onChange={onChange} onBlur={handleFocus} data-focused={focused.toString()} />

          <label htmlFor={props.id} className={afterLabel ? 'mr-2 block' : 'hidden'}>
            {afterLabel}
          </label>
        </>
      )}

      <span
        className={
          focused && errorMessage && props.type !== 'number'
            ? 'block text-red-500 peer-valid:hidden peer-invalid:visible'
            : props.type === 'number' && errorMessage && !props.disabled && focused
            ? 'text-red-500 peer-valid:hidden peer-enabled:block'
            : (props.type === 'email' || props.type === 'password') && errorMessage && focused
            ? 'block text-red-500 peer-valid:hidden peer-invalid:visible'
            : 'hidden'
        }>
        {errorMessage}
      </span>
    </>
  );
}
