import { getCenter } from 'geolib';
import { useEffect, useState } from 'react';
import useSupercluster from 'use-supercluster';
import { isMultiple } from '../../utils';
import { ResultpageMap } from '../Mapbox/ResultpageMap';
import ListingCardWideStudioService from './ListingCardWideStudioService';

export function ResultpageStudioservices(props) {
  const coordinates = props.studioServices.map((result) => result.studio.studioLocation.geolocation);
  const center = getCenter(coordinates);
  const [bounds, setBounds] = useState([-180, -85, 180, 85]);
  const [viewport, setViewport] = useState({
    longitude: center.longitude,
    latitude: center.latitude,
    zoom: 5.5,
  });
  const [points, setPoints] = useState(
    props.studioServices.map((result) => ({
      type: 'Feature',
      properties: {
        cluster: false,
        studioId: result.studio._id,
        studio: result.studio,
        result: result,
      },
      geometry: {
        type: 'Point',
        coordinates: result.studio.studioLocation.geolocation,
      },
    }))
  );

  const [Clusters, setClusters] = useState([]);
  const { clusters, supercluster } = useSupercluster({
    points,
    bounds,
    zoom: viewport.zoom,
    options: { radius: 75, maxZoom: 20 },
  });
  console.log('cluster!', clusters);
  useEffect(() => {
    setClusters(clusters);
  }, [clusters, supercluster]);

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
        <section className="mb-10 h-96 w-full lg:sticky lg:top-[0.5rem] lg:mt-2 lg:h-[34rem] lg:max-w-[400px] lg:px-2 xl:max-w-[500px]">
          <ResultpageMap
            mapFor={'studioServices'}
            results={props.studioServices}
            style={{ width: '100%', height: '100%', borderRadius: '10px' }}
            Clusters={Clusters}
            setClusters={setClusters}
            clusters={clusters}
            supercluster={supercluster}
            viewport={viewport}
            setViewport={setViewport}
            points={points}
            setPoints={setPoints}
            setBounds={setBounds}
          />
        </section>
      ) : null}
    </div>
  );
}
