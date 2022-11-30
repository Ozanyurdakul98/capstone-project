import Image from 'next/image';
import Link from 'next/link';

export function HomepageBanner() {
  return (
    <section className="relative mb-40 grid h-[550px] grid-cols-2 lg:h-[750px] lg:gap-20">
      <div className="flex justify-end md:w-full">
        <div className="h-full w-full sm:relative md:w-80 lg:w-[500px]">
          <Image
            className="rounded-xl sm:rounded-r-none lg:rounded-r-xl"
            src="/images/Banner-homepage1.jpg"
            objectPosition="top"
            layout="fill"
            objectFit="cover"
            alt="login-image"
          />
        </div>
      </div>
      <div className="absolute top-1/2 left-1/2 w-80  -translate-x-1/2 -translate-y-1/2 rounded-xl bg-white/90 py-10 px-6 font-thin sm:static sm:transform-none sm:rounded-l-none lg:rounded-l-xl lg:text-lg xl:text-xl">
        <h2 className="h3">Studio owners are benefiting</h2>
        <p className="mb-4">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam ipsa ipsam est quo atque quaerat veritatis
          expedita adipisci soluta, ab veniam delectus sequi, ipsum accusantium explicabo non laudantium facere commodi.
        </p>
        <p>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Libero quas officiis accusamus corporis odio
          voluptatem quidem iure earum, cupiditate voluptates consequatur. Vero architecto amet provident delectus,
          similique consequuntur harum blanditiis incidunt distinctio libero omnis ullam sapiente cumque.
        </p>
        <Link href="/signup">
          <button className="landingpage-buttons mt-5">Become a Host</button>
        </Link>
      </div>
    </section>
  );
}
