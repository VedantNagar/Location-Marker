import React, { useRef } from "react";
import axios from "axios";

const Register = ({ onClose, onRegisterSuccess }) => {
  const [success, setSuccess] = React.useState(false);
  const [error, setError] = React.useState(false);
  const [formData, setFormData] = React.useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!formData.username || !formData.email || !formData.password) {
        setError("All fields are required");
        return;
      }
      const res = await axios.post(
        "http://localhost:7800/api/auth/register",
        formData
      );
      setSuccess(true);
      onRegisterSuccess(res.data.username);
    } catch (error) {
      setError(error.response?.data || "An error occurred");
    }
  };

  return (
    <div className="bg-slate-50 bg-opacity-60 w-72 p-6 rounded-md shadow-lg">
      <h2 className="text-center text-2xl mb-4">Register</h2>
      <form className="flex flex-col" onSubmit={handleSubmit}>
        <label htmlFor="username" className="mb-2">
          Username
        </label>
        <input
          type="text"
          name="username"
          placeholder="Enter your username"
          value={formData.username}
          onChange={handleChange}
          className="px-3 py-2 border border-gray-300 rounded mb-4"
        />
        <label htmlFor="email" className="mb-2">
          Email
        </label>
        <input
          type="email"
          name="email"
          placeholder="Enter your email"
          value={formData.email}
          onChange={handleChange}
          className="px-3 py-2 border border-gray-300 rounded mb-4"
        />
        <label htmlFor="password" className="mb-2">
          Password
        </label>
        <input
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Enter your password"
          className="px-3 py-2 border border-gray-300 rounded mb-4"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Register
        </button>
      </form>
      <button
        onClick={onClose}
        className="mt-4 px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 w-full"
      >
        Close
      </button>
      {success && (
        <div className="text-green-500 text-center mt-4">
          Success! You can now log in.
        </div>
      )}
      {error && <div className="text-red-500 text-center mt-4">{error}</div>}
    </div>
  );
};

export default Register;
