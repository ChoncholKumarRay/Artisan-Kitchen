import React, { useEffect, useState, useRef } from 'react';

const Menu = () => {
  const [menu, setMenu] = useState([]);
  const [quantities, setQuantities] = useState({});
  const scrollRefs = {
    breakfast: useRef(null),
    lunch: useRef(null),
    dinner: useRef(null),
  };

  useEffect(() => {
    fetch('/menu.json')
      .then(res => res.json())
      .then(data => {
        setMenu(data);
        const initial = {};
        data.forEach(item => {
          initial[item._id] = 1;
        });
        setQuantities(initial);
      });
  }, []);

  const scroll = (label, direction) => {
    scrollRefs[label].current.scrollBy({
      left: direction === 'left' ? -320 : 320,
      behavior: 'smooth',
    });
  };

  const changeQty = (id, delta) => {
    setQuantities(prev => ({
      ...prev,
      [id]: Math.max(1, (prev[id] || 1) + delta),
    }));
  };

  const handleAdd = (item) => {
    const qty = quantities[item._id] || 1;
    alert(`Added ${qty} × ${item.title} to cart.`);
  };

  const renderSection = (label, bgColor) => {
    const items = menu.filter(item => item.label === label);

    return (
      <section className={`py-20 px-6 sm:px-10 ${bgColor}`}>
        <div className="mb-14 text-center">
          <h2 className="text-4xl font-extrabold text-gray-900 capitalize mb-3">
            {label} <span className="text-orange-500">Specials</span>
          </h2>
          <div className="w-40 h-1 mx-auto bg-gradient-to-r from-gray-400 via-gray-400 to-orange-500 rounded-full"></div>
        </div>

        <div className="relative">
          <button
            onClick={() => scroll(label, 'left')}
            className="absolute left-0 top-1/2 -translate-y-1/2 bg-orange-500 text-white p-3 rounded-full shadow hover:bg-orange-600 z-10"
          >
            ←
          </button>

          <div
            ref={scrollRefs[label]}
            className="flex overflow-x-auto gap-10 scroll-smooth no-scrollbar px-10"
          >
            {items.map(item => (
              <div
                key={item._id}
                className="min-w-[340px] bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
              >
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6 space-y-3">
                  <h3 className="text-xl font-bold text-orange-600">{item.title}</h3>
                  <p className="text-gray-600 text-sm">{item.desc}</p>

                  <div className="flex justify-between items-center">
                    <span className="text-lg font-bold text-gray-800">৳{item.price}</span>
                    <span className="text-sm text-gray-500">{item.estimatedTime}</span>
                  </div>

                  <div className="flex items-center justify-between gap-4 mt-3">
                    <div className="flex border border-gray-300 rounded-md overflow-hidden">
                      <button
                        onClick={() => changeQty(item._id, -1)}
                        className="px-3 py-1 bg-gray-200 text-gray-700 hover:bg-gray-300"
                      >
                        −
                      </button>
                      <span className="px-4 py-1 bg-white text-gray-900 font-semibold">
                        {quantities[item._id]}
                      </span>
                      <button
                        onClick={() => changeQty(item._id, 1)}
                        className="px-3 py-1 bg-gray-200 text-gray-700 hover:bg-gray-300"
                      >
                        +
                      </button>
                    </div>

                    <button
                      onClick={() => handleAdd(item)}
                      className="bg-gradient-to-r from-orange-500 to-orange-400 hover:from-orange-600 hover:to-orange-500 text-white px-4 py-2 rounded-lg font-semibold transition"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={() => scroll(label, 'right')}
            className="absolute right-0 top-1/2 -translate-y-1/2 bg-orange-500 text-white p-3 rounded-full shadow hover:bg-orange-600 z-10"
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
