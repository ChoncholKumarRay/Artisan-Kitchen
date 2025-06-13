import React, { useEffect, useState, useRef } from "react";
import Swal from "sweetalert2";

const Menu = () => {
  const [menu, setMenu] = useState({});
  const [quantities, setQuantities] = useState({});
  const scrollRefs = {
    breakfast: useRef(null),
    lunch: useRef(null),
    dinner: useRef(null),
  };

  useEffect(() => {
    fetch("http://localhost:5000/api/menu")
      .then((res) => res.json())
      .then((data) => {
        const menuData = data[0];
        if (!menuData) {
          console.error("No menu data found");
          return;
        }

        const labeledMenu = {
          breakfast: {
            ...menuData.breakfast,
            items: menuData.breakfast.items.map((item) => ({
              ...item,
              label: "breakfast",
            })),
          },
          lunch: {
            ...menuData.lunch,
            items: menuData.lunch.items.map((item) => ({
              ...item,
              label: "lunch",
            })),
          },
          dinner: {
            ...menuData.dinner,
            items: menuData.dinner.items.map((item) => ({
              ...item,
              label: "dinner",
            })),
          },
        };

        setMenu(labeledMenu);

        const allItems = [
          ...labeledMenu.breakfast.items,
          ...labeledMenu.lunch.items,
          ...labeledMenu.dinner.items,
        ];

        const initialQuantities = {};
        allItems.forEach((item) => {
          initialQuantities[item._id] = 1;
        });
        setQuantities(initialQuantities);
      })
      .catch((err) => {
        console.error("Failed to fetch menu:", err);
      });
  }, []);

  const scroll = (label, direction) => {
    scrollRefs[label].current.scrollBy({
      left: direction === "left" ? -320 : 320,
      behavior: "smooth",
    });
  };

  const changeQty = (id, delta) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: Math.max(1, (prev[id] || 1) + delta),
    }));
  };

  const handleAddToCart = (item) => {
    const qty = quantities[item._id] || 1;

    const existingCart = JSON.parse(localStorage.getItem("artisan_cart")) || {
      breakfast_items: [],
      lunch_items: [],
      dinner_items: [],
    };

    const sectionKey = `${item.label}_items`;
    const updatedSection = existingCart[sectionKey].filter(
      (entry) => entry.item_id !== item._id
    );

    updatedSection.push({
      item_id: item._id,
      quantity: qty,
      title: item.title,
      image_url: item.image_url,
      price: item.price,
    });

    const updatedCart = {
      ...existingCart,
      [sectionKey]: updatedSection,
    };

    localStorage.setItem("artisan_cart", JSON.stringify(updatedCart));

    const totalCount =
      updatedCart.breakfast_items.length +
      updatedCart.lunch_items.length +
      updatedCart.dinner_items.length;

    localStorage.setItem("cart_count", totalCount.toString());

    Swal.fire({
      toast: true,
      position: "top-end",
      icon: "success",
      title: `${qty} × ${item.title} added to cart`,
      showConfirmButton: false,
      timer: 1000,
    });
  };

  const renderSection = (label, bgColor) => {
    const items = menu?.[label]?.items || [];

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
            onClick={() => scroll(label, "left")}
            className="absolute left-0 top-1/2 -translate-y-1/2 bg-orange-500 text-white p-3 rounded-full shadow hover:bg-orange-600 z-10"
          >
            ←
          </button>

          <div
            ref={scrollRefs[label]}
            className="flex overflow-x-auto gap-10 scroll-smooth no-scrollbar px-10"
          >
            {items.map((item) => (
              <div
                key={item._id}
                className="min-w-[340px] bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 relative"
              >
                <img
                  src={item.image_url}
                  alt={item.title}
                  className="w-full h-48 object-cover"
                />

                {item.discount > 0 && (
                  <div
                    className="absolute top-3 right-3 flex flex-col items-center justify-center bg-red-500 text-white rounded-full shadow-lg border-4 border-white"
                    style={{ width: "60px", height: "60px" }}
                  >
                    <span className="text-lg font-bold leading-none select-none">
                      ৳{item.discount}
                    </span>
                    <span className="text-xs font-semibold uppercase leading-none select-none">
                      OFF
                    </span>
                  </div>
                )}

                <div className="p-6 space-y-3">
                  <h3 className="text-xl font-bold text-orange-600">{item.title}</h3>
                  <p className="text-gray-600 text-sm">{item.description}</p>

                  <div className="flex justify-between items-center">
                    <span className="text-lg font-bold text-gray-800 flex gap-2">
                      ৳{item.price}
                      {item.actual_price && (
                        <span className="text-sm text-gray-400 line-through">
                          ৳{item.actual_price}
                        </span>
                      )}
                    </span>
                    <span className="text-sm text-gray-500">{item.esteemed_time} min</span>
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
                      onClick={() => handleAddToCart(item)}
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
            onClick={() => scroll(label, "right")}
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
      {renderSection("breakfast", "bg-yellow-50")}
      {renderSection("lunch", "bg-white")}
      {renderSection("dinner", "bg-orange-50")}
    </div>
  );
};

export default Menu;
