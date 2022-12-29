import { getCenter } from 'geolib';
import { useEffect, useState } from 'react';
import useSupercluster from 'use-supercluster';
import { isMultiple } from '../../utils';
import { ResultpageMap } from '../Mapbox/ResultpageMap';
import ListingCardWideStudio from './ListingCardWideStudio';

export function ResultpageStudios(props) {
  const coordinates = props.studios.map((result) => result.studioLocation.geolocation);
  const center = getCenter(coordinates);
  const [bounds, setBounds] = useState([-180, -85, 180, 85]);
  const [viewport, setViewport] = useState({
    longitude: center.longitude,
    latitude: center.latitude,
    zoom: 5.5,
  });
  const [points, setPoints] = useState(
    props.studios.map((result) => ({
      type: 'Feature',
      properties: {
        cluster: false,
        studioId: result._id,
        studio: result,
        result: result,
      },
      geometry: {
        type: 'Point',
        coordinates: result.studioLocation.geolocation,
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
