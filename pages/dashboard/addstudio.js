import { useState } from 'react';
import { ValidateCreateStudioListing } from '../../helpers/Validate.js';
import ListingCardWideStudio from '../../components/Result/ListingCardWideStudio';
import ListingCardCarousellStudio from '../../components/Result/ListingCardCarousellStudio';
import { BackgroundOverlayFullscreen as ClickToCloseMax } from '../../components/BackgroundOverlay';
import Link from 'next/link.js';
import { useRouter } from 'next/router';
import { AddStudioForm } from '../../components/Forms/AddStudioForm';
import DashboardLayout from '../../components/Layout/DashboardLayout.js';
import db from '../../lib/dbConnect.js';
import { getToken } from 'next-auth/jwt';
function DashboardAddStudio({ userID }) {
  const defaultForm = {
    logo: '',
    studioName: '',
    profileText: '',
    studiotype: 'Home Studio',
    studioInformation: {},
    studioLanguages: [],
    openingHours: 'Always Available',
    locationFeatures: [],
    sleepOver: {},
    studioSocials: {
      soundcloud: '',
      spotify: '',
      instagram: '',
      youtube: '',
      facebook: '',
      pinterest: '',
      twitter: '',
      linkedin: '',
    },
    studioLocation: '',
    user: userID,
  };
  const languages = [
    'Afrikaans',
    'Albanian',
    'Arabic',
    'Armenian',
    'Azerbaijani',
    'Belarusian',
    'Bulgarian',
    'Catalan',
    'Chinese',
    'Croatian',
    'Czech',
    'Danish',
    'Dutch',
    'English',
    'Filipino',
    'Finnish',
    'French',
    'Georgian',
    'German',
    'Greek',
    'Hebrew',
    'Hindi',
    'Hungarian',
    'Indonesian',
    'Irish',
    'Italian',
    'Japanese',
    'Kannada',
    'Korean',
    'Latin',
    'Lithuanian',
    'Macedonian',
    'Maltese',
    'Mongolian',
    'Nepali',
    'Norwegian',
    'Persian',
    'Polish',
    'Portuguese',
    'Romanian',
    'Russian',
    'Scottish',
    'Serbian',
    'Slovenian',
    'Spanish',
    'Swedish',
    'Thai',
    'Turkish',
    'Turkmen',
    'Ukrainian',
    'Urdu',
    'Uyghur',
    'Uzbek',
    'Vietnamese',
  ];
  const defaultChecked = {
    studioSocials: [],
    studioInformation: [],
    studioLanguages: languages,
    sleepOver: [],
  };
  const [form, setForm] = useState(defaultForm);
  const [checked, setChecked] = useState(defaultChecked);
  const [isSubmit, setIsSubmit] = useState(false);
  const [submissionFailed, setSubmissionFailed] = useState(false);
  const [studioLanguagesSearch, setStudioLanguagesSearch] = useState('');
  const [formErrors, setFormErrors] = useState({});
  const [preview, setPreview] = useState(false);
  const [logoChanged, setLogoChanged] = useState(false);
  const defaultPic = '/images/Thumbnail-default.png';
  const router = useRouter();

  const handlePreview = () => {
    const passForm = form;
    setFormErrors(ValidateCreateStudioListing(passForm, checked));
    if (Object.keys(ValidateCreateStudioListing(passForm, checked)).length === 0) {
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
        const resLogo = await handleUploadInput(form.logo);
        const res = await fetch('/api/dashboard/studio/1', {
          method: 'POST',
          body: JSON.stringify({ ...form, logo: resLogo }),
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
  const handleDeleteImage = () => {
    setLogoChanged(true);
    setForm({ ...form, logo: '' });
    setChecked({ ...checked, logoPreview: '', logoName: '' });
  };
  const handleDelete = (val) => {
    let newArray = [...form['studioLanguages'], val];
    if (form['studioLanguages'].includes(val)) {
      newArray = newArray.filter((lang) => lang !== val);
      setForm({ ...form, studioLanguages: newArray });
      setChecked({ ...checked, studioLanguages: languages });

      setStudioLanguagesSearch('');
    }
  };
  const handleChange = (event, val) => {
    const target = event.target;
    const type = target.type;
    let name = target.name;
    if (val) name = 'studioLanguages';
    const wert = target.value;
    const id = target.id;
    const value = checkValues(type, form, name, wert, id, target, val);
    setForm({ ...form, [name]: value() });
  };
  function checkValues(type, form, name, wert, id, target, val) {
    return () => {
      if (name === 'studioInformation') {
        const currentForm = {
          ...form[name],
          [id]: wert,
        };
        const deleteUndefined = Object.fromEntries(Object.entries(currentForm).filter(([v]) => v));
        return deleteUndefined;
      }
      if (name === 'sleepOver') {
        const currentForm = {
          ...form[name],
          [id]: wert,
        };
        const deleteUndefined = Object.fromEntries(Object.entries(currentForm).filter(([v]) => v));
        return deleteUndefined;
      }
      if (name === 'studioSocials') {
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
      if (name === 'logo') {
        setLogoChanged(true);
        const wertImage = target.files[0];
        const logoName = wertImage.name;
        setChecked({
          ...checked,
          logoPreview: URL.createObjectURL(wertImage),
          logoName: logoName,
        });
        return wertImage;
      }
      if (val) {
        let newArray = [...form[name], val];
        if (form[name].includes(val)) {
          newArray = newArray.filter((service) => service !== val);
        }
        setStudioLanguagesSearch('');
        setChecked({ ...checked, studioLanguages: languages });
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
      if (name === 'studioInformation') {
        let newArray = [...checked[name], id];
        if (checked[name].includes(id)) {
          newArray = newArray.filter((val) => val !== id);
          const currentForm = { ...form?.[name], [id]: wert };
          const deleteUnchecked = Object.fromEntries(Object.entries(currentForm).filter((val) => !val.includes(id)));
          setForm({ ...form, [name]: deleteUnchecked });
        }
        return newArray;
      }
      if (name === 'sleepOver') {
        let newArray = [...checked[name], id];
        if (checked[name].includes(id)) {
          newArray = newArray.filter((val) => val !== id);
          const currentForm = { ...form?.[name], [id]: wert };
          const deleteUnchecked = Object.fromEntries(Object.entries(currentForm).filter((val) => !val.includes(id)));
          setForm({ ...form, [name]: deleteUnchecked });
        }
        return newArray;
      }
      if (name === 'studioSocials') {
        let newArray = [...checked[name], id];
        if (checked[name].includes(id)) {
          newArray = newArray.filter((i) => i !== id);
          const currentForm = { ...form?.[name], [id]: wert };
          const deleteUnchecked = Object.fromEntries(Object.entries(currentForm).filter((i) => !i.includes(id)));
          setForm({ ...form, [name]: deleteUnchecked });
        }
        return newArray;
      }
      if (name === 'studioLanguages') {
        const newMatches = languages.filter((lang) => lang.toLowerCase().includes(wert.toLowerCase()));
        setStudioLanguagesSearch(wert);
        return newMatches;
      }
    };
    setChecked({ ...checked, [name]: isChecked() });
  };
  const handleClickToCloseSearch = () => {
    setPreview(false);
  };
  const handleUploadInput = async (logo) => {
    if (!logoChanged) {
      return;
    }
    if (logo === defaultPic) {
      return defaultPic;
    }
    const formData = new FormData();
    const preset = 'cy1wyxej';
    const url = 'https://api.cloudinary.com/v1_1/drt9lfnfg/image/upload';
    formData.append('file', logo);
    formData.append('upload_preset', preset);
    const res = await fetch(url, {
      method: 'POST',
      body: formData,
    });
    const data = await res.json();
    if (data) return data.secure_url;
    else if (!data) return defaultPic;
  };
  return (
    <>
      <div className="sm:px-0">
        <div>
          <h1 className="text-primary mt-4 mb-2 text-center text-4xl font-bold leading-tight">Add a Studio </h1>
          <p className="text-center">
            Add a Studio to your account. The details you include here (like socials or studio location) will be used in
            the studio-services you can add to this studio later on. To submit a service, a studio is required. So go on
            and add a studio.
          </p>
        </div>
        <form noValidate className="text-primary w-full" onSubmit={handleFormSubmit}>
          <AddStudioForm
            form={form}
            setForm={setForm}
            checked={checked}
            setChecked={setChecked}
            handleDeleteImage={handleDeleteImage}
            length={Object.keys(formErrors).length}
            formErrors={formErrors}
            languages={languages}
            handleChange={handleChange}
            handleDelete={handleDelete}
            studioLanguagesSearch={studioLanguagesSearch}
            handleCheck={handleCheck}></AddStudioForm>
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
                      <div className="ml-5">
                        <h3 className="h3">Searchpage preview</h3>
                        <ListingCardWideStudio
                          preview={true}
                          logo={checked.logoPreview ? checked.logoPreview : '/images/Thumbnail-default.png'}
                          studioName={form.studioName}
                          studiotype={form.studiotype}
                          studioLanguages={form.studioLanguages}
                          openingHours={form.openingHours}
                          locationFeatures={form.locationFeatures}
                          studioLocation={form.studioLocation}
                        />
                      </div>
                      <div className="ml-5">
                        <h3 className="h3 pb-12">Startpage preview</h3>
                        <div className="-ml-4 ">
                          <ListingCardCarousellStudio
                            preview={true}
                            logo={checked.logoPreview ? checked.logoPreview : '/images/Thumbnail-default.png'}
                            studioName={form.studioName}
                            studiotype={form.studiotype}
                            openingHours={form.openingHours}
                            locationFeatures={form.locationFeatures}
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

export async function getServerSideProps({ req }) {
  await db.connect();
  const token = await getToken({ req });
  const userID = token.id;
  return {
    props: {
      userID: userID || token.sub,
    },
  };
}
