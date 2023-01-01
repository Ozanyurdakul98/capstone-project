import { isMultiple } from '../../utils';
import { ResultpageMap } from '../Mapbox/ResultpageMap';
import ListingCardWideStudioService from './ListingCardWideStudioService';
import { useSelector } from 'react-redux';

export function ResultpageStudioservices(props) {
  const results = useSelector((state) => state.searchStudioService.results);

  return (
    <div className="relative mb-20 flex flex-col-reverse lg:flex-row">
      <section className={`flex grow flex-col ${results.length >= 1 ? 'lg:mt-20' : 'mt-20'}`}>
        <section>
          <h1 className="h2">{props.header}</h1>
          <p className="pl-5 text-xs">
            {props.count} Studioservice{isMultiple(props.count)} found
          </p>
        </section>
        <section className="min-h-screen w-full">
          {results.map(
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
      {results.length >= 1 ? (
        <section className="mb-10 h-96 w-full lg:sticky lg:top-[0.5rem] lg:mt-2 lg:h-[34rem] lg:max-w-[400px] lg:px-2 xl:max-w-[500px]">
          <ResultpageMap mapFor={'studioServices'} style={{ width: '100%', height: '100%', borderRadius: '10px' }} />
        </section>
      ) : null}
    </div>
  );
}
