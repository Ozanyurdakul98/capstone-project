import { useState, useEffect } from 'react';
import { ValidateCreateStudioListing } from '../../helpers/Validate.js';
import ListingCardWide from '../../components/ListingCardWide';
import ListingCardCarousell from '../../components/ListingCardCarousell';
import { BackgroundOverlayFullscreen as ClickToCloseMax } from '../../components/BackgroundOverlay';
import Link from 'next/link.js';
import { useRouter } from 'next/router';
import { StudioFormfields } from '../../components/Forms/StudioFormfields';
import DashboardLayout from '../../components/Layout/DashboardLayout.js';
import { getSession } from 'next-auth/react';
import StudioService from '../../models/StudioService.js';
import db from '../../lib/dbConnect.js';
import User from '../../models/User.js';
import { getToken } from 'next-auth/jwt';
function DashboardAddStudio({ sanitizedServices, userID }) {
  const defaultForm = {
    listingTitle: '',
    images: '',
    openingHours: 'Always Available',
    studiotype: 'Home Studio',
    studioService: '',
    locationFeatures: [],
    soundengineer: 'On Request',
    studioPricing: {},
    studioLocation: '',
    user: userID,
  };
  const defaultChecked = {
    soundengineer: false,
    studioPricing: [],
  };
  console.log('IDADD', userID);
  const [form, setForm] = useState(defaultForm);
  const [checked, setChecked] = useState(defaultChecked);
  const [isSubmit, setIsSubmit] = useState(false);
  const [submissionFailed, setSubmissionFailed] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [preview, setPreview] = useState(false);
  const router = useRouter();
  // useEffect(() => {
  //   async function myFunction() {
  //     const session = await getSession();
  //     const userEmail = session.user.email;
  //     try {
  //       setForm({ ...form, userEmail: userEmail });
  //       return;
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   }
  //   myFunction();
  // }, []);
  const handlePreview = () => {
    const passForm = form;
    setFormErrors(ValidateCreateStudioListing(passForm, checked));
    if (Object.keys(ValidateCreateStudioListing(passForm, checked)).length === 0) {
      handleUploadInput();
      setPreview(true);
    }
  };
  const handleFormSubmit = async (event) => {
    const passForm = form;
    event.preventDefault();
    setFormErrors(ValidateCreateStudioListing(passForm, checked));
    setIsSubmit(true);
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      try {
        const res = await fetch('/api/dashboard/studio/1', {
          method: 'POST',
          body: JSON.stringify(form),
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
        const currentForm = {
          ...form[name === 'studioPricing' ? name : id],
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
        let wertImage = target.files[0];
        setChecked({
          ...checked,
          imagesPreview: URL.createObjectURL(wertImage),
          images: wertImage,
        });
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
  const handleClickToCloseSearch = () => {
    setPreview(false);
  };
  const handleUploadInput = async () => {
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
      <div className="sm:px-0">
        <h1 className="text-primary mt-4 mb-2 text-center text-4xl font-bold leading-tight">Add Studio Listing</h1>
        <form noValidate className="text-primary w-full" onSubmit={handleFormSubmit}>
          <StudioFormfields
            defaultForm={defaultForm}
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
            handleClickToCloseSearch={handleClickToCloseSearch}></StudioFormfields>
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
                        <ListingCardWide
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
                          <ListingCardCarousell
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
                        Your Studio listing could not submitted! Feel free to contact us with a screenshot of the error
                        message, or try again and see if the problem is resolved.
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
          {/* Form-Buttons */}
          <fieldset className="flex max-w-6xl justify-between gap-3 sm:gap-20 md:gap-80 ">
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
          </fieldset>
        </form>
      </div>
    </>
  );
}

export default DashboardAddStudio;

DashboardAddStudio.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export async function getServerSideProps({ req, res }) {
  await db.connect();
  const token = await getToken({ req });
  const userID = token.id;
  const user = await User.findById(userID);
  console.log(user, 'ID');
  const services = await StudioService.find();
  console.log('Token', token);
  const sanitizedServices = services.map((service) => ({
    id: service.id,
    name: service.name,
    description: service.description,
  }));
  return {
    props: {
      sanitizedServices: sanitizedServices || null,
      userID: userID || null,
    },
  };
}
