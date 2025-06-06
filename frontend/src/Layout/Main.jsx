import React from 'react';
import Navbar from '../Components/Navbar';
import { Outlet } from "react-router-dom"
import Footer from '../Components/Footer';

const Main = () => {
  return (
    <div className="min-h-screen w-full flex flex-col overflow-hidden bg-white">
      <Navbar />
      <main className="flex-grow w-full">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};


export default Main;