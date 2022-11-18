import React from 'react';
import SignInComponent from '../components/Forms/SignInForm';
import { getCsrfToken, getSession, getProviders } from 'next-auth/react';

export default function Signin({ csrfToken, providers }) {
  return (
    <div>
      <SignInComponent csrfToken={csrfToken} providers={providers} />
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
  const csrfToken = (await getCsrfToken(context)) || null;
  const providers = await getProviders();
  console.log('LOGIN', csrfToken);
  console.log('session', session);
  console.log('providers', providers);
  return {
    props: { csrfToken, providers },
  };
}
