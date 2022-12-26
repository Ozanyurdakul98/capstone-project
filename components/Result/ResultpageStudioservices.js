import { isMultiple } from '../../utils';
import { ReactMapGl } from '../Mapbox/ReactMapGl';
import ListingCardWideStudioService from './ListingCardWideStudioService';

export function ResultpageStudioservices(props) {
  console.log(props.studioServices);
  return (
    <div className="relative mb-20 flex flex-col-reverse lg:flex-row">
      <section className={`flex grow flex-col ${props.studioServices.length >= 1 ? 'lg:mt-20' : 'mt-20'}`}>
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
      {props.studioServices.length >= 1 ? (
        <section className="mb-10 h-80 w-full lg:sticky lg:top-[0.5rem] lg:mt-2 lg:h-[34rem] lg:max-w-[400px] lg:px-2 xl:max-w-[500px]">
          <ReactMapGl results={props.studioServices} style={{ width: '100%', height: '100%', borderRadius: '10px' }} />
        </section>
      ) : null}
    </div>
  );
}
