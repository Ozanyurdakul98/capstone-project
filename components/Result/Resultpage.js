import ListingCards from '../../components/ListingCardWide';

export function Resultpage(props) {
  return (
    <div className="my-20">
      <div>
        <h1 className="h2">{props.header}</h1>
      </div>
      <div className="mt-5">
        {props.studios.map(
          ({
            _id,
            listingTitle,
            images,
            studiotype,
            studioService,
            soundengineer,
            studioPricing,
            locationFeatures,
            studioLocation,
          }) => (
            <ListingCards
              key={_id}
              listingTitle={listingTitle}
              images={images}
              studiotype={studiotype}
              studioService={studioService}
              soundengineer={soundengineer}
              studioPricing={studioPricing}
              locationFeatures={locationFeatures}
              studioLocation={studioLocation}></ListingCards>
          )
        )}
      </div>
    </div>
  );
}
