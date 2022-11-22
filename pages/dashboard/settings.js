import db from '../../lib/dbConnect';
import DashboardLayout from '../../components/Layout/DashboardLayout';
import { unstable_getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]';
// import SalesStats from './SalesStats';
// import TopSellingProducts from './TopSellingProducts';
import { DeleteModal } from '../../components/Modals/DeleteModal';
import { useEffect, useState } from 'react';
import User from '../../models/UserModel';
import { useRouter } from 'next/router';
//expects deleteModalStrings (= header, message, error, studioID)
import { signOut } from 'next-auth/react';

export default function DashboardSettings({ userData }) {
  const [deleteModal, setDeleteModal] = useState(false);
  const [data, setData] = useState('');
  const [userID, setUserID] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [deleteModalStrings, setDeleteModalStrings] = useState({
    header: 'Delete Account',
    type: 'User',
    message:
      'Are you sure you want to delete your account? Please let us know, what could make you stay or come back. You may contact us about that!',
    error: '',
    ID: '',
  });

  async function handleDelete(ID) {
    if (ID) {
      setLoading((prev) => !prev);
      try {
        const res = await fetch(`/api/dashboard/user/${ID}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        if (!res.ok) {
          throw new Error(res.status);
        }
        if (res.ok) {
          setDeleteModalStrings({ ...deleteModalStrings, message: `successfully deleted...`, studioID: '' });
          setTimeout(() => {
            setLoading(false);
            signOut();
          }, 1500);
        }
      } catch (error) {
        setDeleteModalStrings({ ...deleteModalStrings, message: "It didn't work", error: error });
        setLoading(false);
        console.error('Failed to find Studio', error);
      }
    }
  } // console.log('useradata', userData);
  console.log('sess', userData);
  useEffect(() => {
    if (userData) {
      setData({ username: userData.username, name: userData.name, lastname: userData.lastname });
      setUserID(userData._id);
    }
  }, []);
  function handleOpenDeleteModal(userID) {
    setDeleteModal(true);
  }
  return (
    <>
      <div className=''>
        <div>
          <h1 className='mt-4 mb-2 text-center text-4xl font-bold leading-tight text-secondary-color'>Settings</h1>
        </div>
        <div className=''>
          <button
            type='button'
            onClick={() => handleOpenDeleteModal(userID)}
            className='inline-block rounded-full bg-red-600 px-6 py-2.5 text-xs font-medium uppercase leading-tight text-white shadow-md transition duration-150 ease-in-out hover:bg-red-700 hover:shadow-lg focus:bg-red-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-800 active:shadow-lg'>
            Delete Account
          </button>
          {deleteModal ? (
            <>
              <DeleteModal
                ID={userID}
                loading={loading}
                setDeleteModal={setDeleteModal}
                deleteModalStrings={deleteModalStrings}
                deleteFunction={handleDelete}></DeleteModal>
            </>
          ) : null}
        </div>
      </div>
    </>
  );
}

DashboardSettings.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};
export async function getServerSideProps(context) {
  await db.connect();
  const session = await unstable_getServerSession(context.req, context.res, authOptions);

  const email = session?.user.email;
  const userID = await User.findOne({ email: email });
  const serializedUserID = JSON.parse(JSON.stringify(userID));

  if (!session) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }
  return {
    props: {
      userData: serializedUserID || null,
    },
  };
}
