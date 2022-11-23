import React from 'react';
import StudioTable from '../../../components/Dashboard/Tables/StudioTable';
import DashboardLayout from '../../../components/Layout/DashboardLayout';
import db from '../../../lib/dbConnect';
import StudioListing from '../../../models/StudioListing';
import moment from 'moment';
export default function DashboardStudios({ fetchedStudios }) {
  return (
    <>
      <h1 className='mt-4 mb-2 text-center text-4xl font-bold leading-tight text-secondary-color'>Studios</h1>
      <StudioTable fetchedStudios={fetchedStudios} />
    </>
  );
}

DashboardStudios.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export async function getServerSideProps(context) {
  await db.connect();
  const fetchingStudios = await StudioListing.find();
  const serializing = JSON.parse(JSON.stringify(fetchingStudios));
  const serializedAndUpdatedStudios = serializing.map((studio) => ({
    ...studio,
    createdAtDate: moment.utc(studio.createdAt).format('DD/MM/yyyy'),
    createdAtTime: moment.utc(studio.createdAt).format('kk:mm'),
    updatedAtDate: moment.utc(studio.updatedAt).format('DD/MM/yyyy'),
    updatedAtTime: moment.utc(studio.updatedAt).format('kk:mm'),
  }));
  return {
    props: {
      fetchedStudios: serializedAndUpdatedStudios || null,
    },
  };
}
