import React from 'react';
import { useState, useEffect } from 'react';
import { ValidateCreateListing } from '../../helpers/Validate.js';
import { BackgroundOverlayFullscreen as ClickToCloseMax } from '../BackgroundOverlay';
import Link from 'next/link.js';
import { useRouter } from 'next/router';
import { StudioFormfields } from './StudioFormfields';

function EditStudio({ toUpdateStudio, setOpenEditView, studioID }) {
  const data = toUpdateStudio;
  const defaultForm = data;
  const defaultChecked = {
    soundengineer: '',
    studioPricing: [],
  };
  const [form, setForm] = useState(defaultForm);
  const [checked, setChecked] = useState(defaultChecked);
  const [imageChanged, setImageChanged] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);
  const [submissionFailed, setSubmissionFailed] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [preview, setPreview] = useState(false);
  const router = useRouter();

  const handleClickToCloseModal = () => {
    setOpenEditView(false);
  };
  const handleClickToCloseErrorModal = () => {};
  useEffect(() => {
    return MatchDataWithChecked();
  }, []);

  const handleFormSubmit = async (event) => {
    const passForm = form;
    event.preventDefault();
    setFormErrors(ValidateCreateListing(passForm));
    setIsSubmit(true);
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      setLoading(true);
      try {
        if (imageChanged) {
          const image = await handleUploadInput(event);
        }
        // console.log(JSON.stringify(form));
        // console.log(form);
        const res = await fetch(`/api/dashboard/admin/${studioID}`, {
          method: 'PATCH',
          body: JSON.stringify(form),
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const result = await res.json();
        if (!res.ok) {
          throw new Error('error', res.status);
          setLoading(false);
        }
        if (res.ok) {
          console.log('ok', result);
          setLoading(false);
          // setPreview(false);
          // setSubmitted(true);
          // router.push({
          //   pathname: '/success',
          //   query: {
          //     operation: 'createlisting',
          //   },
          // });
        }
      } catch (error) {
        setLoading(false);
        setFormErrors(error);
        setSubmissionFailed(true);
        console.error('Failed to update data', error);
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

  function MatchDataWithChecked() {
    const pricing = data.studioPricing;
    const engineer = data.soundengineer;

    return () => {
      if (pricing) {
        let pricingArray = [];
        Object.keys(pricing).map((price) => (pricingArray = [...pricingArray, price]));
        setChecked({ ...checked, studioPricing: pricingArray });
      }
      if (typeof engineer === 'object') {
        const string = 'soundengineerPrice';
        setChecked((prev) => ({ ...prev, soundengineer: string }));
      }
    };
  }

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
        setImageChanged(true);
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
      : setForm({ ...form, images: '/images/Thumbnail-default.png' });
  };
  return (
    <>
      <div className='searchFadein fixed inset-x-0 inset-y-0 top-0 left-0 right-0 z-50 my-auto mx-auto flex h-4/6   w-full  flex-col gap-5 rounded-2xl bg-white pb-5 shadow-xxl  md:min-h-72 md:w-11/12 xl:w-6/12'>
        <div className=' overflow-y-scroll sm:px-0'>
          <div className='mt-4 flex flex-col gap-4'>
            <h2 className='h2 ml-5 text-2xl'>Edit Studio</h2>
            <p className='text-center '>Keep it nice and smooth!</p>
          </div>
          <div className=' px-2 sm:ml-5 md:mr-5'>
            <div className='sm:px-0'>
              <form noValidate className='text-primary w-full' onSubmit={handleFormSubmit}>
                <StudioFormfields
                  defaultForm={defaultForm}
                  defaultChecked={defaultChecked}
                  form={form}
                  setForm={setForm}
                  checked={checked}
                  setChecked={setChecked}
                  imageChanged={setImageChanged}
                  length={Object.keys(formErrors).length}
                  formErrors={formErrors}
                  router={router}
                  handleFormSubmit={handleFormSubmit}
                  handleChange={handleChange}
                  handleCheck={handleCheck}></StudioFormfields>
                {/* ErrorModal */}
                <fieldset>
                  {submissionFailed ? (
                    <>
                      <div className='searchFadein fixed inset-x-0 inset-y-0 top-0 left-0 right-0 z-50 my-auto mx-auto flex   h-96  w-full flex-col  gap-5 rounded-2xl bg-white pb-5 pt-5  shadow-xxl md:min-h-72 md:w-7/12 xl:w-6/12 2xl:w-[680px]'>
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
                        style={'bg-black/50 editModal  z-40 h-full'}
                        onClick={(event) => handleClickToCloseErrorModal(event)}
                      />
                    </>
                  ) : null}
                </fieldset>
              </form>
            </div>
          </div>
          {/* Buttons */}
          <div className=' absolute bottom-0 z-30 flex h-16 w-full items-center  justify-between gap-3  rounded-b-xl border-t-2 bg-white px-2 pb-1 pt-5 '>
            <button
              onClick={() => setOpenEditView(false)}
              className='form-button max-w-[250px]  flex-grow justify-center border-none bg-black text-white'>
              Cancel
            </button>
            <button
              onClick={handleFormSubmit}
              className='form-button bg-primary max-w-[250px] flex-grow justify-center border-none text-white'>
              Update Studio
            </button>
          </div>
        </div>
      </div>
      <ClickToCloseMax
        style={'bg-black/50 editModal  z-40 h-full'}
        onClick={(event) => handleClickToCloseModal(event)}
      />
    </>
  );
}

export default EditStudio;
