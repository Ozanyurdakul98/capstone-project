import ListingCardWideStudio from '../../components/Result/ListingCardWideStudio';

export function Resultpage(props) {
  return (
    <div className="my-20">
      <div>
        <h1 className="h2">{props.header}</h1>
      </div>
      <div className="mt-5">
        {console.log(props.studios)}
        {props.studios.map(
          ({
            _id,
            logo,
            studioName,
            profileText,
            studiotype,
            studioInformation,
            studioLanguages,
            openingHours,
            locationFeatures,
            studioLocation,
            user,
          }) => (
            <ListingCardWideStudio
              key={_id}
              id={_id}
              path={props.path}
              studioName={studioName}
              logo={logo}
              studiotype={studiotype}
              profileText={profileText}
              studioInformation={studioInformation}
              studioLanguages={studioLanguages}
              openingHours={openingHours}
              locationFeatures={locationFeatures}
              user={user}
              studioLocation={studioLocation}></ListingCardWideStudio>
          )
        )}
      </div>
    </div>
  );
}
