import MapBoxGeocoder from '@mapbox/mapbox-gl-geocoder';
import { useControl } from 'react-map-gl';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';

const Geocoder = ({ onRetrieve }) => {
  const ctrl = new MapBoxGeocoder({
    accessToken: process.env.mapbox_key,
    marker: false,
    language: 'en-US',
    collapsed: true,
  });
  useControl(() => ctrl);
  ctrl.on('result', (e) => {
    console.log('EEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE', e);
    onRetrieve(e.result);
  });
  return null;
};
export default Geocoder;
