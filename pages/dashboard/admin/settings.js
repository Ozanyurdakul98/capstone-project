import StudioService from "../../../models/StudioService";
import db from "../../../lib/dbConnect";
import StudioListing from "../../../models/StudioListing";
import User from "../../../models/UserModel";
import DashboardLayout from "../../../components/Layout/DashboardLayout";
import { FormInput } from "../../../components/Forms/FormInput";
import { useState } from "react";
import { Spinner } from "../../../components/Spinner";
import { ValidateCreateStudioService } from "../../../helpers/Validate";
import { DeleteModal } from "../../../components/Modals/DeleteModal";
import { useRouter } from "next/router";
import { TbEdit } from "react-icons/tb";
import EditStudioService from "../../../components/Forms/EditStudioService";

export default function AdminDashboard({ studioServices }) {
  const [ID, setID] = useState("");
  const [studioService, setStudioService] = useState({ name: "", description: "" });
  const [studioServiceErrors, setStudioServiceErrors] = useState({});
  const [loading, setLoading] = useState("");
  const [submissionFailed, setSubmissionFailed] = useState(false);
  const [openStudioServiceEditView, setOpenStudioServiceEditView] = useState(false);
  const [toUpdateStudioService, setToUpdateStudioService] = useState();
  const [deleteModal, setDeleteModal] = useState(false);
  const [deleteModalStrings, setDeleteModalStrings] = useState({
    header: "Delete Studioservice?",
    type: "Service",
    message:
      "This Studioservice and it's description will be permanently deleted! If you want to continue, click on Delete.",
    ID: "",
    error: "",
  });
  const router = useRouter();

  const handleAddStudioService = async (event) => {
    const passForm = studioService;
    event.preventDefault();
    setStudioServiceErrors(ValidateCreateStudioService(studioService));
    if (Object.keys(ValidateCreateStudioService(studioService)).length === 0) {
      setLoading("studioservice");
      try {
        const res = await fetch(`/api/dashboard/admin/settings/studioservice`, {
          method: "POST",
          body: JSON.stringify(studioService),
          headers: {
            "Content-Type": "application/json",
          },
        });
        await res.json();

        if (!res.ok) {
          setLoading("");
          throw new Error(res.status);
        }
        if (res.ok) {
          setLoading("");
          router.reload();
        }
      } catch (error) {
        setLoading("");
        setStudioServiceErrors(error);
        setSubmissionFailed(true);
        console.error("Failed to update data", error);
      }
    }
  };
  const handleStudioServiceChange = (event) => {
    const target = event.target;
    const name = target.name;
    const wert = target.value;
    const value = checkValues(wert);
    setStudioService({ ...studioService, [name]: value });
  };
  function checkValues(wert) {
    return wert;
  }

  async function handleStudioServiceEdit(values) {
    if (values) {
      const service = {
        id: values.id,
        avatar: values.avatar,
        email: values.email,
        name: values.name,
      };
      if (res.ok) {
        setToUpdateStudioService(user);
        setOpenEditView(true);
      }
      alert("Something went wrong!", error);
      console.error("Failed to find User", error);
    }
  }

  const handleStudioServiceDelete = async (ID) => {
    if (ID) {
      setLoading(true);
      try {
        const res = await fetch(`/api/dashboard/admin/settings/studioservice`, {
          method: "DELETE",
          body: JSON.stringify(ID),
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (!res.ok) {
          throw new Error(res.status);
        }
        if (res.ok) {
          setDeleteModalStrings({
            ...deleteModalStrings,
            message: `successfully deleted`,
            ID: false,
          });
          setLoading(false);
          router.reload();
        }
      } catch (error) {
        setDeleteModalStrings({ ...deleteModalStrings, message: "It didn't work", error: error });
        setLoading(false);
        console.error("Failed to find Studio", error);
      }
    }
  };
  function openDeleteModal(values) {
    setID(values._id);
    setDeleteModalStrings({ ...deleteModalStrings, ID: values._id });
    setDeleteModal(true);
  }
  return (
    <div className='flex flex-col gap-14'>
      {/* Header1 */}
      <div>
        <h1 className='mt-4 mb-2 text-center text-4xl font-bold leading-tight text-secondary-color'>
          Settings
        </h1>
      </div>
      {/* Add studioservice */}
      <div>
        <section className='flex flex-col gap-5'>
          <h2 className='h2'>Studio services</h2>
          <div className='flex flex-wrap gap-1'>
            {studioServices.map((service) => (
              <span
                key={service._id}
                className='align-center ease flex w-max cursor-pointer items-center whitespace-nowrap rounded-full bg-gray-200 px-4 py-2 text-sm font-semibold text-gray-500 transition duration-300 active:bg-gray-300'>
                {service.name}
                <button
                  className='hover ml-1 bg-transparent focus:outline-none'
                  onClick={() => {
                    handleStudioServiceEdit(service);
                  }}>
                  <TbEdit className='adminSettings-icon' />
                </button>
                <button
                  className='hover bg-transparent focus:outline-none'
                  onClick={() => openDeleteModal(service)}>
                  <svg
                    aria-hidden='true'
                    focusable='false'
                    data-prefix='fas'
                    data-icon='times'
                    className='adminSettings-icon'
                    role='img'
                    xmlns='http://www.w3.org/2000/svg'
                    viewBox='0 0 352 512'>
                    <path
                      fill='currentColor'
                      d='M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z'></path>
                  </svg>
                </button>
              </span>
            ))}
            {openStudioServiceEditView ? (
              <EditStudioService
                toUpdateUser={toUpdateUser}
                userID={userID}
                setOpenStudioServiceEditView={setOpenStudioServiceEditView}></EditStudioService>
            ) : null}
            {deleteModal ? (
              <DeleteModal
                ID={ID}
                loading={loading}
                setDeleteModal={setDeleteModal}
                deleteModalStrings={deleteModalStrings}
                deleteFunction={handleStudioServiceDelete}></DeleteModal>
            ) : null}
          </div>
        </section>
        <form action='' className=''>
          <fieldset className='fset-adminsettings '>
            <FormInput
              beforeLabel={{
                string: "Add Studioservice",
                css: "h3 ",
              }}
              className='input-form peer block '
              type='text'
              name='name'
              id='name'
              placeholder='Studioservice name here..'
              required
              autoComplete='off'
              pattern='^([a-zA-Z-])([a-zA-Z-0-9-!ä&öü,-_\s]){2,29}$'
              errorMessage={"3-30 characters and (a-z, A-Z, 0-9, ! äöü ,-_) allowed!"}
              value={studioService.name}
              onChange={handleStudioServiceChange}></FormInput>
            <span className='errormessage'>{studioServiceErrors.name}</span>
            <FormInput
              beforeLabel={{ string: "Description", css: "label-login" }}
              textarea={true}
              className='input-form peer block'
              name='description'
              id='description'
              placeholder='Studioservice description here..'
              required
              autoComplete='off'
              pattern='^([a-zA-Z-])([a-zA-Z-0-9-!ä&öü,-_\s]){9,59}$'
              errorMessage={"10-60 characters and (a-z, A-Z, 0-9, ! äöü ,-_) allowed!"}
              value={studioService.description}
              onChange={handleStudioServiceChange}
            />
            <span className='errormessage'>{studioServiceErrors.description}</span>{" "}
          </fieldset>
          {loading === "studioservice" ? (
            <Spinner />
          ) : (
            <button
              type='submit'
              className='adminSettings-button'
              onClick={(event) => handleAddStudioService(event)}>
              Add Service
            </button>
          )}
        </form>
      </div>
    </div>
  );
}

AdminDashboard.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export async function getServerSideProps(context) {
  await db.connect();

  const totalListingsCount = await StudioListing.find().count();
  const totalUsersCount = await User.find().count();
  const studioServices = await StudioService.find({});
  const serializedStudioServices = JSON.parse(JSON.stringify(studioServices));

  return {
    props: {
      studioServices: serializedStudioServices || null,
    },
  };
}
