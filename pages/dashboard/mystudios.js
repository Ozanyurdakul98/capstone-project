import React from 'react';
import DashboardLayout from '../../components/Layout/DashboardLayout';
import db from '../../lib/dbConnect';
import StudioListing from '../../models/StudioListing';
import { unstable_getServerSession } from 'next-auth/next';
import { authOptions } from '../api/auth/[...nextauth].js';
import MyStudiosTable from '../../components/Dashboard/Tables/MyStudiosTable';
import format from 'date-fns/format';

export default function DashboardMyStudiosTable({ fetchedStudios }) {
  return (
    <>
      <h1 className='mt-4 mb-2 text-center text-4xl font-bold leading-tight text-secondary-color'>My Studios</h1>
      <MyStudiosTable fetchedStudios={fetchedStudios} />
    </>
  );
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
  const serializing = JSON.parse(JSON.stringify(fetchingStudios));

  const serializedAndUpdatedStudios = serializing.map((studio) => ({
    ...studio,
    createdAtDate: format(new Date(studio.createdAt), 'dd/MM/yyyy'),
    createdAtTime: format(new Date(studio.createdAt), 'kk:mm'),
    updatedAtDate: format(new Date(studio.updatedAt), 'dd/MM/yyyy'),
    updatedAtTime: format(new Date(studio.updatedAt), 'kk:mm'),
  }));

  return {
    props: {
      fetchedStudios: serializedAndUpdatedStudios || null,
    },
  };
}
