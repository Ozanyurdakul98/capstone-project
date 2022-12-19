import ListingCardWideStudioService from './ListingCardWideStudioService';

export function ResultpageStudioservices(props) {
  return (
    <div className="my-20">
      <div>
        <h1 className="h2">{props.header}</h1>
      </div>
      <div className="mt-5">
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
      </div>
    </div>
  );
}
