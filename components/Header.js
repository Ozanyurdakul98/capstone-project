import React, { useEffect, useState } from "react";
import SearchBar from "./SearchBar";
import {
  GlobeAsiaAustraliaIcon,
  PlusIcon,
  HomeIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import Logo from "./Logo";
import { useSession } from "next-auth/react";
import { MyLink } from "./MyLink";
import { FaBuilding } from "react-icons/fa";
import { HeaderUsermenu } from "./HeaderUsermenu";
import { HeaderPagemenu } from "./HeaderPagemenu";
import { HeaderSignupButton } from "./HeaderSignupButton";
import { HeaderSigninButton } from "./HeaderSigninButton";
import { getSession } from "next-auth/react";
import SignUpComponent from "./Forms/SignUpFormModal";
import SignInComponent from "./Forms/SignInFormModal";
import { Router, useRouter } from "next/router";
function Header() {
  const [previewSigning, setPreviewSigning] = useState("");
  const { data: session, status } = useSession();
  const router = useRouter();
  console.log(status);
  useEffect(() => {
    async function myFunction() {
      const session = await getSession();
      const userEmail = session;
      try {
        return;
      } catch (error) {
        console.error(error);
      }
    }
    // myFunction();
  }, []);
  return (
    <header id='top' className='relative z-50'>
      <nav className='grid grid-cols-sm3 bg-white py-2 px-2 shadow-md md:px-4 md:pt-4 md:pb-2 lg:grid-cols-3'>
        {/* Left */}
        <div className='flex  flex-auto items-center'>
          {/* Logo */}
          <Link href='/'>
            <div
              title='Go to Home'
              className='relative hidden cursor-pointer sm:flex sm:items-center'>
              <Logo width={"45px"} height={"45px"} />
            </div>
          </Link>
          <HeaderPagemenu />
        </div>
        {/* middle */}
        <SearchBar />
        {/* Righth */}
        <div className='flex flex-1 items-center justify-end'>
          <div className='mx-6 hidden items-center space-x-2 text-gray-500 lg:inline-flex xl:mx-6'>
            <Link href='/search/all'>
              <GlobeAsiaAustraliaIcon
                title='show all studios'
                className='icon'
              />
            </Link>
            <hr className='h-10 border border-gray-100' />
            <button
              title='add a studio'
              className='icon-header disabled:cursor-default disabled:text-gray-500/50'
              disabled={status === "loading" || status === "unauthenticated"}
              onClick={() => router.push("/dashboard/addstudio")}>
              <PlusIcon />
            </button>
            <button
              title='add a studio'
              className='icon-header disabled:cursor-default disabled:text-gray-500/50'
              disabled={status === "loading" || status === "unauthenticated"}
              onClick={() => router.push("/dashboard")}>
              <HomeIcon />
            </button>
          </div>
          {/* HeaderUsermenu */}
          <div className='md:hidden'>
            <HeaderUsermenu
              setPreviewSigning={setPreviewSigning}
              session={session}
            />
          </div>
          {status === "authenticated" ? (
            <HeaderUsermenu
              setPreviewSigning={setPreviewSigning}
              session={session}
            />
          ) : null}
          {/* SigninSignupButtons */}
          {status === "unauthenticated" ? (
            <div className='hidden gap-2 text-sm md:ml-3 md:flex lg:ml-0 lg:text-sm'>
              <HeaderSigninButton setPreviewSigning={setPreviewSigning} />
              <HeaderSignupButton setPreviewSigning={setPreviewSigning} />
            </div>
          ) : null}
        </div>
      </nav>
      {previewSigning === "signin" ? (
        <SignInComponent setPreviewSigning={setPreviewSigning} />
      ) : null}
      {previewSigning === "signup" ? (
        <SignUpComponent setPreviewSigning={setPreviewSigning} />
      ) : null}
    </header>
  );
}

export default Header;
