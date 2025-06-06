import React, { useEffect, useState } from 'react';

const MenuPage = () => {
  const [menu, setMenu] = useState([]);
  const [activeFilter, setActiveFilter] = useState('all');

  useEffect(() => {
    fetch('/menu.json')
      .then(res => res.json())
      .then(data => setMenu(data));
  }, []);

  const labelColors = {
    breakfast: 'bg-yellow-400 text-yellow-900',
    lunch: 'bg-green-400 text-green-900',
    dinner: 'bg-orange-400 text-orange-900',
  };

  // Filtered items based on activeFilter state
  const filteredMenu =
    activeFilter === 'all'
      ? menu
      : menu.filter(item => item.label === activeFilter);

  return (
    <div className="bg-gray-100 py-16 px-4 sm:px-10">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
        Our Full Menu
      </h1>

      {/* Filter Buttons */}
      <div className="flex justify-center gap-4 mb-12 flex-wrap">
        {['all', 'breakfast', 'lunch', 'dinner'].map(label => (
          <button
            key={label}
            onClick={() => setActiveFilter(label)}
            className={`px-5 py-2 rounded-full text-sm font-semibold border transition-all duration-200 ${
              activeFilter === label
                ? 'bg-orange-500 text-white border-orange-500'
                : 'bg-white text-gray-700 border-gray-300 hover:bg-orange-100'
            }`}
          >
            {label.charAt(0).toUpperCase() + label.slice(1)}
          </button>
        ))}
      </div>

      {/* Menu Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {filteredMenu.map((item, idx) => (
          <div
            key={`${item._id}-${idx}-${activeFilter}`} // Force rerender with dynamic key
            className="bg-white rounded-xl shadow-xl hover:shadow-2xl transition-all overflow-hidden"
          >
            <div className="relative">
              <img
                src={item.imageUrl}
                alt={item.title}
                className="w-full h-52 object-cover"
              />
              <span
                className={`absolute top-3 left-3 px-3 py-1 text-sm font-semibold rounded-full shadow ${labelColors[item.label]}`}
              >
                {item.label}
              </span>
            </div>
            <div className="p-5">
              <h3 className="text-xl font-bold text-orange-600 mb-2">
                {item.title}
              </h3>
              <p className="text-gray-600 text-sm">{item.desc}</p>
              <div className="flex justify-between items-center mt-4">
                <span className="text-lg font-bold text-gray-800">
                  ৳{item.price}
                </span>
                <span className="text-sm text-gray-500">
                  {item.estimatedTime}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MenuPage;
