import AdminStudioService from '../../../models/AdminCreateStudioService';
import db from '../../../lib/dbConnect';
import DashboardLayout from '../../../components/Layout/DashboardLayout';
import { FormInput } from '../../../components/Forms/FormInput';
import { useState } from 'react';
import { Spinner } from '../../../components/Spinner';
import { ValidateCreateStudioService } from '../../../helpers/Validate';
import { DeleteModal } from '../../../components/Modals/DeleteModal';
import { useRouter } from 'next/router';
import { TbEdit } from 'react-icons/tb';
import EditAdminStudioService from '../../../components/Forms/EditAdminStudioService';

export default function AdminDashboard({ studioServices }) {
  const [ID, setID] = useState('');
  const [studioService, setStudioService] = useState({
    name: '',
    queryString: '',
    description: '',
  });
  const [studioServiceErrors, setStudioServiceErrors] = useState({});
  const [loading, setLoading] = useState('');
  const [openStudioServiceEditView, setOpenStudioServiceEditView] = useState(false);
  const [toUpdateStudioService, setToUpdateStudioService] = useState();
  const [deleteModal, setDeleteModal] = useState(false);
  const [deleteModalStrings, setDeleteModalStrings] = useState({
    header: 'Delete Studioservice?',
    type: 'Service',
    message:
      "This Studioservice and it's description will be permanently deleted! If you want to continue, click on Delete.",
    ID: '',
    error: '',
  });
  const router = useRouter();

  const handleAddStudioService = async (event) => {
    event.preventDefault();
    setStudioServiceErrors(ValidateCreateStudioService(studioService));
    if (Object.keys(ValidateCreateStudioService(studioService)).length === 0) {
      setLoading('studioservice');
      try {
        const res = await fetch(`/api/dashboard/admin/settings/studioservice`, {
          method: 'POST',
          body: JSON.stringify(studioService),
          headers: {
            'Content-Type': 'application/json',
          },
        });
        await res.json();
        if (!res.ok) {
          setLoading('');
          throw new Error(res.status);
        }
        setLoading('');
        router.reload();
      } catch (error) {
        setLoading('');
        setStudioServiceErrors(error);
        console.error('Failed to update data', error);
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

  async function openEditStudioServiceModal(values) {
    const service = {
      id: values._id,
      image: values.image,
      name: values.name,
      queryString: values.queryString,
      description: values.description,
    };
    setToUpdateStudioService(service);
    setOpenStudioServiceEditView(true);
  }

  const handleStudioServiceDelete = async (ID) => {
    if (ID) {
      setLoading(true);
      try {
        const res = await fetch(`/api/dashboard/admin/settings/studioservice`, {
          method: 'DELETE',
          body: JSON.stringify(ID),
          headers: {
            'Content-Type': 'application/json',
          },
        });
        if (!res.ok) {
          throw new Error(res.status);
        }
        setDeleteModalStrings({
          ...deleteModalStrings,
          message: `successfully deleted`,
          ID: false,
        });
        setLoading(false);
        router.reload();
      } catch (error) {
        setDeleteModalStrings({ ...deleteModalStrings, message: "It didn't work", error: error });
        setLoading(false);
        console.error('Failed to find Studio', error);
      }
    }
  };
  function openDeleteModal(values) {
    setID(values._id);
    setDeleteModalStrings({ ...deleteModalStrings, ID: values._id });
    setDeleteModal(true);
  }
  return (
    <div className="flex flex-col gap-14">
      {/* Header1 */}
      <div>
        <h1 className="mt-4 mb-2 text-center text-4xl font-bold leading-tight text-secondary-color">Settings</h1>
      </div>
      {/* Add studioservice */}
      <div>
        <section className="flex flex-col gap-5">
          <h2 className="h2">Studio services</h2>
          <div className="flex flex-wrap gap-1">
            {studioServices.map((service) => (
              <span
                key={service._id}
                className="ease flex w-max cursor-pointer items-center whitespace-nowrap rounded-full bg-gray-200 px-4 py-2 text-sm font-semibold text-gray-500 transition duration-300 active:bg-gray-300">
                {service.name}
                <button
                  className="ml-1 bg-transparent focus:outline-none"
                  onClick={() => {
                    openEditStudioServiceModal(service);
                  }}>
                  <TbEdit className="adminSettings-icon" />
                </button>
                <button className="bg-transparent focus:outline-none" onClick={() => openDeleteModal(service)}>
                  <svg
                    aria-hidden="true"
                    focusable="false"
                    data-prefix="fas"
                    data-icon="times"
                    className="adminSettings-icon"
                    role="img"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 352 512">
                    <path
                      fill="currentColor"
                      d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z"></path>
                  </svg>
                </button>
              </span>
            ))}
            {openStudioServiceEditView ? (
              <EditAdminStudioService
                toUpdateStudioService={toUpdateStudioService}
                setOpenStudioServiceEditView={setOpenStudioServiceEditView}
              />
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
        <form action="" className="">
          <fieldset className="fset-adminsettings ">
            <FormInput
              beforeLabel={{
                string: 'Add Studioservice',
                css: 'h3 ',
              }}
              className="input-form peer block "
              type="text"
              name="name"
              id="name"
              placeholder="Studioservice name here.."
              required
              autoComplete="off"
              pattern="^([a-zA-Z-])([a-zA-Z-0-9!??&????,-_\s]){2,29}$"
              errorMessage={'3-30 characters and (a-z, A-Z, 0-9, ! ?????? ,-_) allowed!'}
              value={studioService.name}
              onChange={handleStudioServiceChange}></FormInput>
            <span className="errormessage">{studioServiceErrors.name}</span>
            <FormInput
              beforeLabel={{
                string: 'Querystring',
                css: 'label-login ',
              }}
              className="input-form peer block "
              type="text"
              name="queryString"
              id="queryString"
              placeholder="Querystring for url pathname.."
              required
              autoComplete="off"
              pattern="^([a-z])([a-z-0-9-_&\s]){2,29}$"
              errorMessage={'3-30 characters and (a-z, 0-9, &-_) allowed!'}
              value={studioService.queryString}
              onChange={handleStudioServiceChange}></FormInput>
            <span className="errormessage">{studioServiceErrors.queryString}</span>
            <FormInput
              beforeLabel={{ string: 'Description', css: 'label-login' }}
              textarea={true}
              className="input-form peer block"
              name="description"
              id="description"
              placeholder="Studioservice description here.."
              required
              autoComplete="off"
              pattern="^([a-zA-Z-])([a-zA-Z-0-9-!??&?????,-_\s]){9,149}$"
              errorMessage={'10-150 characters and (a-z, A-Z, 0-9, !???????,-_) allowed!'}
              value={studioService.description}
              onChange={handleStudioServiceChange}
            />
            <span className="errormessage">{studioServiceErrors.description}</span>{' '}
          </fieldset>
          {loading === 'studioservice' ? (
            <Spinner />
          ) : (
            <button type="submit" className="adminSettings-button" onClick={(event) => handleAddStudioService(event)}>
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

export async function getServerSideProps() {
  await db.connect();
  const studioServices = await AdminStudioService.find({});
  const serializedStudioServices = JSON.parse(JSON.stringify(studioServices));
  return {
    props: {
      studioServices: serializedStudioServices || null,
    },
  };
}
