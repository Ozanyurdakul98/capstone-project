import Image from 'next/image';
import Link from 'next/link';

export function HomepageBanner() {
  return (
    <section className='relative '>
      <div className='relative grid h-screen w-full '>
        <Image
          src='/images/Banner-homepage1.jpg'
          objectPosition='top'
          layout='fill'
          objectFit='cover'
          alt='login-image'
        />
      </div>
      <div className='absolute top-1/2 left-1/2 w-80 -translate-x-1/2 -translate-y-1/2 transform rounded-lg bg-white/90 py-10 px-6 font-thin md:left-1/3 lg:left-1/3 lg:text-lg xl:text-xl'>
        <h2 className='label-form text-sm'>Studio owners are benefiting</h2>
        <p className='mb-4'>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam ipsa ipsam est quo atque quaerat veritatis
          expedita adipisci soluta, ab veniam delectus sequi, ipsum accusantium explicabo non laudantium facere commodi.
        </p>
        <p>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Libero quas officiis accusamus corporis odio
          voluptatem quidem iure earum, cupiditate voluptates consequatur. Vero architecto amet provident delectus,
          similique consequuntur harum blanditiis incidunt distinctio libero omnis ullam sapiente cumque.
        </p>
        <Link href='/signup'>
          <button className=' button mt-4 text-base font-semibold'>Become a Host</button>
        </Link>
      </div>
    </section>
  );
}
