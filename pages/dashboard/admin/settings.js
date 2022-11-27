import DashboardAdminBoxes from "../../../components/Dashboard/DashboardAdminStatsToday";
import WelcomeRow from "../../../components/Dashboard/WelcomeRow";
import DashboardAdminStatsTotal from "../../../components/Dashboard/DashboardAdminStatsTotal";
import StudioService from "../../../models/StudioService";
import db from "../../../lib/dbConnect";
import StudioListing from "../../../models/StudioListing";
import User from "../../../models/UserModel";
import DashboardLayout from "../../../components/Layout/DashboardLayout";
import { FormInput } from "../../../components/Forms/FormInput";
import TextareaAutosize from "react-textarea-autosize";
import { useState } from "react";
import { Spinner } from "../../../components/Spinner";
export default function AdminDashboard({ serialized }) {
  const [form, setForm] = useState({ studioService: "" });
  const [formErrors, setFormErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [submissionFailed, setSubmissionFailed] = useState(false);
  console.log("serialized", serialized);
  const handleAddStudioService = async (event) => {
    const passForm = form;
    event.preventDefault();
    setFormErrors(ValidateCreateListing(passForm, checked));
    if (Object.keys(formErrors).length === 0) {
      setLoading(true);
      try {
        const res = await fetch(`/api/dashboard/admin/settings/studioservice`, {
          method: "POST",
          body: JSON.stringify(form),
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
        setFormErrors(error);
        setSubmissionFailed(true);
        console.error("Failed to update data", error);
      }
    }
  };

  const handleChange = (event) => {
    const target = event.target;
    const name = target.name;
    const wert = target.value;
    const value = checkValues(wert);
    setForm({ ...form, [name]: value() });
  };
  function checkValues(wert) {
    return () => {
      return wert;
    };
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
            name='studioService'
            id='studioService'
            placeholder='Studioservice here..'
            required
            autoComplete='off'
            pattern='^([a-zA-Z-])([a-zA-Z-0-9-!äöü,-_\s]){9,60}$'
            errorMessage={"Only 10-60 characters and (a-z, A-Z, 0-9, ! äöü ,-_) allowed!"}
            value={form.studioService}
            onChange={handleChange}></FormInput>

          <FormInput
            beforeLabel={{ string: "Description", css: "label-login" }}
            textarea={true}
            className='input-form peer block'
            name='studioService'
            id='studioService'
            placeholder='Studioservice description here..'
            required
            autoComplete='off'
            pattern='^([a-zA-Z-])([a-zA-Z-0-9-!äöü,-_\s]){9,60}$'
            errorMessage={"Only 10-60 characters and (a-z, A-Z, 0-9, ! äöü ,-_) allowed!"}
            value={form.studioService}
            onChange={handleChange}
          />
          <span className='errormessage'>{formErrors.studioService}</span>
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
