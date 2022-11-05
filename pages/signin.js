import { signIn, getCsrfToken, getSession, getProviders } from 'next-auth/react';
import { useState } from 'react';

import React from 'react';

export default function SignIn({ csrfToken, providers }) {
  const [form, setForm] = useState({
    email: '',
    password: '',
    message: null,
  });

  return (
    <div>
      <form action=''>
        <input type='hidden' name='csrfToken' defaultValue={csrfToken} />
      </form>
    </div>
  );
}

export async function getServerSideProps(context) {
  const { req } = context;
  const session = await getSession({ req });
  if (session) {
    return { redirect: { destionation: '/' } };
  }
  const csrfToken = await getCsrfToken(context);
  const providers = await getProviders();

  return {
    props: { csrfToken, providers },
  };
}
