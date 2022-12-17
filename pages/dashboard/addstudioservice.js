import moment from 'moment';
import { getToken } from 'next-auth/jwt';
import { useState } from 'react';
import AddStudioserviceCardWideStudio from '../../components/Cards/AddStudioserviceCardWideStudio';
import DashboardLayout from '../../components/Layout/DashboardLayout';
import db from '../../lib/dbConnect';
import StudioListing from '../../models/StudioListing';
import StudioInformation from '../../components/Modals/StudioInformation';
import AdminStudioService from '../../models/AdminCreateStudioService';
import { StudioServiceForm } from '../../components/Forms/StudioServiceForm';
import { MyLink } from '../../components/MyLink';

export default function DashboardAddStudioservice({ fetchedStudios, sanitizedServices, role }) {
  const [step, setStep] = useState('selectStudio');
  const [selectedStudio, setSelectedStudio] = useState(false);
  const [selectedStudioInformation, setSelectedStudioInformation] = useState('');

  const selectingStudio = (val) => {
    const thisStudio = fetchedStudios.filter((studio) => studio._id === val.id);
    setSelectedStudio({ studio: thisStudio[0]._id, user: thisStudio[0].user._id });
    setSelectedStudioInformation(thisStudio[0]);
    setStep('info');
  };
  console.log(step);
  return (
    <div>
      {/* welcome */}
      <section>
        <h1 className="text-primary mt-4 mb-2 text-center text-4xl font-bold leading-tight">Add Studioservice </h1>
        <p className="text-center">
          Here you can add a Studioservice to your Studio. By seperating Studio and Studioservice, every Studioservice
          can have its own images, descriptions and other details
        </p>
      </section>
      {/* studios and addstudioForm */}
      <section className="mt-10">
        {/* studiorow */}
        {step === 'selectStudio' || step === 'info' ? (
          <section>
            {/* heading */}
            <div className="mb-5">
              <h2 className="h2">Studios</h2>
              <p>Choose the Studio you want add a Studioservice to. Then you will be able to click on Next</p>
            </div>
            {/* studios */}
            <section aria-label="select your studio">
              {fetchedStudios.map(
                ({
                  _id,
                  user,
                  studioName,
                  logo,
                  studiotype,
                  studioLanguages,
                  openingHours,
                  locationFeatures,
                  studioLocation,
                }) => (
                  <AddStudioserviceCardWideStudio
                    key={_id}
                    id={_id}
                    user={user}
                    studioName={studioName}
                    studioLanguages={studioLanguages}
                    logo={logo}
                    studiotype={studiotype}
                    openingHours={openingHours}
                    locationFeatures={locationFeatures}
                    studioLocation={studioLocation}
                    selectingStudio={selectingStudio}
                    selectedStudio={selectedStudio}></AddStudioserviceCardWideStudio>
                )
              )}
            </section>
          </section>
        ) : null}
        {/* StudioInformationModal */}
        {step === 'info' ? (
          <section aria-label="info modal for studio you just selected">
            <StudioInformation setStep={setStep} studio={selectedStudioInformation} />
          </section>
        ) : null}
        {/* addstudioservice */}
        {step === 'addStudioservice' ? (
          <section className="sm:px-0">
            <StudioServiceForm
              selectedStudioInformation={selectedStudioInformation}
              selectedStudio={selectedStudio}
              studioService={sanitizedServices}
              role={role}
            />
          </section>
        ) : (
          // buttons if no studio selected
          <section className="flex max-w-6xl justify-between gap-3 sm:gap-20 md:gap-80 ">
            <button type="button" className="form-button bg-black text-white hover:bg-black">
              <MyLink href="/dashboard/addstudio">Add Studio instead</MyLink>
            </button>
            <button
              type="button"
              onClick={() => {
                setStep('addStudioservice');
              }}
              disabled={!selectedStudio}
              className="form-button text-white">
              {!selectedStudio ? 'Select a Studio' : 'Next'}
            </button>
          </section>
        )}
      </section>
    </div>
  );
}

DashboardAddStudioservice.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export async function getServerSideProps({ req }) {
  await db.connect();
  const session = await getToken({ req });
  const role = session.role;
  const services = await AdminStudioService.find();
  const sanitizedServices = services.map((service) => ({
    id: service.id,
    name: service.name,
    description: service.description,
  }));

  const email = session.email;
  const fetchingStudios = await StudioListing.find({ userEmail: email }).populate({
    path: 'user',
    model: 'users',
    select: 'avatar email name lastname username',
  });
  const serializing = JSON.parse(JSON.stringify(fetchingStudios));
  const serializedAndUpdatedStudios = serializing.map((studio) => ({
    ...studio,
    createdAtDate: moment(studio.createdAt).format('DD/MM/yyyy'),
    createdAtTime: moment(studio.createdAt).format('kk:mm'),
    updatedAtDate: moment(studio.updatedAt).format('DD/MM/yyyy'),
    updatedAtTime: moment(studio.updatedAt).format('kk:mm'),
  }));

  return {
    props: {
      fetchedStudios: serializedAndUpdatedStudios || null,
      sanitizedServices: sanitizedServices || null,
      role: role || null,
    },
  };
}
