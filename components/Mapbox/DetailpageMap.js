import { useState } from 'react';
import Map, { Marker, NavigationControl, ScaleControl } from 'react-map-gl';
import getCenter from 'geolib/es/getCenter';
import { useMemo } from 'react';

export function DetailpageMap({ results, style, mapFor }) {
  const coordinates =
    mapFor === 'studios'
      ? results.map((result) => result.studioLocation.geolocation)
      : mapFor === 'studioServices'
      ? results.map((result) => result.studio.studioLocation.geolocation)
      : null;
  const center = getCenter(coordinates);
  const [selectedListing, setSelectedListing] = useState(null);
  const [viewport, setViewport] = useState({
    longitude: center.longitude,
    latitude: center.latitude,
    zoom: 15.5,
  });
  console.log(selectedListing);

  const pins = useMemo(
    () =>
      results.map((result) => (
        <Marker
          key={result._id}
          longitude={
            mapFor === 'studios'
              ? result.studioLocation.geolocation[0]
              : mapFor === 'studioServices'
              ? result.studio.studioLocation.geolocation[0]
              : null
          }
          latitude={
            mapFor === 'studios'
              ? result.studioLocation.geolocation[1]
              : mapFor === 'studioServices'
              ? result.studio.studioLocation.geolocation[1]
              : null
          }
          anchor="bottom"
          offsetTop={-10}
          offsetLeft={-20}>
          <p
            role="img"
            aria-label="push-pin"
            onClick={(e) => {
              e.stopPropagation();
              setSelectedListing(result);
            }}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-12 w-12">
              <path
                fillRule="evenodd"
                d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 00-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z"
                clipRule="evenodd"
              />
            </svg>
          </p>
        </Marker>
      )),
    []
  );

  return (
    <Map
      // initialViewState={{}}
      {...viewport}
      style={style}
      mapStyle="mapbox://styles/hayvanadi98/clc0wi3k9003v14nyhgdcytq1"
      mapboxAccessToken={process.env.mapbox_key}
      onMove={(evt) => setViewport(evt.viewState)}
      renderWorldCopies={false}
      doubleClickZoom={false}
      interactive={false}
      attributionControl={false}
      dragRotate={false}
      dragPan={false}
      keyboard={false}
      reuseMaps={false}
      trackResize={true}>
      <NavigationControl position="top-left" showCompass={false} visualizePitch={false} />
      <ScaleControl style={{ border: 'none' }} />
      {pins}
    </Map>
  );
}
