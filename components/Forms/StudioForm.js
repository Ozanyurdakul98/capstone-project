import { useState } from 'react';
import { ValidateCreateStudioListing } from '../../helpers/Validate.js';
import ListingCardWideStudio from '../Result/ListingCardWideStudio';
import ListingCardCarousellStudio from '../Result/ListingCardCarousellStudio';
import { BackgroundOverlayFullscreen as ClickToCloseMax } from '../BackgroundOverlay';
import Link from 'next/link.js';
import { useRouter } from 'next/router';
import { StudioFormfields } from './Formfields/StudioFormfields';
import { useEffect } from 'react';
import { Spinner } from '../Spinner';
import { useDispatch, useSelector } from 'react-redux';
import { updateForm, updateChecked, resetLanguages, resetForm, resetChecked } from '../../slices/addStudioForm.js';
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
export function StudioForm({ userID, role, toUpdateStudio }) {
  //This component is used to edit Studios and to add them.
  // handle (Edit || Add) -page
  const dispatch = useDispatch();
  const existingStudioData = toUpdateStudio;
  const form = useSelector((state) => state.addStudio.form);
  const checked = useSelector((state) => state.addStudio.checked);

  const [isSubmit, setIsSubmit] = useState(false);
  const [submissionFailed, setSubmissionFailed] = useState(false);
  const [studioLanguagesSearch, setStudioLanguagesSearch] = useState('');
  const [formErrors, setFormErrors] = useState({});
  const [preview, setPreview] = useState(false);
  const [logo, setLogo] = useState('');
  const [logoChanged, setLogoChanged] = useState(false);
  const [loading, setLoading] = useState(false);

  const [showFormExpanded, setShowFormExpanded] = useState(existingStudioData ? true : false);
  const [markerIsActive, setMarkerIsActive] = useState(existingStudioData ? true : false);

  const defaultPic = '/images/Thumbnail-default.png';
  const router = useRouter();
  console.log(formErrors);
  useEffect(() => {
    dispatch(existingStudioData ? updateForm(existingStudioData) : resetForm(userID));
    if (!existingStudioData) return;
    MatchDataWithChecked();
  }, []);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    setFormErrors(ValidateCreateStudioListing(form));
    setIsSubmit(true);
    if (Object.keys(ValidateCreateStudioListing(form)).length === 0 && isSubmit) {
      setLoading(true);
      try {
        const resLogo = await handleUploadInput(logo);
        const res = await fetch(
          `${role === 'admin' ? '/api/dashboard/admin/studio/' : '/api/dashboard/studio/'}${form.id ? form.id : '1'}`,
          {
            method: `${existingStudioData ? 'PATCH' : 'POST'}`,
            body: JSON.stringify({
              ...form,
              studioLocation: {
                ...form.studioLocation,
                fullAddress:
                  form.studioLocation.address +
                  ', ' +
                  form.studioLocation.postalcode +
                  ' ' +
                  form.studioLocation.city +
                  ', ' +
                  form.studioLocation.country,
              },
              logo: resLogo,
            }),
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );
        await res.json();
        if (!res.ok) {
          setLoading(false);
          throw new Error(res.status);
        }
        setPreview(false);
        router.push({
          pathname: '/success',
          query: {
            operation: 'createlisting',
          },
        });
      } catch (error) {
        setFormErrors(error);
        setLoading(false);
        setPreview(false);
        setSubmissionFailed(true);
        console.error('Failed to add', error);
      }
    }
  };
  function MatchDataWithChecked() {
    const studioInfo = existingStudioData.studioInformation;
    const studioSleepover = existingStudioData.sleepOver;
    const user = existingStudioData.user;
    if (studioInfo) {
      dispatch(updateChecked((checked) => ({ ...checked, studioInformation: Object.keys(studioInfo) })));
    }
    if (studioSleepover) {
      dispatch(updateChecked((checked) => ({ ...checked, sleepOver: Object.keys(studioSleepover) })));
    }
    if (user) {
      dispatch(updateForm({ ...form, user: user._id }));
    }
  }
  const handlePreview = () => {
    setFormErrors(ValidateCreateStudioListing(form));
    if (Object.keys(ValidateCreateStudioListing(form)).length === 0) {
      setPreview(true);
    }
  };
  const handleDeleteImage = () => {
    setLogoChanged(true);
    setLogo('');
    dispatch(updateChecked({ ...checked, logoPreview: '', logoName: '' }));
  };
  const handleDelete = (val) => {
    let newArray = [...form['studioLanguages'], val];
    if (form['studioLanguages'].includes(val)) {
      newArray = newArray.filter((lang) => lang !== val);
      dispatch(updateForm({ ...form, studioLanguages: newArray }));
      dispatch(resetLanguages());
      setStudioLanguagesSearch('');
    }
  };
  const handleChange = (event, val) => {
    let name;
    const target = event.target;
    const type = target.type;
    val ? (name = 'studioLanguages') : (name = target.name);
    const wert = target.value;
    const id = target.id;
    const value = checkValues(type, form, name, wert, id, target, val);
    dispatch(updateForm({ ...form, [name]: value() }));
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
        dispatch(updateChecked({ ...checked, logoPreview: URL.createObjectURL(wertImage), logoName: logoName }));
        setLogo(wertImage);
        return;
      }
      if (val) {
        let newArray = [...form[name], val];
        if (form[name].includes(val)) {
          newArray = newArray.filter((service) => service !== val);
        }
        setStudioLanguagesSearch('');
        dispatch(updateChecked({ ...checked, studioLanguages: languages }));

        return newArray;
      }
      if (name === 'studioLocation') {
        const newObj = { ...form.studioLocation, [id]: wert };
        return newObj;
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
          dispatch(updateForm({ ...form, [name]: deleteUnchecked }));
        }
        return newArray;
      }
      if (name === 'sleepOver') {
        let newArray = [...checked[name], id];
        if (checked[name].includes(id)) {
          newArray = newArray.filter((val) => val !== id);
          const currentForm = { ...form?.[name], [id]: wert };
          const deleteUnchecked = Object.fromEntries(Object.entries(currentForm).filter((val) => !val.includes(id)));
          dispatch(updateForm({ ...form, [name]: deleteUnchecked }));
        }
        return newArray;
      }
      if (name === 'studioSocials') {
        let newArray = [...checked[name], id];
        if (checked[name].includes(id)) {
          newArray = newArray.filter((i) => i !== id);
          const currentForm = { ...form?.[name], [id]: wert };
          const deleteUnchecked = Object.fromEntries(Object.entries(currentForm).filter((i) => !i.includes(id)));
          dispatch(updateForm({ ...form, [name]: deleteUnchecked }));
        }
        return newArray;
      }
      if (name === 'studioLanguages') {
        const newMatches = languages.filter((lang) => lang.toLowerCase().includes(wert.toLowerCase()));
        setStudioLanguagesSearch(wert);
        return newMatches;
      }
    };
    dispatch(updateChecked({ ...checked, [name]: isChecked() }));
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
  function resetStudioForm() {
    const inputs = document.querySelectorAll('input');
    inputs.forEach((input) => (input.value = ''));
    setShowFormExpanded(false);
    dispatch(resetForm());
    dispatch(resetChecked());
    setFormErrors({});
  }

  const handleClickToCloseModal = () => {
    setPreview(false);
  };
  function handleMarkerLocation(e) {
    dispatch(
      updateForm({
        ...form,
        studioLocation: { ...form.studioLocation, geolocation: [e.viewState.longitude, e.viewState.latitude] },
      })
    );
  }
  return (
    <div className="sm:px-0">
      <form noValidate className="text-primary w-full" onSubmit={handleFormSubmit}>
        <StudioFormfields
          logo={logo}
          handleDeleteImage={handleDeleteImage}
          length={Object.keys(formErrors).length}
          formErrors={formErrors}
          handleChange={handleChange}
          handleDelete={handleDelete}
          studioLanguagesSearch={studioLanguagesSearch}
          handleCheck={handleCheck}
          showFormExpanded={showFormExpanded}
          setShowFormExpanded={setShowFormExpanded}
          markerIsActive={markerIsActive}
          setMarkerIsActive={setMarkerIsActive}
          handleMarkerLocation={handleMarkerLocation}
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
                        // user={existingStudioData?.user}
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
                style={'bg-black/50 searchBarModal z-40 h-full'}
                onClick={(event) => handleClickToCloseModal(event)}
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
                onClick={(event) => handleClickToCloseModal(event)}
              />
            </>
          ) : null}
        </fieldset>
        {/* Form-Buttons */}
        <fieldset className="flex max-w-6xl justify-between gap-3">
          <button
            type="button"
            className="form-button bg-black text-white hover:bg-black"
            onClick={() => {
              resetStudioForm();
            }}>
            Reset
          </button>
          <div className="ml-auto flex items-center justify-center space-x-2">{loading ? <Spinner /> : null}</div>
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
  );
}
