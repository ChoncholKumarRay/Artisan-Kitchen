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
      <section className={`py-16 px-6 sm:px-10 ${bgColor}`}>
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-4xl font-bold text-gray-800 capitalize tracking-wide">
            {label} Specials
          </h2>
          <button className="text-orange-500 text-lg font-medium hover:underline transition-all">
            Show More
          </button>
        </div>

        <div className="relative">
          {/* Scroll Buttons */}
          <button
            onClick={() => scrollLeft(label)}
            className="absolute -left-5 top-1/2 transform -translate-y-1/2 bg-orange-500 text-white p-3 rounded-full shadow-md hover:bg-orange-600 z-10"
          >
            &larr;
          </button>

          <div
            ref={scrollRefs[label]}
            className="flex overflow-x-auto gap-16 scroll-smooth no-scrollbar pb-4 px-6"
          >
            {items.map(item => (
              <div
                key={item._id}
                className="min-w-[340px] bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300"
              >
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-full h-48 object-cover rounded-t-xl"
                />
                <div className="p-5">
                  <h3 className="text-xl font-bold text-orange-600 mb-2">{item.title}</h3>
                  <p className="text-gray-600 text-sm">{item.desc}</p>
                  <div className="flex justify-between items-center mt-4">
                    <span className="text-lg font-bold text-gray-800">৳{item.price}</span>
                    <span className="text-sm text-gray-500">{item.estimatedTime}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={() => scrollRight(label)}
            className="absolute -right-5 top-1/2 transform -translate-y-1/2 bg-orange-500 text-white p-3 rounded-full shadow-md hover:bg-orange-600 z-10"
          >
            &rarr;
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
