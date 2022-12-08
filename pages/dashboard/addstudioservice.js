import moment from 'moment';
import { getToken } from 'next-auth/jwt';
import { useState } from 'react';
import AddStudioserviceCardWideStudio from '../../components/Cards/AddStudioserviceCardWideStudio';
import DashboardLayout from '../../components/Layout/DashboardLayout';
import db from '../../lib/dbConnect';
import StudioListing from '../../models/StudioListing';
import StudioInformation from '../../components/Modals/StudioInformation';
export default function DashboardAddStudioservice({ fetchedStudios }) {
  const [selectedStudio, setSelectedStudio] = useState(false);
  const [selectedStudioInformation, setSelectedStudioInformation] = useState('');
  const [openModal, setOpenModal] = useState(false);

  const selectingStudio = (val) => {
    const thisStudio = fetchedStudios.filter((studio) => studio._id === val.id);
    setSelectedStudio((prev) => !prev);
    setSelectedStudioInformation(thisStudio[0]);
    setOpenModal(true);
  };
  console.log('val', selectedStudioInformation);
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
      {/* studiorow */}
      <section className="mt-10">
        {/* heading */}
        <div className="mb-5">
          <h2 className="h2">Studios</h2>
          <p>Choose the Studio you want add a Studioservice to</p>
        </div>
        {/* studios */}
        <section>
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
        {/* StudioInformationModal */}
        <section>
          {openModal ? <StudioInformation setOpenModal={setOpenModal} studio={selectedStudioInformation} /> : null}
        </section>
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
    },
  };
}
