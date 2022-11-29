import SignUpComponent from '../components/Forms/SignUpForm';
import { getCsrfToken, getSession, getProviders } from 'next-auth/react';

export default function Signin({ csrfToken, providers }) {
  return (
    <div>
      <SignUpComponent csrfToken={csrfToken} providers={providers} />
    </div>
  );
}

export async function getServerSideProps(context) {
  const { req } = context;
  const session = await getSession({ req });
  if (session) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }
  const csrfToken = await getCsrfToken(context);
  const providers = await getProviders();

  return {
    props: { csrfToken, providers },
  };
}
