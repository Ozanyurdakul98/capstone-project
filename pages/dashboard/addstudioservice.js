import moment from 'moment';
import { getToken } from 'next-auth/jwt';
import { useState } from 'react';
import AddStudioserviceCardWideStudio from '../../components/Cards/AddStudioserviceCardWideStudio';
import DashboardLayout from '../../components/Layout/DashboardLayout';
import db from '../../lib/dbConnect';
import StudioListing from '../../models/StudioListing';
import StudioInformation from '../../components/Modals/StudioInformation';
import { useRouter } from 'next/router';
import AdminStudioService from '../../models/AdminCreateStudioService';
import { ValidateCreateStudioServiceListing } from '../../helpers/Validate';
import ListingCardWideStudioService from '../../components/Result/ListingCardWideStudioService';
import ListingCardCarousellStudioService from '../../components/Result/ListingCardCarousellStudioService';
import { BackgroundOverlayFullscreen as ClickToCloseMax } from '../../components/BackgroundOverlay';
import Link from 'next/link.js';
import { AddStudioServiceForm } from '../../components/Forms/AddStudioServiceForm';

export default function DashboardAddStudioservice({ fetchedStudios, sanitizedServices }) {
  const [selectedStudio, setSelectedStudio] = useState(false);
  const [selectedStudioInformation, setSelectedStudioInformation] = useState('');
  const [openModal, setOpenModal] = useState(false);
  const [step, setStep] = useState('selectStudio');
  const defaultPic = '/images/Thumbnail-default.png';
  const router = useRouter();

  const selectingStudio = (val) => {
    const thisStudio = fetchedStudios.filter((studio) => studio._id === val.id);
    setSelectedStudio(thisStudio[0]._id);
    setForm({ ...form, user: thisStudio[0].user._id });
    setSelectedStudioInformation(thisStudio[0]);
    setOpenModal(true);
  };
  const defaultChecked = {
    soundengineer: false,
    studioPricing: [],
  };
  const [form, setForm] = useState({
    service: '',
    listingTitle: '',
    description: '',
    images: { primary: '', other: '' },
    maxGuests: 3,
    equipment: '',
    additionalServices: [],
    openingHours: 'Always Available',
    soundengineer: 'On Request',
    studioPricing: {},
    studioLocation: '',
    studio: '',
    user: '',
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
  const [submissionFailed, setSubmissionFailed] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [preview, setPreview] = useState(false);
  console.log('addserb', additionalService);
  const handlePreview = () => {
    const passForm = form;
    setFormErrors(ValidateCreateStudioServiceListing(passForm, checked));
    if (Object.keys(ValidateCreateStudioServiceListing(passForm, checked)).length === 0) {
      handleUploadInput();
      setPreview(true);
    }
  };
  const handleFormSubmit = async (event) => {
    const passForm = form;
    event.preventDefault();
    setFormErrors(ValidateCreateStudioServiceListing(passForm, checked));
    setIsSubmit(true);
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      try {
        const resPrimaryImage = await handleUploadInput(form.images.primary);
        const res = await fetch('/api/dashboard/studio/1', {
          method: 'POST',
          body: JSON.stringify({ ...form, images: { primary: resPrimaryImage, other: '' } }),
          headers: {
            'Content-Type': 'application/json',
          },
        });
        await res.json();
        if (!res.ok) {
          throw new Error(res.status);
        }
        if (res.ok) {
          setPreview(false);
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
        // console.error('Failed to add', error);
      }
    }
  };
  const handleChange = (event, other) => {
    console.log('eve', event, other);
    if (other) {
      if (other === 'soundengineer') {
        return setForm({ ...form, soundengineer: { ...form.soundengineer, price: event } });
      }
      if (other === 'studioPricing') {
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
      if (name === 'studioPricing') {
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
      if (name === 'studioPricing') {
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
  const handleDeleteImage = () => {
    setForm({ ...form, images: { primary: '', other: '' } });
    setChecked({ ...checked, imagesPreview: '', imageName: '' });
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
    formData.append('file', checked.images.primary);
    formData.append('upload_preset', preset);
    const res = await fetch(url, {
      method: 'POST',
      body: formData,
    });
    const data = await res.json();
    data
      ? setForm({ ...form, images: { primary: data.secure_url, other: '' } })
      : setForm({ ...form, images: { primary: '/images/Thumbnail-default.png', other: '' } });
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
    console.log('alreadyusedNames', alreadyUsedNames);
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
  const handleDelete = (id) => {
    if (id) {
      const newArr = form.additionalServices.filter((v) => v.name !== id);
      console.log(newArr);
      setForm({ ...form, additionalServices: newArr });
    }
  };

  // console.log('def', defaultForm);
  console.log('checked', checked);
  console.log('form', form.studioPricing, formErrors);
  console.log('form', form, formErrors);
  return (
    <div>
      {/* welcome */}
      <section>
        <h1 className="text-primary mt-4 mb-2 text-center text-4xl font-bold leading-tight">Add Studioservice </h1>
        <p className="text-center">
          Here you can add a Studioservice to your Studio. By seperating Studio and Studioservice, every Studioservice
          can have its own images, descriptions and other details
        </p>
      </section>
      <section className="mt-10">
        {/* studiorow */}
        {step === 'selectStudio' ? (
          <section>
            {/* heading */}
            <div className="mb-5">
              <h2 className="h2">Studios</h2>
              <p>Choose the Studio you want add a Studioservice to. Then you will be able to click on Next</p>
            </div>
            {/* studios */}
            <section>
              {fetchedStudios.map(
                ({
                  _id,
                  user,
                  studioName,
                  logo,
                  studiotype,
                  studioLanguages,
                  openingHours,
                  locationFeatures,
                  studioLocation,
                }) => (
                  <AddStudioserviceCardWideStudio
                    key={_id}
                    id={_id}
                    user={user}
                    studioName={studioName}
                    studioLanguages={studioLanguages}
                    logo={logo}
                    studiotype={studiotype}
                    openingHours={openingHours}
                    locationFeatures={locationFeatures}
                    studioLocation={studioLocation}
                    selectingStudio={selectingStudio}
                    selectedStudio={selectedStudio}></AddStudioserviceCardWideStudio>
                )
              )}
            </section>
            {/* StudioInformationModal */}
            <section>
              {openModal ? <StudioInformation setOpenModal={setOpenModal} studio={selectedStudioInformation} /> : null}
            </section>
          </section>
        ) : null}
        {/* addstudioservice */}
        {step === 'addStudioservice' ? (
          <section className="sm:px-0">
            <form noValidate className="text-primary w-full" onSubmit={handleFormSubmit}>
              <AddStudioServiceForm
                defaultChecked={defaultChecked}
                form={form}
                setForm={setForm}
                checked={checked}
                setChecked={setChecked}
                length={Object.keys(formErrors).length}
                formErrors={formErrors}
                studioService={sanitizedServices}
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
                handleDelete={handleDelete}></AddStudioServiceForm>
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
                              listingTitle={form.listingTitle}
                              images={form.images ? form.images : '/images/Thumbnail-default.png'}
                              studiotype={form.studiotype}
                              studioService={form.studioService}
                              soundengineer={form.soundengineer}
                              studioPricing={form.studioPricing}
                              locationFeatures={form.locationFeatures}
                              studioLocation={form.studioLocation}
                            />
                          </div>
                          <div className="ml-5 pb-4">
                            <h3 className="h3">Startpage preview</h3>
                            <div className="-ml-4">
                              <ListingCardCarousellStudioService
                                listingTitle={form.listingTitle}
                                images={form.images ? form.images : '/images/Thumbnail-default.png'}
                                studiotype={form.studiotype}
                                studioService={form.studioService}
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
                    <div className="searchFadein fixed inset-0 z-50 m-auto flex h-96 w-full flex-col gap-5 rounded-2xl   bg-white  py-5 shadow-xxl  md:min-h-72 md:w-7/12 xl:w-6/12 2xl:w-[680px]">
                      {/* Previews */}
                      <div className="flex flex-col gap-7 overflow-y-scroll pb-20">
                        <h2 className="h2 ml-5">The operation has failed!</h2>
                        <div className="flex w-full flex-col gap-5 px-5 text-center ">
                          <p>
                            Your Studio listing could not submitted! Feel free to contact us with a screenshot of the
                            error message, or try again and see if the problem is resolved.
                          </p>
                          <p>This is the Error message: </p>
                          <p className="text-red-500">{Object.entries(formErrors)}</p>
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
                      onClick={(event) => handleClickToCloseSearch(event)}
                    />
                  </>
                ) : null}
              </fieldset>
            </form>
          </section>
        ) : null}
      </section>
      {/* buttons */}
      <section className="flex max-w-6xl justify-between gap-3 sm:gap-20 md:gap-80 ">
        {step === 'addStudioservice' ? (
          <>
            <button
              type="button"
              className="form-button bg-black text-white hover:bg-black"
              onClick={() => {
                setForm(defaultForm);
                setChecked(defaultChecked);
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
          </>
        ) : (
          <>
            <button
              type="button"
              className="form-button bg-black text-white hover:bg-black"
              onClick={() => {
                router.push('/dashboard/addstudio');
              }}>
              Add Studio
            </button>
            <button
              type="button"
              onClick={() => {
                setStep('addStudioservice');
              }}
              disabled={!selectedStudio}
              className="form-button text-white">
              {!selectedStudio ? 'Select a Studio' : 'Next'}
            </button>
          </>
        )}
      </section>
    </div>
  );
}

DashboardAddStudioservice.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export async function getServerSideProps({ req }) {
  await db.connect();
  const session = await getToken({ req });

  const services = await AdminStudioService.find();
  const sanitizedServices = services.map((service) => ({
    id: service.id,
    name: service.name,
    description: service.description,
  }));

  const email = session.email;
  const fetchingStudios = await StudioListing.find({ userEmail: email }).populate({
    path: 'user',
    model: 'users',
    select: 'avatar email name lastname username',
  });
  const serializing = JSON.parse(JSON.stringify(fetchingStudios));
  const serializedAndUpdatedStudios = serializing.map((studio) => ({
    ...studio,
    createdAtDate: moment(studio.createdAt).format('DD/MM/yyyy'),
    createdAtTime: moment(studio.createdAt).format('kk:mm'),
    updatedAtDate: moment(studio.updatedAt).format('DD/MM/yyyy'),
    updatedAtTime: moment(studio.updatedAt).format('kk:mm'),
  }));

  return {
    props: {
      fetchedStudios: serializedAndUpdatedStudios || null,
      sanitizedServices: sanitizedServices || null,
    },
  };
}
