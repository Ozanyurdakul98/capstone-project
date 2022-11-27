import StudioService from "../../../models/StudioService";
import db from "../../../lib/dbConnect";
import StudioListing from "../../../models/StudioListing";
import User from "../../../models/UserModel";
import DashboardLayout from "../../../components/Layout/DashboardLayout";
import { FormInput } from "../../../components/Forms/FormInput";
import { useState } from "react";
import { Spinner } from "../../../components/Spinner";
import { ValidateCreateStudioService } from "../../../helpers/Validate";
export default function AdminDashboard({ serialized }) {
  const [studioService, setStudioService] = useState({ name: "", description: "" });
  const [studioServiceErrors, setStudioServiceErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [submissionFailed, setSubmissionFailed] = useState(false);
  console.log("serialized");

  const handleAddStudioService = async (event) => {
    const passForm = studioService;
    event.preventDefault();
    setStudioServiceErrors(ValidateCreateStudioService(studioService));
    if (Object.keys(studioServiceErrors).length === 0) {
      setLoading(true);
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
          setLoading(false);
          throw new Error(res.status);
        }
        if (res.ok) {
          setLoading(false);
          // router.reload();
        }
      } catch (error) {
        setLoading(false);
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
  return (
    <div>
      <h1>settings</h1>
      <form action=''>
        <fieldset className='listingForm '>
          <FormInput
            beforeLabel={{
              string: "Add Studioservice",
              css: "label-form ",
            }}
            className='input-form peer block '
            type='text'
            name='name'
            id='name'
            placeholder='Studioservice here..'
            required
            autoComplete='off'
            pattern='^([a-zA-Z-])([a-zA-Z-0-9-!äöü,-_\s]){2,29}$'
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
            pattern='^([a-zA-Z-])([a-zA-Z-0-9-!äöü,-_\s]){9,59}$'
            errorMessage={"10-60 characters and (a-z, A-Z, 0-9, ! äöü ,-_) allowed!"}
            value={studioService.description}
            onChange={handleStudioServiceChange}
          />
          <span className='errormessage'>{studioServiceErrors.description}</span>
        </fieldset>
        <button type='submit' className='button' onClick={(event) => handleAddStudioService(event)}>
          Add Service
        </button>
      </form>
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
  const studiosCreatedToday = await StudioService.find({});
  const serialized = JSON.parse(JSON.stringify(studiosCreatedToday));

  return {
    props: {
      serialized: serialized || null,
    },
  };
}
