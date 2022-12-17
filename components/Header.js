import { useState } from 'react';
import SearchBar from './SearchBar';
import { GlobeAsiaAustraliaIcon, PlusIcon, HomeIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import Logo from './Logo';
import { useSession } from 'next-auth/react';
import { HeaderUsermenu } from './HeaderUsermenu';
import { HeaderPagemenu } from './HeaderPagemenu';
import { HeaderSignupButton } from './HeaderSignupButton';
import { HeaderSigninButton } from './HeaderSigninButton';
import SignUpComponent from './Forms/SignUpFormModal';
import SignInComponent from './Forms/SignInFormModal';
import { MyLink } from './MyLink';
function Header() {
  const [previewSigning, setPreviewSigning] = useState('');
  const { data: session, status } = useSession();
  return (
    <header id="top" className="relative z-50">
      <nav className="grid grid-cols-sm3 bg-white p-2 shadow-md md:px-4 md:pt-4 md:pb-2 lg:grid-cols-smbgbg">
        {/* Left */}
        <div className="flex  flex-auto items-center">
          {/* Logo */}
          <Link href="/">
            <div title="Go to Home" className="relative hidden cursor-pointer sm:flex sm:items-center">
              <Logo width={'45px'} height={'45px'} />
            </div>
          </Link>
          <HeaderPagemenu />
        </div>
        {/* middle */}
        <SearchBar />
        {/* Righth */}
        <div className="flex flex-1 items-center justify-end">
          <div className="mx-6 hidden items-center text-gray-500 lg:inline-flex ">
            <button type="button" className="">
              <MyLink className="cursor-default" href="/search/all">
                <GlobeAsiaAustraliaIcon title="show all studios" className="icon" />
              </MyLink>
            </button>
            <hr className="h-10 border border-gray-100" />
            <button type="button" title="go to dashboard" className="icon-header cursor-default ">
              <MyLink href={`${status === 'loading' || status === 'unauthenticated' ? '/#' : '/dashboard/addstudio'}`}>
                <PlusIcon
                  className={`icon ${
                    status === 'loading' || status === 'unauthenticated' ? ' cursor-default text-gray-500' : ''
                  }`}
                />
              </MyLink>
            </button>
            <button type="button" title="go to dashboard" className="icon-header cursor-default ">
              <MyLink href={`${status === 'loading' || status === 'unauthenticated' ? '/#' : '/dashboard'}`}>
                <HomeIcon
                  className={`icon ${
                    status === 'loading' || status === 'unauthenticated' ? ' cursor-default text-gray-500' : ''
                  }`}
                />
              </MyLink>
            </button>
          </div>
          {/* HeaderUsermenu */}
          <HeaderUsermenu setPreviewSigning={setPreviewSigning} session={session} status={status} />
          {/* SigninSignupButtons */}
          {status === 'unauthenticated' ? (
            <div className="hidden gap-2 text-sm md:ml-3 md:flex lg:ml-0 lg:text-sm">
              <HeaderSigninButton setPreviewSigning={setPreviewSigning} />
              <HeaderSignupButton setPreviewSigning={setPreviewSigning} />
            </div>
          ) : null}
        </div>
      </nav>
      {/* Modals */}
      {previewSigning === 'signin' ? <SignInComponent setPreviewSigning={setPreviewSigning} /> : null}
      {previewSigning === 'signup' ? <SignUpComponent setPreviewSigning={setPreviewSigning} /> : null}
    </header>
  );
}

export default Header;
