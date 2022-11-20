import React from 'react';
import { FormInput } from '../../components/Forms/FormInput';
import ListingCardWide from '../../components/ListingCardWide';
import ListingCardCarousell from '../../components/ListingCardCarousell';
import Image from 'next/image.js';
import { TbHandClick } from 'react-icons/tb';
import { BackgroundOverlayFullscreen as ClickToCloseMax } from '../../components/BackgroundOverlay';
import Link from 'next/link.js';

export function StudioFormfields(props) {
  return (
    <>
      {/* title */}
      <fieldset className='listingForm '>
        <FormInput
          beforeLabel={{
            string: 'Listing Title',
            css: 'label-form ',
          }}
          className='input-form peer block '
          type='text'
          id='titel'
          placeholder='Listing Title here..'
          name='listingTitle'
          required
          autoComplete='off'
          pattern='^([a-zA-Z-])([a-zA-Z-0-9-!äöü,-_\s]){9,60}$'
          errorMessage={'Only 10-60 characters and (a-z, A-Z, 0-9, ! äöü ,-_) allowed!'}
          value={props.form.listingTitle}
          onChange={props.handleChange}></FormInput>
        <span className='errormessage '>{props.formErrors.listingTitle}</span>
      </fieldset>
      {/* Mediafiles */}
      <fieldset className='listingForm '>
        <legend htmlFor='image' className=' label-form'>
          Mediafiles
        </legend>
        <div className='relative flex max-w-[1000px] flex-col items-center justify-between md:flex-row '>
          <label className=' cursor-pointer' htmlFor='images'>
            <input
              className='hidden'
              id='images'
              name='images'
              type='file'
              accept='.gif, .jpg, .jpeg, .jfif, .pjpeg, .pjp, .png, .webp'
              onChange={props.handleChange}
              required
            />
            <div
              className={
                props.form.images || props.checked.imagesPreview
                  ? 'bg-site border-primary  relative  flex h-56 w-48 flex-shrink-0 flex-col items-center justify-center gap-2 rounded-xl border-2 border-dotted text-white transition duration-75 ease-out  active:scale-95 sm:h-60 sm:w-48 md:h-60 md:w-56 md:px-2 lg:h-72 lg:w-64'
                  : 'bg-primary relative  flex  h-56 w-48 flex-shrink-0 flex-col items-center justify-center gap-2 rounded-xl border-2 border-dotted border-white text-white transition duration-75 ease-out  active:scale-95 sm:h-60 sm:w-48 md:h-60 md:w-56 md:px-2 lg:h-72 lg:w-64'
              }>
              {props.form.images || props.checked.imagesPreview || props.checked.images ? (
                <Image
                  src={
                    props.checked.imagesPreview
                      ? props.checked.imagesPreview
                      : props.form.images
                      ? props.form.images
                      : props.checked.images
                  }
                  layout='fill'
                  alt='Thumbnail'
                  objectFit='contain'
                />
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
            <p className='pl-2 text-sm md:pl-5'>
              {props.checked.imageName ? props.checked.imageName : 'Please select a picture'}
            </p>
          </label>
          <ul className='border-primary text-primary bg-primary py h-44 w-60 list-disc rounded-xl border-4 p-2 pl-8 text-sm text-white md:mb-4 md:h-56 md:w-64 md:text-base lg:h-60 lg:w-80 xl:text-lg '>
            <li className='h3 list-none pb-2  text-white'>Tips for good photos:</li>
            <li className='font-thin'>Different perspectives of the studio setup</li>
            <li className='font-thin'>Show your equipment and instruments</li>
            <li className='font-thin'>Show sitting areas, awards, kitchen, etc</li>
          </ul>
        </div>
      </fieldset>
      {/* OpeningHours */}
      <fieldset className='listingForm  flex gap-3 '>
        <legend className='label-form'>Opening hours</legend>
        <FormInput
          labelWrap={{
            css: props.form.openingHours.includes('Always Available') ? 'radio-formActive' : 'radio-form',
          }}
          type='radio'
          id='openingHours'
          name='openingHours'
          value='Always Available'
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
          type='radio'
          id='onRequest'
          name='openingHours'
          value='On Request'
          checked={props.form.openingHours.includes('On Request')}
          onChange={props.handleChange}
          afterLabel={{
            string: 'On Request',
            css: 'cursor-pointer',
          }}
        />
      </fieldset>
      {/* Studiotype */}
      <fieldset className='listingForm flex flex-col gap-3'>
        <legend className='label-form'>Studiotype</legend>
        <h2 className='flex items-center gap-2 pl-5 lg:text-lg'>
          Choose a fitting studiotype <TbHandClick className='h-6 w-6 rotate-[-25deg] lg:h-8 lg:w-8' />
        </h2>
        <button
          type='button'
          className={props.form.studiotype === 'Premium Studio' ? ' studiotypeActive ' : 'studiotype'}
          onClick={() => {
            props.setForm({ ...props.form, studiotype: 'Premium Studio' });
          }}>
          <p className='h3 text-white'>Premium Studio</p>
          <p>
            Studios with premium equipment, atmospheric rooms and many extras. The studio has many years of experience
            and top references.
            <br />
            The studio is in the upper price segment
          </p>
        </button>
        <button
          type='button'
          className={props.form.studiotype === 'Medium Studio' ? 'studiotypeActive' : 'studiotype'}
          onClick={() => {
            props.setForm({ ...props.form, studiotype: 'Medium Studio' });
          }}>
          <p className='h3 text-white'>Medium Studio</p>
          <p>
            Studios with good facilities. You have experience and already have good references.
            <br />
            The studio is in the middle price segment
          </p>
        </button>
        <button
          type='button'
          className={props.form.studiotype === 'Home Studio' ? 'studiotypeActive' : 'studiotype'}
          onClick={() => {
            props.setForm({ ...props.form, studiotype: 'Home Studio' });
          }}>
          <p className='h3 text-white'>Home Studio</p>
          <p>
            Your equipment serves its purpose. You want to get started and you may already have orders for yours Circle
            of acquaintances or others done.
            <br />
            The studio is in the lower price segment
          </p>
        </button>
      </fieldset>
      {/* services */}
      <fieldset className='listingForm flex flex-col gap-2'>
        <legend className='label-form'>Studio services</legend>
        <FormInput
          id='recording'
          value='Recording'
          name='services'
          type='checkbox'
          labelWrap={{
            css: props.form.services.includes('Recording') ? 'radio-formActive' : 'radio-form',
          }}
          checked={props.form.services.includes('Recording')}
          onChange={props.handleChange}
          afterLabel={{
            string: 'Recording',
            css: 'cursor-pointer',
          }}
        />
        <FormInput
          labelWrap={{
            css: props.form.services.includes('Mix') ? 'radio-formActive' : 'radio-form',
          }}
          id='mix'
          value='Mix'
          name='services'
          type='checkbox'
          checked={props.form.services.includes('Mix')}
          onChange={props.handleChange}
          afterLabel={{
            string: 'Mix',
            css: 'cursor-pointer',
          }}
        />
        <FormInput
          labelWrap={{
            css: props.form.services.includes('Master') ? 'radio-formActive' : 'radio-form',
          }}
          id='master'
          value='Master'
          name='services'
          type='checkbox'
          checked={props.form.services.includes('Master')}
          onChange={props.handleChange}
          afterLabel={{
            string: 'Master',
            css: 'cursor-pointer',
          }}
        />
        <FormInput
          labelWrap={{
            css: props.form.services.includes('Musicproduction') ? 'radio-formActive' : 'radio-form',
          }}
          id='musicproduction'
          value='Musicproduction'
          name='services'
          type='checkbox'
          checked={props.form.services.includes('Musicproduction')}
          onChange={props.handleChange}
          afterLabel={{
            string: `
                  Musicproduction `,
            string2: <span className='text-sm'>(Recording, Mix & Master)</span>,
            css: 'cursor-pointer',
          }}
        />
        <FormInput
          labelWrap={{
            css: props.form.services.includes('Rent Studio') ? 'radio-formActive' : 'radio-form',
          }}
          id='rentAStudio'
          value='Rent Studio'
          name='services'
          type='checkbox'
          checked={props.form.services.includes('Rent Studio')}
          onChange={props.handleChange}
          afterLabel={{
            string: `
                  Rent Studio `,
            string2: <span className='text-sm'>(without Soundengineer)</span>,
            css: 'cursor-pointer ',
          }}
        />
        <FormInput
          labelWrap={{
            css: props.form.services.includes('Podcast & Audiobooks') ? 'radio-formActive' : 'radio-form',
          }}
          id='podcastAndAudiobooks'
          value='Podcast & Audiobooks'
          name='services'
          type='checkbox'
          checked={props.form.services.includes('Podcast & Audiobooks')}
          onChange={props.handleChange}
          afterLabel={{
            string: 'Podcast & Audiobooks',
            css: 'cursor-pointer',
          }}
        />
        <span className='errormessage'>{props.formErrors.services}</span>
      </fieldset>
      {/* location-features */}
      <fieldset className='listingForm   flex flex-wrap gap-3 '>
        <legend className='label-form'>Location Features</legend>
        <FormInput
          labelWrap={{
            css: props.form.locationFeatures.includes('Parking') ? 'radio-formActive' : 'radio-form',
          }}
          type='checkbox'
          id='parking'
          value='Parking'
          name='locationFeatures'
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
          type='checkbox'
          id='wifi'
          value='Wi-Fi'
          name='locationFeatures'
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
          type='checkbox'
          id='snacks'
          value='Snacks'
          name='locationFeatures'
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
          type='checkbox'
          id='wc'
          value='WC'
          name='locationFeatures'
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
          type='checkbox'
          id='kitchen'
          value='Kitchen'
          name='locationFeatures'
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
          type='checkbox'
          id='smoking'
          value='Smoking'
          name='locationFeatures'
          checked={props.form.locationFeatures.includes('Smoking')}
          onChange={props.handleChange}
          afterLabel={{
            string: 'Smoking',
            css: 'cursor-pointer',
          }}
        />
        <div className='block'>
          <span className='errormessage block'>{props.formErrors.locationFeatures}</span>
        </div>
      </fieldset>
      {/* Soundengineer */}
      <fieldset className='listingForm  flex flex-col gap-3 '>
        <legend className='label-form'>Soundengineer</legend>
        <FormInput
          labelWrap={{
            css: props.form.soundengineer === 'No Soundengineer' ? 'radio-formActive' : 'radio-form',
          }}
          type='radio'
          id='soundengineerNo'
          name='soundengineer'
          value='No Soundengineer'
          checked={props.form.soundengineer === 'No Soundengineer'}
          onChange={(event) => {
            props.handleChange(event);
            props.handleCheck(event);
          }}
          afterLabel={{
            string: 'No Soundengineer ',
            string2: <span className='text-sm'>(Studio just for Rent)</span>,
            css: 'cursor-pointer',
          }}
        />
        <FormInput
          labelWrap={{
            css: props.form.soundengineer === 'On Request' ? 'radio-formActive' : 'radio-form',
          }}
          type='radio'
          id='soundengineerOnRequest'
          name='soundengineer'
          value='On Request'
          checked={props.form.soundengineer === 'On Request'}
          onChange={(event) => {
            props.handleChange(event);
            props.handleCheck(event);
          }}
          afterLabel={{
            string: 'On Request',
            css: 'cursor-pointer',
          }}
        />
        <FormInput
          labelWrap={{
            css: props.form.soundengineer === 'Inclusive' ? 'radio-formActive' : 'radio-form',
          }}
          type='radio'
          id='soundengineerInclusive'
          name='soundengineer'
          value='Inclusive'
          checked={props.form.soundengineer === 'Inclusive'}
          onChange={(event) => {
            props.handleChange(event);
            props.handleCheck(event);
          }}
          afterLabel={{
            string: 'Inclusive',
            css: 'cursor-pointer',
          }}
        />
        <div className={props.form.soundengineer.soundengineerPrice ? 'radio-formActive' : 'radio-form'}>
          <FormInput
            labelWrap={{
              css: 'cursor-pointer',
              string: 'Price per hour',
            }}
            className='mr-2 '
            type='radio'
            name='soundengineer'
            id='soundengineerPrice'
            checked={props.checked.soundengineer === 'soundengineerPrice'}
            onChange={(event) => {
              props.handleChange(event);
              props.handleCheck(event);
            }}></FormInput>
          <FormInput
            className='priceInput-form peer'
            type='number'
            name='soundengineer'
            id='soundengineerPrice'
            required
            min={1}
            max={9999}
            errorMessage={'From 1 to 9999'}
            disabled={props.checked.soundengineer != 'soundengineerPrice'}
            value={
              props.checked.soundengineer === 'soundengineerPrice' ? props.form.soundengineer.soundengineerPrice : 0
            }
            onChange={(event) => {
              props.handleChange(event);
            }}></FormInput>
        </div>

        <span className='errormessage'>{props.formErrors.soundengineer}</span>
      </fieldset>
      {/* studio-price */}
      <fieldset className='listingForm  flex flex-col gap-3 '>
        <legend className='label-form'>Studio Pricing</legend>
        <div className={props.checked.studioPricing.includes('studioPricingHour') ? 'radio-formActive' : 'radio-form'}>
          <FormInput
            labelWrap={{
              css: 'cursor-pointer',
              string: 'Per hour',
            }}
            type='checkbox'
            className='mr-2'
            name='studioPricing'
            id='studioPricingHour'
            checked={props.checked.studioPricing.includes('studioPricingHour')}
            onChange={(event) => {
              props.handleCheck(event);
            }}
          />
          <FormInput
            className='priceInput-form peer outline-none'
            type='number'
            name='studioPricing'
            id='studioPricingHour'
            required
            min={1}
            max={9999}
            errorMessage={'From 1 to 9999'}
            disabled={!props.checked.studioPricing.includes('studioPricingHour')}
            value={
              !props.checked.studioPricing.includes('studioPricingHour')
                ? 0
                : props.form.studioPricing.studioPricingHour === undefined
                ? ''
                : props.form.studioPricing.studioPricingHour
            }
            onChange={props.handleChange}></FormInput>
        </div>
        <div className={props.checked.studioPricing.includes('studioPricingDay') ? 'radio-formActive' : 'radio-form'}>
          <FormInput
            type='checkbox'
            labelWrap={{
              css: 'cursor-pointer',
              string: 'Per day',
            }}
            className='mr-2'
            name='studioPricing'
            id='studioPricingDay'
            checked={props.checked.studioPricing.includes('studioPricingDay')}
            onChange={(event) => {
              props.handleChange(event);
              props.handleCheck(event);
            }}
          />
          <FormInput
            className='priceInput-form peer'
            type='number'
            name='studioPricing'
            id='studioPricingDay'
            required
            max={9999}
            min={1}
            errorMessage={'From 1 to 9999'}
            disabled={!props.checked.studioPricing.includes('studioPricingDay')}
            value={
              !props.checked.studioPricing.includes('studioPricingDay')
                ? 0
                : props.form.studioPricing.studioPricingDay === undefined
                ? ''
                : props.form.studioPricing.studioPricingDay
            }
            onChange={props.handleChange}
          />
        </div>
        <div className={props.checked.studioPricing.includes('studioPricingWeek') ? 'radio-formActive' : 'radio-form'}>
          <FormInput
            type='checkbox'
            name='studioPricing'
            id='studioPricingWeek'
            className='mr-2'
            checked={props.checked.studioPricing.includes('studioPricingWeek')}
            labelWrap={{
              css: 'cursor-pointer',
              string: 'Per week',
            }}
            onChange={(event) => {
              props.handleCheck(event);
            }}
          />
          <FormInput
            className='priceInput-form peer'
            type='number'
            name='studioPricing'
            id='studioPricingWeek'
            required
            min={1}
            max={9999}
            errorMessage={'From 1 to 9999'}
            disabled={!props.checked.studioPricing.includes('studioPricingWeek')}
            value={
              !props.checked.studioPricing.includes('studioPricingWeek')
                ? 0
                : props.form.studioPricing.studioPricingWeek === undefined
                ? ''
                : props.form.studioPricing.studioPricingWeek
            }
            onChange={props.handleChange}
          />
        </div>
        <div className={props.checked.studioPricing.includes('studioPricingMonth') ? 'radio-formActive' : 'radio-form'}>
          <FormInput
            type='checkbox'
            name='studioPricing'
            id='studioPricingMonth'
            className='mr-2'
            checked={props.checked.studioPricing.includes('studioPricingMonth')}
            labelWrap={{
              css: 'cursor-pointer',
              string: 'Per month',
            }}
            onChange={(event) => {
              props.handleCheck(event);
            }}
          />
          <FormInput
            className='priceInput-form peer '
            type='number'
            name='studioPricing'
            id='studioPricingMonth'
            required
            errorMessage={'From 1 to 9999'}
            min={1}
            max={9999}
            disabled={!props.checked.studioPricing.includes('studioPricingMonth')}
            value={
              !props.checked.studioPricing.includes('studioPricingMonth')
                ? 0
                : props.form.studioPricing.studioPricingMonth === undefined
                ? ''
                : props.form.studioPricing.studioPricingMonth
            }
            onChange={props.handleChange}
          />
        </div>
        <span className='errormessage'>{props.formErrors.studioPricing}</span>
      </fieldset>
      {/* location */}
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
          value={props.form.studioLocation}
          onChange={props.handleChange}
        />
        <span className='errormessage'>{props.formErrors.studioLocation}</span>
      </fieldset>
      {/* Errormessage */}
      <fieldset>
        {props.length !== 0 ? <p className='errormessage text-end'>Please resolve your errors first!</p> : null}
      </fieldset>
    </>
  );
}
