import { useState } from 'react';
import { BackgroundOverlayFullscreen as ClickToCloseMax } from '../BackgroundOverlay';
import Link from 'next/link.js';
import { useRouter } from 'next/router';
import { StudioServiceFormfields } from './StudioServiceFormfields';
import { Spinner } from '../Spinner';
import { ValidateCreateStudioService } from '../../helpers/Validate';

function EditStudioService({ toUpdateStudioService, setOpenStudioServiceEditView }) {
  const data = toUpdateStudioService;
  const defaultPic = '/images/Thumbnail-default.png';
  const [form, setForm] = useState(data);
  const [checked, setChecked] = useState('');
  const [imageChanged, setImageChanged] = useState(false);
  const [loading, setLoading] = useState(false);
  const [submissionFailed, setSubmissionFailed] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const router = useRouter();

  const handleClickToCloseModal = () => {
    setOpenStudioServiceEditView(false);
  };
  const handleDeleteImage = () => {
    setImageChanged(true);
    setForm({ ...form, image: defaultPic });
  };
  const handleClickToCloseErrorModal = () => {};

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    setFormErrors(ValidateCreateStudioService(form));
    if (Object.keys(ValidateCreateStudioService(form)).length === 0) {
      setLoading(true);
      try {
        const resImage = await handleUploadInput(form.image);
        const res = await fetch(`/api/dashboard/admin/settings/studioservice`, {
          method: 'PATCH',
          body: JSON.stringify({ ...form, image: resImage }),
          headers: {
            'Content-Type': 'application/json',
          },
        });
        await res.json();
        if (!res.ok) {
          setLoading(false);
          throw new Error(res.status);
        }
        setLoading(false);
        setOpenStudioServiceEditView(false);
        router.reload();
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
    const name = target.name;
    const wert = target.value;
    const value = checkValues(name, wert, target);
    setForm({ ...form, [name]: value() });
  };

  function checkValues(name, wert, target) {
    return () => {
      if (name === 'image') {
        setImageChanged(true);
        const wertImage = target.files[0];
        const imageName = wertImage.name;
        setChecked({
          ...checked,
          imagePreview: URL.createObjectURL(wertImage),
          imageName: imageName,
        });
        return wertImage;
      } else {
        return wert;
      }
    };
  }

  const handleUploadInput = async (image) => {
    if (!imageChanged) {
      return;
    }
    if (image === defaultPic) {
      return defaultPic;
    }
    const formData = new FormData();
    const preset = 'cy1wyxej';
    const url = 'https://api.cloudinary.com/v1_1/drt9lfnfg/image/upload';
    formData.append('file', image);
    formData.append('upload_preset', preset);
    const res = await fetch(url, {
      method: 'POST',
      body: formData,
    });
    const data = await res.json();
    return data.secure_url;
  };
  return (
    <>
      <div className="searchFadein fixed inset-0 z-50 m-auto flex h-4/6 w-full flex-col gap-5 rounded-2xl bg-white   pb-5  shadow-xxl md:min-h-72 md:w-11/12 xl:w-6/12">
        <div className=" overflow-y-scroll sm:px-0">
          <div className="mt-4 flex flex-col gap-4">
            <h2 className="h2 ml-5 text-2xl">Edit Studioservice</h2>
          </div>
          <div className=" px-2 sm:ml-5 md:mr-5">
            <div className="sm:px-0">
              <form noValidate className="text-primary w-full" onSubmit={handleFormSubmit}>
                <StudioServiceFormfields
                  form={form}
                  checked={checked}
                  length={Object.keys(formErrors).length}
                  formErrors={formErrors}
                  handleDeleteImage={handleDeleteImage}
                  handleChange={handleChange}></StudioServiceFormfields>
                {/* ErrorModal */}
                <fieldset>
                  {submissionFailed ? (
                    <>
                      <div className="searchFadein fixed inset-0 z-50 m-auto flex h-96 w-full flex-col gap-5 rounded-2xl   bg-white  py-5 shadow-xxl  md:min-h-72 md:w-7/12 xl:w-6/12 2xl:w-[680px]">
                        {/* Previews */}
                        <div className="flex flex-col gap-7 overflow-y-scroll pb-20">
                          <h2 className="h2 ml-5">The operation has failed!</h2>
                          <div className="flex w-full flex-col gap-5 px-5 text-center ">
                            <p>Service could not be updated, Submission failed!</p>
                            <p>This is the Error message: </p>
                            <span className="text-red-500">{Object.entries(formErrors).toString()}</span>
                          </div>
                        </div>
                        {/* Buttons */}
                        <div className=" absolute bottom-0 z-40 flex h-16 w-full items-center  justify-between gap-3 rounded-b-xl border-t-2 bg-white px-2 pb-1 pt-5 md:px-20 ">
                          <button
                            type="button"
                            className="form-button max-w-[250px] grow justify-center border-none bg-black text-white"
                            onClick={() => {
                              setTimeout(() => {
                                router.reload();
                              }, 100);
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
          <div className=" absolute bottom-0 z-30 flex h-16 w-full items-center  justify-between gap-3  rounded-b-xl border-t-2 bg-white px-2 pb-1 pt-5 ">
            <button
              onClick={() => setOpenStudioServiceEditView(false)}
              className="form-button max-w-[250px]  grow justify-center border-none bg-black text-white">
              Cancel
            </button>
            <div className="ml-auto flex items-center justify-center space-x-2">{loading ? <Spinner /> : null}</div>
            <button
              onClick={(event) => handleFormSubmit(event)}
              disabled={loading ? true : false}
              className="form-button bg-primary max-w-[250px] grow justify-center border-none text-white">
              {Object.keys(ValidateCreateStudioService(form)).length === 0 ? 'Update Service' : 'Check'}
            </button>
          </div>
        </div>
      </div>
      <ClickToCloseMax style={'bg-black/50 editModal   z-40 h-full'} onClick={() => handleClickToCloseModal()} />
    </>
  );
}

export default EditStudioService;
