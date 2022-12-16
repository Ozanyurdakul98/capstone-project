import { useState, useEffect } from 'react';
import { ValidateCreateStudioListing } from '../../helpers/Validate.js';
import { BackgroundOverlayFullscreen as ClickToCloseMax } from '../BackgroundOverlay';
import Link from 'next/link.js';
import { useRouter } from 'next/router';
import { AddStudioForm } from './AddStudioForm';
import { Spinner } from '../Spinner';

function EditStudio({ toUpdateStudio, setOpenEditView, studioID }) {
  const data = toUpdateStudio;
  const defaultPic = '/images/Thumbnail-default.png';
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
  const [form, setForm] = useState(data);
  const [checked, setChecked] = useState(defaultChecked);
  const [logoChanged, setLogoChanged] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);
  const [loading, setLoading] = useState(false);
  const [studioLanguagesSearch, setStudioLanguagesSearch] = useState('');
  const [submissionFailed, setSubmissionFailed] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const router = useRouter();

  const handleClickToCloseModal = () => {
    setOpenEditView(false);
  };
  const handleDeleteImage = () => {
    setLogoChanged(true);
    setForm({ ...form, logo: defaultPic });
    setChecked({ ...checked, logoPreview: defaultPic });
    setChecked((prev) => ({ ...prev, images: defaultPic }));
  };
  const handleClickToCloseErrorModal = () => {};
  useEffect(() => {
    return MatchDataWithChecked();
  }, []);
  const handleFormSubmit = async (event) => {
    const passForm = form;
    event.preventDefault();
    setFormErrors(ValidateCreateStudioListing(passForm, checked));
    setIsSubmit(true);
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      setLoading(true);
      try {
        const resLogo = await handleUploadInput(form.logo);
        const res = await fetch(`/api/dashboard/admin/studio/${studioID}`, {
          method: 'PATCH',
          body: JSON.stringify({ ...form, logo: resLogo }),
          headers: {
            'Content-Type': 'application/json',
          },
        });
        await res.json();

        if (!res.ok) {
          setLoading(false);
          throw new Error(res.status);
        }
        if (res.ok) {
          setLoading(false);
          router.reload();
        }
      } catch (error) {
        setLoading(false);
        setFormErrors(error);
        setSubmissionFailed(true);
        console.error('Failed to update data', error);
      }
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
        let wertImage = target.files[0];
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
  function MatchDataWithChecked() {
    console.log(data);
    const pricing = data.studioPricing;
    const engineer = data.soundengineer;
    const studioInfo = data.studioInformation;
    const studioSleepover = data.sleepOver;
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
      if (studioInfo) {
        setChecked((prev) => ({ ...prev, studioInformation: Object.keys(studioInfo) }));
      }
      if (studioSleepover) {
        setChecked((prev) => ({ ...prev, sleepOver: Object.keys(studioSleepover) }));
      }
    };
  }
  const handleDelete = (val) => {
    let newArray = [...form['studioLanguages'], val];
    if (form['studioLanguages'].includes(val)) {
      newArray = newArray.filter((lang) => lang !== val);
      setForm({ ...form, studioLanguages: newArray });
      setChecked({ ...checked, studioLanguages: languages });

      setStudioLanguagesSearch('');
    }
  };
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
  console.log('checked', checked, form);

  return (
    <>
      <div className="searchFadein fixed inset-0 z-50 m-auto flex h-4/6 w-full flex-col gap-5 rounded-2xl bg-white   pb-5  shadow-xxl md:min-h-72 md:w-11/12 lg:w-8/12 xl:w-6/12">
        <div className=" overflow-y-scroll sm:px-0">
          <div className="mt-4 flex flex-col gap-4">
            <h2 className="h2 ml-5 text-2xl">Edit Studio</h2>
          </div>
          <div className=" px-2 sm:ml-5 md:mr-5">
            <div className="sm:px-0">
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
                {/* ErrorModal */}
                <fieldset>
                  {submissionFailed ? (
                    <>
                      <div className="searchFadein fixed inset-0 z-50 m-auto flex h-96 w-full flex-col gap-5 rounded-2xl   bg-white  py-5 shadow-xxl  md:min-h-72 md:w-7/12 xl:w-6/12 2xl:w-[680px]">
                        {/* Previews */}
                        <div className="flex flex-col gap-7 overflow-y-scroll pb-20">
                          <h2 className="h2 ml-5">The operation has failed!</h2>
                          <div className="flex w-full flex-col gap-5 px-5 text-center ">
                            <p>The Studio could not be changed, Submission failed!</p>
                            <p>This is the Error message: </p>
                            <p className="text-red-500">{Object.entries(formErrors)}</p>
                          </div>
                        </div>
                        {/* Buttons */}
                        <div className=" absolute bottom-0 z-40 flex h-16 w-full items-center  justify-between gap-3 rounded-b-xl border-t-2 bg-white px-2 pb-1 pt-5 md:px-20 ">
                          <button
                            type="button"
                            className="form-button max-w-[250px] grow justify-center border-none bg-black text-white"
                            onClick={() => {
                              router.reload();
                            }}>
                            Try again
                          </button>

                          <Link href="/contact">
                            <button className="form-button bg-primary max-w-[250px] grow justify-center border-none text-white">
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
          <div className=" absolute bottom-0 z-40 flex h-16 w-full items-center  justify-between gap-3  rounded-b-xl border-t-2 bg-white px-2 pb-1 pt-5 ">
            <button
              onClick={() => setOpenEditView(false)}
              className="form-button max-w-[250px]  grow justify-center border-none bg-black text-white">
              Cancel
            </button>
            <div className="ml-auto flex items-center justify-center space-x-2">{loading ? <Spinner /> : null}</div>
            <button
              onClick={(event) => handleFormSubmit(event)}
              disabled={loading ? true : false}
              className="form-button bg-primary max-w-[250px] grow justify-center border-none text-white">
              {Object.keys(formErrors).length === 0 && isSubmit ? 'Update Studio' : 'Check'}
            </button>
          </div>
        </div>
      </div>
      <ClickToCloseMax
        style={'bg-black/50 editModal   z-40 h-full'}
        onClick={(event) => handleClickToCloseModal(event)}
      />
    </>
  );
}

export default EditStudio;
