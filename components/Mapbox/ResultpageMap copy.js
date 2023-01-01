// import { useEffect, useRef, useState } from 'react';
// import Map, { Marker, Popup, NavigationControl, GeolocateControl, FullscreenControl, ScaleControl } from 'react-map-gl';
// import getCenter from 'geolib/es/getCenter';
// import { useMemo } from 'react';
// import Image from 'next/image';
// import { MyLink } from '../MyLink';
// import Supercluster from 'supercluster';

// export function ResultpageMap({ results, style, mapFor }) {
//   const coordinates =
//     mapFor === 'studios'
//       ? results.map((result) => result.studioLocation.geolocation)
//       : mapFor === 'studioServices'
//       ? results.map((result) => result.studio.studioLocation.geolocation)
//       : null;

//   const supercluster = new Supercluster({ radius: 75, maxZoom: 20 });
//   const [points, setPoints] = useState([]);
//   const [clusters, setClusters] = useState([]);
//   const [bounds, setBounds] = useState([-180, -85, 180, 85]);
//   const [zoom, setZoom] = useState(0);
//   const mapRef = useRef();

//   useEffect(() => {
//     const points = results.map((result) => ({
//       type: 'Feature',
//       properties: {
//         cluster: false,
//         result: result,
//       },
//       geometry: {
//         type: 'Point',
//         coordinates:
//           mapFor === 'studios'
//             ? result.studioLocation.geolocation
//             : mapFor === 'studioServices'
//             ? result.studio.studioLocation.geolocation
//             : null,
//       },
//     }));
//     setPoints(points);
//   }, [results]);
//   console.log('points', points);
//   useEffect(() => {
//     supercluster.load(points);
//     setClusters(supercluster.getClusters(bounds, zoom));
//   }, [points, zoom, bounds]);

//   useEffect(() => {
//     if (mapRef.current) {
//       setBounds(mapRef.current.getMap().getBounds().toArray().flat());
//     }
//   }, [mapRef?.current]);

//   const center = getCenter(coordinates);
//   const [selectedListing, setSelectedListing] = useState(null);
//   const [viewport, setViewport] = useState({
//     longitude: center.longitude,
//     latitude: center.latitude,
//     zoom: 5.5,
//   });
//   console.log(selectedListing);

