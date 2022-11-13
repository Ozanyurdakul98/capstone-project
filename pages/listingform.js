import React from 'react';
import { useState } from 'react';
import { unstable_getServerSession } from 'next-auth/next';
import { authOptions } from './api/auth/[...nextauth].js';
import { FormInput } from '../components/Forms/FormInput';
import { ValidateCreateListing } from '../helpers/Validate.js';
import ListingCardWide from '../components/ListingCardWide';
import ListingCardCarousell from '../components/ListingCardCarousell';
import Image from 'next/image.js';
import { TbHandClick } from 'react-icons/tb';
import { BackgroundOverlayFullscreen as ClickToCloseMax } from '../components/BackgroundOverlay';
import Link from 'next/link.js';
import { useRouter } from 'next/router';

function FormListings(session) {
  const defaultForm = {
    listingTitle: '',
    images: '',
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
  const [submitted, setSubmitted] = useState(false);
  const [submissionFailed, setSubmissionFailed] = useState(false);
  const router = useRouter();

  const handlePreview = (event) => {
    const passForm = form;
    setFormErrors(ValidateCreateListing(passForm));
    if (Object.keys(ValidateCreateListing(passForm)).length === 0) {
      handleUploadInput(event);
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
        if (res.ok) {
          setPreview(false);
          setSubmitted(true);
          router.push({
            pathname: '/success',
            query: {
              operation: 'createlisting',
            },
          });
        }
      } catch (error) {
        setFormErrors(error);
        setPreview(false);
        setSubmissionFailed(true);
        console.error('Failed to add', error);
      }
    }
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
        setChecked({ ...checked, imagesPreview: URL.createObjectURL(wertImage), images: wertImage });
        return;
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
  const handleUploadInput = async (event) => {
    const formData = new FormData();
    const preset = 'cy1wyxej';
    const url = 'https://api.cloudinary.com/v1_1/drt9lfnfg/image/upload';
    formData.append('file', checked.images);
    formData.append('upload_preset', preset);
    const res = await fetch(url, {
      method: 'POST',
      body: formData,
    });
    const data = await res.json();
    data
      ? setForm({ ...form, images: data.secure_url })
      : setForm({ ...form, images: '/images/Thumbnail-Default.png' });
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
                  <div
                    className={
                      form.images || checked.imagesPreview
                        ? 'bg-site border-primary  relative  flex h-56 w-48 flex-shrink-0 flex-col items-center justify-center gap-2 rounded-xl border-2 border-dotted text-white transition duration-75 ease-out  active:scale-95 sm:h-60 sm:w-48 md:h-60 md:w-56 md:px-2 lg:h-72 lg:w-64'
                        : 'bg-primary relative  flex  h-56 w-48 flex-shrink-0 flex-col items-center justify-center gap-2 rounded-xl border-2 border-dotted border-white text-white transition duration-75 ease-out  active:scale-95 sm:h-60 sm:w-48 md:h-60 md:w-56 md:px-2 lg:h-72 lg:w-64'
                    }>
                    {form.images || checked.imagesPreview ? (
                      <Image
                        src={checked.imagesPreview ? checked.imagesPreview : form.images}
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
            <fieldset className='listingForm mb-52'>
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
            {/* PreviewModal */}
            <fieldset>
              {preview && (
                <>
                  <div className='searchFadein fixed inset-x-0 inset-y-0 top-0 left-0 right-0 z-50 my-auto mx-auto flex h-4/6   w-full  flex-col gap-5    rounded-2xl bg-white pb-5 pt-5 shadow-xxl  md:min-h-72 md:w-11/12 xl:w-6/12'>
                    <div className=' overflow-y-scroll'>
                      {/* Previews */}
                      <div className='flex flex-col gap-7 pb-20'>
                        <div className='flex flex-col gap-4'>
                          <h2 className='h2 ml-5'>Preview of your Listings</h2>
                          <p className='text-center '>Thank you for beeing part of Tonstudio-Kleinanzeigen!</p>
                        </div>
                        <div>
                          <h3 className='h3 ml-5'>Searchpage preview</h3>

                          <ListingCardWide
                            listingTitle={form.listingTitle}
                            images={form.images ? form.images : '/images/Thumbnail-Default.png'}
                            studiotype={form.studiotype}
                            services={form.services}
                            soundengineer={form.soundengineer}
                            studioPricing={form.studioPricing}
                            locationFeatures={form.locationFeatures}
                            studioLocation={form.studioLocation}
                          />
                        </div>
                        <div className='ml-5 pb-4'>
                          <h3 className='h3'>Startpage preview</h3>
                          <div className='-ml-4'>
                            <ListingCardCarousell
                              listingTitle={form.listingTitle}
                              images={form.images ? form.images : '/images/Thumbnail-Default.png'}
                              studiotype={form.studiotype}
                              services={form.services}
                              soundengineer={form.soundengineer}
                              studioPricing={form.studioPricing}
                              locationFeatures={form.locationFeatures}
                              openingHours={form.openingHours}
                              studioLocation={form.studioLocation}
                            />
                          </div>
                        </div>
                      </div>
                      {/* Buttons */}
                      <div className=' absolute bottom-0 z-40 flex h-16 w-full items-center  justify-between gap-3  rounded-b-xl border-t-2 bg-white px-2 pb-1 pt-5 '>
                        <button
                          onClick={() => setPreview(false)}
                          className='form-button max-w-[250px]  flex-grow justify-center border-none bg-black text-white'>
                          Cancel
                        </button>
                        <button
                          onClick={handleFormSubmit}
                          className='form-button bg-primary max-w-[250px] flex-grow justify-center border-none text-white'>
                          List Studio
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
            {/* ErrorModal */}
            <fieldset>
              {submissionFailed ? (
                <>
                  <div className='searchFadein w- fixed inset-x-0 inset-y-0 top-0 left-0 right-0 z-50 my-auto mx-auto flex   h-96  w-full flex-col  gap-5 rounded-2xl bg-white pb-5 pt-5  shadow-xxl md:min-h-72 md:w-7/12 xl:w-6/12 2xl:w-[680px]'>
                    {/* Previews */}
                    <div className='flex flex-col gap-7 overflow-y-scroll pb-20'>
                      <h2 className='h2 ml-5'>The operation has failed!</h2>
                      <div className='flex w-full flex-col gap-5 px-5 text-center '>
                        <p>
                          Your Studio listing could not submitted! Feel free to contact us with a screenshot of the
                          error message, or try again and see if the problem is resolved.
                        </p>
                        <p>This is the Error message: </p>
                        <p className='text-red-500'>{Object.entries(formErrors)}</p>
                      </div>
                    </div>
                    {/* Buttons */}
                    <div className=' absolute bottom-0 z-40 flex h-16 w-full items-center  justify-between gap-3 rounded-b-xl border-t-2 bg-white px-2 pb-1 pt-5 md:px-20 '>
                      <Link href='/listingform'>
                        <button
                          className='form-button max-w-[250px] flex-grow justify-center border-none bg-black text-white'
                          onClick={() => {
                            setSubmissionFailed(false);
                            router.push('/listingform');
                            setTimeout(() => {
                              router.reload();
                            }, 100);
                          }}>
                          Try again
                        </button>
                      </Link>
                      <Link href='/contact'>
                        <button className='form-button bg-primary max-w-[250px] flex-grow justify-center border-none text-white'>
                          Contact support
                        </button>
                      </Link>
                    </div>
                  </div>
                  <ClickToCloseMax
                    style={'bg-black/50 searchBarModal  z-40 h-full'}
                    onClick={(event) => handleClickToCloseSearch(event)}
                  />
                </>
              ) : null}
            </fieldset>
            {/* Form-Buttons */}
            <fieldset className='flex max-w-6xl justify-between gap-3 sm:gap-20 md:gap-80 lg:gap-[600px] '>
              <button
                type='button'
                className='form-button bg-black text-white hover:bg-black'
                onClick={() => {
                  setForm(defaultForm);
                  setChecked(defaultChecked);
                }}>
                Reset
              </button>
              <button
                type='button'
                onClick={(event) => {
                  handlePreview(event);
                }}
                className='form-button hover:bg-secondary-hover text-white'>
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
