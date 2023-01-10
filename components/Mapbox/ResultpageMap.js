import { useEffect, useState } from 'react';
import Map, { FullscreenControl, GeolocateControl, Marker, NavigationControl, Popup, ScaleControl } from 'react-map-gl';
import getCenter from 'geolib/es/getCenter';
import useSupercluster from 'use-supercluster';
import Image from 'next/image';
import { MyLink } from '../MyLink';
import { useDispatch, useSelector } from 'react-redux';
import { updatePoints as studioPoints } from '../../slices/searchStudios';
import { updatePoints as studioServicePoints } from '../../slices/searchStudioServices';
export function ResultpageMap({ style, mapFor }) {
  const [mapRef, setMapRef] = useState(null);
  const [selectedListing, setSelectedListing] = useState(null);
  const [clusterIsSameStudio, setClusterIsSameStudio] = useState(false);
  const points = useSelector(
    mapFor === 'studios' ? (state) => state.searchStudio.mapPoints : (state) => state.searchStudioService.mapPoints
  );
  const dispatch = useDispatch();

  //global state results of search
  const results = useSelector(
    mapFor === 'studios' ? (state) => state.searchStudio.results : (state) => state.searchStudioService.results
  );

  //getCenter of Pins
  const coordinates =
    mapFor === 'studios'
      ? results.map((result) => result.studioLocation.geolocation)
      : results.map((result) => result.studio.studioLocation.geolocation);

  const center = getCenter(coordinates);
  //Viewport initially depending on center coordinates
  const [viewport, setViewport] = useState({
    longitude: center.longitude,
    latitude: center.latitude,
    zoom: 5.5,
  });

  //set the Points to handle in Map
  useEffect(() => {
    dispatch(
      mapFor === 'studios'
        ? studioPoints(
            results.map((result) => ({
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
          )
        : studioServicePoints(
            results.map((result) => ({
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
          )
    );
  }, [results]);

  //getting mapRef
  // useEffect(() => {
  //   if (mapRef) {
  //     // mapRef?.setCenter({
  //     //   lat: rowData?.laty,
  //     //   lng: rowData?.longx,
  //     // });
  //   }
  // }, [mapRef]);

  // get map bounds
  const bounds = mapRef ? mapRef.getMap().getBounds().toArray().flat() : null;

  //get clusters out of points, bounds and map them
  const { clusters, supercluster } = useSupercluster({
    points,
    bounds,
    zoom: viewport.zoom,
    options: { radius: 75, maxZoom: 20 },
  });

  const popupOffsets = {
    top: [0, 0],
    bottom: [0, -30],
    left: [0, 0],
    right: [0, 0],
  };
  console.log('viewport', viewport);
  return (
    <Map
      // initialViewState={{}}
      {...viewport}
      style={style}
      ref={(ref) => setMapRef(ref)}
      maxZoom={20}
      onViewportChange={(newViewport) => {
        setViewport({ ...newViewport });
      }}
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
      trackResize={true}>
      <GeolocateControl position="top-left" />
      <FullscreenControl position="top-left" />
      <NavigationControl position="top-left" showCompass={true} visualizePitch={true} />
      <ScaleControl style={{ border: 'none' }} />
      {clusters.map((cluster) => {
        // every cluster point has coordinates
        const [longitude, latitude] = cluster.geometry.coordinates;
        // the point may be either a cluster or a crime point
        const { cluster: isCluster, point_count: pointCount } = cluster.properties;
        // we have a cluster to render
        if (isCluster) {
          return (
            <Marker
              key={`cluster-${cluster.id}`}
              latitude={latitude}
              longitude={longitude}
              anchor="bottom"
              offsetTop={-10}
              offsetLeft={-20}>
              <div
                className="flex items-center justify-center rounded-[50%] bg-blue-400 p-2 text-white"
                style={{
                  width: `${10 + (pointCount / points.length) * 20}px`,
                  height: `${10 + (pointCount / points.length) * 20}px`,
                }}
                onClick={(event) => {
                  const expansionZoom = Math.min(supercluster.getClusterExpansionZoom(cluster.id), 14);
                  const clusterChildren = supercluster.getLeaves(cluster.id);
                  const studioIds = clusterChildren.map((child) => child.properties.studioId);
                  const clusterHasOnlySameOwner = studioIds.every(
                    (val) => studioIds.filter((val2) => val2 === val).length >= 2
                  );
                  if (!clusterHasOnlySameOwner) {
                    mapRef?.current?.flyTo({
                      center: [longitude, latitude],
                      zoom: expansionZoom,
                      transitionDuration: 'auto',
                      duration: 2000,
                    });
                  }
                  if (clusterHasOnlySameOwner) {
                    event.stopPropagation();
                    setClusterIsSameStudio(true);
                    setSelectedListing(clusterChildren.map((child) => child.properties.result));
                  }
                }}>
                {pointCount}
              </div>
            </Marker>
          );
        }
        // we have a single point to render
        return (
          <Marker key={`crime-${cluster.properties.result._id}`} latitude={latitude} longitude={longitude}>
            <p
              role="img"
              aria-label="push-pin"
              onClick={(e) => {
                e.stopPropagation();
                setSelectedListing(cluster.properties.result);
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
        );
      })}
      {selectedListing && !clusterIsSameStudio ? (
        <Popup
          onClose={() => {
            setSelectedListing(null);
            setClusterIsSameStudio(false);
          }}
          closeButton={false}
          closeOnMove={true}
          closeOnClick={true}
          maxWidth={'300px'}
          anchor="bottom"
          offset={popupOffsets}
          longitude={selectedListing.studioLocation.geolocation[0]}
          latitude={selectedListing.studioLocation.geolocation[1]}>
          {mapFor === 'studios' ? (
            <article className="flex  w-full shrink-0 gap-3">
              <div className="min-w-[100px] text-xs">
                <h3>{selectedListing.studioName}</h3>
                <div className="text-xxs">
                  <p>
                    {selectedListing.studioLocation.postalcode}, {selectedListing.studioLocation.city}
                  </p>
                  <p>{selectedListing.studiotype}</p>
                </div>
                <MyLink
                  className="text-xxs underline"
                  href={{
                    pathname: '/studiotype/[type]/id/[name]/[id]',
                    query: {
                      type: `${selectedListing.studiotype.toLowerCase().replace(/ /g, '')}`,
                      name: `${selectedListing.studioName.toLowerCase().replace(/ /g, '-')}`,
                      id: `${selectedListing._id}`,
                    },
                  }}>
                  Click here
                </MyLink>
              </div>
              <div className="relative h-16 w-16 grow">
                <Image
                  src={selectedListing.logo}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-full"
                  alt="Thumbnail"
                />
              </div>
            </article>
          ) : mapFor === 'studioServices' ? (
            <article className="flex w-full shrink-0 gap-3">
              <div className="flex min-w-[100px] flex-col justify-between text-xs">
                <h3>{selectedListing.studio.studioName}</h3>
                <div className="text-xxs leading-tight">
                  <p>
                    {selectedListing.studio.studioLocation.postalcode}, {selectedListing.studio.studioLocation.city}
                  </p>
                  <p>{selectedListing.studio.studiotype}</p>
                  <p>{selectedListing.service.name}</p>
                </div>
                <MyLink
                  className="text-xxs underline"
                  href={`/studioservice/${selectedListing.service.queryString}/id/${selectedListing.listingTitle
                    .toLowerCase()
                    .replace(/ /g, '-')}/${selectedListing._id}`}>
                  Click here
                </MyLink>
              </div>
              <div className="relative h-20 w-24 grow">
                <Image
                  src={selectedListing.images.primary}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-xl"
                  alt="Thumbnail"
                />
              </div>
            </article>
          ) : null}
        </Popup>
      ) : null}
      {clusterIsSameStudio && (
        <Popup
          onClose={() => {
            setSelectedListing(null);
            setClusterIsSameStudio(false);
          }}
          closeButton={false}
          closeOnMove={true}
          closeOnClick={true}
          maxWidth={'300px'}
          maxHeight={'150px'}
          anchor="bottom"
          offset={popupOffsets}
          longitude={selectedListing[0].studio.studioLocation.geolocation[0]}
          latitude={selectedListing[0].studio.studioLocation.geolocation[1]}>
          {mapFor === 'studios' ? (
            <article className="flex w-full shrink-0 gap-3">
              <div className="min-w-[100px] text-xs">
                <h3>{selectedListing.studioName}</h3>
                <div className="text-xxs">
                  <p>
                    {selectedListing.studioLocation.postalcode}, {selectedListing.studioLocation.city}
                  </p>
                  <p>{selectedListing.studiotype}</p>
                </div>
                <MyLink
                  className="text-xxs underline"
                  href={{
                    pathname: '/studiotype/[type]/id/[name]/[id]',
                    query: {
                      type: `${selectedListing.studiotype.toLowerCase().replace(/ /g, '')}`,
                      name: `${selectedListing.studioName.toLowerCase().replace(/ /g, '-')}`,
                      id: `${selectedListing._id}`,
                    },
                  }}>
                  Click here
                </MyLink>
              </div>
              <div className="relative h-16 w-16 grow">
                <Image
                  src={selectedListing.logo}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-full"
                  alt="Thumbnail"
                />
              </div>
            </article>
          ) : mapFor === 'studioServices' ? (
            <div className="flex max-h-[120px] flex-col gap-4 overflow-y-scroll">
              {/* studiocard */}
              <article className="flex h-[90px] w-full shrink-0 justify-between gap-3">
                <div className="flex min-w-[140px] flex-col justify-between text-xs">
                  <h3>{selectedListing[0].studio.studioName}</h3>
                  <div className="text-xxs leading-tight">
                    <p>
                      {selectedListing[0].studio.studioLocation.postalcode},{' '}
                      {selectedListing[0].studio.studioLocation.city}
                    </p>
                    <p>{selectedListing[0].studio.studiotype}</p>
                  </div>
                  <div className="flex w-full justify-between">
                    <MyLink
                      className="text-xxs underline"
                      href={{
                        pathname: '/studiotype/[type]/id/[name]/[id]',
                        query: {
                          type: `${selectedListing[0].studio.studiotype.toLowerCase().replace(/ /g, '')}`,
                          name: `${selectedListing[0].studio.studioName.toLowerCase().replace(/ /g, '-')}`,
                          id: `${selectedListing[0].studio._id}`,
                        },
                      }}>
                      Go to studio
                    </MyLink>
                    <p className="flex gap-1 text-xxs font-semibold">
                      {selectedListing.length} services
                      <span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.3}
                          stroke="currentColor"
                          className="h-5 w-5">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M3 4.5h14.25M3 9h9.75M3 13.5h9.75m4.5-4.5v12m0 0l-3.75-3.75M17.25 21L21 17.25"
                          />
                        </svg>
                      </span>
                    </p>
                  </div>
                </div>
                <div className="relative h-20 w-20">
                  <Image
                    src={selectedListing[0].studio.logo}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-full"
                    alt="Thumbnail"
                  />
                </div>
              </article>
              {/* studioservices */}
              {selectedListing.map((service) => (
                <article key="service._id" className="flex w-full shrink-0 gap-3 text-sm">
                  <div className="flex min-w-[100px] flex-col justify-between text-xs">
                    <h3 className="line-clamp-2">{service.listingTitle}</h3>
                    <div className="text-xxs leading-tight">
                      <p>{service.service.name}</p>
                    </div>
                    <MyLink
                      className="text-xxs underline"
                      href={`/studioservice/${service.service.queryString}/id/${service.listingTitle
                        .toLowerCase()
                        .replace(/ /g, '-')}/${service._id}`}>
                      Click here
                    </MyLink>
                  </div>
                  <div className="relative h-20 w-24 grow">
                    <Image
                      src={service.images.primary}
                      layout="fill"
                      objectFit="cover"
                      className="rounded-xl"
                      alt="Thumbnail"
                    />
                  </div>
                </article>
              ))}
            </div>
          ) : null}
        </Popup>
      )}
    </Map>
  );
}
