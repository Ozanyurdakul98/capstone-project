import Link from 'next/link';
import Lottie from 'lottie-react';
import musicStudio1 from '../../public/animations/musicStudio1.json';

export function HomepageHero() {
  return (
    <section className="m-auto mb-20 mt-4 flex flex-col-reverse items-center justify-center px-4 pb-1 md:flex-row lg:gap-10 xl:gap-40">
      <div className="max-h-min max-w-md rounded-3xl bg-white p-2 px-10 pb-10 font-thin shadow-inner sm:flex sm:flex-col sm:items-center  sm:bg-none  md:shadow-xl">
        <h1 className="mt-4 mb-2 text-4xl font-bold leading-tight ">Tonstudio-Kleinanzeigen</h1>
        <p className="text-sm lg:text-base">
          Is made for the recording studios, music producers and amateur musicians to offer the oppertunity for a free
          digital business card and therefore having more client traction and more efficient targetting.
        </p>
        <p className="pt-2 text-sm lg:text-base">
          Describe your services & studio and let the users decide by comparing your listing with others.
        </p>
        <Link href="/search/all">
          <button className=" button mt-4 text-sm font-normal lg:text-base">View all listings</button>
        </Link>
      </div>
      <div className=" min-w-[420px]">
        <Lottie animationData={musicStudio1} loop={true} className="" />
      </div>
    </section>
  );
}
