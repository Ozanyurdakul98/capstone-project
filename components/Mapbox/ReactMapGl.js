import { useState } from 'react';
import Map, { Marker, Popup, NavigationControl, GeolocateControl, FullscreenControl, ScaleControl } from 'react-map-gl';
import getCenter from 'geolib/es/getCenter';
import { useMemo } from 'react';

export function ReactMapGl({ results }) {
  const coordinates = results.map((result) => result.studio.studioLocation.geolocation);
  const center = getCenter(coordinates);
  const [selectedListing, setSelectedListing] = useState(null);
  const [viewport, setViewport] = useState({
    longitude: center.longitude,
    latitude: center.latitude,
    zoom: 10.5,
  });

  const pins = useMemo(
    () =>
      results.map((result) => (
        <Marker
          key={result._id}
          longitude={result.studio.studioLocation.geolocation[0]}
          anchor="bottom"
          latitude={result.studio.studioLocation.geolocation[1]}
          offsetTop={-10}
          offsetLeft={-20}>
          <p
            role="img"
            aria-label="push-pin"
            onClick={(e) => {
              e.stopPropagation();
              setSelectedListing(result);
            }}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="h-6 w-6 animate-bounce cursor-pointer">
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
      style={{ width: 600, height: 400 }}
      mapStyle="mapbox://styles/hayvanadi98/clc0wi3k9003v14nyhgdcytq1"
      mapboxAccessToken={process.env.mapbox_key}
      onMove={(evt) => setViewport(evt.viewState)}
      renderWorldCopies={true}
      doubleClickZoom={true}
      interactive={true}
      attributionControl={false}
      cursor="grab"
      dragRotate={true}
      keyboard={true}
      reuseMaps={true}
      trackResize={true}
      // maxTileCacheSize={1000000000}
    >
      <GeolocateControl position="top-left" />
      <FullscreenControl position="top-left" />
      <NavigationControl position="top-left" /> <ScaleControl style={{ border: 'none' }} className="border-none" />
      {pins}
      {selectedListing && (
        <Popup
          onClose={() => setSelectedListing(null)}
          closeOnClick={true}
          anchor="top"
          longitude={selectedListing.studio.studioLocation.geolocation[0]}
          latitude={selectedListing.studio.studioLocation.geolocation[1]}>
          {selectedListing.listingTitle}
        </Popup>
      )}
    </Map>
  );
}
