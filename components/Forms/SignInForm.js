import React from 'react';
import { signIn } from 'next-auth/react';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { FormInput } from './FormInput';

export default function SignInComponent({ csrfToken, providers }) {
  const router = useRouter();
  const [form, setForm] = useState({
    email: '',
    password: '',
    message: null,
  });
  const email = form.email;
  const password = form.password;

  const signinUser = async (event) => {
    event.preventDefault();
    console.log(event.target.checkValidity());
    let options = { redirect: false, email, password };
    const res = await signIn('credentials', options);
    setForm({ ...form, message: null });
    if (res?.error) {
      return setForm({ ...form, message: res.error });
    }
    return router.push('/');
  };
  const signupUser = async (event) => {
    event.preventDefault();
    setForm({ ...form, message: null });
    const res = await fetch('/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });
    let user = await res.json();
    if (user.message) {
      setForm({ ...form, message: user.message });
    }
    if (user.message == 'success') {
      let options = { redirect: false, email, password };
      const res = await signIn('credentials', options);
      return router.push('/');
    }
  };
  const handleChange = (event) => {
    const t = event.target;
    console.log(t);
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
    <div className='signIn-form'>
      <form action='' onSubmit={signinUser}>
        <FormInput type='hidden' name='csrfToken' defaultValue={csrfToken} />
        <label htmlFor='email'>Email adress</label>
        <FormInput
          className='input-form peer'
          type='email'
          name='email'
          id='email'
          placeholder='Email'
          required
          pattern='^([a-zA-Z-0-9-!äöü@.,-_]){5,60}$'
          errorMessage={'( a-z, A-Z, 0-9, äöü !,-@._ ) min 5 max 60 characters allowed!'}
          onChange={handleChange}
        />
        <label htmlFor='password'>Password</label>
        <FormInput
          className='input-form peer'
          type='password'
          name='password'
          id='password'
          placeholder='Password'
          required
          pattern='^([a-zA-Z-0-9-!äöü#@.,-_]){8,60}$'
          errorMessage={'( a-z, A-Z, 0-9, äöü #!,-@._ ) min 8 max 60 characters allowed!'}
          onChange={handleChange}
        />
        <p>{form.message}</p>
        <button className='button' type='submit'>
          Sign in with Credentials
        </button>
        <button onClick={(event) => signupUser(event)} className='button'>
          Sign up
        </button>
      </form>

      {Object.values(providers).map((provider) => {
        if (provider.name === 'Credentials') {
          return;
        }
        return (
          <div key={provider.id}>
            <button key={provider.id} className='button' onClick={() => signIn(provider.id)}>
              Sign in with {provider.name}
            </button>
          </div>
        );
      })}
    </div>
  );
}
