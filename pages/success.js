import React, { useState } from "react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Lottie from "lottie-react";
import success from "../public/animations/success.json";
import Layout from "../components/Layout/Layout";

export default function Success() {
  const router = useRouter();
  const [isRedirecting, setIsRedirecting] = useState(false);
  const [content, setContent] = useState();
  const signupContent = { header: "Signing up", for: "Signup" };
  const createListingContent = { header: "adding your Studio", for: "Submitting" };

  function callRedirect() {
    setTimeout(() => {
      router.push("/");
    }, 5000);
  }

  useEffect(() => {
    setIsRedirecting(true);
    if (isRedirecting) {
      if (router.query.operation === "signup") {
        setContent(signupContent);
        callRedirect();
      } else if (router.query.operation === "createlisting") {
        setContent(createListingContent);
        callRedirect();
      } else {
        router.push("/");
      }
    }
    return;
  }, [isRedirecting, router.push.operation]);

  return (
    <div className='relative ml-5 h-screen'>
      <Lottie animationData={success} loop={true} className='fixed top-0 h-full' />
      <section className='fixed top-1/2 left-1/2 flex -translate-x-1/2 -translate-y-1/2  flex-col gap-5 rounded-xl p-6 shadow-lg '>
        <h1 className='h1'>
          Congratulations for <u> {content?.header}!</u>
        </h1>
        <p className='text-xl font-thin'>
          Tonstudio-Kleinanzeigen thanks you for <strong>{content?.for}!</strong> You are a truly
          valuable member of this platform.
        </p>
        <p>You will be redirected in 5 seconds...</p>
      </section>
    </div>
  );
}

Success.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
