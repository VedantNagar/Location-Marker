import React, { useCallback, useEffect, useState } from "react";
import Map, { Marker, Popup } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { FaMapPin, FaStar, FaTrash } from "react-icons/fa";
import { format } from "timeago.js";
import axios from "axios";
import Register from "./components/Register";
import Login from "./components/Login";
import { toast, ToastContainer } from "react-toastify";

function App() {
  const myStorage = window.localStorage;
  const [pins, setPins] = useState([]);
  const [mapStyle, setMapStyle] = useState(
    "mapbox://styles/mapbox/streets-v12"
  );
  const [currentLocation, setCurrentLocation] = useState({});
  const [newPlace, setNewPlace] = useState(null);
  const [currentUsername, setCurrentUsername] = useState(null);
  const [currentId, setCurrentId] = useState(null);
  const [showRegister, setShowRegister] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [rating, setRating] = useState("");
  const [longPressTimeout, setLongPressTimeout] = useState(null);
  const [viewState, setViewState] = useState({
    latitude: 28.6567,
    longitude: 77.069,
    zoom: 10,
    bearing: 0,
    pitch: 0,
  });

  useEffect(() => {
    const userId = myStorage.getItem("userId");
    const username = myStorage.getItem("username");

    if (userId && username) {
      setCurrentId(userId);
      setCurrentUsername(username);
    }
    toast.info("Double click (or long press on mobile) to mark a location");
  }, [myStorage]);
  const fetchUserPins = useCallback(async () => {
    if (currentId) {
      try {
        const response = await axios.get(
          `https://location-marker-8xwq.onrender.com/api/pins/${currentId}`
          /* `http://localhost:7800/api/pins/${currentId}` */
        );
        setPins(response.data);
      } catch (error) {
        console.log("Error fetching user pins:", error.message);
        toast.error("Error fetching pins");
      }
    }
  }, [currentId]);

  useEffect(() => {
    if (currentId) {
      fetchUserPins();
    }
  }, [currentId, fetchUserPins]);

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

    try {
      const newPin = {
        username: currentUsername,
        userId: currentId,
        title,
        description: desc,
        rating: parseInt(rating),
        lat: newPlace.lat,
        long: newPlace.long,
      };
      if (!newPin.username) {
        toast.error("Please login to add a pin");
      }
      await axios.post("https://location-marker-8xwq.onrender.com/api/pins", newPin);
      fetchUserPins();
      setNewPlace(null);
      toast.success("Pin created successfully");
    } catch (error) {
      toast.error("Error creating pin, please enter Title and Rating");
      console.log("Error creating pin:", error);
    }
  };

  const handleLogout = async () => {
    try {
      await axios.post("https://location-marker-8xwq.onrender.com/api/auth/logout");
      setCurrentUsername(null);
      setCurrentId(null);
      myStorage.removeItem("username");
      myStorage.removeItem("userId");
      setPins([]);
      toast.success(`Logged out`);
    } catch (error) {
      console.log("Error logging out:", error);
      toast.error("Error logging out");
    }
  };

  const handleLogin = async (username, userId) => {
    setCurrentUsername(username);
    setCurrentId(userId);
    myStorage.setItem("username", username);
    myStorage.setItem("userId", userId);
    setShowLogin(false);
    toast.success(`${username} has been logged in`);
    fetchUserPins();
  };

  const handleRegister = async (username, userId) => {
    setCurrentUsername(username);
    setCurrentId(userId);
    myStorage.setItem("username", username);
    myStorage.setItem("userId", userId);
    setShowRegister(false);
    toast.success(`${username} registered and logged in`);
    fetchUserPins();
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this pin?")) {
      try {
        await axios.delete(
          `https://location-marker-8xwq.onrender.com/api/pins/${id}`
        );
        setPins(pins.filter((pin) => pin._id !== id));
        toast.success("Pin has been deleted");
      } catch (error) {
        toast.error("Error deleting pin", error);
      }
    }
  };

  const changeMapStyle = (newStyle) => {
    try {
      if (newStyle === mapStyle) {
        toast.info("Map style already selected");
      } else {
        setMapStyle(newStyle);
        toast.success("Map style changed");
      }
    } catch (error) {
      console.log("Error changing map style:", error);
      toast.error("Error changing map style");
    }
  };

  const mobilePressStart = (e) => {
    const timeoutId = setTimeout(() => {
      const { lng, lat } = e.lngLat;
      setNewPlace({
        long: lng,
        lat: lat,
      });
    }, 1300);

    setLongPressTimeout(timeoutId);
  };

  const mobilePressEnd = () => {
    clearTimeout(longPressTimeout);
  };

  const isMobile = /Mobi|Android/i.test(navigator.userAgent);

  return (
    <div className="w-screen h-screen overflow-hidden">
      <ToastContainer
        position="top-center"
        draggable
        theme="dark"
        autoClose={2700}
      />
      <Map
        {...viewState}
        onMove={(evt) => setViewState(evt.viewState)}
        style={{ width: "100%", height: "100%" }}
        mapboxAccessToken="pk.eyJ1IjoidmVkYW50MjEiLCJhIjoiY2x5OW0wOXZyMHR1dzJ2b2hxZTM4d2g3MSJ9.fK8JHGe7_RNazEam66wTCg"
        mapStyle={mapStyle}
        onDblClick={isMobile ? null : addPinClick} 
        onTouchStart={isMobile ? mobilePressStart : null}
        onTouchEnd={isMobile ? mobilePressEnd : null}
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
                  className={`text-2xl hover:cursor-pointer ${
                    currentUsername === pin.username
                      ? "text-red-500"
                      : "text-blue-500"
                  }`}
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
                    <div className="username text-xs">
                      Created by {pin.username}
                    </div>
                    <span className="date text-xs my-1">
                      {format(pin.createdAt)}
                    </span>
                    {(currentUsername === pin.username ||
                      (!currentUsername && pin.username === "Me")) && (
                      <button
                        className="bg-red-500 text-white px-2 py-1 mt-2 rounded-md flex items-center"
                        onClick={() => handleDelete(pin._id)}
                      >
                        <FaTrash className="mr-1" />
                        Delete
                      </button>
                    )}
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
            <div className="flex">
              <form
                className="flex flex-col p-2 rounded-md bg-white shadow-md"
                onSubmit={handleSubmit}
              >
                <label
                  htmlFor="title"
                  className="text-sm text-red-500 border-b-2 border-red-500 block mb-2"
                >
                  Title
                </label>
                <input
                  type="text"
                  placeholder="Enter a title"
                  className="px-3 py-2 border border-gray-300 rounded mb-4 focus:outline-teal-300"
                  onChange={(e) => setTitle(e.target.value)}
                />
                <label
                  htmlFor="review"
                  className="text-sm text-red-500 border-b-2 border-red-500 block mb-2"
                >
                  Review
                </label>
                <textarea
                  placeholder="Share your experience"
                  rows="3"
                  className="px-3 py-2 border border-gray-300 rounded mb-4 focus:outline-teal-300"
                  onChange={(e) => setDesc(e.target.value)}
                ></textarea>
                <label
                  htmlFor="rating"
                  className="text-sm text-red-500 border-b-2 border-red-500 block mb-2"
                >
                  Rating
                </label>
                <select
                  onChange={(e) => setRating(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded mb-4 focus:outline-teal-300"
                  defaultValue=""
                >
                  <option value="" disabled>
                    Select rating
                  </option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                </select>
                <button
                  type="submit"
                  className="px-4 py-2 bg-red-400 rounded-md text-white hover:bg-red-600"
                >
                  Add Pin
                </button>
              </form>
            </div>
          </Popup>
        )}
      </Map>
      <div className="absolute top-0 left-0 m-4 z-10 flex flex-col sm:flex-row">
        <button
          className="bg-blue-500 text-white px-2 py-1 text-xs sm:text-sm sm:px-3 sm:py-2 rounded-md mb-2 sm:mb-0 sm:mr-2 w-24 sm:w-auto "
          onClick={() => changeMapStyle("mapbox://styles/mapbox/streets-v12")}
        >
          Streets
        </button>

        <button
          className="bg-green-500 text-white px-2 py-1 text-xs sm:text-sm sm:px-3 sm:py-2 rounded-md mb-2 sm:mb-0 sm:mr-2 w-24 sm:w-auto"
          onClick={() =>
            changeMapStyle("mapbox://styles/mapbox/satellite-streets-v12")
          }
        >
          Satellite
        </button>

        <button
          className="bg-yellow-500 text-white px-2 py-1 text-xs sm:text-sm sm:px-3 sm:py-2 rounded-md w-24 sm:w-auto"
          onClick={() => changeMapStyle("mapbox://styles/mapbox/outdoors-v12")}
        >
          Outdoors
        </button>
      </div>
      <div className="absolute top-0 right-0 m-4 z-10 flex flex-col sm:flex-row">
        {currentUsername ? (
          <button
            className="bg-red-700 text-white px-2 py-1 text-xs sm:text-sm sm:px-3 sm:py-2 rounded-md w-24 sm:w-auto"
            onClick={handleLogout}
          >
            Log out
          </button>
        ) : (
          <div>
            <button
              className="bg-blue-500 text-white px-2 py-1 text-xs sm:text-sm sm:px-3 sm:py-2 rounded-md mb-2 sm:mb-0 sm:mr-2 w-24 sm:w-auto"
              onClick={() => setShowLogin(true)}
            >
              Login
            </button>
            <button
              className="bg-green-500 text-white px-2 py-1 text-xs sm:text-sm sm:px-3 sm:py-2 rounded-md w-24 sm:w-auto"
              onClick={() => setShowRegister(true)}
            >
              Register
            </button>
          </div>
        )}
      </div>
      {showLogin && (
        <div className="absolute inset-0 flex justify-center items-center bg-transparent z-20">
          <Login
            onClose={() => setShowLogin(false)}
            loginSuccess={handleLogin}
          />
        </div>
      )}
      {showRegister && (
        <div className="absolute inset-0 flex justify-center items-center bg-transparent z-20">
          <Register
            onClose={() => setShowRegister(false)}
            onRegisterSuccess={handleRegister}
          />
        </div>
      )}
    </div>
  );
}

export default App;
