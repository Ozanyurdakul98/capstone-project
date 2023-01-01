import { useState } from 'react';
import TextareaAutosize from 'react-textarea-autosize';

export function FormInput(props) {
  const [focused, setFocused] = useState(false);
  const [isHide, setIsHide] = useState(true);
  const {
    errorMessage,
    onChange,
    beforeLabel,
    afterLabel,
    divClass,
    counter,
    labelWrap,
    textarea,
    multiselect,
    simple,
    password,
    ...inputProps
  } = props;

  //   Legend: (Forminput attributes)
  //   -simple = simple input with Label and Errormessage
  //   -password = password input with hide/show, wrapping div, Label and Errormessage
  //   -divClass = Div wrapping input and afterLabel
  //   -labelWarp = beforeLabel and a label Wrapping input, afterLbale and Errormessage
  //   -textarea  = set true, to use textareaautoresize component from their importet library.
  //   -multiselect  = set true, to use multiselect component (ex. in studioFormfields.js)
  //      data  = data for multiselect options (String array)
  //   +beforeLabel  = provide Object with css and a string key and inside ThemeConsumer, a string
  //   +afterLable = just a string
  //   +counter = counter for string length. css, value, minlength and maxlength attributes
  //   +errormessage = errormessage dispalying if input is invalid due to pattern/required. peer class for input required

  const handleFocus = () => {
    setFocused(true);
  };
  return (
    <>
      {simple && (
        <>
          <Label id={props.id} beforeLabel={beforeLabel} />
          <input {...inputProps} onChange={onChange} onBlur={handleFocus} data-focused={focused.toString()} />
          <ErrorMessage
            type={props.type}
            disabled={props.disabled}
            focused={focused}
            errorMessage={errorMessage}></ErrorMessage>
        </>
      )}
      {password && (
        <>
          <div className={`relative ${password}`}>
            <Label id={props.id} beforeLabel={beforeLabel} />
            <div className="relative">
              <input
                {...inputProps}
                type={isHide ? 'password' : 'text'}
                onChange={onChange}
                onBlur={handleFocus}
                data-focused={focused.toString()}
              />
              <button
                type="button"
                className="hover:text-primary absolute top-2 right-2 block h-7 w-7 text-center text-xl text-gray-400 transition-colors focus:outline-none"
                onClick={() => setIsHide((prev) => !prev)}>
                {isHide ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="h-6 w-6">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                    />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="h-6 w-6">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                    />
                  </svg>
                )}
              </button>
              <ErrorMessage
                type={'password'}
                disabled={props.disabled}
                focused={focused}
                errorMessage={errorMessage}></ErrorMessage>
            </div>
          </div>
        </>
      )}
      {divClass && (
        <div className={divClass}>
          <Label id={props.id} beforeLabel={beforeLabel} />
          <input {...inputProps} onChange={onChange} onBlur={handleFocus} data-focused={focused.toString()} />
          <Label id={props.id} afterLabel={afterLabel} />
          <ErrorMessage
            type={props.type}
            disabled={props.disabled}
            focused={focused}
            errorMessage={errorMessage}></ErrorMessage>
        </div>
      )}
      {labelWrap && (
        <>
          <Label id={props.id} beforeLabel={beforeLabel} />
          <label className={labelWrap.css} htmlFor={props.id}>
            <input {...inputProps} onChange={onChange} onBlur={handleFocus} data-focused={focused.toString()} />
            <Label id={props.id} afterLabel={afterLabel} />
            {labelWrap.string}
            <ErrorMessage
              type={props.type}
              disabled={props.disabled}
              focused={focused}
              errorMessage={errorMessage}></ErrorMessage>
          </label>
        </>
      )}
      {textarea && (
        <>
          <Label id={props.id} beforeLabel={beforeLabel} />
          {props.counter.max ? (
            <p
              className={` ${props.counter.css} ${
                counter.min > counter.val || counter.val > counter.max ? 'text-red-400' : 'text-gray-400'
              }`}>
              {counter?.val + '/' + counter?.max}
            </p>
          ) : null}
          <TextareaAutosize
            {...inputProps}
            onChange={onChange}
            onBlur={handleFocus}
            data-focused={focused.toString()}
          />
          <Label id={props.id} afterLabel={afterLabel} />
          <ErrorMessage
            type={props.type}
            disabled={props.disabled}
            focused={focused}
            errorMessage={errorMessage}></ErrorMessage>
        </>
      )}
      {multiselect && (
        <>
          <Label id={props.id} beforeLabel={beforeLabel} />
          {counter ? (
            <p
              className={` ${counter.css} ${
                counter.min > counter.val || counter.val > counter.max ? 'text-red-400' : 'text-gray-400'
              }`}>
              {counter.val + '/' + counter.max}
            </p>
          ) : null}
          <div className="flex w-full appearance-none flex-col items-center leading-tight text-gray-700 focus:border-gray-500/30 focus:bg-white focus:outline-none sm:w-2/3 lg:w-1/2">
            <div className="w-full ">
              <div className="relative flex flex-col items-center">
                {/* input */}
                <div className="flex w-full rounded border border-gray-500 bg-white py-[6px] px-5 focus:border-gray-500/30">
                  {/* selected and input*/}
                  <label className="flex flex-auto flex-wrap">
                    {/* selected */}
                    {props.value?.map((lang) => (
                      <div
                        key={lang}
                        className="bg-secondary border-secondary m-1 flex items-center justify-center rounded-full border py-1 px-2 font-medium text-white hover:rotate-6 ">
                        <div className="max-w-full flex-initial text-sm font-normal leading-none">{lang}</div>
                        <div className="flex flex-auto flex-row-reverse">
                          <div onClick={() => props.handleDelete(lang)}>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="100%"
                              height="100%"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="ml-2 h-4 w-4 cursor-pointer rounded-full hover:text-red-500">
                              <line x1="18" y1="6" x2="6" y2="18"></line>
                              <line x1="6" y1="6" x2="18" y2="18"></line>
                            </svg>
                          </div>
                        </div>
                      </div>
                    ))}
                    <div className="flex-1">
                      <input
                        placeholder=""
                        id="studioLanguages"
                        name="studioLanguages"
                        onChange={(event) => {
                          props.handleCheck(event);
                        }}
                        autoComplete="off"
                        value={props.studioLanguagesSearch}
                        type="text"
                        className="h-full w-full appearance-none border-none bg-transparent p-1 px-2 text-gray-800 outline-none focus:outline-none"
                      />
                    </div>
                  </label>
                  {/* arrow button */}
                  <div className="flex w-8 items-center border-l border-gray-200 py-1 pl-2 pr-1 text-gray-300">
                    <button
                      type="button"
                      className="h-6 w-6 cursor-pointer text-gray-600 outline-none focus:outline-none">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="100%"
                        height="100%"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-4 w-4">
                        <polyline points="18 15 12 9 6 15"></polyline>
                      </svg>
                    </button>
                  </div>
                </div>
                {/* dropdown */}
                <div className="relative  top-1 left-0 z-40 max-h-44 w-full overflow-y-auto rounded border border-gray-500 bg-white shadow-lg">
                  <div className="flex w-full flex-col">
                    {props.checked.studioLanguages.map((lang) => (
                      <div
                        key={lang}
                        onClick={() => {
                          props.onChange(event, lang);
                        }}
                        className="hover:bg-secondary-hover w-full cursor-pointer rounded-t border-b border-gray-100">
                        <div
                          className={`hover:border-secondary relative flex w-full items-center border-l-2 ${
                            props.value.includes(lang) ? 'border-secondary' : 'border-transparent'
                          } p-2 pl-2`}>
                          <div className="flex w-full items-center">
                            <div className="mx-2 text-sm leading-6 sm:text-base">{lang}</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Label id={props.id} afterLabel={afterLabel} />
        </>
      )}
    </>
  );
}
function Label(props) {
  return (
    <>
      {props.beforeLabel || props.afterLabel ? (
        <label
          htmlFor={props.id}
          className={
            props.beforeLabel
              ? `block ${props.beforeLabel.css}`
              : props.afterLabel
              ? `mr-2 block ${props.afterLabel.css}`
              : ''
          }>
          {props.beforeLabel ? props.beforeLabel.string : props.afterLabel ? props.afterLabel.string : null}
          {props.beforeLabel?.required ? '*' : null}
          {props.afterLabel?.string2 ? props.afterLabel.string2 : null}
          {props.beforeLabel?.description ? (
            <p className="text-sm font-thin normal-case md:text-base">{props.beforeLabel.description}</p>
          ) : null}
        </label>
      ) : null}
    </>
  );
}
function ErrorMessage(props) {
  return (
    <>
      {props.errorMessage ? (
        <p
          title={props.errorMessage}
          className={
            props.focused && props.type === 'password'
              ? 'block pl-5 text-xs text-red-500 line-clamp-1 peer-valid:hidden peer-invalid:visible sm:text-xs'
              : props.focused && props.type === 'email'
              ? 'absolute block pl-5 text-xs text-red-500 line-clamp-1 peer-valid:hidden peer-invalid:visible sm:text-xs'
              : props.type === 'number' && !props.disabled && props.focused
              ? 'text-xs text-yellow-500 line-clamp-1 peer-valid:hidden peer-enabled:block sm:text-sm'
              : props.focused
              ? 'absolute block pl-5 text-xs text-red-500 line-clamp-1 peer-valid:hidden peer-invalid:visible sm:text-xs'
              : 'hidden'
          }>
          {props.errorMessage}
        </p>
      ) : null}
    </>
  );
}
