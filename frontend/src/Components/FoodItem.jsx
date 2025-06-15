import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaPlus } from "react-icons/fa";

const FoodItem = () => {
  const navigate = useNavigate();
  const [foodItems, setFoodItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [newItem, setNewItem] = useState({
    title: "",
    description: "",
    image_url: "",
    actual_price: 0,
    discount: 0,
    price: 0,
    label: "",
    esteemed_time: 0,
  });

  const getCookie = (name) => {
    const cookieArr = document.cookie.split(";");
    for (let cookie of cookieArr) {
      const [key, value] = cookie.trim().split("=");
      if (key === name) return value;
    }
    return null;
  };

  const token = getCookie("artisan_token");

  const fetchFoodItems = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/food", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setFoodItems(data.items);
      } else {
        alert("Failed to fetch food items");
      }
    } catch (err) {
      alert("Error fetching food items");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (item_id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this item?"
    );
    if (!confirmed) return;

    try {
      const res = await fetch("http://localhost:5000/api/food/remove", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ item_id }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        alert("Food item removed successfully.");
        fetchFoodItems();
      } else {
        alert("Failed to remove item: " + data.error);
      }
    } catch (err) {
      alert("Server error while removing item.");
    }
  };

  const handleAddItem = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/food/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newItem),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        alert("Food item added successfully.");
        setShowModal(false);
        setNewItem({
          title: "",
          description: "",
          image_url: "",
          actual_price: 0,
          discount: 0,
          price: 0,
          label: "",
          esteemed_time: 0,
        });
        fetchFoodItems();
      } else {
        alert("Failed to add item: " + data.error);
      }
    } catch (err) {
      alert("Error adding food item.");
    }
  };

  useEffect(() => {
    if (!token) {
      navigate("/admin/login");
      return;
    }

    fetchFoodItems();
  }, [navigate]);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-orange-600 mb-6">
        All Food Items
      </h2>

      {loading ? (
        <p className="text-gray-600">Loading...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div
            onClick={() => setShowModal(true)}
            className="flex items-center justify-center border-4 border-dashed border-orange-300 rounded-xl h-64 cursor-pointer hover:bg-orange-50 transition"
          >
            <div className="text-center text-orange-500">
              <FaPlus className="text-4xl mx-auto mb-2" />
              <p className="font-semibold">Add Item</p>
            </div>
          </div>

          {foodItems.map((item) => (
            <div
              key={item._id}
              className="relative bg-white rounded-xl shadow hover:shadow-lg transition duration-200 overflow-hidden"
            >
              <button
                onClick={() => handleDelete(item._id)}
                className="absolute top-2 right-2 bg-red-500 text-white text-sm px-2 py-1 rounded hover:bg-red-600 z-10"
              >
                remove
              </button>

              <img
                src={item.image_url}
                alt={item.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-bold text-orange-600">
                  {item.title}
                </h3>
                <p className="text-gray-600 text-sm mb-2">{item.description}</p>
                <div className="text-sm text-gray-800 font-medium">
                  <span className="block">Price: ৳{item.price}</span>
                  <span className="block text-gray-500 line-through text-xs">
                    ৳{item.actual_price}
                  </span>
                  <span className="block">Discount: ৳{item.discount}</span>
                  <span className="block">Label: {item.label}</span>
                  <span className="block">Time: {item.esteemed_time} min</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-lg">
            <h3 className="text-xl font-bold text-orange-600 mb-4">
              Add New Food Item
            </h3>

            <div className="space-y-3">
              {Object.keys(newItem).map((key) => (
                <div key={key}>
                  <label className="block text-sm font-medium text-gray-700 capitalize">
                    {key.replace("_", " ")}
                  </label>
                  <input
                    type={typeof newItem[key] === "number" ? "number" : "text"}
                    name={key}
                    value={newItem[key]}
                    onChange={(e) =>
                      setNewItem({ ...newItem, [key]: e.target.value })
                    }
                    className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 text-black"
                  />
                </div>
              ))}
            </div>

            <div className="mt-6 flex justify-end space-x-3">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleAddItem}
                className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FoodItem;
