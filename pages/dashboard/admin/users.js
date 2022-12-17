import UserTable from '../../../components/Dashboard/Tables/UserTable';
import db from '../../../lib/dbConnect';
import User from '../../../models/User';
import DashboardLayout from '../../../components/Layout/DashboardLayout';
import moment from 'moment';

export default function DashboardUsers({ fetchedUsers }) {
  return (
    <>
      <h1 className="mt-4 mb-2 text-center text-4xl font-bold leading-tight text-secondary-color">Users</h1>
      <UserTable fetchedUsers={fetchedUsers} />
    </>
  );
}

DashboardUsers.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export async function getServerSideProps() {
  await db.connect();
  let fetchedUser = await User.find();
  const serializing = JSON.parse(JSON.stringify(fetchedUser));
  const serializedAndUpdatedUsers = serializing.map((user) => ({
    ...user,
    createdAtDate: moment(user.createdAt).format('DD/MM/yyyy'),
    createdAtTime: moment(user.createdAt).format('kk:mm'),
    updatedAtDate: moment(user.updatedAt).format('DD/MM/yyyy'),
    updatedAtTime: moment(user.updatedAt).format('kk:mm'),
  }));

  return {
    props: {
      fetchedUsers: serializedAndUpdatedUsers || null,
    },
  };
}
