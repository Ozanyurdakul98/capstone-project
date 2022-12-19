import { isMultiple } from '../../utils';
import ListingCardWideStudio from './ListingCardWideStudio';

export function ResultpageStudios(props) {
  return (
    <div className="my-20">
      <div>
        <h1 className="h2">{props.header}</h1>
        <p className="pl-5 text-xs">
          {props.count} Studio{isMultiple(props.count)} found
        </p>
      </div>
      <div className="mt-5 min-h-screen">
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
              studioName={studioName}
              logo={logo}
              studiotype={studiotype}
              profileText={profileText}
              studioInformation={studioInformation}
              studioLanguages={studioLanguages}
              openingHours={openingHours}
              locationFeatures={locationFeatures}
              user={user}
              studioLocation={studioLocation}
            />
          )
        )}
      </div>
    </div>
  );
}
