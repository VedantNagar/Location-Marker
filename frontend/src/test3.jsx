import React, { useState } from "react";
import MapGL, { Marker } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css"; // Import CSS for Mapbox GL
import { FaMapPin } from "react-icons/fa6";

function App() {
  const [viewport, setViewport] = useState({
    width: "100vw",
    height: "100vh",
    latitude: 37.8,
    longitude: -122.4,
    zoom: 10,
    bearing: 0,
    pitch: 0,
    interactive: true, // Add this line to enable map interaction
  });

  return (
    <div className="w-screen h-screen overflow-hidden">
      <MapGL
        {...viewport}
        mapboxAccessToken="pk.eyJ1IjoidmVkYW50MjEiLCJhIjoiY2x5OW0wOXZyMHR1dzJ2b2hxZTM4d2g3MSJ9.fK8JHGe7_RNazEam66wTCg"
        onViewportChange={(nextViewport) => setViewport(nextViewport)}
        mapStyle="mapbox://styles/mapbox/streets-v11"
      >
        <Marker
          latitude={viewport.latitude}
          longitude={viewport.longitude}
          offsetLeft={-20}
          offsetTop={-10}
        >
          <FaMapPin className="text-red-500 text-4xl" />
        </Marker>
      </MapGL>
    </div>
  );
}

export default App;
