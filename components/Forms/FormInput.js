import { useState } from 'react';
import TextareaAutosize from 'react-textarea-autosize';

export function FormInput(props) {
  const [focused, setFocused] = useState(false);
  const {
    errorMessage,
    onChange,
    beforeLabel,
    afterLabel,
    divClass,
    divClassAll,
    submitErrors,
    counter,
    labelWrap,
    textarea,
    multiselect,
    ...inputProps
  } = props;

  //   Leggend:
  //   -divClassAll = Div wrapping beforeLabel, input, afterLabel, span(errormessage) . provide String for css classes
  //   -divClass = Div wrapping only input and afterLabel
  //   -labelWarp = label Wrapping input, afterLbale, span
  //   -textarea  = set true, to use textareaautoresize component from their importet library.
  //   -multiselect  = set true, to use multiselect component (ex. in studioFormfields.js)
  //   -data  = data for multiselect options (String array)
  //   -beforeLabel  = provide Object with css and a string key and inside ThemeConsumer, a string
  //   -afterLable = just a string
  //   -errormessage = errormessage dispalying if input is invalid due to pattern/required. peer class for input required

  const handleFocus = () => {
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
          ) : textarea ? (
            <>
              <p
                className={
                  counter?.max
                    ? ` ${props.counter.css} ${
                        counter.min > counter.val || counter.val > counter.max ? 'text-red-400' : 'text-gray-400'
                      }`
                    : 'hidden'
                }>
                {counter?.val + '/' + counter?.max}
              </p>
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
              <span>{submitErrors?.[name]}</span>
            </>
          ) : multiselect ? (
            <>
              <p
                className={
                  counter?.max
                    ? ` ${props.counter.css} ${counter.val > counter.max ? 'text-red-400' : 'text-gray-400'}`
                    : 'hidden'
                }>
                {counter?.val + '/' + counter?.max}
              </p>
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
          ) : (
            <>
              <p
                className={
                  counter?.max
                    ? ` ${props.counter.css} ${
                        counter.min > counter.val || counter.val > counter.max ? 'text-red-400' : 'text-gray-400'
                      }`
                    : 'hidden'
                }>
                {counter?.val + '/' + counter?.max}
              </p>
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
    <>
      <label
        htmlFor={props.id}
        className={
          props.beforeLabel
            ? `block ${props.beforeLabel.css}`
            : props.afterLabel
            ? `mr-2 block ${props.afterLabel.css}`
            : 'hidden'
        }>
        {props.beforeLabel ? props.beforeLabel.string : props.afterLabel ? props.afterLabel.string : null}
        {props.beforeLabel?.required ? '*' : null}
        {props.afterLabel?.string2 ? props.afterLabel.string2 : null}
        <p className={props.beforeLabel?.description ? 'text-sm font-thin normal-case md:text-base' : 'hidden'}>
          {props.beforeLabel?.description}
        </p>
      </label>
    </>
  );
}
function ErrorMessage(props) {
  return (
    <span
      className={
        props.focused && props.errorMessage && props.type !== 'number'
          ? 'block pl-5 text-xs text-red-500 peer-valid:hidden peer-invalid:visible sm:text-sm'
          : props.type === 'number' && props.errorMessage && !props.disabled && props.focused
          ? 'text-xs text-yellow-500 peer-valid:hidden peer-enabled:block sm:text-sm'
          : (props.type === 'email' || props.type === 'password') && props.errorMessage && props.focused
          ? 'block text-xs text-red-500 peer-valid:hidden peer-invalid:visible sm:text-sm'
          : 'hidden'
      }>
      {props.errorMessage}
    </span>
  );
}
