import React from 'react';
import UserTable from '../../components/Dashboard/Tables/UserTable';
import db from '../../lib/dbConnect';
import User from '../../models/UserModel';

export default function DashboardUsers({ fetchedUsers }) {
  return <UserTable fetchedUsers={fetchedUsers} />;
}
export async function getServerSideProps(context) {
  await db.connect();
  const fetchedUser = await User.find();
  const serializing = {
    _id: fetchedUser._id,
  };
  const serializedFetchedUser = JSON.parse(JSON.stringify(fetchedUser));
  console.log('fetched', fetchedUser);
  console.log(serializing);
  return {
    props: {
      fetchedUsers: serializedFetchedUser || null,
    },
  };
}
