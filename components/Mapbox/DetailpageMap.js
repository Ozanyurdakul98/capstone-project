import { useState } from 'react';
import Map, { Marker, NavigationControl, ScaleControl } from 'react-map-gl';

export function DetailpageMap({ results, style, mapFor }) {
  const coordinates =
    mapFor === 'studios'
      ? results.studioLocation.geolocation
      : mapFor === 'studioServices'
      ? results.studio.studioLocation.geolocation
      : [0, 0];
  const [viewport, setViewport] = useState({
    longitude: coordinates[0],
    latitude: coordinates[1],
    zoom: 15.5,
  });

  return (
    <Map
      // initialViewState={{}}
      {...viewport}
      style={style}
      mapStyle="mapbox://styles/hayvanadi98/clc0wi3k9003v14nyhgdcytq1"
      mapboxAccessToken={process.env.mapbox_key}
      onMove={(evt) => setViewport(evt.viewState)}
      renderWorldCopies={false}
      doubleClickZoom={true}
      interactive={false}
      attributionControl={false}
      dragRotate={false}
      dragPan={false}
      keyboard={false}
      reuseMaps={false}
      trackResize={true}>
      <NavigationControl position="top-left" showCompass={false} visualizePitch={false} />
      <ScaleControl style={{ border: 'none' }} />
      <Marker
        key={results._id}
        longitude={coordinates[0]}
        latitude={coordinates[1]}
        anchor="bottom"
        offsetTop={-10}
        offsetLeft={-20}>
        <p role="img" aria-label="push-pin">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-12 w-12">
            <path
              fillRule="evenodd"
              d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 00-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z"
              clipRule="evenodd"
            />
          </svg>
        </p>
      </Marker>
    </Map>
  );
}
