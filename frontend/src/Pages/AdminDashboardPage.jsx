import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import FoodItem from "../Components/FoodItem";
import {
  FaTachometerAlt,
  FaHamburger,
  FaUtensils,
  FaSignOutAlt,
  FaHome,
} from "react-icons/fa";

const AdminDashboardPage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("dashboard");

  useEffect(() => {
    const cookies = document.cookie.split(";").reduce((acc, cookie) => {
      const [key, value] = cookie.trim().split("=");
      acc[key] = value;
      return acc;
    }, {});

    if (!cookies.artisan_token) {
      navigate("/admin/login");
    }
  }, [navigate]);

  const handleLogout = () => {
    // Clear cookie
    document.cookie = "artisan_token=; path=/; max-age=0";
    window.location.href = "http://localhost:5173";
  };

  const renderContent = () => (
    <div className="p-6 relative">
      <button
        onClick={() => (window.location.href = "http://localhost:5173")}
        className="absolute top-4 right-4 bg-orange-100 text-orange-600 px-4 py-2 rounded-full hover:bg-orange-200 transition"
      >
        <FaHome className="inline mr-2" />
        Go to Home
      </button>
      {activeTab === "dashboard" && <div>Dashboard Content</div>}
      {activeTab === "food-item" && <FoodItem />}
      {activeTab === "food-menu" && <div>Food Menu Content</div>}
    </div>
  );

  return (
    <div className="flex min-h-screen bg-gray-100">
      <div className="w-64 bg-white shadow-lg p-6 flex flex-col justify-between">
        <div>
          <h2 className="text-2xl font-bold text-orange-600 mb-6">
            Admin Panel
          </h2>
          <nav className="space-y-4">
            <button
              onClick={() => setActiveTab("dashboard")}
              className={`flex items-center gap-3 px-4 py-2 rounded-md w-full text-left font-medium transition ${
                activeTab === "dashboard"
                  ? "bg-orange-500 text-white"
                  : "text-gray-700 hover:bg-orange-100"
              }`}
            >
              <FaTachometerAlt /> Dashboard
            </button>
            <button
              onClick={() => setActiveTab("food-item")}
              className={`flex items-center gap-3 px-4 py-2 rounded-md w-full text-left font-medium transition ${
                activeTab === "food-item"
                  ? "bg-orange-500 text-white"
                  : "text-gray-700 hover:bg-orange-100"
              }`}
            >
              <FaHamburger /> Food Item
            </button>
            <button
              onClick={() => setActiveTab("food-menu")}
              className={`flex items-center gap-3 px-4 py-2 rounded-md w-full text-left font-medium transition ${
                activeTab === "food-menu"
                  ? "bg-orange-500 text-white"
                  : "text-gray-700 hover:bg-orange-100"
              }`}
            >
              <FaUtensils /> Food Menu
            </button>
          </nav>
        </div>
        <button
          onClick={handleLogout}
          className="mt-8 flex items-center gap-2 px-4 py-2 bg-red-100 text-red-600 hover:bg-red-200 rounded-md font-medium transition"
        >
          <FaSignOutAlt /> Logout
        </button>
      </div>

      <div className="flex-1 bg-white shadow-inner">{renderContent()}</div>
    </div>
  );
};

export default AdminDashboardPage;
