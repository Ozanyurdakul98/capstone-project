import React, { useState } from "react";
import SearchBar from "./SearchBar";
import {
  GlobeAsiaAustraliaIcon,
  PlusIcon,
  HomeIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import Logo from "./Logo";
import { useSession } from "next-auth/react";
import { HeaderUsermenu } from "./HeaderUsermenu";
import { HeaderPagemenu } from "./HeaderPagemenu";
import { HeaderSignupButton } from "./HeaderSignupButton";
import { HeaderSigninButton } from "./HeaderSigninButton";
import SignUpComponent from "./Forms/SignUpFormModal";
import SignInComponent from "./Forms/SignInFormModal";
import { useRouter } from "next/router";
function Header() {
  const [previewSigning, setPreviewSigning] = useState("");
  const { data: session, status } = useSession();
  const router = useRouter();
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
          <HeaderUsermenu
            setPreviewSigning={setPreviewSigning}
            session={session}
            status={status}
          />
          {/* SigninSignupButtons */}
          {status === "unauthenticated" ? (
            <div className='hidden gap-2 text-sm md:ml-3 md:flex lg:ml-0 lg:text-sm'>
              <HeaderSigninButton setPreviewSigning={setPreviewSigning} />
              <HeaderSignupButton setPreviewSigning={setPreviewSigning} />
            </div>
          ) : null}
        </div>
      </nav>
      {/* Modals */}
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
