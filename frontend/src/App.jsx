import React, { useEffect, useState } from "react";
import Map, { Marker, Popup } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { FaMapPin } from "react-icons/fa6";
import { FaStar } from "react-icons/fa";
import axios from "axios";

function App() {
  const [pins, setPins] = useState([]);
  const [viewState, setViewState] = useState({
    latitude: 37.8,
    longitude: -122.4,
    zoom: 10,
    bearing: 0,
    pitch: 0,
  });

  useEffect(() => {
    const getPins = async () => {
      try {
        const response = await axios.get("http://localhost:7800/api/pins");
        setPins(response.data);
        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    getPins();
  }, []);

  return (
    <div className="w-screen h-screen overflow-hidden">
      <Map
        {...viewState}
        onMove={(evt) => setViewState(evt.viewState)}
        style={{ width: "100%", height: "100%" }}
        mapboxAccessToken="pk.eyJ1IjoidmVkYW50MjEiLCJhIjoiY2x5OW0wOXZyMHR1dzJ2b2hxZTM4d2g3MSJ9.fK8JHGe7_RNazEam66wTCg"
        mapStyle="mapbox://styles/mapbox/streets-v11"
      >
        {pins.map((pin) => {
          if (isNaN(pin.lat) || isNaN(pin.long)) {
            console.log("Invalid pin");
            return null;
          }
          return (
            <React.Fragment key={pin.id}>
              <Marker latitude={pin.lat} longitude={pin.long} anchor="bottom">
                <FaMapPin
                  className="text-red-500 text-2xl"
                  style={{ fontSize: `${viewState.zoom * 5}px` }}
                />
              </Marker>
              <Popup
                className="w-96 h-64"
                latitude={pin.lat}
                longitude={pin.long}
                closeButton={true}
                closeOnClick={false}
                anchor="left"
              >
                <div className="bg-white shadow-md rounded-lg p-1">
                  <label className="text-sm text-red-500 border-b-2 border-red-500">
                    Place
                  </label>
                  <h4 className="place text-xl font-bold">{pin.title}</h4>
                  <label className="text-sm text-red-500 border-b-2 border-red-500">
                    Description
                  </label>
                  <h4 className="text-base">{pin?.description}</h4>
                  <label className="text-sm text-red-500 border-b-2 border-red-500">
                    Rating
                  </label>
                  <div className="flex items-center p-1 pl-0">
                    <FaStar className="text-yellow-500 text-2xl" />
                    <FaStar className="text-yellow-500 text-2xl" />
                    <FaStar className="text-yellow-500 text-2xl" />
                  </div>
                  <label className="text-sm text-red-500 border-b-2 border-red-500">
                    Information
                  </label>
                  <div className="username text-sm">
                    Random Information is being entered here
                  </div>
                  <span className="date text-xs">1 Hour Ago</span>
                </div>
              </Popup>
            </React.Fragment>
          );
        })}
      </Map>
    </div>
  );
}

export default App;
