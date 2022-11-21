import React from 'react';
import StudioTable from '../../components/Dashboard/Tables/StudioTable';
import DashboardLayout from '../../components/Layout/DashboardLayout';
import db from '../../lib/dbConnect';
import StudioListing from '../../models/StudioListing';
import { unstable_getServerSession } from 'next-auth/next';
import { authOptions } from '../api/auth/[...nextauth].js';

export default function DashboardMyListings({ fetchedStudios }) {
  return <StudioTable fetchedStudios={fetchedStudios} />;
}

DashboardMyListings.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export async function getServerSideProps(context) {
  await db.connect();
  const session = await unstable_getServerSession(context.req, context.res, authOptions);
  const email = session.user.email;
  const fetchingStudios = await StudioListing.findOne({ userEmail: email });
  const fetchedStudios = JSON.parse(JSON.stringify(fetchingStudios));

  return {
    props: {
      fetchedStudios: fetchedStudios || null,
    },
  };
}
