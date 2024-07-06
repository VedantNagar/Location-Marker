import * as React from "react";
import Map, { Marker } from "react-map-gl";

function App() {
  return (
    <div className="w-screen h-screen overflow-hidden">
      <Map
        mapboxAccessToken="pk.eyJ1IjoidmVkYW50MjEiLCJhIjoiY2x5OW0wOXZyMHR1dzJ2b2hxZTM4d2g3MSJ9.fK8JHGe7_RNazEam66wTCg"
        initialViewState={{
          longitude: 28.657,
          latitude: 15.875,
          zoom: 14,
        }}
        className="w-full h-full"
        mapStyle="mapbox://styles/mapbox/streets-v11"
      >
        <Marker longitude={28.657} latitude={15.875}>
          <div className="bg-white p-2 rounded-md shadow-md">You Are Here</div>
        </Marker>
      </Map>
    </div>
  );
}

export default App;
