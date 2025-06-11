import React, { useEffect, useState } from "react";

const MenuPage = () => {
  const [menu, setMenu] = useState([]);
  const [activeFilter, setActiveFilter] = useState("all");
  const [quantities, setQuantities] = useState({});

  useEffect(() => {
    fetch("http://localhost:5000/api/menu")
      .then((res) => res.json())
      .then((data) => {
        const menuData = data[0];

        if (!menuData) {
          console.error("No menu data found");
          return;
        }

        const mergedMenu = [
          ...menuData.breakfast.items.map((item) => ({
            ...item,
            label: "breakfast",
          })),
          ...menuData.lunch.items.map((item) => ({ ...item, label: "lunch" })),
          ...menuData.dinner.items.map((item) => ({
            ...item,
            label: "dinner",
          })),
        ];

        setMenu(mergedMenu);

        const initialQuantities = {};
        mergedMenu.forEach((item) => {
          initialQuantities[item._id] = 1;
        });
        setQuantities(initialQuantities);
      })
      .catch((err) => {
        console.error("Failed to fetch menu:", err);
      });
  }, []);

  const labelColors = {
    breakfast: "bg-yellow-400 text-yellow-900",
    lunch: "bg-green-400 text-green-900",
    dinner: "bg-orange-400 text-orange-900",
  };

  const filteredMenu =
    activeFilter === "all"
      ? menu
      : menu.filter((item) => item.label === activeFilter);

  const handleQuantityChange = (id, delta) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: Math.max(1, (prev[id] || 1) + delta),
    }));
  };

  const handleAddToCart = (item) => {
    const qty = quantities[item._id] || 1;

    // Load existing cart or create a new one
    const existingCart = JSON.parse(localStorage.getItem("artisan_cart")) || {
      breakfast_items: [],
      lunch_items: [],
      dinner_items: [],
    };

    const sectionKey = `${item.label}_items`;

    // Remove existing item (if present)
    const updatedSection = existingCart[sectionKey].filter(
      (entry) => entry.item_id !== item._id
    );

    // Add updated item with more info
    updatedSection.push({
      item_id: item._id,
      quantity: qty,
      title: item.title,
      image_url: item.image_url,
      price: item.price,
    });

    // Update cart
    const updatedCart = {
      ...existingCart,
      [sectionKey]: updatedSection,
    };

    // Save updated cart
    localStorage.setItem("artisan_cart", JSON.stringify(updatedCart));

    // Update cart count (number of unique items)
    const totalCount =
      updatedCart.breakfast_items.length +
      updatedCart.lunch_items.length +
      updatedCart.dinner_items.length;

    localStorage.setItem("cart_count", totalCount.toString());
  };

  return (
    <div className="bg-gray-100 py-16 px-4 sm:px-10">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
        Todays Menu
      </h1>

      <div className="flex justify-center gap-4 mb-12 flex-wrap">
        {["all", "breakfast", "lunch", "dinner"].map((label) => (
          <button
            key={label}
            onClick={() => setActiveFilter(label)}
            className={`px-5 py-2 rounded-full text-sm font-semibold border transition-all duration-200 ${
              activeFilter === label
                ? "bg-orange-500 text-white border-orange-500"
                : "bg-white text-gray-700 border-gray-300 hover:bg-orange-100"
            }`}
          >
            {label.charAt(0).toUpperCase() + label.slice(1)}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {filteredMenu.map((item) => (
          <div
            key={item._id}
            className="bg-white rounded-xl shadow-xl hover:shadow-2xl transition-all overflow-hidden"
          >
            <div className="relative">
              <img
                src={item.image_url}
                alt={item.title}
                className="w-full h-52 object-cover"
              />
              <span
                className={`absolute top-3 left-3 px-3 py-1 text-sm font-semibold rounded-full shadow ${
                  labelColors[item.label]
                }`}
              >
                {item.label}
              </span>

              {/* Discount badge */}
              {item.discount > 0 && (
                <div
                  className="absolute bottom-3 right-3 flex flex-col items-center justify-center bg-red-500 text-white rounded-full shadow-lg border-4 border-white"
                  style={{ width: "64px", height: "64px" }}
                >
                  <span className="text-2xl font-bold leading-none select-none">
                    ৳{item.discount}
                  </span>
                  <span className="text-xs font-semibold uppercase leading-none select-none">
                    OFF
                  </span>
                </div>
              )}
            </div>

            <div className="p-5">
              <h3 className="text-xl font-bold text-orange-600 mb-2">
                {item.title}
              </h3>
              <p className="text-gray-600 text-sm">{item.description}</p>
              <div className="flex justify-between items-center mt-4 mb-2">
                <span className="text-lg font-bold text-gray-800 flex items-baseline gap-2">
                  ৳{item.price}
                  <span className="text-sm text-gray-400 line-through leading-none align-middle">
                    ৳{item.actual_price}
                  </span>
                </span>
                <span className="text-sm text-gray-500">
                  {item.esteemed_time} min
                </span>
              </div>

              <div className="flex items-center justify-between gap-4 mt-4">
                <div className="flex items-center border border-gray-300 rounded-md overflow-hidden shadow-sm">
                  <button
                    onClick={() => handleQuantityChange(item._id, -1)}
                    className="px-3 py-1 text-lg font-bold bg-gray-200 text-gray-800 hover:bg-gray-300 transition"
                  >
                    −
                  </button>
                  <span className="px-4 py-1 text-lg font-semibold text-gray-800 bg-white">
                    {quantities[item._id] || 1}
                  </span>
                  <button
                    onClick={() => handleQuantityChange(item._id, 1)}
                    className="px-3 py-1 text-lg font-bold bg-gray-200 text-gray-800 hover:bg-gray-300 transition"
                  >
                    +
                  </button>
                </div>
                <button
                  onClick={() => handleAddToCart(item)}
                  className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-4 py-2 rounded-lg"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MenuPage;
