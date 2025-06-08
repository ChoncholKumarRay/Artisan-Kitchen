import React from 'react';

const Login = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 to-orange-100 px-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-xl p-8 sm:p-10">
        <h2 className="text-3xl font-bold text-center text-orange-600 mb-8">
          Welcome Back
        </h2>

        <form className="space-y-6">
          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
            <input
              type="email"
              placeholder="you@example.com"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400 transition duration-200"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400 transition duration-200"
              required
            />
          </div>

          {/* Login Button */}
          <div>
            <button
              type="submit"
              className="w-full bg-orange-500 text-white font-semibold py-2.5 rounded-lg hover:bg-orange-600 transition duration-300 shadow-md hover:shadow-lg"
            >
              Login
            </button>
          </div>
        </form>

        {/* Extra links */}
        <p className="text-center text-sm text-gray-600 mt-6">
          Don't have an account?{' '}
          <span className="text-orange-500 hover:underline cursor-pointer">
            Register
          </span>
        </p>
        <p className="text-center text-sm text-gray-600 mt-2 hover:text-orange-500 cursor-pointer transition">
          Forgot Password?
        </p>
      </div>
    </div>
  );
};

export default Login;
