import React, { useEffect, useState } from "react";
import Map, { Marker, Popup } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { FaMapPin } from "react-icons/fa";
import { FaStar } from "react-icons/fa";
import { format } from "timeago.js";
import axios from "axios";

function App() {
  const [pins, setPins] = useState([]);
  const [currentLocation, setCurrentLocation] = useState({});
  const [newPlace, setNewPlace] = useState(null);
  const [viewState, setViewState] = useState({
    latitude: 28.5,
    longitude: 77.04,
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

  const handleClick = (id, lat, long) => {
    setCurrentLocation(id);
    setViewState({ ...viewState, latitude: lat, longitude: long });
  };

  const addPinClick = (e) => {
    const { lng, lat } = e.lngLat;
    setNewPlace({
      long: lng,
      lat: lat,
    });
  };

  return (
    <div className="w-screen h-screen overflow-hidden">
      <Map
        {...viewState}
        onMove={(evt) => setViewState(evt.viewState)}
        style={{ width: "100%", height: "100%" }}
        mapboxAccessToken="pk.eyJ1IjoidmVkYW50MjEiLCJhIjoiY2x5OW0wOXZyMHR1dzJ2b2hxZTM4d2g3MSJ9.fK8JHGe7_RNazEam66wTCg"
        mapStyle="mapbox://styles/mapbox/streets-v11"
        onDblClick={addPinClick}
      >
        {pins.map((pin) => {
          if (isNaN(pin.lat) || isNaN(pin.long)) {
            console.log("Invalid pin");
            return null;
          }
          return (
            <React.Fragment key={pin._id}>
              <Marker latitude={pin.lat} longitude={pin.long} anchor="bottom">
                <FaMapPin
                  className="text-red-500 text-2xl hover:cursor-pointer"
                  onClick={() => handleClick(pin._id, pin.lat, pin.long)}
                  style={{ fontSize: `${viewState.zoom * 4}px` }}
                />
              </Marker>
              {pin._id === currentLocation && (
                <Popup
                  className="w-72 h-auto ml-0"
                  latitude={pin.lat}
                  longitude={pin.long}
                  closeButton={true}
                  closeOnClick={false}
                  onClose={() => setCurrentLocation(null)}
                  anchor="left"
                >
                  <div className="bg-white shadow-md rounded-lg p-1 mx-4">
                    <label className="text-sm text-red-500 border-b-2 border-red-500 block">
                      Place
                    </label>
                    <h4 className="text-lg font-semibold">{pin.title}</h4>
                    <label className="text-sm text-red-500 border-b-2 border-red-500 block">
                      Review
                    </label>
                    <p className="text-xs py-1">{pin?.description}</p>
                    <label className="text-sm text-red-500 border-b-2 border-red-500 block">
                      Rating
                    </label>
                    <div className="flex items-center py-1">
                      <FaStar className="text-yellow-500 text-2xl" />
                      <FaStar className="text-yellow-500 text-2xl" />
                      <FaStar className="text-yellow-500 text-2xl" />
                      <FaStar className="text-yellow-500 text-2xl" />
                      <FaStar className="text-yellow-500 text-2xl" />
                    </div>
                    <label className="text-sm text-red-500 border-b-2 border-red-500 block">
                      Information
                    </label>
                    <div className="username text-sm">
                      Created by {pin.username}
                    </div>
                    <span className="date text-xs">
                      {format(pin.createdAt)}
                    </span>
                  </div>
                </Popup>
              )}
            </React.Fragment>
          );
        })}
        {newPlace && (
          <Popup
            className="w-72 h-auto ml-0"
            latitude={newPlace.lat}
            longitude={newPlace.long}
            closeButton={true}
            closeOnClick={false}
            onClose={() => setNewPlace(null)}
            anchor="left"
          >
            New Place
          </Popup>
        )}
      </Map>
    </div>
  );
}

export default App;
