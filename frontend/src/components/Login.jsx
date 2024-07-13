import React from "react";

const Login = () => {
  const mailRef = React.useRef();
  const passRef = React.useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = {
        email: mailRef.current.value,
        password: passRef.current.value,
      };
      const res = await axios.post("/users/login", user);
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div
        className="bg-slate-50 bg-opacity-60 rounded-md shadow-sm
      w-72 h-auto p-8"
      >
        <h2 className="text-center text-2xl mb-4">Login</h2>
        <form className="flex flex-col mx-auto my-auto" onSubmit={handleSubmit}>
          <label htmlFor="email" className="mb-2">
            Email
          </label>
          <input
            type="text"
            placeholder="Enter your email"
            ref={mailRef}
            className="px-3 py-2 border border-gray-300 rounded mb-4 focus:outline-teal-200"
          />
          <label htmlFor="password" className="mb-2">
            Password
          </label>
          <input
            type="password"
            ref={passRef}
            placeholder="Enter your password"
            className="px-3 py-2 border border-gray-300 rounded mb-4 focus:outline-teal-200"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Login
          </button>
          <button
            /* onClick={onClose} */
            className="mt-4 px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 w-full flex-col"
          >
            Close
          </button>
        </form>
      </div>
    </>
  );
};

export default Login;
