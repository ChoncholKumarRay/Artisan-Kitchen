import React, { useState } from 'react';
import { ShoppingCart, Clock, Star, Plus } from 'lucide-react';

const ArtisanKitchen = () => {
  const [cartCount, setCartCount] = useState(0);

  const breakfastItems = [
    {
      id: 1,
      name: "Traditional Paratha with Curry",
      price: 45,
      image: "🥪",
      rating: 4.5,
      time: "15-20 min",
      description: "Fresh paratha served with vegetable curry"
    },
    {
      id: 2,
      name: "Egg Bhurji with Bread",
      price: 40,
      image: "🍳",
      rating: 4.3,
      time: "10-15 min",
      description: "Spiced scrambled eggs with toasted bread"
    },
    {
      id: 3,
      name: "Mixed Vegetable Khichuri",
      price: 35,
      image: "🍲",
      rating: 4.4,
      time: "20-25 min",
      description: "Comfort food with rice, lentils and vegetables"
    }
  ];

  const lunchItems = [
    {
      id: 4,
      name: "Chicken Biriyani",
      price: 120,
      image: "🍛",
      rating: 4.8,
      time: "25-30 min",
      description: "Authentic chicken biriyani with raita"
    },
    {
      id: 5,
      name: "Fish Curry with Rice",
      price: 90,
      image: "🐟",
      rating: 4.6,
      time: "20-25 min",
      description: "Fresh fish curry served with steamed rice"
    },
    {
      id: 6,
      name: "Beef Tehari",
      price: 110,
      image: "🥘",
      rating: 4.7,
      time: "30-35 min",
      description: "Spiced beef with fragrant basmati rice"
    }
  ];

  const dinnerItems = [
    {
      id: 7,
      name: "Mutton Curry Set",
      price: 150,
      image: "🍖",
      rating: 4.9,
      time: "35-40 min",
      description: "Tender mutton curry with rice and vegetables"
    },
    {
      id: 8,
      name: "Mixed Vegetable Platter",
      price: 70,
      image: "🥗",
      rating: 4.4,
      time: "15-20 min",
      description: "Healthy mix of seasonal vegetables with rice"
    },
    {
      id: 9,
      name: "Chicken Roast Dinner",
      price: 130,
      image: "🍗",
      rating: 4.6,
      time: "25-30 min",
      description: "Grilled chicken with sides and bread"
    }
  ];

  const addToCart = (item) => {
    setCartCount(cartCount + 1);
    // Add cart functionality here
  };

  const FoodCard = ({ item }) => (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group">
      <div className="relative p-6 text-center">
        <div className="text-6xl mb-4 group-hover:scale-110 transition-transform duration-300">
          {item.image}
        </div>
        <div className="absolute top-4 right-4 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
          ৳{item.price}
        </div>
      </div>
      
      <div className="p-6 pt-0">
        <h3 className="font-bold text-lg text-gray-800 mb-2">{item.name}</h3>
        <p className="text-gray-600 text-sm mb-4">{item.description}</p>
        
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <Star className="w-4 h-4 text-yellow-400 fill-current" />
            <span className="text-sm font-medium">{item.rating}</span>
          </div>
          <div className="flex items-center space-x-1 text-gray-500">
            <Clock className="w-4 h-4" />
            <span className="text-sm">{item.time}</span>
          </div>
        </div>
        
        <button 
          onClick={() => addToCart(item)}
          className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2"
        >
          <Plus className="w-4 h-4" />
          <span>Add to Cart</span>
        </button>
      </div>
    </div>
  );

  const FoodSection = ({ title, items, bgColor }) => (
    <section className={`py-16 ${bgColor}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">{title}</h2>
          <div className="w-24 h-1 bg-orange-500 mx-auto"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {items.map(item => (
            <FoodCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </section>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="bg-white shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="text-3xl">🍽</div>
              <span className="font-bold text-2xl text-gray-800">Artisan Kitchen</span>
            </div>
            
            {/* Navigation Links */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="#home" className="text-orange-500 font-semibold hover:text-orange-600 transition-colors">
                Home
              </a>
              <a href="#food-items" className="text-gray-700 font-medium hover:text-orange-500 transition-colors">
                Food Items
              </a>
              <div className="relative">
                <a href="#cart" className="text-gray-700 font-medium hover:text-orange-500 transition-colors flex items-center space-x-1">
                  <ShoppingCart className="w-5 h-5" />
                  <span>Cart</span>
                  {cartCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {cartCount}
                    </span>
                  )}
                </a>
              </div>
              <button className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-6 rounded-lg transition-colors">
                Sign In
              </button>
            </div>
            
            {/* Mobile menu button */}
            <div className="md:hidden">
              <button className="text-gray-700 hover:text-orange-500">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-orange-400 via-red-500 to-pink-500 text-white py-24">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Delicious Food<br />
            <span className="text-yellow-300">Delivered Fast</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto leading-relaxed">
            Experience the best food delivery service near SUST campus. Fresh, authentic, and delivered right to your doorstep.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-orange-500 font-bold py-4 px-8 rounded-lg text-lg hover:bg-gray-100 transition-colors shadow-lg">
              Order Now
            </button>
            <button className="border-2 border-white text-white font-bold py-4 px-8 rounded-lg text-lg hover:bg-white hover:text-orange-500 transition-colors">
              View Menu
            </button>
          </div>
          
          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mt-16">
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">500+</div>
              <div className="text-lg opacity-90">Happy Students</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">50+</div>
              <div className="text-lg opacity-90">Menu Items</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">15min</div>
              <div className="text-lg opacity-90">Avg Delivery</div>
            </div>
          </div>
        </div>
      </section>

      {/* Food Sections */}
      <FoodSection title="Breakfast" items={breakfastItems} bgColor="bg-gray-50" />
      <FoodSection title="Lunch" items={lunchItems} bgColor="bg-white" />
      <FoodSection title="Dinner" items={dinnerItems} bgColor="bg-gray-50" />

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="text-3xl">🍽</div>
            <span className="font-bold text-2xl">Artisan Kitchen</span>
          </div>
          <p className="text-gray-400 mb-4">
            Serving delicious meals to SUST students with love and care.
          </p>
          <div className="flex justify-center space-x-6 text-sm">
            <a href="#" className="hover:text-orange-400 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-orange-400 transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-orange-400 transition-colors">Contact Us</a>
          </div>
          <div className="mt-6 pt-6 border-t border-gray-700 text-gray-400 text-sm">
            © 2024 Artisan Kitchen. Made with ❤ for SUST students.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ArtisanKitchen;