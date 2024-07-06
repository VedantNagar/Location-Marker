import React, { useState } from "react";
import MapGL, { Marker } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css"; // Import CSS for Mapbox GL

function App() {
  const [viewport, setViewport] = useState({
    width: "100%",
    height: "100%",
    latitude: 37.8,
    longitude: -122.4,
    zoom: 14,
  });

  return (
    <div className="w-screen h-screen overflow-hidden">
      <MapGL
        {...viewport}
        mapboxApiAccessToken="pk.eyJ1IjoidmVkYW50MjEiLCJhIjoiY2x5OW0wOXZyMHR1dzJ2b2hxZTM4d2g3MSJ9.fK8JHGe7_RNazEam66wTCg"
        onViewportChange={(nextViewport) => setViewport(nextViewport)}
        mapStyle="mapbox://styles/mapbox/streets-v11"
      >
        <Marker longitude={viewport.longitude} latitude={viewport.latitude}>
          <div className="bg-white p-2 rounded-md shadow-md">You Are Here</div>
        </Marker>
      </MapGL>
    </div>
  );
}

export default App;
