import React, { useState, useEffect, useRef } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { ShoppingCart } from "lucide-react";

const Navbar = () => {
  const [user, setUser] = useState(null);
  const [cartCount, setCartCount] = useState(() =>
    parseInt(localStorage.getItem("cart_count") || "0", 10)
  );
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("artisan_user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // Sync cart_count
  useEffect(() => {
    const interval = setInterval(() => {
      const latestCount = parseInt(
        localStorage.getItem("cart_count") || "0",
        10
      );
      setCartCount(latestCount);
    }, 500);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleStorage = (e) => {
      if (e.key === "cart_count") {
        setCartCount(parseInt(e.newValue || "0", 10));
      }
    };
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("artisan_user");
    localStorage.removeItem("artisan_cart");
    localStorage.removeItem("cart_count");
    setUser(null);
    setShowDropdown(false);
    navigate("/login");
  };

  return (
    <div className="bg-white shadow-md sticky top-0 z-50">
      <div className="navbar max-w-7xl mx-auto px-4">
        <div className="navbar-start">
          <NavLink to="/" className="flex items-center gap-2">
            <img
              src="/images/logo.png"
              alt="Artisan Kitchen Logo"
              className="h-10 w-10 object-contain"
            />
            <span className="text-2xl font-bold text-orange-600 tracking-wide">
              Artisan Kitchen
            </span>
          </NavLink>
        </div>

        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 space-x-4 text-lg font-medium text-gray-700">
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive ? "text-orange-600" : ""
                }
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/menu"
                className={({ isActive }) =>
                  isActive ? "text-orange-600" : ""
                }
              >
                Food Menu
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/contact"
                className={({ isActive }) =>
                  isActive ? "text-orange-600" : ""
                }
              >
                Contact Us
              </NavLink>
            </li>
          </ul>
        </div>
        <div className="navbar-end flex items-center space-x-2">
          <Link to={"/cart"}>
            <div className="relative text-gray-700 font-medium hover:text-orange-500 transition-colors flex items-center space-x-1">
              <ShoppingCart className="w-5 h-5" />
              <span>Cart</span>
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </div>
          </Link>

          {user ? (
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setShowDropdown((prev) => !prev)}
                className="btn btn-ghost rounded-full p-2 hover:bg-orange-100"
                title={user.name}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-7 w-7 text-orange-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5.121 17.804A8.962 8.962 0 0112 15c2.19 0 4.21.777 5.879 2.08M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <circle
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="2"
                    fill="none"
                  />
                </svg>
              </button>

              {showDropdown && (
                <div className="absolute right-0 mt-2 w-36 bg-white border border-gray-300 rounded shadow-md z-50">
                  <Link
                    to="/profile"
                    className="block px-4 py-2 hover:bg-orange-100 text-gray-800"
                    onClick={() => setShowDropdown(false)}
                  >
                    Profile
                  </Link>
                  <Link
                    to="/orders"
                    className="block px-4 py-2 hover:bg-orange-100 text-gray-800"
                    onClick={() => setShowDropdown(false)}
                  >
                    Orders
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-100"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link
              to={"/login"}
              className="btn bg-orange-500 text-white hover:bg-orange-600"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
