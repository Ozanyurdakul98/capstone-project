import React from 'react';
import StudioTable from '../../components/Dashboard/Tables/StudioTable';
import db from '../../lib/dbConnect';
import StudioListing from '../../models/StudioListing';

export default function DashboardStudios({ fetchedStudios }) {
  return (
    <div>
      <StudioTable fetchedStudios={fetchedStudios} />
    </div>
  );
}

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
