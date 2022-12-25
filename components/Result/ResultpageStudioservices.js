import { isMultiple } from '../../utils';
import { ReactMapGl } from '../Mapbox/ReactMapGl';
import ListingCardWideStudioService from './ListingCardWideStudioService';

export function ResultpageStudioservices(props) {
  return (
    <div className="mb-20 flex flex-col lg:gap-2">
      {/* Map */}
      {/* <section className=" lg:hidden lg:h-96">
        <ReactMapGl results={props.studioServices} />
      </section> */}
      <section className="flex flex-col">
        <section>
          <h1 className="h2">{props.header}</h1>
          <p className="pl-5 text-xs">
            {props.count} Studioservice{isMultiple(props.count)} found
          </p>
        </section>
        <section className="min-h-screen w-full">
          {props.studioServices.map(
            ({ _id, listingTitle, description, service, maxGuests, images, user, soundengineer, pricing, studio }) => (
              <ListingCardWideStudioService
                key={_id}
                id={_id}
                listingTitle={listingTitle}
                images={images}
                service={service}
                maxGuests={maxGuests}
                description={description}
                soundengineer={soundengineer}
                pricing={pricing}
                studio={studio}
                user={user}
              />
            )
          )}
        </section>
      </section>
      <section className="mb-10 inline-flex h-80 w-full px-2 lg:inline-flex lg:max-h-[600px] lg:min-w-[400px] xl:min-w-[500px]">
        <ReactMapGl results={props.studioServices} style={{ width: '100%', height: '100%', borderRadius: '10px' }} />
      </section>
    </div>
  );
}
