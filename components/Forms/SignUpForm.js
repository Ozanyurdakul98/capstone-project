import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/router';
import { FormInput } from './FormInput';
import { ValidateSignUp } from '../../helpers/Validate';
import { Spinner } from '../Spinner';

export default function SignUpComponent({ csrfToken }) {
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
    setFormErrors(ValidateSignUp(passForm));
    if (Object.keys(formErrors).length === 0) {
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
    <div className="grid h-screen w-full grid-cols-1 overflow-y-hidden sm:grid-cols-2">
      <div className="relative hidden sm:block">
        <Image
          className="relative h-full w-full"
          src="/images/Thumbnail-signup.jpg"
          layout="fill"
          objectFit="cover"
          alt="login-image"
        />
        <div className="mt-32 flex h-full  items-center ">
          <div className="relative mx-auto flex min-h-80 w-80 flex-col gap-4 rounded-md bg-white/90 py-10 px-5 text-xl">
            <p>
              <span className=" text-2xl font-bold"> Sign up</span> and start looking for your needs. Compare recording
              studios that help you produce your music or podcasts.
            </p>
            <p>
              Or start listing your own studio or services to reach more cusomers in your area and help them compare
              services and contacting you.
            </p>
          </div>
        </div>
      </div>
      <div className="bg-primary flex flex-col justify-center ">
        <form action="" autoComplete="off" noValidate className="form-login" onSubmit={signupUser}>
          <FormInput type="hidden" name="csrfToken" defaultValue={csrfToken} />
          <legend className="label-form text-2xl ">Sign Up</legend>
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
            pattern="^([a-zA-Z-])([a-zA-Z-0-9!äöü.\s]){3,19}$"
            errorMessage={'4-20 and (a-z,A-Z,0-9,!äöü,.-)!'}
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
            divClass={'w-full'}
            beforeLabel={{ string: 'Password', css: 'label-login' }}
            className="input-login peer"
            type="password"
            name="password"
            id="password"
            placeholder="Password"
            autoComplete="off"
            required
            pattern="^([a-zA-Z-0-9-!äöü#@.,-_]){8,60}$"
            errorMessage={'( a-z, A-Z, 0-9, äöü #!,-@._ ) min 8 max 60 characters allowed!'}
            value={form.password}
            onChange={handleChange}
          />
          <span className="errormessage">{formErrors.password}</span>
          <FormInput
            divClass={'w-full'}
            beforeLabel={{ string: 'Confirm Password', css: 'label-login' }}
            className="input-login peer"
            type="password"
            name="matchpassword"
            id="matchpassword"
            placeholder="Confirm Password"
            autoComplete="off"
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
          <div className="flex">
            <span className="pr-2 text-sm text-black">Already have an account?</span>
            <Link href="/signin">
              <a className="text-sm underline">Log in right here</a>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
