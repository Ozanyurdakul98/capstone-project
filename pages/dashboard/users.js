import React from 'react';
import UserTable from '../../components/Dashboard/Tables/UserTable';
import db from '../../lib/dbConnect';
import User from '../../models/UserModel';
import format from 'date-fns/format';
import DashboardLayout from '../../components/Layout/DashboardLayout';

export default function DashboardUsers({ fetchedUsers }) {
  return <UserTable fetchedUsers={fetchedUsers} />;
}

DashboardUsers.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export async function getServerSideProps(context) {
  await db.connect();
  let fetchedUser = await User.find();
  const serializing = JSON.parse(JSON.stringify(fetchedUser));
  const serializedAndUpdatedUsers = serializing.map((user) => ({
    ...user,
    createdAtDate: format(new Date(user.createdAt), ' dd/MM/yyyy'),
    createdAtTime: format(new Date(user.createdAt), ' kk:mm:ss'),
    updatedAtDate: format(new Date(user.updatedAt), ' dd/MM/yyyy'),
    updatedAtTime: format(new Date(user.updatedAt), ' kk:mm:ss'),
  }));
  console.log('test', serializedAndUpdatedUsers);
  return {
    props: {
      fetchedUsers: serializedAndUpdatedUsers || null,
    },
  };
}
