import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { redirect } from 'next/dist/server/api-utils';
import { useEffect } from 'react';
import Lottie from 'lottie-react';
import success from '../public/animations/success.json';

export default function Success() {
  const router = useRouter();
  const [createListing, setCreateListing] = useState(false);
  const [signup, setSignup] = useState(false);
  const [isRedirecting, setIsRedirecting] = useState(false);
  const [content, setContent] = useState();
  const signupContent = { header: 'Signing up', for: 'Signup' };
  const createListingContent = { header: 'Signing up', for: 'Submitting' };

  function callRedirect() {
    setTimeout(() => {
      router.push('/');
    }, 5000);
  }

  useEffect(() => {
    setIsRedirecting(true);
    if (isRedirecting) {
      if (router.query.operation === 'signup') {
        setSignup(true);
        setContent(signupContent);
        callRedirect();
      } else if (router.query.operation === 'createlisting') {
        setCreateListing(true);
        setContent(createListingContent);
        callRedirect();
      } else {
        router.push('/');
      }
    }
    return;
  }, [isRedirecting, router.push.operation]);

  return (
    <div className='relative ml-5 h-screen'>
      <h1 className='h1'>
        Congratulations for <u> {content?.header}!</u>
      </h1>
      <Lottie animationData={success} loop={true} className='fixed top-0 h-full' />
      <section className='fixed top-1/2 left-1/2 flex -translate-x-1/2 -translate-y-1/2  transform flex-col gap-5 rounded-xl p-6 shadow-lg '>
        <p className='text-xl font-thin'>
          Tonstudio-Kleinanzeigen thanks you for <strong>{content?.for}!</strong> You are a truly valuable member of
          this platform.
        </p>
        <p>You will be redirected in 5 seconds...</p>
      </section>
    </div>
  );
}
