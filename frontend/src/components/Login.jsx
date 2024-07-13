import React from "react";

const Login = ({ onClose }) => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:7800/api/auth/login",
        {
          email,
          password,
        },
        { withCredentials: true }
      );
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
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded mb-4 focus:outline-teal-200"
            required
          />
          <label htmlFor="password" className="mb-2">
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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
            onClick={onClose}
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
