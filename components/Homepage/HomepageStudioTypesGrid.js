import { MyLink } from '../MyLink';

export function HomepageStudioTypesGrid() {
  const links = [
    {
      header: 'Home Studio',
      p1: 'The Studio equipment serves its purpose. It has already some (private) customers/projects.',
      p2: 'The studio is in the lower price segment',
      link: '/studiotype/home-studio',
      btn: 'Home Studio',
    },
    {
      header: 'Medium Studio',
      p1: 'The Studio has good facilities. There is already a greater customer experience experience and good references.',
      p2: 'The studio is in the middle price segment',
      link: '/studiotype/medium-studio',
      btn: 'Medium Studio',
    },
    {
      header: 'Premium Studio',
      p1: 'Studios with premium equipment, atmospheric rooms and many extras. The studio has many years of experience and top references.',
      p2: 'The studio is in the upper price segment',
      link: '/studiotype/premium-studio',
      btn: 'Premium Studio',
    },
  ];
  return (
    <div className="mb-40 flex flex-col gap-10 px-2">
      <div className="px-5">
        <h2 className="h2 ">Studio Types</h2>
      </div>
      <section className="grid grid-cols-2 gap-5 md:grid-cols-3">
        {links.map((link) => (
          <article key={link.header} className="flex justify-center">
            <div className="bg-primary flex max-w-sm flex-col justify-between rounded-lg p-6 text-white shadow-lg">
              <div>
                <h3 className=" h3 mb-2 text-sm font-medium text-white md:text-lg">{link.header}</h3>
                <p className=" mb-4 text-xs  md:text-base">
                  {link.p1}
                  <br />
                  {link.p2}
                </p>
              </div>
              <MyLink
                type="button"
                href={link.link}
                className=" bg-secondary inline-block rounded-xl px-6 py-2.5 text-xs font-medium uppercase leading-tight text-white shadow-md transition duration-150 ease-in-out hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg">
                {link.btn}
              </MyLink>
            </div>
          </article>
        ))}
      </section>
    </div>
  );
}
