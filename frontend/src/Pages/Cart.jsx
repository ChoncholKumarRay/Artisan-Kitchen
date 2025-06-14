import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);

  // Load cart items from localStorage
  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("artisan_cart")) || {
      breakfast_items: [],
      lunch_items: [],
      dinner_items: [],
    };

    const combinedItems = [
      ...savedCart.breakfast_items.map((item) => ({
        ...item,
        label: "breakfast",
      })),
      ...savedCart.lunch_items.map((item) => ({ ...item, label: "lunch" })),
      ...savedCart.dinner_items.map((item) => ({ ...item, label: "dinner" })),
    ];

    setCartItems(combinedItems);
  }, []);

  const handleRemove = (itemToRemove) => {
    const savedCart = JSON.parse(localStorage.getItem("artisan_cart")) || {
      breakfast_items: [],
      lunch_items: [],
      dinner_items: [],
    };

    const sectionKey = `${itemToRemove.label}_items`;
    const updatedSection = savedCart[sectionKey].filter(
      (item) => item.item_id !== itemToRemove.item_id
    );

    const updatedCart = {
      ...savedCart,
      [sectionKey]: updatedSection,
    };

    localStorage.setItem("artisan_cart", JSON.stringify(updatedCart));

    const totalCount =
      updatedCart.breakfast_items.length +
      updatedCart.lunch_items.length +
      updatedCart.dinner_items.length;
    localStorage.setItem("cart_count", totalCount.toString());

    const updatedItems = cartItems.filter(
      (item) => item.item_id !== itemToRemove.item_id
    );
    setCartItems(updatedItems);
  };

  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleCheckout = async () => {
    setLoading(true);

    const user = JSON.parse(localStorage.getItem("artisan_user"));
    const cart = JSON.parse(localStorage.getItem("artisan_cart"));

    if (!user || !user.user_id || !cart) {
      alert("Missing user or cart data.");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: user.user_id,
          breakfast_items: cart.breakfast_items,
          lunch_items: cart.lunch_items,
          dinner_items: cart.dinner_items,
        }),
      });

      const result = await response.json();
      //alert(result.message || result.error || "Something happened");

      setLoading(false);
      const orderId = result.order_id;
      
      localStorage.removeItem("artisan_cart");
      navigate(`/checkout/${orderId}`);

    } catch (err) {
      console.error(err);
      alert("Failed to place order");
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen px-4 py-10">
      <h1 className="text-2xl sm:text-3xl font-bold text-center text-gray-800 mb-6">
        Shopping Cart
      </h1>

      {cartItems.length === 0 ? (
        <p className="text-center text-gray-600">Your cart is empty.</p>
      ) : (
        <div className="max-w-4xl mx-auto space-y-6">
          {cartItems.map((item) => (
            <div
              key={item.item_id}
              className="bg-white rounded-lg shadow-md flex items-center gap-4 p-4"
            >
              <img
                src={item.image_url}
                alt={item.title}
                className="w-24 h-24 object-cover rounded-md"
              />
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-800">
                  {item.title}
                </h3>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-orange-600 font-bold">
                    ৳{item.price}
                  </span>
                  <span className="text-gray-700 text-sm ml-2">
                    × {item.quantity}
                  </span>
                </div>
              </div>
              <button
                onClick={() => handleRemove(item)}
                className="text-red-500 hover:text-red-700 text-sm font-medium"
              >
                Remove
              </button>
            </div>
          ))}

          <div className="bg-white rounded-lg shadow-md p-5">
            <div className="flex justify-between items-center text-lg font-semibold text-gray-800 mb-4">
              <span>Total</span>
              <span>৳{totalPrice}</span>
            </div>
            <button
              onClick={handleCheckout}
              disabled={loading}
              className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-md font-semibold transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <div className="flex items-center justify-center gap-2">
                  <svg
                    className="animate-spin h-5 w-5 text-white"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                    />
                  </svg>
                  <span>Processing...</span>
                </div>
              ) : (
                "Proceed to Checkout"
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
