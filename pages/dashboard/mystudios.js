import React from 'react';
import DashboardLayout from '../../components/Layout/DashboardLayout';
import db from '../../lib/dbConnect';
import StudioListing from '../../models/StudioListing';
import { unstable_getServerSession } from 'next-auth/next';
import { authOptions } from '../api/auth/[...nextauth].js';
import MyStudiosTable from '../../components/Dashboard/Tables/MyStudiosTable';

export default function DashboardMyStudiosTable({ fetchedStudios }) {
  return <MyStudiosTable fetchedStudios={fetchedStudios} />;
}

DashboardMyStudiosTable.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export async function getServerSideProps(context) {
  await db.connect();
  const session = await unstable_getServerSession(context.req, context.res, authOptions);
  if (!session) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }
  const email = session.user.email;
  const fetchingStudios = await StudioListing.find({ userEmail: email });
  const fetchedStudios = JSON.parse(JSON.stringify(fetchingStudios));
  console.log(fetchedStudios);
  return {
    props: {
      fetchedStudios: fetchedStudios || null,
    },
  };
}
