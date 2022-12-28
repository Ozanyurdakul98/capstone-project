import { isMultiple } from '../../utils';
import { ResultpageMap } from '../Mapbox/ResultpageMap';
import ListingCardWideStudio from './ListingCardWideStudio';

export function ResultpageStudios(props) {
  return (
    <div className="relative mb-20 flex flex-col-reverse lg:flex-row">
      <section className={`flex grow flex-col ${props.studios.length >= 1 ? 'lg:mt-20' : 'mt-20'}`}>
        <section>
          <h1 className="h2">{props.header}</h1>
          <p className="pl-5 text-xs">
            {props.count} Studio{isMultiple(props.count)} found
          </p>
        </section>
        <section className="min-h-screen w-full">
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
        </section>
      </section>
      {props.studios.length >= 1 ? (
        <section className="mb-10 h-80 w-full lg:sticky lg:top-[0.5rem] lg:mt-2 lg:h-[34rem] lg:max-w-[400px] lg:px-2 xl:max-w-[500px]">
          <ResultpageMap
            mapFor={'studios'}
            results={props.studios}
            style={{ width: '100%', height: '100%', borderRadius: '10px' }}
          />
        </section>
      ) : null}
    </div>
  );
}
