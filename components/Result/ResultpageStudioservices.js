import { isMultiple } from '../../utils';
import Map from '../Mapbox/Map';
import ListingCardWideStudioService from './ListingCardWideStudioService';

export function ResultpageStudioservices(props) {
  return (
    <div className="my-20">
      <section>
        <h1 className="h2">{props.header}</h1>
        <p className="pl-5 text-xs">
          {props.count} Studioservice{isMultiple(props.count)} found
        </p>
      </section>
      <section className="mt-5 min-h-screen">
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
      <section>
        <Map />
      </section>
    </div>
  );
}
