import React from 'react';
import { useState, useEffect } from 'react';
import { BackgroundOverlayFullscreen as ClickToCloseMax } from '../BackgroundOverlay';
import Link from 'next/link.js';
import { useRouter } from 'next/router';
import { UserFormfields } from './UserFormfields';
import { Spinner } from '../Spinner';
import { ValidateEditUser } from '../../helpers/Validate';

function EditUser({ toUpdateUser, setOpenEditView, userID }) {
  const data = toUpdateUser;
  const defaultPic = '/images/Thumbnail-default.png';
  const [form, setForm] = useState(data);
  const [checked, setChecked] = useState('');
  const [avatarChanged, setAvatarChanged] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);
  const [loading, setLoading] = useState(false);
  const [submissionFailed, setSubmissionFailed] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const router = useRouter();

  const handleClickToCloseModal = () => {
    setOpenEditView(false);
  };
  const handleDeleteImage = () => {
    setAvatarChanged(true);
    setForm({ ...form, avatar: defaultPic });
  };
  const handleClickToCloseErrorModal = () => {};

  const handleFormSubmit = async (event) => {
    const passForm = form;
    event.preventDefault();
    setFormErrors(ValidateEditUser(passForm));
    setIsSubmit(true);
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      setLoading(true);
      try {
        const resAvatar = await handleUploadInput(form.avatar);
        const res = await fetch(`/api/dashboard/admin/user/${userID}`, {
          method: 'PATCH',
          body: JSON.stringify({ ...form, avatar: resAvatar }),
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const result = await res.json();

        if (!res.ok) {
          setLoading(false);
          throw new Error(res.status);
        }
        if (res.ok) {
          setLoading(false);
          setOpenEditView(false);
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

  const handleChange = (event) => {
    const target = event.target;
    const name = target.name;
    const wert = target.value;
    const value = checkValues(name, wert, target);
    setForm({ ...form, [name]: value() });
  };

  function checkValues(name, wert, target) {
    return () => {
      if (name === 'avatar') {
        setAvatarChanged(true);
        const wertImage = target.files[0];
        const avatarName = wertImage.name;
        setChecked({
          ...checked,
          avatarPreview: URL.createObjectURL(wertImage),
          avatarName: avatarName,
        });
        return wertImage;
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

  const handleUploadInput = async (avatar) => {
    if (!avatarChanged) {
      return;
    }
    if (avatar === defaultPic) {
      return defaultPic;
    }
    const formData = new FormData();
    const preset = 'cy1wyxej';
    const url = 'https://api.cloudinary.com/v1_1/drt9lfnfg/image/upload';
    formData.append('file', avatar);
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
            <h2 className="h2 ml-5 text-2xl">Edit Profile</h2>
          </div>
          <div className=" px-2 sm:ml-5 md:mr-5">
            <div className="sm:px-0">
              <form noValidate className="text-primary w-full" onSubmit={handleFormSubmit}>
                <UserFormfields
                  form={form}
                  checked={checked}
                  length={Object.keys(formErrors).length}
                  formErrors={formErrors}
                  handleDeleteImage={handleDeleteImage}
                  handleChange={handleChange}
                  handleCheck={handleCheck}></UserFormfields>
                {/* ErrorModal */}
                <fieldset>
                  {submissionFailed ? (
                    <>
                      <div className="searchFadein fixed inset-0 z-50 m-auto flex h-96 w-full flex-col gap-5 rounded-2xl   bg-white  py-5 shadow-xxl  md:min-h-72 md:w-7/12 xl:w-6/12 2xl:w-[680px]">
                        {/* Previews */}
                        <div className="flex flex-col gap-7 overflow-y-scroll pb-20">
                          <h2 className="h2 ml-5">The operation has failed!</h2>
                          <div className="flex w-full flex-col gap-5 px-5 text-center ">
                            <p>User could not be updated, Submission failed!</p>
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
              onClick={() => setOpenEditView(false)}
              className="form-button max-w-[250px]  grow justify-center border-none bg-black text-white">
              Cancel
            </button>
            <div className="ml-auto flex items-center justify-center space-x-2">{loading ? <Spinner /> : null}</div>
            <button
              onClick={(event) => handleFormSubmit(event)}
              disabled={loading ? true : false}
              className="form-button bg-primary max-w-[250px] grow justify-center border-none text-white">
              {Object.keys(formErrors).length === 0 && isSubmit ? 'Update User' : 'Check'}
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

export default EditUser;
