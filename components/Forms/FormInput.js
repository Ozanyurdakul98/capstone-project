import React from 'react';
import { useState } from 'react';

export function FormInput(props) {
  const [focused, setFocused] = useState(false);
  const {
    label,
    errorMessage,
    onChange,
    beforeLabel,
    afterLabel,
    divClass,
    divClassAll,
    submitErrors,
    labelWrap,
    ...inputProps
  } = props;

  //   Leggend:
  //   -divClassAll = Div wrapping beforeLabel, input, afterLabel, span(errormessage) . provide String for css classes
  //   -labelWarp = label Wrapping input, afterLbale, span
  //   -beforeLabel  = provide Object with css and a string key and inside ThemeConsumer, a string
  //   -afterLable = just a string
  //   -divClass = Div wrapping only input and afterLabel
  //   -errormessage = errormessage dispalying if input is invalid due to pattern/required. peer class for input required

  const handleFocus = (event) => {
    setFocused(true);
  };
  return (
    <>
      {divClassAll ? (
        <div className={divClassAll}>
          <Label id={props.id} beforeLabel={beforeLabel} />
          {divClass ? (
            <div className={divClass}>
              <input {...inputProps} onChange={onChange} onBlur={handleFocus} data-focused={focused.toString()} />
              <Label id={props.id} afterLabel={afterLabel} />
            </div>
          ) : (
            <>
              <input {...inputProps} onChange={onChange} onBlur={handleFocus} data-focused={focused.toString()} />
              <Label id={props.id} afterLabel={afterLabel} />
            </>
          )}
          <ErrorMessage
            type={props.type}
            disabled={props.disabled}
            focused={focused}
            errorMessage={errorMessage}></ErrorMessage>
          <span>{submitErrors?.[name]}</span>
        </div>
      ) : (
        <>
          <Label id={props.id} beforeLabel={beforeLabel} />
          {divClass ? (
            <div className={divClass}>
              <input {...inputProps} onChange={onChange} onBlur={handleFocus} data-focused={focused.toString()} />
              <Label id={props.id} afterLabel={afterLabel} />
              <ErrorMessage
                type={props.type}
                disabled={props.disabled}
                focused={focused}
                errorMessage={errorMessage}></ErrorMessage>
              <span>{submitErrors?.[name]}</span>
            </div>
          ) : labelWrap ? (
            <>
              <label className={labelWrap.css} htmlFor={props.id}>
                <input {...inputProps} onChange={onChange} onBlur={handleFocus} data-focused={focused.toString()} />
                <Label id={props.id} afterLabel={afterLabel} />
                {labelWrap.string}
                <ErrorMessage
                  type={props.type}
                  disabled={props.disabled}
                  focused={focused}
                  errorMessage={errorMessage}></ErrorMessage>
                <span>{submitErrors?.[name]}</span>
              </label>
            </>
          ) : (
            <>
              <input {...inputProps} onChange={onChange} onBlur={handleFocus} data-focused={focused.toString()} />
              <Label id={props.id} afterLabel={afterLabel} />
              <ErrorMessage
                type={props.type}
                disabled={props.disabled}
                focused={focused}
                errorMessage={errorMessage}></ErrorMessage>
              <span>{submitErrors?.[name]}</span>
            </>
          )}
        </>
      )}
    </>
  );
}
function Label(props) {
  return (
    <label
      htmlFor={props.id}
      className={
        props.beforeLabel
          ? `block ${props.beforeLabel.css}`
          : props.afterLabel
          ? `mr-2 block  ${props.afterLabel.css}`
          : 'hidden'
      }>
      {props.beforeLabel ? props.beforeLabel.string : props.afterLabel ? props.afterLabel.string : null}
      {props.afterLabel?.string2 ? props.afterLabel.string2 : null}
    </label>
  );
}
function ErrorMessage(props) {
  return (
    <span
      className={
        props.focused && props.errorMessage && props.type !== 'number'
          ? 'block pl-5 text-xs text-red-500 peer-valid:hidden peer-invalid:visible sm:text-sm'
          : props.type === 'number' && props.errorMessage && !props.disabled && props.focused
          ? 'text-xs text-red-500 peer-valid:hidden peer-enabled:block sm:text-sm'
          : (props.type === 'email' || props.type === 'password') && props.errorMessage && props.focused
          ? 'block text-xs text-red-500 peer-valid:hidden peer-invalid:visible sm:text-sm'
          : 'hidden'
      }>
      {props.errorMessage}
    </span>
  );
}
