import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { ValidateCreateStudioServiceListing } from '../../helpers/Validate';
import { AddStudioServiceFormfields } from './Formfields/AddStudioServiceFormfields';
import ListingCardWideStudioService from '../Result/ListingCardWideStudioService';
import { BackgroundOverlayFullscreen as ClickToCloseMax } from '../BackgroundOverlay';
import Link from 'next/link';
export function StudioServiceForm({
  studioService,
  selectedStudio,
  selectedStudioServiceInformation,
  selectedStudioInformation,
  role,
}) {
  //This component is used to edit Studioservices and to add them.
  // handle Edit || Add page
  const data = selectedStudioServiceInformation;
  const studio = data?.studio;
  const defaultChecked = {
    soundengineer: 'soundengineerOnRequest',
    pricing: [],
  };
  // handle Edit || Add page
  const [form, setForm] = useState({
    service: '',
    listingTitle: '',
    description: '',
    images: { primary: '', other: {} },
    maxGuests: 3,
    equipment: '',
    additionalServices: [],
    openingHours: 'Always Available',
    soundengineer: 'On Request',
    pricing: {},
    studio: selectedStudio?.studio ? selectedStudio.studio : '',
    user: selectedStudio?.user ? selectedStudio.user : '',
    subInformations: { locale: 'de-DE', currency: 'EUR' },
  });
  const [additionalService, setAdditionalService] = useState({
    name: '',
    description: '',
    priceOption: '',
    price: '',
  });
  const [checked, setChecked] = useState(defaultChecked);
  const [isSubmit, setIsSubmit] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [preview, setPreview] = useState(false);
  const [submissionFailed, setSubmissionFailed] = useState(false);
  const defaultPic = '/images/Thumbnail-default.png';
  const router = useRouter();

  // handle Edit || Add page
  function MatchDataWithChecked() {
    const pricing = data?.pricing;
    const engineer = data?.soundengineer;
    if (pricing) {
      let pricingArray = [];
      Object.keys(pricing).map((price) => (pricingArray = [...pricingArray, price]));
      setChecked({ ...checked, pricing: pricingArray });
    }
    if (typeof engineer === 'object') {
      const string = 'soundengineerPrice';
      setChecked((prev) => ({ ...prev, soundengineer: string }));
    }
  }
  // handle Edit || Add page
  useEffect(() => {
    if (!data) return;
    const studioID = studio?._id;
    const userID = data.user._id;
    setForm({ ...data, service: data.service._id, studio: studioID, user: userID });
    MatchDataWithChecked();
  }, []);
  const handlePreview = () => {
    const passForm = form;
    setFormErrors(ValidateCreateStudioServiceListing(passForm, checked));
    if (Object.keys(ValidateCreateStudioServiceListing(passForm, checked)).length === 0) {
      handleUploadInput();
      setPreview(true);
    }
  };
  // handle Edit || Add page
  const handleFormSubmit = async (event) => {
    const passForm = form;
    event.preventDefault();
    setFormErrors(ValidateCreateStudioServiceListing(passForm, checked));
    setIsSubmit(true);
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      try {
        const resPrimaryImage = await handleUploadInput(form.images.primary);
        const res = await fetch(
          `/api/dashboard${role === 'admin' ? '/admin' : ''}/studioservice/${data ? data.id : '1'}`,
          {
            method: `${data ? 'PATCH' : 'POST'}`,
            body: JSON.stringify({ ...form, images: { primary: resPrimaryImage, other: {} } }),
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );
        await res.json();
        if (!res.ok) {
          throw new Error(res.status);
        }
        setPreview(false);
        data
          ? router.reload()
          : router.push({
              pathname: '/success',
              query: {
                operation: 'createlisting',
              },
            });
      } catch (error) {
        setFormErrors(error);
        setPreview(false);
        setSubmissionFailed(true);
        console.error('Failed to add', error);
      }
    }
  };
  const handleUploadInput = async (images) => {
    if (!images) {
      return;
    }
    if (images === defaultPic) {
      return defaultPic;
    }
    const formData = new FormData();
    const preset = 'cy1wyxej';
    const url = 'https://api.cloudinary.com/v1_1/drt9lfnfg/image/upload';
    formData.append('file', images);
    formData.append('upload_preset', preset);
    const res = await fetch(url, {
      method: 'POST',
      body: formData,
    });
    const data = await res.json();
    if (data) return data.secure_url;
    else if (!data) return defaultPic;
  };
  const handleChange = (event, other) => {
    if (other) {
      if (other === 'soundengineer') {
        return setForm({ ...form, soundengineer: { ...form.soundengineer, price: event } });
      }
      if (other === 'pricing') {
        return;
      }
    }
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
      if (name === 'pricing') {
        const currentForm = {
          ...form[name],
          [id]: wert,
        };
        const deleteUndefined = Object.fromEntries(Object.entries(currentForm).filter(([v]) => v));
        return deleteUndefined;
      }
      if (type === 'checkbox') {
        let newArray = [...form[name], wert];
        if (form[name].includes(wert)) {
          newArray = newArray.filter((service) => service !== wert);
        }
        return newArray;
      }
      if (name === 'images') {
        if (!wert) return;
        const wertImage = target.files[0];
        const imageName = wertImage.name;
        setChecked({
          ...checked,
          imagesPreview: URL.createObjectURL(wertImage),
          imageName: imageName,
          images: wertImage,
        });
        if (id === 'primary') {
          const primaryImage = { primary: wertImage, other: '' };
          return primaryImage;
        }
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
      if (name === 'images') {
        let wertImage = target.files[0];
        setChecked({
          ...checked,
          imagesPreview: URL.createObjectURL(wertImage),
          images: wertImage,
        });
        return;
      }
      if (name === 'soundengineer') {
        return id;
      }
      if (name === 'studioService') {
        return id;
      }
      if (name === 'pricing') {
        let newArray = [...checked[name], id];
        if (checked[name].includes(id)) {
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
  const incrementNumberGuests = () => {
    const number = form.maxGuests + 1;
    setForm({ ...form, maxGuests: number });
  };
  const decrementNumberGuests = () => {
    const number = form.maxGuests - 1;
    setForm({ ...form, maxGuests: number });
  };
  const handleAdditionalStudioServices = () => {
    const indexAsName = additionalService.name;
    const alreadyUsedNames = form.additionalServices.map((i) => {
      return i.name;
    });
    const name = additionalService.name.trim();
    const description = additionalService.description.trim();
    const priceOption = additionalService.priceOption.trim();
    const price = additionalService.price.trim();

    if (!name || name.length >= 26 || name.length <= 1) {
      return setFormErrors({ ...formErrors, additionalServices: 'name: 2-25 characters and (a-zA-Z-0-9-!äöü,-_)!' });
    }
    if (!description || description.length >= 201 || description.length <= 9) {
      return setFormErrors({
        ...formErrors,
        additionalServices: 'description: 10-200 characters and (a-zA-Z-0-9-!äöü,-_)!',
      });
    }
    if (!priceOption) {
      return setFormErrors({ ...formErrors, additionalServices: 'Select a price option!' });
    }
    if (!price) {
      return setFormErrors({ ...formErrors, additionalServices: 'Please enter a price!' });
    }
    if (alreadyUsedNames.includes(indexAsName)) {
      return setFormErrors({ ...formErrors, additionalServices: 'Please use a unique service name!' });
    }
    if (form.additionalServices.length >= 5) {
      return setFormErrors({ ...formErrors, additionalServices: 'Max of additional services reached!' });
    }
    setFormErrors({ ...formErrors, additionalServices: '' });
    setForm({
      ...form,
      additionalServices: [
        ...form.additionalServices,
        {
          name: name,
          description: description,
          price: price,
          priceOption: priceOption,
        },
      ],
    });
    setAdditionalService({ name: '', price: '', description: '', priceOption: '' });
  };
  const handleDeleteImage = () => {
    setForm({ ...form, images: { primary: '', other: '' } });
    setChecked({ ...checked, imagesPreview: '', imageName: '' });
  };
  const handleDelete = (id) => {
    if (id) {
      const newArr = form.additionalServices.filter((v) => v.name !== id);
      setForm({ ...form, additionalServices: newArr });
    }
  };
  return (
    <form noValidate className="text-primary w-full" onSubmit={handleFormSubmit}>
      <AddStudioServiceFormfields
        defaultChecked={defaultChecked}
        form={form}
        setForm={setForm}
        checked={checked}
        setChecked={setChecked}
        length={Object.keys(formErrors).length}
        formErrors={formErrors}
        studioService={studioService}
        router={router}
        handlePreview={handlePreview}
        handleFormSubmit={handleFormSubmit}
        handleChange={handleChange}
        handleCheck={handleCheck}
        handleDeleteImage={handleDeleteImage}
        incrementNumberGuests={incrementNumberGuests}
        decrementNumberGuests={decrementNumberGuests}
        additionalService={additionalService}
        setAdditionalService={setAdditionalService}
        handleAdditionalStudioServices={handleAdditionalStudioServices}
        handleDelete={handleDelete}
      />
      {/* PreviewModal */}
      <fieldset>
        {preview && (
          <>
            <div className="searchFadein fixed inset-0 z-50 m-auto flex h-4/6 w-full flex-col gap-5 rounded-2xl bg-white py-5 shadow-xxl md:min-h-72 md:w-11/12 xl:w-6/12">
              <div className=" overflow-y-scroll">
                {/* Previews */}
                <div className="flex flex-col gap-7 pb-20">
                  <div className="flex flex-col gap-4">
                    <h2 className="h2 ml-5">Preview of your Listings</h2>
                    <p className="text-center ">Thank you for beeing part of Tonstudio-Kleinanzeigen!</p>
                  </div>
                  <div>
                    <h3 className="h3 ml-5">Searchpage preview</h3>
                    <ListingCardWideStudioService
                      preview={true}
                      listingTitle={form.listingTitle}
                      images={checked.imagesPreview ? checked.imagesPreview : '/images/Thumbnail-default.png'}
                      studiotype={form.studiotype}
                      maxGuests={form.maxGuests}
                      soundengineer={form.soundengineer}
                      pricing={form.pricing}
                      locationFeatures={form.locationFeatures}
                      studio={selectedStudioInformation || studio}
                    />
                  </div>
                  <div className="ml-5 pb-4">
                    <h3 className="h3">Startpage preview</h3>
                    <div className="-ml-4">
                      {/* <ListingCardCarousellStudioService
                          listingTitle={form.listingTitle}
                          images={form.images ? form.images : '/images/Thumbnail-default.png'}
                          studiotype={form.studiotype}
                          studioService={form.service}
                          soundengineer={form.soundengineer}
                          pricing={form.pricing}
                          locationFeatures={form.locationFeatures}
                          openingHours={form.openingHours}
                          studioLocation={form.studioLocation}
                        /> */}
                    </div>
                  </div>
                </div>
                {/* Buttons */}
                <div className=" absolute bottom-0 z-40 flex h-16 w-full items-center  justify-between gap-3  rounded-b-xl border-t-2 bg-white px-2 pb-1 pt-5 ">
                  <button
                    onClick={() => setPreview(false)}
                    className="form-button max-w-[250px] grow justify-center border-none bg-black text-white">
                    Cancel
                  </button>
                  <button
                    onClick={handleFormSubmit}
                    className="form-button bg-primary max-w-[250px] grow justify-center border-none text-white">
                    {Object.keys(formErrors).length === 0 && isSubmit ? 'List Studio' : 'Check'}
                  </button>
                </div>
              </div>
            </div>
            <ClickToCloseMax style={'bg-black/50 searchBarModal  z-40 h-full'} onClick={() => setPreview(false)} />
          </>
        )}
      </fieldset>
      {/* ErrorModal */}
      <fieldset>
        {submissionFailed ? (
          <>
            <div className="searchFadein fixed inset-0 z-50 m-auto flex h-96 w-full flex-col gap-5 rounded-2xl   bg-white  py-5 shadow-xxl  md:min-h-72 md:w-7/12 xl:w-6/12 2xl:w-[680px]">
              {/* Previews */}
              <div className="flex flex-col gap-7 overflow-y-scroll pb-20">
                <h2 className="h2 ml-5">The operation has failed!</h2>
                <div className="flex w-full flex-col gap-5 px-5 text-center ">
                  <p>
                    Your Studio listing could not submitted! Feel free to contact us with a screenshot of the error
                    message, or try again and see if the problem is resolved.
                  </p>
                  <p>This is the Error message: </p>
                  <p className="text-red-500">{JSON.stringify(formErrors)}</p>
                </div>
              </div>
              {/* Buttons */}
              <div className=" absolute bottom-0 z-40 flex h-16 w-full items-center  justify-between gap-3 rounded-b-xl border-t-2 bg-white px-2 pb-1 pt-5 md:px-20 ">
                <button
                  type="button"
                  className="form-button max-w-[250px] grow justify-center border-none bg-black text-white"
                  onClick={() => router.reload()}>
                  Try again
                </button>
                <Link href="/contact">
                  <button
                    type="button"
                    className="form-button bg-primary max-w-[250px] grow justify-center border-none text-white">
                    Contact support
                  </button>
                </Link>
              </div>
            </div>
            <ClickToCloseMax
              style={'bg-black/50 searchBarModal  z-40 h-full'}
              onClick={() => setSubmissionFailed(false)}
            />
          </>
        ) : null}
      </fieldset>
      {/* buttons */}
      <section className="flex max-w-6xl justify-between gap-3 sm:gap-20 md:gap-80 ">
        <button
          type="button"
          className="form-button bg-black text-white hover:bg-black"
          onClick={() => {
            router.reload();
          }}>
          Reset
        </button>
        <button
          type="button"
          onClick={() => {
            handlePreview();
          }}
          className="form-button hover:bg-secondary-hover text-white">
          {Object.keys(formErrors).length === 0 && isSubmit ? 'Next' : 'Check'}
        </button>
      </section>
    </form>
  );
}
