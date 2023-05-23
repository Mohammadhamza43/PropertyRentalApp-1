import React from "react";
import { withGoogleMap, GoogleMap, Marker } from "react-google-maps";
import MarkerClusterer from "react-google-maps/lib/components/addons/MarkerClusterer";

const MapWithMarkerCluster = withGoogleMap(({ markers }) => (
  <GoogleMap
    defaultZoom={10}
    defaultCenter={{ lat: 37.7749, lng: -122.4194 }}
  >
    <MarkerClusterer averageCenter enableRetinaIcons gridSize={60}>
      {markers.map((marker, index) => (
        <Marker key={index} position={marker.position} />
      ))}
    </MarkerClusterer>
  </GoogleMap>
));

const MyMapComponent = () => {
  const markers = [
    { position: { lat: 37.7749, lng: -122.4194 } },
    { position: { lat: 37.7749, lng: -122.4094 } },
    // Add more markers as needed
  ];

  return (
    <MapWithMarkerCluster
      containerElement={<div style={{ height: "400px" }} />}
      mapElement={<div style={{ height: "100%" }} />}
      markers={markers}
    />
  );
};

export default MyMapComponent;