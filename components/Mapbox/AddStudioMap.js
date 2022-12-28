import { useEffect, useRef, useState } from 'react';
import Map, { Marker, NavigationControl, GeolocateControl, FullscreenControl, ScaleControl } from 'react-map-gl';
import Geocoder from './Geocoder';

export function AddStudioMap({
  form,
  setForm,
  setShowFormExpanded,
  markerIsActive,
  onRetrieve,
  setMarkerIsActive,
  handleMarkerLocation,
  style,
}) {
  const [viewport, setViewport] = useState({
    longitude: 0,
    latitude: 0,
    zoom: 10.5,
  });
  const mapRef = useRef();
  useEffect(() => {
    if (!viewport.longitude && !viewport.latitude && !form.id) {
      fetch('https://ipapi.co/json')
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          mapRef.current.flyTo({
            center: [data.longitude, data.latitude],
          });
          setForm({
            ...form,
            studioLocation: { ...form.studioLocation, geolocation: [data.longitude, data.latitude] },
          });
        });
    }
    //if form.id it means user is in edit studio mode
    if (form.id) {
      setViewport({
        longitude: form.studioLocation.geolocation[0],
        latitude: form.studioLocation.geolocation[1],
      });
    }
  }, []);
  return (
    <Map
      ref={mapRef}
      {...viewport}
      style={style}
      mapStyle="mapbox://styles/hayvanadi98/clc0wi3k9003v14nyhgdcytq1"
      mapboxAccessToken={process.env.mapbox_key}
      onMove={(evt) => {
        handleMarkerLocation(evt);
        console.log(evt.viewState);
        setViewport(evt.viewState);
      }}
      renderWorldCopies={true}
      doubleClickZoom={true}
      interactive={true}
      attributionControl={false}
      cursor="grab"
      dragRotate={true}
      keyboard={true}
      scrollZoom={false}
      trackResize={false}>
      <GeolocateControl
        position="top-left"
        trackUserLocation
        onGeolocate={(e) => {
          setMarkerIsActive(true);
          setShowFormExpanded(true);
          setForm({
            ...form,
            studioLocation: { ...form.studioLocation, geolocation: [e.coords.longitude, e.coords.latitude] },
          });
        }}
      />
      <FullscreenControl position="top-left" />
      <NavigationControl position="top-left" />
      <ScaleControl style={{ border: 'none' }} />
      {markerIsActive ? (
        <Marker
          longitude={viewport.longitude}
          latitude={viewport.latitude}
          anchor="bottom"
          offsetTop={-10}
          offsetLeft={-20}>
          <p role="img" aria-label="push-pin">
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
      ) : null}
      <Geocoder onRetrieve={onRetrieve} form={form} setForm={setForm} />
    </Map>
  );
}
