import React, { useRef } from "react";

const Register = ({ onClose }) => {
  const [success, setSuccess] = React.useState(false);
  const [error, setError] = React.useState(false);
  const nameRef = useRef();
  const mailRef = useRef();
  const passRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newUser = {
        username: nameRef.current.value,
        email: mailRef.current.value,
        password: passRef.current.value,
      };
      await axios.post("/users/register", newUser);
      setSuccess(true);
      setError(false);
    } catch (error) {
      console.log(error);
      setError(true);
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
          placeholder="Enter your username"
          ref={nameRef}
          className="px-3 py-2 border border-gray-300 rounded mb-4"
        />
        <label htmlFor="email" className="mb-2">
          Email
        </label>
        <input
          type="text"
          placeholder="Enter your email"
          ref={mailRef}
          className="px-3 py-2 border border-gray-300 rounded mb-4"
        />
        <label htmlFor="password" className="mb-2">
          Password
        </label>
        <input
          type="password"
          ref={passRef}
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
      {error && (
        <div className="text-red-500 text-center mt-4">
          Error! Please try again.
        </div>
      )}
    </div>
  );
};

export default Register;
