import { useState } from 'react';
import Image from 'next/image';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/router';
import { FormInput } from './FormInput';
import { ValidateSignUp } from '../../helpers/Validate';
import { Spinner } from '../Spinner';
import { BackgroundOverlayFullscreen as ClickToCloseMax } from '../BackgroundOverlay';

export default function SignUpComponent({ csrfToken, setPreviewSigning }) {
  const router = useRouter();
  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
    matchpassword: '',
    message: null,
  });
  const [formErrors, setFormErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [isValidated, setIsValidated] = useState(false);

  const signupUser = async (event) => {
    const passForm = form;
    event.preventDefault();
    if (Object.keys(ValidateSignUp(passForm)).length === 0) {
      setLoading(true);
      try {
        const res = await fetch('/api/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify({
            username: form.username,
            email: form.email,
            password: form.password,
            matchpassword: form.matchpassword,
          }),
        });
        let user = await res.json();
        if (user.message) {
          setForm({ ...form, message: user.message });
          setLoading(false);
        }
        if (user.message == 'success') {
          setLoading(false);
          let options = {
            redirect: false,
            email: form.email,
            password: form.password,
          };
          await signIn('credentials', options);
          router.push({
            pathname: '/success',
            query: {
              operation: 'signup',
            },
          });
        }
      } catch (error) {
        setLoading(false);
        console.error('failed', error);
      }
      return;
    }
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
    if (name === 'matchpassword') {
      return wert;
    }
    if (name === 'username') {
      return wert;
    }
    return;
  }
  const handleBeforeSignUpValidation = () => {
    const errors = ValidateSignUp(form);
    if (Object.keys(errors).length === 0) {
      setIsValidated(true);
      setFormErrors({});
    } else if (Object.keys(errors).length !== 0) {
      setFormErrors(errors);
      setIsValidated(false);
    }
  };
  return (
    <>
      <div className="searchFadein fixed inset-0 z-50 m-auto flex h-4/6 w-full flex-col shadow-xxl md:min-h-72 md:w-11/12 xl:w-6/12">
        <div className="grid h-screen w-full grid-cols-1 overflow-y-hidden sm:grid-cols-2">
          <div className="relative hidden h-full w-full sm:block">
            <Image
              className="h-full w-full"
              src="/images/Thumbnail-signup.jpg"
              layout="fill"
              objectFit="cover"
              alt="login-image"
            />
            <div className="flex h-full  items-center ">
              <div className="relative mx-auto flex w-64 flex-col gap-4 rounded-md bg-white/90 py-10 px-5 text-lg">
                <p>
                  <span className=" text-xl font-bold"> Sign up</span> and start looking for your needs. Compare
                  recording studios that help you produce your music or podcasts.
                </p>
                <p>
                  Or start listing your own studio or services to reach more cusomers in your area and help them compare
                  services and contacting you.
                </p>
              </div>
            </div>
          </div>
          <div className="flex h-full  w-full flex-col justify-center bg-white ">
            <form action="" autoComplete="off" noValidate className="form-login" onSubmit={signupUser}>
              <FormInput type="hidden" name="csrfToken" defaultValue={csrfToken} />
              <legend className="label-form text-xl ">Sign Up</legend>
              <FormInput
                divClass={'w-full '}
                beforeLabel={{
                  string: 'Username',
                  css: 'label-login ',
                }}
                className="input-login peer"
                type="text"
                id="username"
                placeholder="Username"
                name="username"
                required
                autoComplete="off"
                pattern="^([a-zA-Z-])([a-zA-Z-0-9!??????.\s]){3,19}$"
                errorMessage={'4-20 and (a-z,A-Z,0-9,!??????,.-)!'}
                value={form.username}
                onChange={handleChange}></FormInput>
              <span className="errormessage ">{formErrors.username}</span>
              <FormInput
                divClass={'w-full '}
                beforeLabel={{ string: 'Email adress', css: 'label-login' }}
                className="input-login peer"
                type="email"
                name="email"
                id="email"
                placeholder="Email"
                required
                autoComplete="off"
                pattern="^([^\s@]+@[^\s@]+\.[^\s@]+$)"
                errorMessage={'Not a valid email adress'}
                value={form.email}
                onChange={handleChange}
              />
              <span className="errormessage">{formErrors.email}</span>
              <FormInput
                password={'w-full'}
                beforeLabel={{ string: 'Password', css: 'label-login' }}
                className="input-login peer"
                name="password"
                id="password"
                placeholder="Password"
                required
                pattern="^([a-zA-Z-0-9-!??????#@.,-_]){8,60}$"
                errorMessage={'( a-z, A-Z, 0-9, ?????? #!,-@._ ) min 8 max 60 characters allowed!'}
                value={form.password}
                onChange={handleChange}
              />
              <span className="errormessage">{formErrors.password}</span>
              <FormInput
                password={'w-full mb-4'}
                className="input-login peer"
                name="matchpassword"
                id="matchpassword"
                placeholder="Confirm Password"
                required
                pattern={form.password}
                errorMessage={'Password is not matching!'}
                value={form.matchpassword}
                onChange={handleChange}
              />
              <span className="errormessage">{formErrors.matchpassword}</span>
              <p>{form.message}</p>
              {loading ? (
                <div className="mt-4">
                  <Spinner />
                </div>
              ) : (
                <>
                  {Object.keys(formErrors).length === 0 && !isValidated ? (
                    <button type="button" className="login-button" onClick={handleBeforeSignUpValidation}>
                      Check
                    </button>
                  ) : Object.keys(formErrors).length === 0 && isValidated ? (
                    <button className="login-button" disabled={loading} type="button" onClick={signupUser}>
                      Sign Up
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={handleBeforeSignUpValidation}
                      className="login-button"
                      disabled={loading}>
                      Check again
                    </button>
                  )}
                </>
              )}
              <div className="flex text-xs">
                <span className="pr-2 text-black">Already have an Account?</span>
                <button className="  underline" onClick={() => setPreviewSigning('signin')}>
                  Sign in here
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <ClickToCloseMax style={'bg-black/50 editModal   z-40 h-full'} onClick={() => handleClickToCloseModal()} />
    </>
  );
}
