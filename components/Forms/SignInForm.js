import React from 'react';
import Image from 'next/image';
import { signIn } from 'next-auth/react';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { FormInput } from './FormInput';
import Link from 'next/link';
export default function SignInComponent({ csrfToken }) {
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

    let options = { redirect: false, email, password };
    const res = await signIn('credentials', options);
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
    <div className="grid h-screen w-full grid-cols-1 sm:grid-cols-2">
      <div className="relative hidden sm:block">
        <Image
          className="h-full w-full"
          src="/images/Thumbnail-signin.jpg"
          layout="fill"
          objectFit="cover"
          alt="login-image"
        />
      </div>
      <div className="bg-primary flex flex-col justify-center ">
        <form action="" noValidate className="form-login" onSubmit={signinUser}>
          <FormInput type="hidden" name="csrfToken" defaultValue={csrfToken} />
          <legend className="label-form text-2xl ">Sign In</legend>
          <FormInput
            divClassAll={'w-full '}
            beforeLabel={{ string: 'Email adress', css: 'label-login' }}
            className="input-login peer"
            type="email"
            name="email"
            id="email"
            placeholder="Email"
            required
            pattern="^([^\s@]+@[^\s@]+\.[^\s@]+$)"
            errorMessage={'Not a valid email adress'}
            onChange={handleChange}
          />
          <FormInput
            divClassAll={'w-full'}
            beforeLabel={{ string: 'Password', css: 'label-login' }}
            className="input-login peer"
            type="password"
            name="password"
            id="password"
            placeholder="Password"
            required
            pattern="^([a-zA-Z-0-9-!äöü#@.,-_]){8,60}$"
            errorMessage={'( a-z, A-Z, 0-9, äöü #!,-@._ ) min 8 max 60 characters allowed!'}
            onChange={handleChange}
          />
          <p className="errormessage">{form.message}</p>
          <button className="login-button" type="submit">
            Sign In
          </button>
          <div className="flex">
            <span className="pr-2 text-sm text-black">Need an account?</span>
            <Link href="/signup">
              <a className=" text-sm underline">Sign up right here</a>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
