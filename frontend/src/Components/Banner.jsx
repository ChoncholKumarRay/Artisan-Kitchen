import React from 'react';

const Banner = () => {
  return (
    <div className="relative h-[90vh] w-full">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat filter blur-sm"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.7)), url('https://images.unsplash.com/photo-1589010588553-46e8e7c21788?q=80&w=1560&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')`,
        }}
      ></div>

      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-white text-4xl sm:text-6xl font-extrabold mb-4 drop-shadow-md">
          Welcome to <span className="text-orange-400">Artisan Kitchen</span>
        </h1>
        <p className="text-white text-lg sm:text-xl max-w-2xl mb-6 drop-shadow">
          Authentic Bangladeshi flavors made fresh near SUST. Savor the tradition, one plate at a time.
        </p>
        <button className="bg-orange-500 text-white font-semibold py-3 px-8 rounded-lg text-lg hover:bg-orange-600 transition-all duration-300 shadow-lg hover:scale-105">
          View More
        </button>
      </div>
    </div>
  );
};

export default Banner;
