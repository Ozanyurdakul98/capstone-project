import React from 'react';
import { useState } from 'react';
import { unstable_getServerSession } from 'next-auth/next';
import { authOptions } from '../../api/auth/[...nextauth].js';
import { FormInput } from '../../../components/Forms/FormInput';

function FormListings(session) {
  const [form, setForm] = useState({
    listingTitle: '',
    images: '',
    openingHours: 'Always Available',
    studiotype: 'Home Studio',
    services: [],
    locationFeatures: [],
    soundengineer: '',
    studioPricing: {},
    studioLocation: '',
  });
  const [checked, setChecked] = useState({
    soundengineer: false,
    studioPricing: [],
  });
  const handleFormSubmit = async (event) => {
    event.preventDefault();
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
  };

  const handleChange = (event) => {
    const target = event.target;
    const type = target.type;
    const name = target.name;
    const wert = target.value;
    const id = target.id;
    const value = checkValues(type, form, name, wert, id);
    setForm({ ...form, [name]: value() });
  };
  function checkValues(type, form, name, wert, id) {
    return () => {
      if (name === 'studioPricing' || id === 'soundengineerPrice') {
        const currentForm = { ...form?.[name === 'studioPricing' ? name : id], [id]: wert };
        const deleteUndefined = Object.fromEntries(Object.entries(currentForm).filter(([k, v]) => v));
        return deleteUndefined;
      }
      if (type === 'checkbox' || type === 'file') {
        let newArray = [...form?.[name], wert];
        if (form?.[name].includes(wert)) {
          newArray = newArray.filter((service) => service !== wert);
        }
        return newArray;
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

  if (session) {
    return (
      <div>
        <h1 className='text-primary mt-4 mb-2 text-center text-4xl font-bold leading-tight'>Add Studio Listing</h1>
        <form className='text-primary w-full ' onSubmit={handleFormSubmit}>
          {/* title */}
          <fieldset className='w-full leading-tight'>
            <FormInput
              beforeLabel={{ string: 'Listing Title', css: 'label-form ' }}
              className='input-form peer block '
              type='text'
              id='titel'
              name='listingTitle'
              required
              autoComplete='off'
              pattern='^([a-zA-Z-])([a-zA-Z-0-9-!äöü,-_\s]){9,60}$'
              errorMessage={'Only 10-60 characters and (a-z, A-Z, 0-9, ! äöü ,-_) allowed!'}
              value={form.listingTitle}
              onChange={handleChange}></FormInput>
          </fieldset>
          {/* Mediafiles */}
          <fieldset className='w-full leading-tight'>
            <legend htmlFor='image' className=' label-form'>
              Mediafiles
            </legend>
            <div className='flex flex-row items-center justify-between md:flex-row '>
              <label
                className='relative flex h-60 w-40 cursor-pointer flex-col items-center justify-center rounded-xl border border-gray-500 bg-white'
                htmlFor='image'>
                <input
                  className='  absolute bottom-0 h-6 w-40 cursor-pointer rounded-none border-0 border-t-2  p-0 text-center file:hidden'
                  type='file'
                  name='images'
                  id='image'
                  onChange={handleChange}
                />
                Upload Image
              </label>
              <ul className='border-primary text-primary w-60 list-disc border-x-2  border-solid p-2 pl-8 text-sm md:absolute md:right-1 md:text-base lg:right-1/4'>
                <li className='list-none pb-2'>Tips for good photos:</li>
                <li>Different perspectives of the studio setup</li>
                <li>Show your equipment and instruments</li>
                <li>Show sitting areas, awards, kitchen, etc</li>
              </ul>
            </div>
          </fieldset>
          {/* OpeningHours */}
          <fieldset className='flex w-full gap-3 leading-tight'>
            <legend className='label-form'>Opening hours</legend>
            <FormInput
              divClass='radio-form'
              type='radio'
              id='openingHours'
              name='openingHours'
              value='Always Available'
              checked={form.openingHours.includes('Always Available')}
              onChange={handleChange}
              afterLabel={'Always Available'}
            />
            <FormInput
              divClass={'radio-form'}
              type='radio'
              id='onRequest'
              name='openingHours'
              value='On Request'
              checked={form.openingHours.includes('On Request')}
              onChange={handleChange}
              afterLabel={'On Request'}
            />
          </fieldset>
          {/* Studiotype */}
          <fieldset className='w-full leading-tight'>
            <legend className='label-form'>Studiotype</legend>
            <button
              type='button'
              className={
                form.studiotype === 'Premium Studio' ? 'border-primary border-2 bg-red-500' : 'border-primary border-2'
              }
              onClick={() => {
                setForm({ ...form, studiotype: 'Premium Studio' });
              }}>
              <p>Premium Studio</p>
              <p>
                Studios with premium equipment, atmospheric rooms and many extras. The studio has many years of
                experience and top references.
                <br />
                The studio is in the upper price segment
              </p>
            </button>
            <button
              type='button'
              className={
                form.studiotype === 'Medium Studio' ? 'border-primary border-2 bg-red-500' : 'border-primary border-2'
              }
              onClick={() => {
                setForm({ ...form, studiotype: 'Medium Studio' });
              }}>
              <p>Medium Studio</p>
              <p>
                Studios with good facilities. You have experience and already have good references.
                <br />
                The studio is in the middle price segment
              </p>
            </button>
            <button
              type='button'
              className={
                form.studiotype === 'Home Studio' ? 'border-primary border-2 bg-red-500' : 'border-primary border-2'
              }
              onClick={() => {
                setForm({ ...form, studiotype: 'Home Studio' });
              }}>
              <p>Home Studio</p>
              <p>
                Your equipment serves its purpose. You want to get started and you may already have orders for yours
                Circle of acquaintances or others done.
                <br />
                The studio is in the lower price segment
              </p>
            </button>
          </fieldset>
          {/* services */}
          <fieldset className='w-full leading-tight'>
            <legend className='label-form'>Studio services</legend>
            <FormInput
              divClass={'checkbox-form'}
              id='recording'
              value='Recording'
              name='services'
              type='checkbox'
              checked={form.services.includes('Recording')}
              onChange={handleChange}
              afterLabel={'Recording'}
            />
            <FormInput
              divClass={'checkbox-form'}
              id='mix'
              value='Mix'
              name='services'
              type='checkbox'
              checked={form.services.includes('Mix')}
              onChange={handleChange}
              afterLabel={'Mix'}
            />
            <FormInput
              divClass={'checkbox-form'}
              id='master'
              value='Master'
              name='services'
              type='checkbox'
              checked={form.services.includes('Master')}
              onChange={handleChange}
              afterLabel={'Master'}
            />
            <FormInput
              divClass={'checkbox-form'}
              id='musicproduction'
              value='Musicproduction'
              name='services'
              type='checkbox'
              checked={form.services.includes('Musicproduction')}
              onChange={handleChange}
              afterLabel={
                <>
                  Musicproduction <span className='text-sm'>(Recording, Mix & Master)</span>
                </>
              }
            />
            <FormInput
              divClass={'checkbox-form'}
              id='rentAStudio'
              value='Rent Studio'
              name='services'
              type='checkbox'
              checked={form.services.includes('Rent Studio')}
              onChange={handleChange}
              afterLabel={
                <>
                  Rent Studio <span className='text-sm'>(without Soundengineer)</span>
                </>
              }
            />
            <FormInput
              divClass={'checkbox-form'}
              id='podcastAndAudiobooks'
              value='Podcast & Audiobooks'
              name='services'
              type='checkbox'
              checked={form.services.includes('Podcast & Audiobooks')}
              onChange={handleChange}
              afterLabel={'Podcast & Audiobooks'}
            />
          </fieldset>
          {/* location-features */}
          <fieldset className='flex  w-full flex-wrap gap-3 leading-tight'>
            <legend className='label-form'>Location Features</legend>
            <FormInput
              divClass={'checkbox-form'}
              type='checkbox'
              id='parking'
              value='Parking'
              name='locationFeatures'
              onChange={handleChange}
              afterLabel={'Parking'}
            />
            <FormInput
              divClass={'checkbox-form'}
              type='checkbox'
              id='wifi'
              value='Wi-Fi'
              name='locationFeatures'
              onChange={handleChange}
              afterLabel={'Wi-Fi'}
            />
            <FormInput
              divClass={'checkbox-form'}
              type='checkbox'
              id='snacks'
              value='Snacks'
              name='locationFeatures'
              onChange={handleChange}
              afterLabel={'Snacks'}
            />
            <FormInput
              divClass={'checkbox-form'}
              type='checkbox'
              id='wc'
              value='WC'
              name='locationFeatures'
              onChange={handleChange}
              afterLabel={'WC'}
            />
            <FormInput
              divClass={'checkbox-form'}
              type='checkbox'
              id='kitchen'
              value='Kitchen'
              name='locationFeatures'
              onChange={handleChange}
              afterLabel={'Kitchen'}
            />
            <FormInput
              divClass={'checkbox-form'}
              type='checkbox'
              id='smoking'
              value='Smoking'
              name='locationFeatures'
              onChange={handleChange}
              afterLabel={'Smoking'}
            />
          </fieldset>
          {/* Soundengineer */}
          <fieldset className='flex w-full flex-col gap-3 leading-tight'>
            <legend className='label-form'>Soundengineer</legend>
            <FormInput
              divClass={'radio-form'}
              type='radio'
              id='soundengineerNo'
              name='soundengineer'
              value='No Soundengineer'
              onChange={(event) => {
                handleChange(event);
                handleCheck(event);
              }}
              afterLabel={
                <>
                  No <span className='text-sm'>(Studio just for Rent)</span>
                </>
              }
            />
            <FormInput
              divClass={'radio-form'}
              type='radio'
              id='soundengineerOnRequest'
              name='soundengineer'
              value='On Request'
              onChange={(event) => {
                handleChange(event);
                handleCheck(event);
              }}
              afterLabel={'On Request'}
            />
            <FormInput
              divClass={'radio-form'}
              type='radio'
              id='soundengineerInclusive'
              name='soundengineer'
              value='Inclusive'
              onChange={(event) => {
                handleChange(event);
                handleCheck(event);
              }}
              afterLabel={'Inclusive'}
            />
            <div className='radio-form flex items-center'>
              <FormInput
                type='radio'
                name='soundengineer'
                id='soundengineerPrice'
                afterLabel={'Price:'}
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
                afterLabel={'€ / hour'}
                disabled={checked.soundengineer != 'soundengineerPrice'}
                value={checked.soundengineer === 'soundengineerPrice' ? form.soundengineer.soundengineerPrice : 0}
                onChange={handleChange}></FormInput>
            </div>
          </fieldset>
          {/* studio-price */}
          <fieldset className='flex w-full flex-col gap-3 leading-tight'>
            <legend className='label-form'>Studio Pricing</legend>
            <div className='checkbox-form'>
              <FormInput
                type='checkbox'
                name='studioPricing'
                id='studioPricingHour'
                onChange={(event) => {
                  handleCheck(event);
                }}
                afterLabel={'per Hour'}
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
                onChange={handleChange}
                afterLabel={'€'}></FormInput>
            </div>
            <div className='checkbox-form'>
              <FormInput
                type='checkbox'
                name='studioPricing'
                id='studioPricingDay'
                afterLabel={'per Day'}
                onChange={(event) => {
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
                afterLabel={'€'}
              />
            </div>
            <div className='checkbox-form'>
              <FormInput
                type='checkbox'
                name='studioPricing'
                id='studioPricingWeek'
                afterLabel={'per Week'}
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
                afterLabel={'€'}
              />
            </div>
            <div className='checkbox-form'>
              <FormInput
                type='checkbox'
                name='studioPricing'
                id='studioPricingMonth'
                afterLabel={'per Month'}
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
                afterLabel={'€'}
              />
            </div>
          </fieldset>
          {/* location */}
          <fieldset className='w-full leading-tight'>
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
          </fieldset>
          {/* Form-Buttons */}
          <fieldset className='flex justify-between'>
            <button className='button bg-secondary text-white' type='button'>
              Reset
            </button>
            <button type='submit' className='button bg-secondary text-white'>
              Submit
            </button>
          </fieldset>
        </form>
      </div>
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
