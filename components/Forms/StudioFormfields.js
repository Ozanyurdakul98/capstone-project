import { FormInput } from '../../components/Forms/FormInput';
import Image from 'next/image.js';
import { TbHandClick } from 'react-icons/tb';
import { MdDeleteForever } from 'react-icons/md';

export function StudioFormfields(props) {
  return (
    <>
      {/* Logo */}
      <fieldset className="fset-editUser">
        <legend htmlFor="image" className=" label-form">
          Logo
        </legend>
        <div className=" relative flex h-48 w-48 flex-col sm:h-48 sm:w-48 md:h-56 md:w-56 lg:h-64 lg:w-64 ">
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
                'relative flex h-48 w-48 flex-shrink-0 flex-col items-center justify-center gap-2 rounded-full border-2 border-dotted text-white transition duration-75 ease-out  active:scale-95 sm:h-48 sm:w-48 md:h-56 md:w-56 md:px-2 lg:h-64 lg:w-64' +
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
      {/* Studioname */}
      <fieldset className="listingForm">
        <FormInput
          beforeLabel={{
            string: 'Studioname',
            css: 'label-form ',
            description: 'How do you want to name your Studio?',
          }}
          className="input-form peer block "
          counter={{
            val: props.form.studioName.length,
            max: '40',
            css: 'inputCounter',
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
      <fieldset className="listingForm">
        <FormInput
          beforeLabel={{
            string: 'Profiletext',
            css: 'label-form ',
            description:
              "Write a short text about this studio, visitors of the detailpages of your studio services you'll later add,  will read.",
          }}
          className="input-form peer block resize-none "
          counter={{
            val: props.form.profileText.length,
            max: '350',
            css: 'inputCounter',
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
      {/* Studiotype */}
      <fieldset className="listingForm flex flex-col gap-3">
        <legend className="label-form">Studiotype</legend>
        <h2 className="flex items-center gap-2 pl-5 text-sm font-thin normal-case">
          Choose a fitting studiotype <TbHandClick className="h-6 w-6 rotate-[-25deg] lg:h-8 lg:w-8" />
        </h2>
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
            props.setForm({ ...props.form, studiotype: 'Home Studio' });
          }}>
          <p className="h3 text-white">Home Studio</p>
          <p>
            Your equipment serves its purpose. You want to get started and you may already have orders for yours Circle
            of acquaintances or others done.
            <br />
            The studio is in the lower price segment
          </p>
        </button>
      </fieldset>
      {/* Studiolanguages */}
      <fieldset className="listingForm">
        <FormInput
          beforeLabel={{
            string: 'Studio languages',
            css: 'label-form ',
            description: 'Which languages you can provide your Customer services in?',
          }}
          className="input-form peer block "
          type="text"
          id="studioLanguages"
          placeholder="English, France, German.."
          name="studioLanguages"
          counter={{
            val: props.form.studioLanguages.length,
            max: '70',
            css: 'inputCounter',
          }}
          required
          autoComplete="off"
          pattern="^([a-zA-Z-])([a-zA-Z-0-9-!äöü,-_\s]){3,69}$"
          errorMessage={'Only 4-70 characters and (a-z, A-Z, 0-9, ! äöü ,-_) allowed!'}
          value={props.form.studioLanguages}
          onChange={props.handleChange}></FormInput>

        <span className="errormessage ">{props.formErrors.studioLanguages}</span>
      </fieldset>
      {/* OpeningHours */}
      <fieldset className="listingForm  flex gap-3 ">
        <legend className="label-form">Opening hours</legend>
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
      <fieldset className="listingForm   flex flex-wrap gap-3 ">
        <legend className="label-form">Location Features</legend>
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
        <div className="block">
          <span className="errormessage block">{props.formErrors.locationFeatures}</span>
        </div>
      </fieldset>
      {/* StudioSocials */}
      <fieldset className="listingForm space-y-2">
        {/* soundcloud */}
        <FormInput
          beforeLabel={{
            string: 'Social Links',
            css: 'label-form ',
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
          id="soundcloud"
          placeholder="https://soundcloud.com/profile"
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
      {/* location */}
      <fieldset className="listingForm mb-52">
        <FormInput
          beforeLabel={{
            string: 'Location',
            css: 'label-form ',
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
