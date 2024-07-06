import React, { useState } from "react";
import Map, { Marker } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { FaMapPin } from "react-icons/fa6";

function App() {
  const [viewState, setViewState] = useState({
    latitude: 37.8,
    longitude: -122.4,
    zoom: 10,
    bearing: 0,
    pitch: 0,
  });

  // Fixed position for the pin
  const pinPosition = {
    latitude: 37.8,
    longitude: -122.4,
  };

  return (
    <div className="w-screen h-screen overflow-hidden">
      <Map
        {...viewState}
        onMove={(evt) => setViewState(evt.viewState)}
        style={{ width: "100%", height: "100%" }}
        mapboxAccessToken="pk.eyJ1IjoidmVkYW50MjEiLCJhIjoiY2x5OW0wOXZyMHR1dzJ2b2hxZTM4d2g3MSJ9.fK8JHGe7_RNazEam66wTCg"
        mapStyle="mapbox://styles/mapbox/streets-v11"
      >
        <Marker
          latitude={pinPosition.latitude}
          longitude={pinPosition.longitude}
          anchor="bottom"
        >
          <FaMapPin
            className="text-red-500 text-2xl"
            style={{ fontSize: `${viewState.zoom * 5}px` }}
          />
        </Marker>
      </Map>
    </div>
  );
}

export default App;
