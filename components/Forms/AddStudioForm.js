import { FormInput } from './FormInput';
import Image from 'next/image.js';
import { TbHandClick } from 'react-icons/tb';
import { MdDeleteForever } from 'react-icons/md';

export function AddStudioForm(props) {
  return (
    <>
      {/* Logo, studioname-/text */}
      <section className="fset-editUser mt-10 lg:flex lg:flex-row-reverse lg:items-center lg:gap-10">
        {/* Logo, */}
        <fieldset className="mb-8 shrink-0 grow ">
          <div className="relative flex h-48 w-48 flex-col sm:h-48 sm:w-48 md:h-56 md:w-56 lg:mx-auto lg:h-64 lg:w-64">
            <legend htmlFor="image" className="label-form absolute left-0 -top-4 w-full">
              Logo
            </legend>
            <label
              className="flex h-48 w-48 cursor-pointer rounded-full transition duration-75  ease-out active:scale-95 sm:h-48 sm:w-48 md:h-56 md:w-56 md:px-2 lg:h-64 lg:w-64 "
              htmlFor="logo">
              <input
                className="hidden"
                id="logo"
                name="logo"
                type="file"
                accept=".gif, .jpg, .jpeg, .jfif, .pjpeg, .pjp, .png, .webp"
                onChange={props.handleChange}
                required
              />
              <div
                className={
                  'relative flex h-48 w-48 flex-shrink-0 flex-col items-center justify-center gap-2 rounded-full border-2 border-double text-white transition duration-75 ease-out  active:scale-95 sm:h-48 sm:w-48 md:h-56 md:w-56 md:px-2 lg:h-64 lg:w-64' +
                  (props.form.logo ? ' bg-site border-primary ' : ' bg-primary ')
                }>
                {props.form.logo ? (
                  <>
                    <Image
                      src={props.checked.logoPreview ? props.checked.logoPreview : props.form.logo}
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
              <p className="pl-2 text-center text-sm line-clamp-1 md:pl-5">
                {props.checked.logoName ? props.checked.logoName : 'Please select a picture'}
              </p>
            </div>
          </div>
        </fieldset>
        {/* studioname-/text */}
        <section>
          {/* Studioname */}
          <fieldset className="listingForm mb-4">
            <FormInput
              beforeLabel={{
                string: 'Studioname',
                required: true,
                css: 'label-form w-full sm:w-2/3 lg:w-full',
                description: 'How do you want to name your Studio?',
              }}
              className="input-form peer block lg:w-full "
              counter={{
                val: props.form.studioName.length,
                max: '40',
                css: 'inputCounter lg:w-full',
              }}
              type="text"
              id="studioName"
              placeholder="Studioname.."
              name="studioName"
              required
              autoComplete="off"
              pattern="^([a-zA-Z-])([a-zA-Z-0-9-!äöü,-_\s]){4,39}$"
              errorMessage={'Only 5-40 characters and (a-z, A-Z, 0-9, ! äöü ,-_) allowed!'}
              value={props.form.studioName}
              onChange={props.handleChange}></FormInput>
            <span className="errormessage ">{props.formErrors.studioName}</span>
          </fieldset>
          {/* Studio profiletext */}
          <fieldset className="listingForm mb-4 lg:mt-0">
            <FormInput
              beforeLabel={{
                string: 'Profiletext',
                css: 'label-form w-full sm:w-2/3 lg:w-full',
                required: true,
                description:
                  'Write a short text about this studio. Visitors of the detailpage of this Studio will see it.',
              }}
              className="input-form peer block resize-none lg:w-full"
              counter={{
                val: props.form.profileText.length,
                max: '350',
                css: 'inputCounter lg:w-full',
              }}
              textarea={true}
              id="profileText"
              placeholder="Informative short text about this studio.."
              name="profileText"
              required
              autoComplete="off"
              pattern="^([a-zA-Z-])([a-zA-Z-0-9-!äöü,-_\s]){24,349}$"
              errorMessage={'Only 25-350 characters and (a-z, A-Z, 0-9, ! äöü ,-_) allowed!'}
              value={props.form.profileText}
              onChange={props.handleChange}></FormInput>
            <span className="errormessage ">{props.formErrors.profileText}</span>
          </fieldset>
        </section>
      </section>
      {/* Studiotype */}
      <fieldset className="listingForm mb-5 flex flex-col gap-3">
        <legend className="label-form">
          Studiotype*
          <h3 className="relative flex items-center gap-2 text-sm font-thin normal-case md:text-base">
            Choose a fitting studiotype
            <TbHandClick className="absolute -right-10 h-6 w-6 rotate-[-25deg] lg:h-8 lg:w-8" />
          </h3>
        </legend>
        <button
          type="button"
          className={props.form.studiotype === 'Premium Studio' ? ' studiotypeActive ' : 'studiotype'}
          onClick={() => {
            props.setForm({ ...props.form, studiotype: 'Premium Studio' });
          }}>
          <p className="h3 text-white">Premium Studio</p>
          <p>
            Studios with premium equipment, atmospheric rooms and many extras. The studio has many years of experience
            and top references.
            <br />
            The studio is in the upper price segment
          </p>
        </button>
        <button
          type="button"
          className={props.form.studiotype === 'Medium Studio' ? 'studiotypeActive' : 'studiotype'}
          onClick={() => {
            props.setForm({ ...props.form, studiotype: 'Medium Studio' });
          }}>
          <p className="h3 text-white">Medium Studio</p>
          <p>
            Studios with good facilities. You have experience and already have good references.
            <br />
            The studio is in the middle price segment
          </p>
        </button>
        <button
          type="button"
          className={props.form.studiotype === 'Home Studio' ? 'studiotypeActive' : 'studiotype'}
          onClick={() => {
            props.setForm({ ...props.form, studiotype: 'Home Studio', studioInformation: {} });
            props.setChecked({ ...props.checked, studioInformation: [] });
          }}>
          <p className="h3 text-white">Home Studio</p>
          <p>
            Your equipment serves its purpose. You want to get started and you may already have completed orders for
            your inner Circle or others done.
            <br />
            The studio is in the lower price segment
          </p>
        </button>
      </fieldset>
      {/* Studiodetails */}
      {props.form.studiotype.includes('Medium Studio') || props.form.studiotype.includes('Premium Studio') ? (
        <fieldset className="listingForm mb-5 flex flex-col justify-between gap-3 whitespace-nowrap ">
          <legend className="label-form">Additional Studio informations</legend>
          <label
            htmlFor="studioSize"
            className={props.checked.studioInformation.includes('studioSize') ? 'radio-formActive' : 'radio-form'}>
            <FormInput
              labelWrap={{
                css: 'cursor-pointer',
                string: 'Studio Size',
              }}
              type="checkbox"
              className="mr-2"
              name="studioInformation"
              id="studioSize"
              checked={props.checked.studioInformation.includes('studioSize')}
              onChange={(event) => {
                props.handleCheck(event);
              }}
            />
            <FormInput
              afterLabel={{
                string: '(Only numbers)',
                css: 'text-xs',
              }}
              className="priceInput-form peer outline-none"
              type="number"
              name="studioInformation"
              id="studioSize"
              required
              min={1}
              max={9999}
              errorMessage={'Min 1 max 9999'}
              disabled={!props.checked.studioInformation.includes('studioSize')}
              value={
                !props.checked.studioInformation.includes('studioSize')
                  ? 0
                  : props.form.studioInformation.studioSize === undefined
                  ? ''
                  : props.form.studioInformation.studioSize
              }
              onChange={props.handleChange}></FormInput>
          </label>
          <label
            htmlFor="studioRooms"
            className={props.checked.studioInformation.includes('studioRooms') ? 'radio-formActive' : 'radio-form'}>
            <FormInput
              type="checkbox"
              labelWrap={{
                css: 'cursor-pointer',
                string: 'Studio Rooms',
              }}
              className="mr-2"
              name="studioInformation"
              id="studioRooms"
              checked={props.checked.studioInformation.includes('studioRooms')}
              onChange={(event) => {
                props.handleChange(event);
                props.handleCheck(event);
              }}
            />
            <FormInput
              afterLabel={{ string: '(Only numbers)', css: 'text-xs' }}
              className="priceInput-form peer"
              type="number"
              name="studioInformation"
              id="studioRooms"
              required
              max={1000}
              min={1}
              errorMessage={'From 1 to 1000'}
              disabled={!props.checked.studioInformation.includes('studioRooms')}
              value={
                !props.checked.studioInformation.includes('studioRooms')
                  ? 0
                  : props.form.studioInformation.studioRooms === undefined
                  ? ''
                  : props.form.studioInformation.studioRooms
              }
              onChange={props.handleChange}
            />
          </label>
          <p className="max-w-[400px] whitespace-normal pl-5">
            The size is square meters and Studio rooms are the total count of rooms your Studio has.
          </p>
          <span className={`errormessage hidden ${props.formErrors.studioInformation ?? 'block'}`}>
            {props.formErrors.studioInformation}
          </span>
        </fieldset>
      ) : null}
      {/* Studiolanguages */}
      <fieldset className="listingForm mb-6">
        <FormInput
          beforeLabel={{
            string: 'Studio languages',
            css: 'label-form ',
            required: true,
            description: 'Which languages you can provide your Customer services in?',
          }}
          className="input-form peer block "
          type="text"
          multiselect={true}
          data={props.languages}
          id="studioLanguages"
          name="studioLanguages"
          handleDelete={props.handleDelete}
          counter={{
            val: props.form.studioLanguages.length,
            max: '10',
            css: 'inputCounter z-50',
          }}
          required
          autoComplete="off"
          studioLanguagesSearch={props.studioLanguagesSearch}
          value={props.form.studioLanguages}
          handleCheck={props.handleCheck}
          checked={props.checked}
          onChange={props.handleChange}
        />
        <span className="errormessage ">{props.formErrors.studioLanguages}</span>
      </fieldset>
      {/* OpeningHours */}
      <fieldset className="listingForm mb-5 flex gap-3">
        <legend className="label-form">Opening hours*</legend>
        <FormInput
          labelWrap={{
            css: props.form.openingHours.includes('Always Available') ? 'radio-formActive' : 'radio-form',
          }}
          type="radio"
          id="openingHours"
          name="openingHours"
          value="Always Available"
          checked={props.form.openingHours.includes('Always Available')}
          onChange={props.handleChange}
          afterLabel={{
            string: 'Always Available',
            css: 'cursor-pointer',
          }}
        />
        <FormInput
          labelWrap={{
            css: props.form.openingHours.includes('On Request') ? 'radio-formActive' : 'radio-form',
          }}
          type="radio"
          id="onRequest"
          name="openingHours"
          value="On Request"
          checked={props.form.openingHours.includes('On Request')}
          onChange={props.handleChange}
          afterLabel={{
            string: 'On Request',
            css: 'cursor-pointer',
          }}
        />
      </fieldset>
      {/* location-features */}
      <fieldset className="listingForm mb-5 flex flex-wrap gap-3">
        <legend className="label-form">Location Features*</legend>
        <FormInput
          labelWrap={{
            css: props.form.locationFeatures.includes('Parking') ? 'radio-formActive' : 'radio-form',
          }}
          type="checkbox"
          id="parking"
          value="Parking"
          name="locationFeatures"
          checked={props.form.locationFeatures.includes('Parking')}
          onChange={props.handleChange}
          afterLabel={{
            string: 'Parking',
            css: 'cursor-pointer',
          }}
        />
        <FormInput
          labelWrap={{
            css: props.form.locationFeatures.includes('Wi-Fi') ? 'radio-formActive' : 'radio-form',
          }}
          type="checkbox"
          id="wifi"
          value="Wi-Fi"
          name="locationFeatures"
          checked={props.form.locationFeatures.includes('Wi-Fi')}
          onChange={props.handleChange}
          afterLabel={{
            string: 'Wi-Fi',
            css: 'cursor-pointer',
          }}
        />
        <FormInput
          labelWrap={{
            css: props.form.locationFeatures.includes('Snacks') ? 'radio-formActive' : 'radio-form',
          }}
          type="checkbox"
          id="snacks"
          value="Snacks"
          name="locationFeatures"
          checked={props.form.locationFeatures.includes('Snacks')}
          onChange={props.handleChange}
          afterLabel={{
            string: 'Snacks',
            css: 'cursor-pointer',
          }}
        />
        <FormInput
          labelWrap={{
            css: props.form.locationFeatures.includes('WC') ? 'radio-formActive' : 'radio-form',
          }}
          type="checkbox"
          id="wc"
          value="WC"
          name="locationFeatures"
          checked={props.form.locationFeatures.includes('WC')}
          onChange={props.handleChange}
          afterLabel={{
            string: 'WC',
            css: 'cursor-pointer',
          }}
        />
        <FormInput
          labelWrap={{
            css: props.form.locationFeatures.includes('Kitchen') ? 'radio-formActive' : 'radio-form',
          }}
          type="checkbox"
          id="kitchen"
          value="Kitchen"
          name="locationFeatures"
          checked={props.form.locationFeatures.includes('Kitchen')}
          onChange={props.handleChange}
          afterLabel={{
            string: 'Kitchen',
            css: 'cursor-pointer',
          }}
        />
        <FormInput
          labelWrap={{
            css: props.form.locationFeatures.includes('Smoking') ? 'radio-formActive' : 'radio-form',
          }}
          type="checkbox"
          id="smoking"
          value="Smoking"
          name="locationFeatures"
          checked={props.form.locationFeatures.includes('Smoking')}
          onChange={props.handleChange}
          afterLabel={{
            string: 'Smoking',
            css: 'cursor-pointer',
          }}
        />
        <FormInput
          labelWrap={{
            css: props.form.locationFeatures.includes('Sleepover') ? 'radio-formActive' : 'radio-form',
          }}
          type="checkbox"
          id="sleepover"
          value="Sleepover"
          name="locationFeatures"
          checked={props.form.locationFeatures.includes('Sleepover')}
          onChange={props.handleChange}
          afterLabel={{
            string: 'Sleepover',
            css: 'cursor-pointer',
          }}
        />
        <FormInput
          labelWrap={{
            css: props.form.locationFeatures.includes('Party') ? 'radio-formActive' : 'radio-form',
          }}
          type="checkbox"
          id="party"
          value="Party"
          name="locationFeatures"
          checked={props.form.locationFeatures.includes('Party')}
          onChange={props.handleChange}
          afterLabel={{
            string: 'Party',
            css: 'cursor-pointer',
          }}
        />
        <FormInput
          labelWrap={{
            css: props.form.locationFeatures.includes('Drinks') ? 'radio-formActive' : 'radio-form',
          }}
          type="checkbox"
          id="drinks"
          value="Drinks"
          name="locationFeatures"
          checked={props.form.locationFeatures.includes('Drinks')}
          onChange={props.handleChange}
          afterLabel={{
            string: 'Drinks',
            css: 'cursor-pointer',
          }}
        />
        <FormInput
          labelWrap={{
            css: props.form.locationFeatures.includes('Microwave') ? 'radio-formActive' : 'radio-form',
          }}
          type="checkbox"
          id="microwave"
          value="Microwave"
          name="locationFeatures"
          checked={props.form.locationFeatures.includes('Microwave')}
          onChange={props.handleChange}
          afterLabel={{
            string: 'Microwave',
            css: 'cursor-pointer',
          }}
        />
        <div className={`hidden ${props.formErrors.locationFeatures ?? 'block'}`}>
          <span className="errormessage">{props.formErrors.locationFeatures}</span>
        </div>
      </fieldset>
      {/* StudioSleepover */}
      {props.form.locationFeatures.includes('Sleepover') ? (
        <fieldset className="listingForm mb-5 flex flex-col gap-3">
          <legend className="label-form">Sleepover informations*</legend>
          <label
            htmlFor="bedsCount"
            className={props.checked.sleepOver.includes('bedsCount') ? 'radio-formActive' : 'radio-form'}>
            <FormInput
              labelWrap={{
                css: 'cursor-pointer',
                string: 'Beds available',
              }}
              type="checkbox"
              className="mr-2"
              name="sleepOver"
              id="bedsCount"
              checked={props.checked.sleepOver.includes('bedsCount')}
              onChange={(event) => {
                props.handleCheck(event);
              }}
            />
            <FormInput
              className="priceInput-form peer outline-none"
              type="number"
              name="sleepOver"
              id="bedsCount"
              required
              min={1}
              max={1000}
              errorMessage={'Min 1 max 1000'}
              disabled={!props.checked.sleepOver.includes('bedsCount')}
              value={
                !props.checked.sleepOver.includes('bedsCount')
                  ? 0
                  : props.form.sleepOver.bedsCount === undefined
                  ? ''
                  : props.form.sleepOver.bedsCount
              }
              onChange={props.handleChange}></FormInput>
          </label>
          <label
            htmlFor="maxPeople"
            className={props.checked.sleepOver.includes('maxPeople') ? 'radio-formActive' : 'radio-form'}>
            <FormInput
              type="checkbox"
              labelWrap={{
                css: 'cursor-pointer',
                string: 'Max persons',
              }}
              className="mr-2"
              name="sleepOver"
              id="maxPeople"
              checked={props.checked.sleepOver.includes('maxPeople')}
              onChange={(event) => {
                props.handleChange(event);
                props.handleCheck(event);
              }}
            />
            <FormInput
              className="priceInput-form peer"
              type="number"
              name="sleepOver"
              id="maxPeople"
              required
              max={1000}
              min={1}
              errorMessage={'From 1 to 1000'}
              disabled={!props.checked.sleepOver.includes('maxPeople')}
              value={
                !props.checked.sleepOver.includes('maxPeople')
                  ? 0
                  : props.form.sleepOver.maxPeople === undefined
                  ? ''
                  : props.form.sleepOver.maxPeople
              }
              onChange={props.handleChange}
            />
          </label>
          <div className={`hidden ${props.formErrors.sleepOver ?? 'block'}`}>
            <span className="errormessage">{props.formErrors.sleepOver}</span>
          </div>
        </fieldset>
      ) : null}
      {/* StudioSocials */}
      <fieldset className="listingForm mb-5 space-y-2">
        {/* soundcloud */}
        <FormInput
          beforeLabel={{
            string: 'Social Links',
            css: 'label-form ',
            required: true,
            description:
              'Add socials to this studio (at least one). These will be added to each of the studio services you add to this studio later on.',
          }}
          className="input-form peer block "
          counter={{
            val: props.form.studioSocials.soundcloud.length,
            max: '100',
            css: 'inputCounter',
          }}
          type="text"
          placeholder="https://soundcloud.com/profile"
          id="soundcloud"
          name="studioSocials"
          required
          pattern="https://.*"
          errorMessage={'Try to include https:// and max length 100 characters'}
          value={props.form.studioSocials.soundcloud}
          onChange={props.handleChange}
        />
        {/* spotify */}
        <FormInput
          className="input-form peer block "
          counter={{
            val: props.form.studioSocials.spotify.length,
            max: '100',
            css: 'inputCounter',
          }}
          type="text"
          id="spotify"
          placeholder="https://open.spotify.com/profile"
          name="studioSocials"
          required
          pattern="https://.*"
          errorMessage={'Try to include https:// and max length 100 characters'}
          value={props.form.studioSocials.spotify}
          onChange={props.handleChange}
        />
        {/* youtube */}
        <FormInput
          className="input-form peer block "
          counter={{
            val: props.form.studioSocials.youtube.length,
            max: '100',
            css: 'inputCounter',
          }}
          type="text"
          id="youtube"
          placeholder="https://youtube.com/profile"
          name="studioSocials"
          required
          pattern="https://.*"
          errorMessage={'Try to include https:// and max length 100 characters'}
          value={props.form.studioSocials.youtube}
          onChange={props.handleChange}
        />
        {/* facebook */}
        <FormInput
          className="input-form peer block "
          counter={{
            val: props.form.studioSocials.youtube.length,
            max: '100',
            css: 'inputCounter',
          }}
          type="text"
          id="facebook"
          placeholder="https://facebook.com/profile"
          name="studioSocials"
          required
          pattern="https://.*"
          errorMessage={'Try to include https:// and max length 100 characters'}
          value={props.form.studioSocials.facebook}
          onChange={props.handleChange}
        />
        {/* Instagram */}
        <FormInput
          className="input-form peer block "
          counter={{
            val: props.form.studioSocials.instagram.length,
            max: '100',
            css: 'inputCounter',
          }}
          type="text"
          id="instagram"
          placeholder="https://instagram.com/profile"
          name="studioSocials"
          required
          pattern="https://.*"
          errorMessage={'Try to include https:// and max length 100 characters'}
          value={props.form.studioSocials.instagram}
          onChange={props.handleChange}
        />
        {/* Twitter */}
        <FormInput
          className="input-form peer block "
          counter={{
            val: props.form.studioSocials.twitter.length,
            max: '100',
            css: 'inputCounter',
          }}
          type="text"
          id="twitter"
          placeholder="https://twitter.com/profile"
          name="studioSocials"
          required
          pattern="https://.*"
          errorMessage={'Try to include https:// and max length 100 characters'}
          value={props.form.studioSocials.twitter}
          onChange={props.handleChange}
        />
        {/* Pinterest */}
        <FormInput
          className="input-form peer block "
          counter={{
            val: props.form.studioSocials.pinterest.length,
            max: '100',
            css: 'inputCounter',
          }}
          type="text"
          id="pinterest"
          placeholder="https://pinterest.com/profile"
          name="studioSocials"
          required
          pattern="https://.*"
          errorMessage={'Try to include https:// and max length 100 characters'}
          value={props.form.studioSocials.pinterest}
          onChange={props.handleChange}
        />
        {/* LinkedIn */}
        <FormInput
          className="input-form peer block "
          counter={{
            val: props.form.studioSocials.linkedin.length,
            max: '100',
            css: 'inputCounter',
          }}
          type="text"
          id="linkedin"
          placeholder="https://linkedin.com/profile"
          name="studioSocials"
          required
          pattern="https://.*"
          errorMessage={'Try to include https:// and max length 100 characters'}
          value={props.form.studioSocials.linkedin}
          onChange={props.handleChange}
        />
        <span className="errormessage ">{props.formErrors.studioSocials}</span>
      </fieldset>
      {/* StudioRules */}
      <fieldset className="listingForm mb-5 flex flex-wrap gap-3">
        <legend className="label-form">Studiorules</legend>
        <div className="grid w-full grid-cols-bgsm items-center justify-items-start gap-2 sm:w-2/3 lg:w-1/2">
          <h2 className="col-start-1">Are these rules allowed in your Studio?</h2>
          <div className="col-start-2 flex w-full justify-center">
            <p className="">Allow ✅</p>
          </div>
          <p className="col-start-1 pl-5">Are Pets allowed?</p>
          <div className="col-start-2 flex w-full justify-center">
            <FormInput
              type="checkbox"
              id="pets"
              value="Pets"
              name="studioRules"
              className="col-start-2 h-4"
              checked={props.form.studioRules.includes('Pets')}
              onChange={props.handleChange}
            />
          </div>
          <p className="col-start-1 pl-5">Are Kids allowed?</p>
          <div className="col-start-2 flex w-full justify-center">
            <FormInput
              type="checkbox"
              id="kids"
              value="Kids"
              name="studioRules"
              className="col-start-2 h-4"
              checked={props.form.studioRules.includes('Kids')}
              onChange={props.handleChange}
            />
          </div>
          <p className="col-start-1 pl-5">Is Smoking allowed?</p>
          <div className="col-start-2 flex w-full justify-center">
            <FormInput
              type="checkbox"
              id="smoking"
              value="Smoking"
              name="studioRules"
              className="col-start-2 h-4"
              checked={props.form.studioRules.includes('Smoking')}
              onChange={props.handleChange}
            />
          </div>
          <p className="col-start-1 pl-5">Is eating allowed?</p>
          <div className="col-start-2 flex w-full justify-center">
            <FormInput
              type="checkbox"
              id="eating"
              value="Eating"
              name="studioRules"
              className="col-start-2 h-4"
              checked={props.form.studioRules.includes('Eating')}
              onChange={props.handleChange}
            />
          </div>
        </div>
        {/* <FormInput
          labelWrap={{
            css: props.form.studioRules.includes('Wi-Fi') ? 'radio-formActive' : 'radio-form',
          }}
          type="checkbox"
          id="wifi"
          value="Wi-Fi"
          name="studioRules"
          checked={props.form.studioRules.includes('Wi-Fi')}
          onChange={props.handleChange}
          afterLabel={{
            string: 'Wi-Fi',
            css: 'cursor-pointer',
          }}
        />
        <FormInput
          labelWrap={{
            css: props.form.studioRules.includes('Snacks') ? 'radio-formActive' : 'radio-form',
          }}
          type="checkbox"
          id="snacks"
          value="Snacks"
          name="studioRules"
          checked={props.form.studioRules.includes('Snacks')}
          onChange={props.handleChange}
          afterLabel={{
            string: 'Snacks',
            css: 'cursor-pointer',
          }}
        />
        <FormInput
          labelWrap={{
            css: props.form.studioRules.includes('WC') ? 'radio-formActive' : 'radio-form',
          }}
          type="checkbox"
          id="wc"
          value="WC"
          name="studioRules"
          checked={props.form.studioRules.includes('WC')}
          onChange={props.handleChange}
          afterLabel={{
            string: 'WC',
            css: 'cursor-pointer',
          }}
        />
        <FormInput
          labelWrap={{
            css: props.form.studioRules.includes('Kitchen') ? 'radio-formActive' : 'radio-form',
          }}
          type="checkbox"
          id="kitchen"
          value="Kitchen"
          name="studioRules"
          checked={props.form.studioRules.includes('Kitchen')}
          onChange={props.handleChange}
          afterLabel={{
            string: 'Kitchen',
            css: 'cursor-pointer',
          }}
        />
        <FormInput
          labelWrap={{
            css: props.form.studioRules.includes('Smoking') ? 'radio-formActive' : 'radio-form',
          }}
          type="checkbox"
          id="smoking"
          value="Smoking"
          name="studioRules"
          checked={props.form.studioRules.includes('Smoking')}
          onChange={props.handleChange}
          afterLabel={{
            string: 'Smoking',
            css: 'cursor-pointer',
          }}
        />
        <FormInput
          labelWrap={{
            css: props.form.studioRules.includes('Sleepover') ? 'radio-formActive' : 'radio-form',
          }}
          type="checkbox"
          id="sleepover"
          value="Sleepover"
          name="studioRules"
          checked={props.form.studioRules.includes('Sleepover')}
          onChange={props.handleChange}
          afterLabel={{
            string: 'Sleepover',
            css: 'cursor-pointer',
          }}
        /> */}
        {/* <FormInput
          labelWrap={{
            css: props.form.locationFeatures.includes('Party') ? 'radio-formActive' : 'radio-form',
          }}
          type="checkbox"
          id="party"
          value="Party"
          name="locationFeatures"
          checked={props.form.locationFeatures.includes('Party')}
          onChange={props.handleChange}
          afterLabel={{
            string: 'Party',
            css: 'cursor-pointer',
          }}
        />
        <FormInput
          labelWrap={{
            css: props.form.locationFeatures.includes('Drinks') ? 'radio-formActive' : 'radio-form',
          }}
          type="checkbox"
          id="drinks"
          value="Drinks"
          name="locationFeatures"
          checked={props.form.locationFeatures.includes('Drinks')}
          onChange={props.handleChange}
          afterLabel={{
            string: 'Drinks',
            css: 'cursor-pointer',
          }}
        />
        <FormInput
          labelWrap={{
            css: props.form.locationFeatures.includes('Microwave') ? 'radio-formActive' : 'radio-form',
          }}
          type="checkbox"
          id="microwave"
          value="Microwave"
          name="locationFeatures"
          checked={props.form.locationFeatures.includes('Microwave')}
          onChange={props.handleChange}
          afterLabel={{
            string: 'Microwave',
            css: 'cursor-pointer',
          }}
        /> */}
        <div className={`hidden ${props.formErrors.locationFeatures ?? 'block'}`}>
          <span className="errormessage">{props.formErrors.locationFeatures}</span>
        </div>
      </fieldset>
      {/* location */}
      <fieldset className="listingForm mb-52">
        <FormInput
          beforeLabel={{
            string: 'Location',
            css: 'label-form ',
            required: true,
          }}
          className="input-form peer"
          type="text"
          name="studioLocation"
          placeholder="Type [City], [Address]"
          required
          autoComplete="off"
          errorMessage={'Only 5-60 characters and (a-z, A-Z, 0-9, äöü ,-) allowed!'}
          pattern="^([a-zA-Z-])([a-zA-Z-0-9-,äöü\s]){4,60}$"
          value={props.form.studioLocation}
          onChange={props.handleChange}
        />
        <span className="errormessage">{props.formErrors.studioLocation}</span>
      </fieldset>
      {/* Errormessage */}
      <fieldset>
        {props.length !== 0 ? <p className="errormessage text-end">Please resolve your errors first!</p> : null}
      </fieldset>
    </>
  );
}
