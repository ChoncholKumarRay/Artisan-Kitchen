import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  return (
    <div className="bg-white shadow-md sticky top-0 z-50">
      <div className="navbar max-w-7xl mx-auto px-4">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52 space-y-1"
            >
              <li><NavLink to="/">Home</NavLink></li>
              <li><NavLink to="/menu">Food Menu</NavLink></li>
              <li><NavLink to="/contact">Contact Us</NavLink></li>
            </ul>
          </div>
          <NavLink to="/" className="flex items-center gap-2">
            <img src="/images/logo.png" alt="Artisan Kitchen Logo" className="h-10 w-10 object-contain" />
            <span className="text-2xl font-bold text-orange-600 tracking-wide">Artisan Kitchen</span>
          </NavLink>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 space-x-4 text-lg font-medium text-gray-700">
            <li><NavLink to="/" className={({ isActive }) => isActive ? 'text-orange-600' : ''}>Home</NavLink></li>
            <li><NavLink to="/menu" className={({ isActive }) => isActive ? 'text-orange-600' : ''}>Food Menu</NavLink></li>
            <li><NavLink to="/contact" className={({ isActive }) => isActive ? 'text-orange-600' : ''}>Contact Us</NavLink></li>
          </ul>
        </div>
        <div className="navbar-end">
          <a className="btn bg-orange-500 text-white hover:bg-orange-600">Order Now</a>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
