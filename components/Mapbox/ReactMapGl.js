import { useState } from 'react';
import Map from 'react-map-gl';

export function ReactMapGl() {
  const [viewport, setViewport] = useState({ width: '100%', height: '100%', longitude: -100, latitude: 40, zoom: 3.5 });
  return (
    <Map
      // initialViewState={{}}
      {...viewport}
      style={{ width: 600, height: 400 }}
      mapStyle="mapbox://styles/hayvanadi98/clc0wi3k9003v14nyhgdcytq1"
      mapboxAccessToken={process.env.mapbox_key}
      onMove={(evt) => setViewport(evt.viewState)}
    />
  );
}
