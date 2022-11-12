import React from 'react';
import { useState } from 'react';
import { unstable_getServerSession } from 'next-auth/next';
import { authOptions } from './api/auth/[...nextauth].js';
import { FormInput } from '../components/Forms/FormInput';
import { ValidateCreateListing } from '../components/Forms/Services/Validate.js';
import ListingCardWide from '../components/ListingCardWide';
import ListingCardCarousell from '../components/ListingCardCarousell';
import Image from 'next/image.js';
import { TbHandClick } from 'react-icons/tb';
import { BackgroundOverlayFullscreen as ClickToCloseMax } from '../components/BackgroundOverlay';

function FormListings(session) {
  const defaultForm = {
    listingTitle: '',
    images: '/images/Thumbnail-Default.png',
    openingHours: 'Always Available',
    studiotype: 'Home Studio',
    services: [],
    locationFeatures: [],
    soundengineer: 'On Request',
    studioPricing: {},
    studioLocation: '',
  };
  const defaultChecked = {
    soundengineer: false,
    studioPricing: [],
  };
  const [form, setForm] = useState(defaultForm);
  const [checked, setChecked] = useState(defaultChecked);
  const [preview, setPreview] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const handlePreview = (event) => {
    console.log('started');
    const passForm = form;
    event.preventDefault();
    setFormErrors(ValidateCreateListing(passForm));
    console.log('errs', ValidateCreateListing(passForm));
    setIsSubmit(true);
    if (Object.keys(ValidateCreateListing(passForm)).length === 0 && isSubmit) {
      setPreview(true);
    }
  };

  const handleFormSubmit = async (event) => {
    const passForm = form;
    event.preventDefault();
    setFormErrors(ValidateCreateListing(passForm));
    setIsSubmit(true);
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      try {
        const res = await fetch('/api/form', {
          method: 'POST',
          body: JSON.stringify(form),
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const result = await res.json();
        if (!res.ok) {
          throw new Error(res.status);
        }
        alert(`Is this your data: ${result}`);
      } catch (error) {
        console.error('Failed to add', error);
      }
    }
  };
  const handleUploadInput = async (event) => {
    //cloudinary
    const formData = new FormData();
    const preset = 'cy1wyxej';
    const url = 'https://api.cloudinary.com/v1_1/drt9lfnfg/image/upload';
    const files = event.target.files[0];
    formData.append('file', form.images);
    formData.append('upload_preset', preset);
    console.log('DBfd', event.target.title.value);

    const res = await fetch('https://api.cloudinary.com/v1_1/blabla/image/upload', {
      method: 'POST',
      body: formData,
    });
    // const data = await res.json();
    const ImageUrl = res.data.secure_url;
  };

  const handleChange = (event) => {
    const target = event.target;
    const type = target.type;
    const name = target.name;
    const wert = target.value;
    const id = target.id;
    const value = checkValues(type, form, name, wert, id, target);
    setForm({ ...form, [name]: value() });
  };
  function checkValues(type, form, name, wert, id, target) {
    return () => {
      if (name === 'studioPricing' || id === 'soundengineerPrice') {
        const currentForm = { ...form?.[name === 'studioPricing' ? name : id], [id]: wert };
        const deleteUndefined = Object.fromEntries(Object.entries(currentForm).filter(([k, v]) => v));
        return deleteUndefined;
      }
      if (type === 'checkbox') {
        let newArray = [...form?.[name], wert];
        if (form?.[name].includes(wert)) {
          newArray = newArray.filter((service) => service !== wert);
        }
        return newArray;
      }
      if (name === 'images') {
        let wertImage = target.files[0];
        setChecked({ ...checked, imageName: wertImage.name });
        wertImage = URL.createObjectURL(wertImage);
        return wertImage;
      } else {
        return wert;
      }
    };
  }
  const handleCheck = (event) => {
    const target = event.target;
    const name = target.name;
    const id = target.id;
    const wert = target.value;
    const isChecked = () => {
      if (name === 'soundengineer') {
        return id;
      }
      if (name === 'studioPricing') {
        let newArray = [...checked?.[name], id];
        if (checked?.[name].includes(id)) {
          newArray = newArray.filter((pricing) => pricing !== id);
          const currentForm = { ...form?.[name], [id]: wert };
          const deleteUnchecked = Object.fromEntries(
            Object.entries(currentForm).filter((pricing) => !pricing.includes(id))
          );
          setForm({ ...form, [name]: deleteUnchecked });
        }
        return newArray;
      }
    };
    setChecked({ ...checked, [name]: isChecked() });
  };
  const handleClickToCloseSearch = () => {
    setPreview(false);
  };
  if (session) {
    return (
      <>
        <div className=' px-2 sm:px-0'>
          <h1 className='text-primary mt-4 mb-2 text-center text-4xl font-bold leading-tight'>Add Studio Listing</h1>
          <form noValidate className='text-primary w-full' onSubmit={handleFormSubmit}>
            {/* title */}
            <fieldset className='listingForm  '>
              <FormInput
                beforeLabel={{ string: 'Listing Title', css: 'label-form ' }}
                className='input-form peer block '
                type='text'
                id='titel'
                placeholder='Listing Title here..'
                name='listingTitle'
                required
                autoComplete='off'
                pattern='^([a-zA-Z-])([a-zA-Z-0-9-!äöü,-_\s]){9,60}$'
                errorMessage={'Only 10-60 characters and (a-z, A-Z, 0-9, ! äöü ,-_) allowed!'}
                value={form.listingTitle}
                onChange={handleChange}></FormInput>
              <span className='errormessage '>{formErrors.listingTitle}</span>
            </fieldset>
            {/* Mediafiles */}
            <fieldset className='listingForm '>
              <legend htmlFor='image' className=' label-form'>
                Mediafiles
              </legend>
              <div className=' relative flex flex-row items-center justify-between md:flex-row '>
                <label className=' cursor-pointer' htmlFor='images'>
                  <input
                    className='hidden'
                    id='images'
                    name='images'
                    type='file'
                    accept='.gif, .jpg, .jpeg, .jfif, .pjpeg, .pjp, .png, .webp'
                    onChange={handleChange}
                    required
                  />
                  <div className='bg-primary relative flex h-56 w-44 flex-shrink-0 flex-col items-center justify-center gap-2 rounded-xl border-2 border-dotted border-white text-white transition duration-75 ease-out  active:scale-95 sm:h-60 sm:w-48 md:h-60 md:w-56 md:px-2 lg:h-72 lg:w-64'>
                    {form.images ? (
                      <Image src={form.images} layout='fill' objectFit='cover' alt='Upload preview' />
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
                    {checked.imageName ? checked.imageName : 'Please select a picture'}
                  </p>
                </label>

                <ul className='border-primary text-primary bg-primary py h-44 w-60 list-disc rounded-xl border-4 p-2 pl-8 text-sm text-white md:absolute md:right-10 md:h-56 md:w-64 md:text-base lg:left-2/4 lg:h-60 lg:w-80 xl:text-lg '>
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
                labelWrap={{ css: form.openingHours.includes('Always Available') ? 'radio-formActive' : 'radio-form' }}
                type='radio'
                id='openingHours'
                name='openingHours'
                value='Always Available'
                checked={form.openingHours.includes('Always Available')}
                onChange={handleChange}
                afterLabel={{ string: 'Always Available', css: 'cursor-pointer' }}
              />
              <FormInput
                labelWrap={{ css: form.openingHours.includes('On Request') ? 'radio-formActive' : 'radio-form' }}
                type='radio'
                id='onRequest'
                name='openingHours'
                value='On Request'
                checked={form.openingHours.includes('On Request')}
                onChange={handleChange}
                afterLabel={{ string: 'On Request', css: 'cursor-pointer' }}
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
                className={form.studiotype === 'Premium Studio' ? ' studiotypeActive ' : 'studiotype'}
                onClick={() => {
                  setForm({ ...form, studiotype: 'Premium Studio' });
                }}>
                <p className='h3 text-white'>Premium Studio</p>
                <p>
                  Studios with premium equipment, atmospheric rooms and many extras. The studio has many years of
                  experience and top references.
                  <br />
                  The studio is in the upper price segment
                </p>
              </button>
              <button
                type='button'
                className={form.studiotype === 'Medium Studio' ? 'studiotypeActive' : 'studiotype'}
                onClick={() => {
                  setForm({ ...form, studiotype: 'Medium Studio' });
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
                className={form.studiotype === 'Home Studio' ? 'studiotypeActive' : 'studiotype'}
                onClick={() => {
                  setForm({ ...form, studiotype: 'Home Studio' });
                }}>
                <p className='h3 text-white'>Home Studio</p>
                <p>
                  Your equipment serves its purpose. You want to get started and you may already have orders for yours
                  Circle of acquaintances or others done.
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
                labelWrap={{ css: form.services.includes('Recording') ? 'radio-formActive' : 'radio-form' }}
                checked={form.services.includes('Recording')}
                onChange={handleChange}
                afterLabel={{ string: 'Recording', css: 'cursor-pointer' }}
              />
              <FormInput
                labelWrap={{ css: form.services.includes('Mix') ? 'radio-formActive' : 'radio-form' }}
                id='mix'
                value='Mix'
                name='services'
                type='checkbox'
                checked={form.services.includes('Mix')}
                onChange={handleChange}
                afterLabel={{ string: 'Mix', css: 'cursor-pointer' }}
              />
              <FormInput
                labelWrap={{ css: form.services.includes('Master') ? 'radio-formActive' : 'radio-form' }}
                id='master'
                value='Master'
                name='services'
                type='checkbox'
                checked={form.services.includes('Master')}
                onChange={handleChange}
                afterLabel={{ string: 'Master', css: 'cursor-pointer' }}
              />
              <FormInput
                labelWrap={{ css: form.services.includes('Musicproduction') ? 'radio-formActive' : 'radio-form' }}
                id='musicproduction'
                value='Musicproduction'
                name='services'
                type='checkbox'
                checked={form.services.includes('Musicproduction')}
                onChange={handleChange}
                afterLabel={{
                  string: `
                  Musicproduction `,
                  string2: <span className='text-sm'>(Recording, Mix & Master)</span>,
                  css: 'cursor-pointer',
                }}
              />
              <FormInput
                labelWrap={{ css: form.services.includes('Rent Studio') ? 'radio-formActive' : 'radio-form' }}
                id='rentAStudio'
                value='Rent Studio'
                name='services'
                type='checkbox'
                checked={form.services.includes('Rent Studio')}
                onChange={handleChange}
                afterLabel={{
                  string: `
                  Rent Studio `,
                  string2: <span className='text-sm'>(without Soundengineer)</span>,
                  css: 'cursor-pointer ',
                }}
              />
              <FormInput
                labelWrap={{ css: form.services.includes('Podcast & Audiobooks') ? 'radio-formActive' : 'radio-form' }}
                id='podcastAndAudiobooks'
                value='Podcast & Audiobooks'
                name='services'
                type='checkbox'
                checked={form.services.includes('Podcast & Audiobooks')}
                onChange={handleChange}
                afterLabel={{ string: 'Podcast & Audiobooks', css: 'cursor-pointer' }}
              />
              <span className='errormessage'>{formErrors.services}</span>
            </fieldset>
            {/* location-features */}
            <fieldset className='listingForm   flex flex-wrap gap-3 '>
              <legend className='label-form'>Location Features</legend>
              <FormInput
                labelWrap={{ css: form.locationFeatures.includes('Parking') ? 'radio-formActive' : 'radio-form' }}
                type='checkbox'
                id='parking'
                value='Parking'
                name='locationFeatures'
                checked={form.locationFeatures.includes('Parking')}
                onChange={handleChange}
                afterLabel={{ string: 'Parking', css: 'cursor-pointer' }}
              />
              <FormInput
                labelWrap={{ css: form.locationFeatures.includes('Wi-Fi') ? 'radio-formActive' : 'radio-form' }}
                type='checkbox'
                id='wifi'
                value='Wi-Fi'
                name='locationFeatures'
                checked={form.locationFeatures.includes('Wi-Fi')}
                onChange={handleChange}
                afterLabel={{ string: 'Wi-Fi', css: 'cursor-pointer' }}
              />
              <FormInput
                labelWrap={{ css: form.locationFeatures.includes('Snacks') ? 'radio-formActive' : 'radio-form' }}
                type='checkbox'
                id='snacks'
                value='Snacks'
                name='locationFeatures'
                checked={form.locationFeatures.includes('Snacks')}
                onChange={handleChange}
                afterLabel={{ string: 'Snacks', css: 'cursor-pointer' }}
              />
              <FormInput
                labelWrap={{ css: form.locationFeatures.includes('WC') ? 'radio-formActive' : 'radio-form' }}
                type='checkbox'
                id='wc'
                value='WC'
                name='locationFeatures'
                checked={form.locationFeatures.includes('WC')}
                onChange={handleChange}
                afterLabel={{ string: 'WC', css: 'cursor-pointer' }}
              />
              <FormInput
                labelWrap={{ css: form.locationFeatures.includes('Kitchen') ? 'radio-formActive' : 'radio-form' }}
                type='checkbox'
                id='kitchen'
                value='Kitchen'
                name='locationFeatures'
                checked={form.locationFeatures.includes('Kitchen')}
                onChange={handleChange}
                afterLabel={{ string: 'Kitchen', css: 'cursor-pointer' }}
              />
              <FormInput
                labelWrap={{ css: form.locationFeatures.includes('Smoking') ? 'radio-formActive' : 'radio-form' }}
                type='checkbox'
                id='smoking'
                value='Smoking'
                name='locationFeatures'
                checked={form.locationFeatures.includes('Smoking')}
                onChange={handleChange}
                afterLabel={{ string: 'Smoking', css: 'cursor-pointer' }}
              />
              <div className='block'>
                <span className='errormessage block'>{formErrors.locationFeatures}</span>
              </div>
            </fieldset>
            {/* Soundengineer */}
            <fieldset className='listingForm  flex flex-col gap-3 '>
              <legend className='label-form'>Soundengineer</legend>
              <FormInput
                labelWrap={{ css: form.soundengineer === 'No Soundengineer' ? 'radio-formActive' : 'radio-form' }}
                type='radio'
                id='soundengineerNo'
                name='soundengineer'
                value='No Soundengineer'
                onChange={(event) => {
                  handleChange(event);
                  handleCheck(event);
                }}
                afterLabel={{
                  string: 'No Soundengineer ',
                  string2: <span className='text-sm'>(Studio just for Rent)</span>,
                  css: 'cursor-pointer',
                }}
              />
              <FormInput
                labelWrap={{ css: form.soundengineer === 'On Request' ? 'radio-formActive' : 'radio-form' }}
                type='radio'
                id='soundengineerOnRequest'
                name='soundengineer'
                value='On Request'
                checked={form.soundengineer === 'On Request'}
                onChange={(event) => {
                  handleChange(event);
                  handleCheck(event);
                }}
                afterLabel={{ string: 'On Request', css: 'cursor-pointer' }}
              />
              <FormInput
                labelWrap={{ css: form.soundengineer === 'Inclusive' ? 'radio-formActive' : 'radio-form' }}
                type='radio'
                id='soundengineerInclusive'
                name='soundengineer'
                value='Inclusive'
                onChange={(event) => {
                  handleChange(event);
                  handleCheck(event);
                }}
                afterLabel={{ string: 'Inclusive', css: 'cursor-pointer' }}
              />
              <div className={form.soundengineer.soundengineerPrice ? 'radio-formActive' : 'radio-form'}>
                <FormInput
                  labelWrap={{ css: 'cursor-pointer', string: 'Price per hour' }}
                  className='mr-2 '
                  type='radio'
                  name='soundengineer'
                  id='soundengineerPrice'
                  onChange={(event) => {
                    handleChange(event);
                    handleCheck(event);
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
                  disabled={checked.soundengineer != 'soundengineerPrice'}
                  value={checked.soundengineer === 'soundengineerPrice' ? form.soundengineer.soundengineerPrice : 0}
                  onChange={(event) => {
                    handleChange(event);
                  }}></FormInput>
              </div>

              <span className='errormessage'>{formErrors.soundengineer}</span>
            </fieldset>
            {/* studio-price */}
            <fieldset className='listingForm  flex flex-col gap-3 '>
              <legend className='label-form'>Studio Pricing</legend>
              <div className={checked.studioPricing.includes('studioPricingHour') ? 'radio-formActive' : 'radio-form'}>
                <FormInput
                  labelWrap={{ css: 'cursor-pointer', string: 'Per hour' }}
                  type='checkbox'
                  className='mr-2'
                  name='studioPricing'
                  id='studioPricingHour'
                  checked={checked.studioPricing.includes('studioPricingHour')}
                  onChange={(event) => {
                    handleCheck(event);
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
                  disabled={!checked.studioPricing.includes('studioPricingHour')}
                  value={
                    !checked.studioPricing.includes('studioPricingHour')
                      ? 0
                      : form.studioPricing.studioPricingHour === undefined
                      ? ''
                      : form.studioPricing.studioPricingHour
                  }
                  onChange={handleChange}></FormInput>
              </div>
              <div className={checked.studioPricing.includes('studioPricingDay') ? 'radio-formActive' : 'radio-form'}>
                <FormInput
                  type='checkbox'
                  labelWrap={{ css: 'cursor-pointer', string: 'Per day' }}
                  className='mr-2'
                  name='studioPricing'
                  id='studioPricingDay'
                  checked={checked.studioPricing.includes('studioPricingDay')}
                  onChange={(event) => {
                    handleChange(event);
                    handleCheck(event);
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
                  disabled={!checked.studioPricing.includes('studioPricingDay')}
                  value={
                    !checked.studioPricing.includes('studioPricingDay')
                      ? 0
                      : form.studioPricing.studioPricingDay === undefined
                      ? ''
                      : form.studioPricing.studioPricingDay
                  }
                  onChange={handleChange}
                />
              </div>
              <div className={checked.studioPricing.includes('studioPricingWeek') ? 'radio-formActive' : 'radio-form'}>
                <FormInput
                  type='checkbox'
                  name='studioPricing'
                  id='studioPricingWeek'
                  className='mr-2'
                  checked={checked.studioPricing.includes('studioPricingWeek')}
                  labelWrap={{ css: 'cursor-pointer', string: 'Per week' }}
                  onChange={(event) => {
                    handleCheck(event);
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
                  disabled={!checked.studioPricing.includes('studioPricingWeek')}
                  value={
                    !checked.studioPricing.includes('studioPricingWeek')
                      ? 0
                      : form.studioPricing.studioPricingWeek === undefined
                      ? ''
                      : form.studioPricing.studioPricingWeek
                  }
                  onChange={handleChange}
                />
              </div>
              <div className={checked.studioPricing.includes('studioPricingMonth') ? 'radio-formActive' : 'radio-form'}>
                <FormInput
                  type='checkbox'
                  name='studioPricing'
                  id='studioPricingMonth'
                  className='mr-2'
                  checked={checked.studioPricing.includes('studioPricingMonth')}
                  labelWrap={{ css: 'cursor-pointer', string: 'Per month' }}
                  onChange={(event) => {
                    handleCheck(event);
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
                  disabled={!checked.studioPricing.includes('studioPricingMonth')}
                  value={
                    !checked.studioPricing.includes('studioPricingMonth')
                      ? 0
                      : form.studioPricing.studioPricingMonth === undefined
                      ? ''
                      : form.studioPricing.studioPricingMonth
                  }
                  onChange={handleChange}
                />
              </div>
              <span className='errormessage'>{formErrors.studioPricing}</span>
            </fieldset>
            {/* location */}
            <fieldset className='listingForm'>
              <FormInput
                beforeLabel={{ string: 'Location', css: 'label-form ' }}
                className='input-form peer'
                type='text'
                name='studioLocation'
                placeholder='Type [City], [Address]'
                required
                autoComplete='off'
                errorMessage={'Only 5-60 characters and (a-z, A-Z, 0-9, äöü ,-) allowed!'}
                pattern='^([a-zA-Z-])([a-zA-Z-0-9-,äöü\s]){4,60}$'
                value={form.studioLocation}
                onChange={handleChange}
              />
              <span className='errormessage'>{formErrors.studioLocation}</span>
            </fieldset>
            {/* Preview */}
            <fieldset>
              {preview && (
                <>
                  <div className=''>
                    <div className='searchFadein min-h-90 fixed inset-x-0 top-0 left-0 right-0 z-50 mx-auto flex w-full  flex-col  rounded-2xl bg-white pb-5 pt-5 shadow-xxl  md:min-h-72 md:w-11/12 xl:w-6/12'>
                      <h2 className='h2 ml-5'>Preview of your Listings</h2>
                      <div>
                        <h3 className='h3 ml-5'>Searchpage preview</h3>
                        <ListingCardWide
                          listingTitle={form.listingTitle}
                          images={form.images}
                          studiotype={form.studiotype}
                          services={form.services}
                          soundengineer={form.soundengineer}
                          studioPricing={form.studioPricing}
                          locationFeatures={form.locationFeatures}
                          studioLocation={form.studioLocation}
                        />
                      </div>
                      <div>
                        <h3 className='h3 ml-5'>Startpage preview</h3>
                        <ListingCardCarousell
                          listingTitle={form.listingTitle}
                          images={form.images}
                          studiotype={form.studiotype}
                          services={form.services}
                          soundengineer={form.soundengineer}
                          studioPricing={form.studioPricing}
                          locationFeatures={form.locationFeatures}
                          openingHours={form.openingHours}
                          studioLocation={form.studioLocation}
                        />
                      </div>
                      <div className='flex-end  z-40 mx-5 flex h-16 items-center justify-between gap-2 border-t-2   bg-white pt-5'>
                        <button
                          onClick={() => setPreview(false)}
                          className='button flex-grow  justify-center border-none bg-red-500 text-white'>
                          Cancel
                        </button>
                        <button
                          onClick={handleFormSubmit}
                          className='button flex-grow justify-center border-none bg-green-500 text-white'>
                          Search
                        </button>
                      </div>
                    </div>
                  </div>

                  <ClickToCloseMax
                    style={'bg-black/50 searchBarModal  z-40 h-full'}
                    onClick={(event) => handleClickToCloseSearch(event)}
                  />
                </>
              )}
            </fieldset>
            {/* Form-Buttons */}
            <fieldset className='flex justify-between'>
              <button
                type='button'
                className='button bg-secondary text-white'
                onClick={() => {
                  setForm(defaultForm);
                  setChecked(defaultChecked);
                }}>
                Reset
              </button>
              <button
                type='button'
                onClick={(event) => {
                  // handlePreview(event);
                  setPreview(true);
                }}
                className='button bg-secondary text-white'>
                Next
              </button>
            </fieldset>
            {/* Errormessage */}
            <fieldset>
              {Object.keys(formErrors).length !== 0 ? (
                <p className='errormessage text-end'>Please resolve your errors first!</p>
              ) : null}
            </fieldset>
          </form>
        </div>
      </>
    );
  }
  return <p>Access Denied</p>;
}

export default FormListings;

export async function getServerSideProps(context) {
  const session = await unstable_getServerSession(context.req, context.res, authOptions);
  if (!session) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  return {
    props: session || null,
  };
}
