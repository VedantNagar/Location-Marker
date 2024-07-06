import React, { useState } from "react";
import Map, { Marker, Popup } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { FaMapPin } from "react-icons/fa6";
import { FaStar } from "react-icons/fa";

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
        <Popup
          className="w-96 h-64"
          latitude={pinPosition.latitude}
          longitude={pinPosition.longitude}
          closeButton={true}
          closeOnClick={false}
          anchor="left"
        >
          <div class="bg-white shadow-md rounded-lg p-1">
            <label class="text-sm text-red-500 border-b-2 border-red-500">
              Place
            </label>
            <h4 class="place text-xl font-bold">Random Home</h4>
            <label class="text-sm text-red-500 border-b-2 border-red-500">
              Review
            </label>
            <h4 class="text-base">5/5</h4>
            <label class="text-sm text-red-500 border-b-2 border-red-500">
              Rating
            </label>
            <div class="flex items-center p-1 pl-0">
              <FaStar class="text-yellow-500 text-2xl" />
              <FaStar class="text-yellow-500 text-2xl" />
              <FaStar class="text-yellow-500 text-2xl" />
            </div>
            <label class="text-sm text-red-500 border-b-2 border-red-500">
              Information
            </label>
            <div class="username text-sm">
              Random Information is being entered here
            </div>
            <span class="date text-xs">1 Hour Ago</span>
          </div>
        </Popup>
      </Map>
    </div>
  );
}

export default App;
