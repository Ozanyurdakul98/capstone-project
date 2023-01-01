import DashboardLayout from '../../components/Layout/DashboardLayout.js';
import db from '../../lib/dbConnect.js';
import { getToken } from 'next-auth/jwt';
import { StudioForm } from '../../components/Forms/StudioForm';

function DashboardAddStudio({ userID, role }) {
  return (
    <>
      <div>
        <h1 className="text-primary mt-4 mb-2 text-center text-4xl font-bold leading-tight">Add a Studio </h1>
        <p className="text-center">
          Add a Studio to your account. The details you include here (like socials or studio location) will be used in
          the studio-services you can add to this studio later on. To submit a service, a studio is required. So go on
          and add a studio.
        </p>
      </div>
      <StudioForm userID={userID} role={role}></StudioForm>
    </>
  );
}

export default DashboardAddStudio;

DashboardAddStudio.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export async function getServerSideProps({ req }) {
  await db.connect();
  const token = await getToken({ req });
  const userID = token.id;
  const role = token.role;
  return {
    props: {
      userID: userID || token.sub,
      role: role || null,
    },
  };
}
