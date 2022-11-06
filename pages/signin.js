import React from 'react';
import { signIn, getCsrfToken, getSession, getProviders } from 'next-auth/react';
import { useState } from 'react';
import { useRouter } from 'next/router';

export default function SignIn({ csrfToken, providers }) {
  const router = useRouter();
  const [form, setForm] = useState({
    email: '',
    password: '',
    message: null,
  });

  const signinUser = async (event) => {
    let options = { redirect: false, email, password };
    const res = await signIn('credentials', options);
    event.preventDefault();
    setForm({ ...form, message: null });
    if (res?.error) {
      return setForm({ ...form, message: res.error });
    }
    return router.push('/');
  };

  const handleChange = (event) => {
    const t = event.target;
    const name = t.name;
    const wert = t.value;
    const value = checkValues(name, wert);
    setForm({ ...form, [name]: value });
  };

  function checkValues(name, wert) {
    if (name === 'email') {
      return wert;
    }
    if (name === 'password') {
      return wert;
    }
    return;
  }

  return (
    <div>
      <form action=''>
        <input type='hidden' name='csrfToken' defaultValue={csrfToken} />
        <label htmlFor='email'>Email adress</label>
        <input type='email' name='email' id='email' onChange={handleChange} />
        <label htmlFor='password'>Password</label>
        <input type='password' name='password' id='password' onChange={handleChange} />
        <p>{form.message}</p>
        <button className='button' type='submit' onClick={(event) => signinUser(event)}>
          Sign in with Credentials
        </button>
        <button className='button'>Sign up</button>
      </form>

      {Object.values(providers).map((provider) => {
        if (provider.name === 'Credentials') {
          return;
        }
        return (
          <div key={providers.name}>
            <button className='button' onClick={() => signIn(provider.id)}>
              Sign in with {provider.name}
            </button>
          </div>
        );
      })}
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
