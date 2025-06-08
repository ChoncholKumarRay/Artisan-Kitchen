import React, { useEffect, useState } from 'react';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    fetch('/cart.json')
      .then(res => res.json())
      .then(data => setCartItems(data));
  }, []);

  const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div className="bg-gray-100 min-h-screen px-4 py-10">
      <h1 className="text-2xl sm:text-3xl font-bold text-center text-gray-800 mb-6">
        Shopping Cart
      </h1>

      {cartItems.length === 0 ? (
        <p className="text-center text-gray-600">Your cart is empty.</p>
      ) : (
        <div className="max-w-4xl mx-auto space-y-6">
          {cartItems.map(item => (
            <div
              key={item.product_id}
              className="bg-white rounded-lg shadow-md flex items-center gap-4 p-4"
            >
              <img
                src={item.imageUrl}
                alt={item.title}
                className="w-24 h-24 object-cover rounded-md"
              />
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-800">{item.title}</h3>
                <p className="text-sm text-gray-500 mb-1">User ID: {item.user_id}</p>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-400 line-through">৳{item.actualPrice}</span>
                  <span className="text-orange-600 font-bold">৳{item.price}</span>
                  <span className="text-gray-700 text-sm ml-2">× {item.quantity}</span>
                </div>
              </div>
              <button className="text-red-500 hover:text-red-700 text-sm font-medium">Remove</button>
            </div>
          ))}

          <div className="bg-white rounded-lg shadow-md p-5">
            <div className="flex justify-between items-center text-lg font-semibold text-gray-800 mb-4">
              <span>Total</span>
              <span>৳{totalPrice}</span>
            </div>
            <button className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-md font-semibold transition">
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
