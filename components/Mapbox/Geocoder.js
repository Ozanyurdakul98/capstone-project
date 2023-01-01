import MapBoxGeocoder from '@mapbox/mapbox-gl-geocoder';
import { useControl } from 'react-map-gl';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
import { useDispatch } from 'react-redux';
import { handleGeocoderRetrieve } from '../../slices/addStudioForm';

const Geocoder = ({ setMarkerIsActive, setShowFormExpanded }) => {
  const dispatch = useDispatch();
  const handleRetrieve = (res) => {
    setMarkerIsActive(true);
    setShowFormExpanded(true);
    dispatch(handleGeocoderRetrieve(res));
  };
  const ctrl = new MapBoxGeocoder({
    accessToken: process.env.mapbox_key,
    marker: false,
    language: 'en',
    collapsed: false,
    proximity: 'ip',
    types: 'address',
    // enableGeolocation: true,
    // addressAccuracy: 'address',
    getItemValue: (data) => {
      ctrl.setFlyTo({
        animate: false,
      });
      return data.place_name;
    },
  });
  useControl(() => ctrl);
  ctrl.on('result', (event) => {
    handleRetrieve(event.result);
  });
};
export default Geocoder;
