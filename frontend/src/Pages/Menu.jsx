import React, { useEffect, useState, useRef } from 'react';

const Menu = () => {
  const [menu, setMenu] = useState([]);
  const scrollRefs = {
    breakfast: useRef(null),
    lunch: useRef(null),
    dinner: useRef(null),
  };

  useEffect(() => {
    fetch('/menu.json')
      .then(res => res.json())
      .then(data => setMenu(data));
  }, []);

  const scrollLeft = (label) => {
    scrollRefs[label].current.scrollBy({ left: -320, behavior: 'smooth' });
  };

  const scrollRight = (label) => {
    scrollRefs[label].current.scrollBy({ left: 320, behavior: 'smooth' });
  };

  const renderSection = (label, bgColor) => {
    const items = menu.filter(item => item.label === label);

    return (
      <section className={`py-12 px-4 ${bgColor}`}>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-gray-800 capitalize">{label}</h2>
          <button className="text-orange-500 font-semibold hover:underline">Show More</button>
        </div>

        <div className="relative">
          {/* Scroll buttons */}
          <button
            onClick={() => scrollLeft(label)}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-orange-500 text-white p-2 rounded-full z-10 hover:bg-orange-600"
          >
            ←
          </button>
          <div
            ref={scrollRefs[label]}
            className="flex overflow-x-auto gap-16 no-scrollbar scroll-smooth px-10"
          >
            {items.map(item => (
              <div key={item._id} className="min-w-[300px] bg-white rounded-xl shadow-lg hover:shadow-xl transition">
                <img src={item.imageUrl} alt={item.title} className="w-full h-48 object-cover rounded-t-xl" />
                <div className="p-4">
                  <h3 className="font-semibold text-lg text-orange-600">{item.title}</h3>
                  <p className="text-gray-500 text-sm">{item.desc}</p>
                  <div className="flex justify-between items-center mt-3">
                    <span className="text-lg font-bold text-gray-800">৳{item.price}</span>
                    <span className="text-sm text-gray-400">{item.estimatedTime}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <button
            onClick={() => scrollRight(label)}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-orange-500 text-white p-2 rounded-full z-10 hover:bg-orange-600"
          >
            →
          </button>
        </div>
      </section>
    );
  };

  return (
    <div className="bg-gray-50">
      {renderSection('breakfast', 'bg-yellow-50')}
      {renderSection('lunch', 'bg-white')}
      {renderSection('dinner', 'bg-orange-50')}
    </div>
  );
};

export default Menu;
