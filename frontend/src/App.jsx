import React, { useEffect, useState } from "react";
import Map, { Marker, Popup } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { FaMapPin } from "react-icons/fa";
import { FaStar } from "react-icons/fa";
import { format } from "timeago.js";
import axios from "axios";
import Register from "./components/Register";
import Login from "./components/Login";

function App() {
  const [pins, setPins] = useState([]);
  const [currentLocation, setCurrentLocation] = useState({});
  const [newPlace, setNewPlace] = useState(null);
  const [currentUsername, setCurrentUsername] = useState(null);
  const [showRegister, setShowRegister] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [rating, setRating] = useState("");
  const [viewState, setViewState] = useState({
    latitude: 28.6567,
    longitude: 77.069,
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
        console.log("Error fetching pins:", error.message);
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newPin = {
      username: currentUsername,
      title,
      description: desc,
      rating: parseInt(rating),
      lat: newPlace.lat,
      long: newPlace.long,
    };
    try {
      if (!newPin.username) {
        newPin.username = "Me";
      }
      const res = await axios.post("http://localhost:7800/api/pins", newPin);
      setPins([...pins, res.data.newPin]);
      setNewPlace(null);
    } catch (error) {
      console.log("Error is here", error);
    }
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
              <Marker
                latitude={pin.lat}
                longitude={pin.long}
                offsetLeft={-viewState.zoom * 3.5}
                offsetTop={-viewState.zoom * 7}
                anchor="bottom"
              >
                <FaMapPin
                  className="text-red-500 text-2xl hover:cursor-pointer"
                  onClick={() => handleClick(pin._id, pin.lat, pin.long)}
                  style={{ fontSize: `${viewState.zoom * 4}px` }}
                />
              </Marker>
              {pin._id === currentLocation && (
                <Popup
                  maxWidth="400px"
                  latitude={pin.lat}
                  longitude={pin.long}
                  closeButton={true}
                  closeOnClick={false}
                  onClose={() => setCurrentLocation(null)}
                  anchor="left"
                >
                  <div className="bg-white shadow-md rounded-lg  p-2">
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
                      {Array.from({ length: pin.rating }, (_, index) => (
                        <FaStar key={index} className="text-yellow-500" />
                      ))}
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
        {/*         <div className="absolute top-0 right-0 m-4">
          {currentUsername ? (
            <button className="bg-red-700 text-white px-4 py-2 rounded-md mr-2">
              Log out
            </button>
          ) : (
            <div>
              <button className="bg-blue-500 text-white px-4 py-2 rounded-md mr-2">
                Login
              </button>
              <button className="bg-green-500 text-white px-4 py-2 rounded-md">
                Register
              </button>
              <div>
                <Register />
              </div>
            </div>
          )}
        </div>
        <div></div> */}
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
            <div className="flex">
              <form className="flex" onSubmit={handleSubmit}>
                <label htmlFor="title">Title</label>
                <input
                  type="text"
                  placeholder="Enter a title"
                  onChange={(e) => setTitle(e.target.value)}
                />
                <label htmlFor="review">Review</label>
                <textarea
                  placeholder="Share your experience"
                  rows="3"
                  onChange={(e) => setDesc(e.target.value)}
                ></textarea>
                <label htmlFor="rating">Rating</label>
                <select onChange={(e) => setRating(e.target.value)}>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                </select>
                <button type="submit">Add Pin</button>
              </form>
            </div>
          </Popup>
        )}
      </Map>
      <div className="absolute top-0 right-0 m-4 z-10">
        {currentUsername ? (
          <button className="bg-red-700 text-white px-4 py-2 rounded-md mr-2">
            Log out
          </button>
        ) : (
          <div>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded-md mr-2"
              onClick={() => setShowLogin(true)}
            >
              Login
            </button>
            <button
              className="bg-green-500 text-white px-4 py-2 rounded-md"
              onClick={() => setShowRegister(true)}
            >
              Register
            </button>
          </div>
        )}
      </div>
      {showLogin && (
        <div className="absolute inset-0 flex justify-center items-center bg-transparent z-20">
          <Login onClose={() => setShowLogin(false)} />
        </div>
      )}
      {showRegister && (
        <div className="absolute inset-0 flex justify-center items-center bg-transparent z-20">
          <Register onClose={() => setShowRegister(false)} />
        </div>
      )}
    </div>
  );
}

export default App;
