// MapComponent.js

import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

const MapComponent = ({ latitude, longitude }) => {
  console.log(latitude, longitude);

  // Check if latitude and longitude are valid numbers, otherwise use hardcoded coordinates
  const position =
    typeof latitude === "number" && typeof longitude === "number"
      ? [latitude, longitude]
      : [18.563072, 73.8295808]; // Coordinates

  return (
    <MapContainer center={position} zoom={13} style={{ height: "400px" }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker position={position}>
        <Popup>
          Marker at {latitude || 19.8762}° N, {longitude || 75.3433}° E <br />{" "}
          Easily customizable.
        </Popup>
      </Marker>
    </MapContainer>
  );
};

export default MapComponent;
