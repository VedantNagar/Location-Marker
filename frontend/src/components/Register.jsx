import React from "react";

const Register = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-72 p-6 border-1 border-gray-300 rounded-md">
        <h2 className="text-center text-xl mb-4">Register</h2>
        <form className="flex flex-col">
          <label htmlFor="username" className="mb-2">
            Username
          </label>
          <input
            type="text"
            placeholder="Enter your username"
            className="px-3 py-2 border border-gray-300 rounded mb-4"
          />
          <label htmlFor="email" className="mb-2">
            Email
          </label>
          <input
            type="text"
            placeholder="Enter your email"
            className="px-3 py-2 border border-gray-300 rounded mb-4"
          />
          <label htmlFor="password" className="mb-2">
            Password
          </label>
          <input
            type="password"
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
      </div>
    </div>
  );
};

export default Register;
