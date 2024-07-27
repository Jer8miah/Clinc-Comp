// frontend/my-app/src/Map.js
import React from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '400px'
};

const center = {
  lat: 35.1606,  // Default latitude
  lng: -89.8665  // Default longitude
};

function Map() {
  return (
    <LoadScript
      googleMapsApiKey="AIzaSyBFd2X5zeztTSa99DHm0_clDXfBL40ycBs"  // Replace with your API key
    >
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={10}
      >
        <Marker position={center} />
      </GoogleMap>
    </LoadScript>
  );
}

export default Map;
