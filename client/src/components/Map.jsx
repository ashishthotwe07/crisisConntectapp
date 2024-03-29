import React, { useEffect } from "react";
import mapboxgl from "mapbox-gl";

const Map = ({ latitude, longitude }) => {
  useEffect(() => {
    const lat = parseFloat(latitude);
    const lng = parseFloat(longitude);

    if (isNaN(lat) || isNaN(lng)) {
      console.error("Invalid latitude or longitude:", latitude, longitude);
      return;
    }

    mapboxgl.accessToken = "pk.eyJ1IjoiYXNoaXNodGhvdHdlMDciLCJhIjoiY2x0bWs5MXJmMWtlcTJrbno1dmU0bnNiMCJ9.pbI2gY9jr341uKhzDaejag";
    
    const map = new mapboxgl.Map({
      container: "map-container",
      style: "mapbox://styles/mapbox/streets-v11",
      center: [lng, lat],
      zoom: 17,
    });

    new mapboxgl.Marker({ color: "red" })
      .setLngLat([lng, lat])
      .addTo(map);

    // Clean up map instance
    return () => map.remove();
  }, [latitude, longitude]); 

  return (
    <div
      id="map-container"
      style={{ margin: "auto", width: "400px", height: "400px" }}
    />
  );
};

export default Map;
