import Image from 'next/image';
import { signIn } from 'next-auth/react';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { FormInput } from './FormInput';
import { BackgroundOverlayFullscreen as ClickToCloseMax } from '../BackgroundOverlay';

export default function SignInComponent({ csrfToken, setPreviewSigning }) {
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
    return router.push('/dashboard');
  };
  const handleClickToCloseModal = () => {
    setPreviewSigning('');
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
    <>
      <div className="searchFadein fixed inset-0 z-50 m-auto flex h-4/6 w-full flex-col shadow-xxl md:min-h-72 md:w-11/12 xl:w-6/12">
        <div className=" grid h-screen w-full grid-cols-1 sm:grid-cols-2">
          <div className="relative hidden sm:block">
            <Image
              className="h-full w-full"
              src="/images/Thumbnail-signin.jpg"
              layout="fill"
              objectFit="cover"
              alt="login-image"
            />
          </div>
          <div className="flex flex-col justify-center bg-white ">
            <form action="" noValidate className="form-login" onSubmit={signinUser}>
              <FormInput type="hidden" name="csrfToken" defaultValue={csrfToken} />
              <legend className="label-form text-2xl ">Sign In</legend>
              <FormInput
                divClass={'w-full '}
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
                password={'w-full mb-4'}
                beforeLabel={{ string: 'Password', css: 'label-login' }}
                className="input-login peer"
                name="password"
                id="password"
                placeholder="Password"
                required
                pattern="^([a-zA-Z-0-9-!??????#@.,-_]){8,60}$"
                errorMessage={'( a-z, A-Z, 0-9, ?????? #!,-@._ ) min 8 max 60 characters allowed!'}
                onChange={handleChange}
              />
              <p className="errormessage">{form.message}</p>
              <button className="login-button" type="submit">
                Sign In
              </button>
              <div className="flex text-xs">
                <span className="pr-2 text-black">Need an account?</span>
                <button className="  underline" onClick={() => setPreviewSigning('signup')}>
                  Sign up here
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <ClickToCloseMax style={'bg-black/50 editModal z-40 h-full'} onClick={() => handleClickToCloseModal()} />
    </>
  );
}
