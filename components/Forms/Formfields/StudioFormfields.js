import { FormInput } from '../FormInput';
import Image from 'next/image.js';
import { TbHandClick } from 'react-icons/tb';
import { MdDeleteForever } from 'react-icons/md';
import { AddStudioMap } from '../../Mapbox/AddStudioMap';
import { useDispatch, useSelector } from 'react-redux';
import { updateChecked, updateForm } from '../../../slices/addStudioForm';
export function StudioFormfields(props) {
  const dispatch = useDispatch();
  const form = useSelector((state) => state.addStudio.form);
  const checked = useSelector((state) => state.addStudio.checked);
  return (
    <>
      {/* Logo, studioname-/text */}
      <section className="fset-editUser mt-10 lg:flex lg:flex-row-reverse lg:items-center lg:gap-10">
        {/* Logo, */}
        <fieldset className="mb-8 shrink-0 grow ">
          <div className="relative flex h-48 w-48 flex-col items-start sm:h-48 sm:w-48 md:h-56 md:w-56 lg:h-64 lg:w-64">
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
                  (props.logo ? ' bg-site border-primary ' : ' bg-primary ')
                }>
                {props.logo ? (
                  <>
                    <Image
                      src={checked.logoPreview ? checked.logoPreview : ''}
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
                {checked.logoName ? checked.logoName : 'Please select a picture'}
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
              className="input-form peer block lg:w-[80%] "
              counter={{
                val: form.studioName.length,
                max: '40',
                css: 'inputCounter lg:w-[80%]',
              }}
              type="text"
              id="studioName"
              placeholder="Studioname.."
              name="studioName"
              required
              autoComplete="off"
              pattern="^([a-zA-Z-])([a-zA-Z-0-9-!äöü,-_\s]){4,39}$"
              errorMessage={'Only 5-40 characters and (a-z, A-Z, 0-9, ! äöü ,-_) allowed!'}
              value={form.studioName}
              onChange={props.handleChange}></FormInput>
            <span className="errormessage ">{props.formErrors.studioName}</span>
          </fieldset>
          {/* Studio profiletext */}
          <fieldset className="listingForm mb-4 lg:mt-0">
            <FormInput
              beforeLabel={{
                string: 'Profiletext',
                css: 'label-form w-full sm:w-2/3 lg:w-[80%]',
                required: true,
                description:
                  'Write a short text about this studio. Visitors of the detailpage of this Studio will see it.',
              }}
              className="input-form peer block resize-none lg:w-[80%]"
              counter={{
                val: form.profileText.length,
                max: '350',
                css: 'inputCounter lg:w-[80%]',
              }}
              textarea={true}
              id="profileText"
              placeholder="Informative short text about this studio.."
              name="profileText"
              required
              autoComplete="off"
              pattern="^([a-zA-Z-])([a-zA-Z-0-9-!äöü,-_\s]){24,349}$"
              errorMessage={'Only 25-350 characters and (a-z, A-Z, 0-9, ! äöü ,-_) allowed!'}
              value={form.profileText}
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
          className={form.studiotype === 'Premium Studio' ? ' studiotypeActive ' : 'studiotype'}
          onClick={() => {
            dispatch(updateForm({ studiotype: 'Premium Studio' }));
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
          className={form.studiotype === 'Medium Studio' ? 'studiotypeActive' : 'studiotype'}
          onClick={() => {
            dispatch(updateForm({ studiotype: 'Medium Studio' }));
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
          className={form.studiotype === 'Home Studio' ? 'studiotypeActive' : 'studiotype'}
          onClick={() => {
            dispatch(updateForm({ studiotype: 'Home Studio', studioInformation: {} }));
            dispatch(updateChecked({ studioInformation: [] }));
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
      {form.studiotype.includes('Medium Studio') || form.studiotype.includes('Premium Studio') ? (
        <fieldset className="listingForm mb-5 flex flex-col justify-between gap-3 whitespace-nowrap ">
          <legend className="label-form">Additional Studio informations</legend>
          <label
            htmlFor="studioSize"
            className={checked.studioInformation.includes('studioSize') ? 'radio-formActive' : 'radio-form'}>
            <FormInput
              labelWrap={{
                css: 'cursor-pointer',
                string: 'Studio Size',
              }}
              type="checkbox"
              className="mr-2"
              name="studioInformation"
              id="studioSize"
              checked={checked.studioInformation.includes('studioSize')}
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
              disabled={!checked.studioInformation.includes('studioSize')}
              value={
                !checked.studioInformation.includes('studioSize')
                  ? 0
                  : form.studioInformation.studioSize === undefined
                  ? ''
                  : form.studioInformation.studioSize
              }
              onChange={props.handleChange}></FormInput>
          </label>
          <label
            htmlFor="studioRooms"
            className={checked.studioInformation.includes('studioRooms') ? 'radio-formActive' : 'radio-form'}>
            <FormInput
              type="checkbox"
              labelWrap={{
                css: 'cursor-pointer',
                string: 'Studio Rooms',
              }}
              className="mr-2"
              name="studioInformation"
              id="studioRooms"
              checked={checked.studioInformation.includes('studioRooms')}
              onChange={(event) => {
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
              disabled={!checked.studioInformation.includes('studioRooms')}
              value={
                !checked.studioInformation.includes('studioRooms')
                  ? 0
                  : form.studioInformation.studioRooms === undefined
                  ? ''
                  : form.studioInformation.studioRooms
              }
              onChange={props.handleChange}
            />
          </label>
          <p className="max-w-[400px] whitespace-normal pl-5">
            The size is square meters and Studio rooms are the total count of rooms your Studio has.
          </p>
          <span className={`errormessage ${props.formErrors.studioInformation ? 'block' : 'hidden'}`}>
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
          id="studioLanguages"
          name="studioLanguages"
          handleDelete={props.handleDelete}
          counter={{
            val: form.studioLanguages.length,
            max: '10',
            css: 'inputCounter z-50',
          }}
          required
          autoComplete="off"
          studioLanguagesSearch={props.studioLanguagesSearch}
          value={form.studioLanguages}
          handleCheck={props.handleCheck}
          onChange={props.handleChange}
        />
        <span className="errormessage ">{props.formErrors.studioLanguages}</span>
      </fieldset>
      {/* OpeningHours */}
      <fieldset className="listingForm mb-5 flex gap-3">
        <legend className="label-form">Opening hours*</legend>
        <FormInput
          labelWrap={{
            css: form.openingHours.includes('Always Available') ? 'radio-formActive' : 'radio-form',
          }}
          type="radio"
          id="openingHours"
          name="openingHours"
          value="Always Available"
          checked={form.openingHours.includes('Always Available')}
          onChange={props.handleChange}
          afterLabel={{
            string: 'Always Available',
            css: 'cursor-pointer',
          }}
        />
        <FormInput
          labelWrap={{
            css: form.openingHours.includes('On Request') ? 'radio-formActive' : 'radio-form',
          }}
          type="radio"
          id="onRequest"
          name="openingHours"
          value="On Request"
          checked={form.openingHours.includes('On Request')}
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
            css: form.locationFeatures.includes('Parking') ? 'radio-formActive' : 'radio-form',
          }}
          type="checkbox"
          id="parking"
          value="Parking"
          name="locationFeatures"
          checked={form.locationFeatures.includes('Parking')}
          onChange={props.handleChange}
          afterLabel={{
            string: 'Parking',
            css: 'cursor-pointer',
          }}
        />
        <FormInput
          labelWrap={{
            css: form.locationFeatures.includes('Wi-Fi') ? 'radio-formActive' : 'radio-form',
          }}
          type="checkbox"
          id="wifi"
          value="Wi-Fi"
          name="locationFeatures"
          checked={form.locationFeatures.includes('Wi-Fi')}
          onChange={props.handleChange}
          afterLabel={{
            string: 'Wi-Fi',
            css: 'cursor-pointer',
          }}
        />
        <FormInput
          labelWrap={{
            css: form.locationFeatures.includes('Snacks') ? 'radio-formActive' : 'radio-form',
          }}
          type="checkbox"
          id="snacks"
          value="Snacks"
          name="locationFeatures"
          checked={form.locationFeatures.includes('Snacks')}
          onChange={props.handleChange}
          afterLabel={{
            string: 'Snacks',
            css: 'cursor-pointer',
          }}
        />
        <FormInput
          labelWrap={{
            css: form.locationFeatures.includes('WC') ? 'radio-formActive' : 'radio-form',
          }}
          type="checkbox"
          id="wc"
          value="WC"
          name="locationFeatures"
          checked={form.locationFeatures.includes('WC')}
          onChange={props.handleChange}
          afterLabel={{
            string: 'WC',
            css: 'cursor-pointer',
          }}
        />
        <FormInput
          labelWrap={{
            css: form.locationFeatures.includes('Kitchen') ? 'radio-formActive' : 'radio-form',
          }}
          type="checkbox"
          id="kitchen"
          value="Kitchen"
          name="locationFeatures"
          checked={form.locationFeatures.includes('Kitchen')}
          onChange={props.handleChange}
          afterLabel={{
            string: 'Kitchen',
            css: 'cursor-pointer',
          }}
        />
        <FormInput
          labelWrap={{
            css: form.locationFeatures.includes('Smoking') ? 'radio-formActive' : 'radio-form',
          }}
          type="checkbox"
          id="smoking"
          value="Smoking"
          name="locationFeatures"
          checked={form.locationFeatures.includes('Smoking')}
          onChange={props.handleChange}
          afterLabel={{
            string: 'Smoking',
            css: 'cursor-pointer',
          }}
        />
        <FormInput
          labelWrap={{
            css: form.locationFeatures.includes('Sleepover') ? 'radio-formActive' : 'radio-form',
          }}
          type="checkbox"
          id="sleepover"
          value="Sleepover"
          name="locationFeatures"
          checked={form.locationFeatures.includes('Sleepover')}
          onChange={props.handleChange}
          afterLabel={{
            string: 'Sleepover',
            css: 'cursor-pointer',
          }}
        />
        <FormInput
          labelWrap={{
            css: form.locationFeatures.includes('Party') ? 'radio-formActive' : 'radio-form',
          }}
          type="checkbox"
          id="party"
          value="Party"
          name="locationFeatures"
          checked={form.locationFeatures.includes('Party')}
          onChange={props.handleChange}
          afterLabel={{
            string: 'Party',
            css: 'cursor-pointer',
          }}
        />
        <FormInput
          labelWrap={{
            css: form.locationFeatures.includes('Drinks') ? 'radio-formActive' : 'radio-form',
          }}
          type="checkbox"
          id="drinks"
          value="Drinks"
          name="locationFeatures"
          checked={form.locationFeatures.includes('Drinks')}
          onChange={props.handleChange}
          afterLabel={{
            string: 'Drinks',
            css: 'cursor-pointer',
          }}
        />
        <FormInput
          labelWrap={{
            css: form.locationFeatures.includes('Microwave') ? 'radio-formActive' : 'radio-form',
          }}
          type="checkbox"
          id="microwave"
          value="Microwave"
          name="locationFeatures"
          checked={form.locationFeatures.includes('Microwave')}
          onChange={props.handleChange}
          afterLabel={{
            string: 'Microwave',
            css: 'cursor-pointer',
          }}
        />
        <div className={`${props.formErrors.locationFeatures ? 'block' : 'hidden'}`}>
          <span className="errormessage">{props.formErrors.locationFeatures}</span>
        </div>
      </fieldset>
      {/* StudioSleepover */}
      {form.locationFeatures.includes('Sleepover') ? (
        <fieldset className="listingForm mb-5 flex flex-col gap-3">
          <legend className="label-form">Sleepover informations*</legend>
          <label
            htmlFor="bedsCount"
            className={checked.sleepOver.includes('bedsCount') ? 'radio-formActive' : 'radio-form'}>
            <FormInput
              labelWrap={{
                css: 'cursor-pointer',
                string: 'Beds available',
              }}
              type="checkbox"
              className="mr-2"
              name="sleepOver"
              id="bedsCount"
              checked={checked.sleepOver.includes('bedsCount')}
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
              disabled={!checked.sleepOver.includes('bedsCount')}
              value={
                !checked.sleepOver.includes('bedsCount')
                  ? 0
                  : form.sleepOver?.bedsCount === undefined
                  ? ''
                  : form.sleepOver.bedsCount
              }
              onChange={props.handleChange}></FormInput>
          </label>
          <label
            htmlFor="maxPeople"
            className={checked.sleepOver.includes('maxPeople') ? 'radio-formActive' : 'radio-form'}>
            <FormInput
              type="checkbox"
              labelWrap={{
                css: 'cursor-pointer',
                string: 'Max persons',
              }}
              className="mr-2"
              name="sleepOver"
              id="maxPeople"
              checked={checked.sleepOver.includes('maxPeople')}
              onChange={(event) => {
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
              disabled={!checked.sleepOver.includes('maxPeople')}
              value={
                !checked.sleepOver.includes('maxPeople')
                  ? 0
                  : form.sleepOver?.maxPeople === undefined
                  ? ''
                  : form.sleepOver.maxPeople
              }
              onChange={(event) => {
                props.handleChange(event);
              }}
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
            css: 'label-form',
            required: true,
            description:
              'Add socials to this studio (at least one). These will be added to each of the studio services you add to this studio later on.',
          }}
          className="input-form peer block "
          counter={{
            val: form.studioSocials.soundcloud.length,
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
          value={form.studioSocials.soundcloud}
          onChange={props.handleChange}
        />
        {/* spotify */}
        <FormInput
          className="input-form peer block "
          counter={{
            val: form.studioSocials.spotify.length,
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
          value={form.studioSocials.spotify}
          onChange={props.handleChange}
        />
        {/* youtube */}
        <FormInput
          className="input-form peer block "
          counter={{
            val: form.studioSocials.youtube.length,
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
          value={form.studioSocials.youtube}
          onChange={props.handleChange}
        />
        {/* facebook */}
        <FormInput
          className="input-form peer block "
          counter={{
            val: form.studioSocials.youtube.length,
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
          value={form.studioSocials.facebook}
          onChange={props.handleChange}
        />
        {/* Instagram */}
        <FormInput
          className="input-form peer block "
          counter={{
            val: form.studioSocials.instagram.length,
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
          value={form.studioSocials.instagram}
          onChange={props.handleChange}
        />
        {/* Twitter */}
        <FormInput
          className="input-form peer block "
          counter={{
            val: form.studioSocials.twitter.length,
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
          value={form.studioSocials.twitter}
          onChange={props.handleChange}
        />
        {/* Pinterest */}
        <FormInput
          className="input-form peer block "
          counter={{
            val: form.studioSocials.pinterest.length,
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
          value={form.studioSocials.pinterest}
          onChange={props.handleChange}
        />
        {/* LinkedIn */}
        <FormInput
          className="input-form peer block "
          counter={{
            val: form.studioSocials.linkedin.length,
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
          value={form.studioSocials.linkedin}
          onChange={props.handleChange}
        />
        <span className="errormessage ">{props.formErrors.studioSocials}</span>
      </fieldset>
      {/* StudioRules */}
      <fieldset className="listingForm mb-5 flex w-full flex-wrap gap-3 sm:w-2/3 lg:w-1/2">
        <legend className="label-form">Studiorules</legend>
        {/* tick rules */}
        <div className="mb-3 grid w-full grid-cols-bgsm items-center justify-items-start gap-2 ">
          <h2 className="col-start-1 pl-5">Studiorule allowed?</h2>
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
              checked={form.studioRules.includes('Pets')}
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
              checked={form.studioRules.includes('Kids')}
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
              checked={form.studioRules.includes('Smoking')}
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
              checked={form.studioRules.includes('Eating')}
              onChange={props.handleChange}
            />
          </div>
          <p className="col-start-1 pl-5">Is partying allowed?</p>
          <div className="col-start-2 flex w-full justify-center">
            <FormInput
              type="checkbox"
              id="party"
              value="Party"
              name="studioRules"
              className="col-start-2 h-4"
              checked={form.studioRules.includes('Party')}
              onChange={props.handleChange}
            />
          </div>
        </div>
        {/* error */}
        <div className={`hidden ${props.formErrors.studioRules ?? 'block'}`}>
          <span className="errormessage">{props.formErrors.studioRules}</span>
        </div>
        {/* additionRules */}
        <fieldset className="listingForm lg:mt-0">
          <FormInput
            className="input-form peer block w-full resize-none"
            counter={{
              val: form.additionalStudioRules.length,
              max: '350',
              css: 'inputCounter w-full',
            }}
            textarea={true}
            id="additionalStudioRules"
            placeholder="Write some additional rules here.. "
            name="additionalStudioRules"
            required
            autoComplete="off"
            pattern="^([a-zA-Z-])([a-zA-Z-0-9-!äöü,-_\s]){24,349}$"
            errorMessage={'Only 25-350 characters and (a-z, A-Z, 0-9, ! äöü ,-_) allowed!'}
            value={form.additionalStudioRules}
            onChange={props.handleChange}></FormInput>
        </fieldset>
        {/* error */}
        <div className={`hidden ${props.formErrors.additionalStudioRules ?? 'block'}`}>
          <span className="errormessage">{props.formErrors.additionalStudioRules}</span>
        </div>
      </fieldset>
      {/* location */}
      <fieldset className="listingForm mb-28 flex flex-col gap-1 ">
        {/* Input form */}
        <legend className="label-form">Location of your Studio</legend>
        <p className="pl-5">
          Search your full address in the top right corner. Then move the map, so the visible marker is on top of your
          studio location. Below you will see the full address which you can edit in the fields.
        </p>
        <section className="mb-10 h-80 w-full sm:w-2/3 lg:w-1/2">
          <AddStudioMap
            markerIsActive={props.markerIsActive}
            setMarkerIsActive={props.setMarkerIsActive}
            setShowFormExpanded={props.setShowFormExpanded}
            handleMarkerLocation={props.handleMarkerLocation}
            style={{ maxWidth: '545px', height: '320px', borderRadius: '10px' }}
          />
        </section>
        {/* address inputs  */}
        {props.showFormExpanded && (
          <>
            <div className="pl-5 text-sm">
              <p className=" font-semibold">
                Is this your correct & full address? If not, correct it in the below fields.
              </p>
              <p>
                {form.studioLocation.address ? form.studioLocation.address : '[address]'}
                {', '}
                {form.studioLocation.postalcode ? form.studioLocation.postalcode : '[postalcode]'}{' '}
                {form.studioLocation.city ? form.studioLocation.city : '[city]'}
                {', '}
                {form.studioLocation.country ? form.studioLocation.country : '[country]'}
              </p>
              <p className="text-xs">
                ( {form.studioLocation.geolocation ? form.studioLocation.geolocation.join(', ') : ''} )
              </p>
            </div>
            <FormInput
              className="input-form"
              placeholder="Address"
              autoComplete="address-line1"
              name="studioLocation"
              id="address"
              onChange={props.handleChange}
              value={form.studioLocation.address}
            />
            <FormInput
              className="input-form"
              placeholder="City"
              name="studioLocation"
              id="city"
              autoComplete="address-level2"
              onChange={props.handleChange}
              value={form.studioLocation.city}
            />
            <FormInput
              className="input-form"
              placeholder="State / Region"
              name="studioLocation"
              id="state"
              autoComplete="address-level1"
              onChange={props.handleChange}
              value={form.studioLocation.state}
            />
            <FormInput
              className="input-form"
              placeholder="ZIP / Postcode"
              name="studioLocation"
              id="postalcode"
              autoComplete="postal-code"
              onChange={props.handleChange}
              value={form.studioLocation.postalcode}
            />
            <FormInput
              className="input-form"
              placeholder="Country"
              name="studioLocation"
              id="country"
              autoComplete="country-name"
              onChange={props.handleChange}
              value={form.studioLocation.country}
            />
          </>
        )}
        <span className="errormessage">{props.formErrors.studioLocation}</span>
      </fieldset>
      {/* Errormessage */}
      <fieldset>
        {props.length !== 0 ? <p className="errormessage text-end">Please resolve your errors first!</p> : null}
      </fieldset>
    </>
  );
}