//   const pins = useMemo(
//     () =>
//       results.map((result) => (
//         <Marker
//           key={result._id}
//           longitude={
//             mapFor === 'studios'
//               ? result.studioLocation.geolocation[0]
//               : mapFor === 'studioServices'
//               ? result.studio.studioLocation.geolocation[0]
//               : null
//           }
//           latitude={
//             mapFor === 'studios'
//               ? result.studioLocation.geolocation[1]
//               : mapFor === 'studioServices'
//               ? result.studio.studioLocation.geolocation[1]
//               : null
//           }
//           anchor="bottom"
//           offsetTop={-10}
//           offsetLeft={-20}>
//           <p
//             role="img"
//             aria-label="push-pin"
//             onClick={(e) => {
//               e.stopPropagation();
//               setSelectedListing(result);
//             }}>
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               viewBox="0 0 24 24"
//               fill="currentColor"
//               className="h-6 w-6 animate-bounce cursor-pointer">
//               <path
//                 fillRule="evenodd"
//                 d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 00-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z"
//                 clipRule="evenodd"
//               />
//             </svg>
//           </p>
//         </Marker>
//       )),
//     []
//   );
//   const popupOffsets = {
//     top: [0, 0],
//     bottom: [0, -30],
//     left: [0, 0],
//     right: [0, 0],
//   };
//   return (
//     <Map
//       // initialViewState={{}}
//       {...viewport}
//       style={style}
//       ref={mapRef}
//       onZoomEnd={(e) => setZoom(Math.round(e.viewState.zoom))}
//       mapStyle="mapbox://styles/hayvanadi98/clc0wi3k9003v14nyhgdcytq1"
//       mapboxAccessToken={process.env.mapbox_key}
//       onMove={(evt) => setViewport(evt.viewState)}
//       renderWorldCopies={true}
//       doubleClickZoom={true}
//       interactive={true}
//       attributionControl={false}
//       cursor="grab"
//       dragRotate={true}
//       keyboard={true}
//       reuseMaps={true}
//       trackResize={true}>
//       {/* <GeolocateControl position="top-left" />
//       <FullscreenControl position="top-left" />
//       <NavigationControl position="top-left" showCompass={true} visualizePitch={true} />
//       <ScaleControl style={{ border: 'none' }} />
//       {pins}
//       {selectedListing && (
//         <Popup
//           onClose={() => setSelectedListing(null)}
//           closeButton={false}
//           closeOnMove={true}
//           closeOnClick={true}
//           maxWidth={'300px'}
//           anchor="bottom"
//           offset={popupOffsets}
//           longitude={
//             mapFor === 'studios'
//               ? selectedListing.studioLocation.geolocation[0]
//               : mapFor === 'studioServices'
//               ? selectedListing.studio.studioLocation.geolocation[0]
//               : null
//           }
//           latitude={
//             mapFor === 'studios'
//               ? selectedListing.studioLocation.geolocation[1]
//               : mapFor === 'studioServices'
//               ? selectedListing.studio.studioLocation.geolocation[1]
//               : null
//           }>
//           {mapFor === 'studios' ? (
//             <article className="flex w-full shrink-0 gap-3">
//               <div className="min-w-[100px] text-xs">
//                 <h3>{selectedListing.studioName}</h3>
//                 <div className="text-xxs">
//                   <p>
//                     {selectedListing.studioLocation.postalcode}, {selectedListing.studioLocation.city}
//                   </p>
//                   <p>{selectedListing.studiotype}</p>
//                 </div>
//                 <MyLink
//                   className="text-xxs underline"
//                   href={{
//                     pathname: '/studiotype/[type]/id/[name]/[id]',
//                     query: {
//                       type: `${selectedListing.studiotype.toLowerCase().replace(/ /g, '')}`,
//                       name: `${selectedListing.studioName.toLowerCase().replace(/ /g, '-')}`,
//                       id: `${selectedListing._id}`,
//                     },
//                   }}>
//                   Click here
//                 </MyLink>
//               </div>
//               <div className="relative h-16 w-16 grow">
//                 <Image
//                   src={selectedListing.logo}
//                   layout="fill"
//                   objectFit="cover"
//                   className="rounded-full"
//                   alt="Thumbnail"
//                 />
//               </div>
//             </article>
//           ) : mapFor === 'studioServices' ? (
//             <article className="flex w-full shrink-0 gap-3">
//               <div className="flex min-w-[100px] flex-col justify-between text-xs">
//                 <h3>{selectedListing.studio.studioName}</h3>
//                 <div className="text-xxs leading-tight">
//                   <p>
//                     {selectedListing.studio.studioLocation.postalcode}, {selectedListing.studio.studioLocation.city}
//                   </p>
//                   <p>{selectedListing.studio.studiotype}</p>
//                   <p>{selectedListing.service.name}</p>
//                 </div>
//                 <MyLink
//                   className="text-xxs underline"
//                   href={`/studioservice/${selectedListing.service.queryString}/id/${selectedListing.listingTitle
//                     .toLowerCase()
//                     .replace(/ /g, '-')}/${selectedListing._id}`}>
//                   Click here
//                 </MyLink>
//               </div>
//               <div className="relative h-20 w-24 grow">
//                 <Image
//                   src={selectedListing.images.primary}
//                   layout="fill"
//                   objectFit="cover"
//                   className="rounded-xl"
//                   alt="Thumbnail"
//                 />
//               </div>
//             </article>
//           ) : null}
//         </Popup>
//       )} */}
//       {console.log('cluster', clusters)}
//       {clusters.map((cluster) => {
//         const { cluster: isCluster, point_count } = cluster.properties;
//         const [longitude, latitude] = cluster.geometry.coordinates;
//         if (isCluster) {
//           return (
//             <Marker key={`cluster-${cluster.id}`} longitude={longitude} latitude={latitude}>
//               <div
//                 className="cluster-marker bg-black"
//                 style={{
//                   width: `${10 + (point_count / points.length) * 20}px`,
//                   height: `${10 + (point_count / points.length) * 20}px`,
//                 }}
//                 onClick={() => {
//                   const zoom = Math.min(supercluster.getClusterExpansionZoom(cluster.id), 20);
//                   mapRef.current.flyTo({
//                     center: [longitude, latitude],
//                     zoom,
//                     speed: 1,
//                   });
//                 }}>
//                 {point_count}
//               </div>
//             </Marker>
//           );
//         }

//         return (
//           <Marker key={`room-${cluster.properties.result._id}`} longitude={longitude} latitude={latitude}>
//             miadwmdiwami{' '}
//           </Marker>
//         );
//       })}
//     </Map>
//   );
// }
