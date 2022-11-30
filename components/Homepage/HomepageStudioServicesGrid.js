import { useRouter } from 'next/router';

export function HomepageStudioServicesGrid(props) {
  const router = useRouter();

  return (
    <div className="mb-40 flex flex-col gap-10 px-2">
      <div className="px-5">
        <h2 className="h2">Studio services</h2>
      </div>
      <section className="grid grid-cols-2 gap-5 md:grid-cols-3">
        {props.studioServices.map((service) => (
          <article key={service.id} className="flex justify-center">
            <div className="max-w-sm rounded-lg bg-white shadow-lg">
              <a href="#!">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img className="rounded-t-lg" src={service.image} alt="" />
              </a>
              <div className="p-6">
                <h5 className=" h3 mb-2 text-sm font-medium md:text-lg">{service.name}</h5>
                <p className=" mb-4 text-xs text-gray-700 line-clamp-3 md:text-base">{service.description}</p>
                <button
                  type="button"
                  onClick={() =>
                    router.push({
                      pathname: `/studioservice/${service.queryString}`,
                    })
                  }
                  className="landingpage-buttons">
                  Show me
                </button>
              </div>
            </div>
          </article>
        ))}
      </section>
    </div>
  );
}
