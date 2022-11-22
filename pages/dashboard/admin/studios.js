import React from 'react';
import StudioTable from '../../../components/Dashboard/Tables/StudioTable';
import DashboardLayout from '../../../components/Layout/DashboardLayout';
import db from '../../../lib/dbConnect';
import StudioListing from '../../../models/StudioListing';

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
  const fetchedStudios = JSON.parse(JSON.stringify(fetchingStudios));
  return {
    props: {
      fetchedStudios: fetchedStudios || null,
    },
  };
}
