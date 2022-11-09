import React from 'react';
import Image from 'next/image';
import { signIn } from 'next-auth/react';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { FormInput } from './FormInput';
import Link from 'next/link';
export default function SignUpComponent({ csrfToken, providers }) {
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
    <div className=' signIn-form grid h-screen w-full grid-cols-1 overflow-y-hidden sm:grid-cols-2'>
      <div className='relative hidden sm:block'>
        <Image
          className='relative h-full w-full'
          src='/images/Thumbnail-signup.jpg'
          layout='fill'
          objectFit='cover'
          alt='login-image'
        />
        <div className='mt-32 flex h-full  items-center '>
          <div className='relative mx-auto flex min-h-80 w-80 flex-col gap-4 rounded-md bg-white/90 py-10 px-5 text-xl'>
            <p>
              <span className=' text-2xl font-bold'> Sign up</span> and start looking for your needs. Compare recording
              studios that help you produce your music or podcasts.
            </p>
            <p>
              Or start listing your own studio or services to reach more cusomers in your area and help them compare
              services and contacting you.
            </p>
          </div>
        </div>
      </div>
      <div className='bg-primary flex flex-col justify-center '>
        <form action='' className='form-login' onSubmit={signinUser}>
          <FormInput type='hidden' name='csrfToken' defaultValue={csrfToken} />
          <legend className='label-form text-2xl '>Sign Up</legend>
          <FormInput
            divClassAll={'w-full '}
            beforeLabel={{ string: 'Email adress', css: 'label-login' }}
            className='input-login justify peer'
            type='email'
            name='email'
            id='email'
            placeholder='Email'
            required
            pattern='^([^\s@]+@[^\s@]+\.[^\s@]+$)'
            errorMessage={'Not a valid email adress'}
            onChange={handleChange}
          />
          <FormInput
            divClassAll={'w-full'}
            beforeLabel={{ string: 'Password', css: 'label-login' }}
            className='input-login peer'
            type='password'
            name='password'
            id='password'
            placeholder='Password'
            required
            pattern='^([a-zA-Z-0-9-!äöü#@.,-_]){8,60}$'
            errorMessage={'( a-z, A-Z, 0-9, äöü #!,-@._ ) min 8 max 60 characters allowed!'}
            onChange={handleChange}
          />
          <FormInput
            divClassAll={'w-full'}
            beforeLabel={{ string: 'Confirm Password', css: 'label-login' }}
            className='input-login peer'
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
          <button className='login-button' type='submit'>
            Sign Up
          </button>
          <div className='flex'>
            <span className='pr-2 text-sm text-black'>Already have an account?</span>
            <Link href='/signin'>
              <a className='text-sm underline'>Log in right here</a>
            </Link>
          </div>
          <button onClick={(event) => signupUser(event)} className='button hidden'>
            Sign up
          </button>
        </form>
      </div>
    </div>
  );
}
