import DashboardLayout from '../../components/Layout/DashboardLayout';
import db from '../../lib/dbConnect';
import StudioListing from '../../models/StudioListing';
import MyStudiosTable from '../../components/Dashboard/Tables/MyStudiosTable';
import moment from 'moment';
import { getToken } from 'next-auth/jwt';

export default function DashboardMyStudiosTable({ fetchedStudios }) {
  return (
    <>
      <h1 className="mt-4 mb-2 text-center text-4xl font-bold leading-tight text-secondary-color">My Studios</h1>
      <MyStudiosTable fetchedStudios={fetchedStudios} />
    </>
  );
}

DashboardMyStudiosTable.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export async function getServerSideProps({ req }) {
  await db.connect();
  const session = await getToken({ req });

  const email = session.email;
  const fetchingStudios = await StudioListing.find({ userEmail: email });
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
