import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({
    phone: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { phone, password } = formData;

    if (password.length < 6) {
      alert("Password must be at least 6 characters");
      return;
    }

    try {
      // Backend API address
      const response = await fetch("http://localhost:5000/api/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ phone, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // Saving user data as a local storage variable.
        localStorage.setItem("artisan_user", JSON.stringify(data.user));
        // Navigate to homepage and refresh
        window.location.href = "/";
      } else {
        alert(`Login failed: ${data.error || "Unknown error"}`);
      }
    } catch (err) {
      alert("Failed to connect to server");
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 to-orange-100 px-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-xl p-8 sm:p-10">
        <h2 className="text-3xl font-bold text-center text-orange-600 mb-8">
          Welcome Back
        </h2>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Phone Number
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="01XXXXXXXXX"
              className="w-full text-gray-900 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400 transition duration-200"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className="w-full text-gray-900 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400 transition duration-200"
              required
            />
          </div>

          <div>
            <button
              type="submit"
              className="w-full bg-orange-500 text-white font-semibold py-2.5 rounded-lg hover:bg-orange-600 transition duration-300 shadow-md hover:shadow-lg"
            >
              Login
            </button>
          </div>
        </form>

        <div className="text-center text-sm text-gray-600 mt-6">
          Don&apos;t have an account?{" "}
          <Link to="/register" className="text-orange-500 hover:underline">
            Register
          </Link>
        </div>

        <p className="text-center text-sm text-gray-600 mt-2 hover:text-orange-500 cursor-pointer transition">
          Forgot Password?
        </p>
      </div>
    </div>
  );
};

export default Login;
