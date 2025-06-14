import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const CheckoutPage = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();

  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
    phone: "",
    address: ""
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("artisan_user"));
    if (user) {
      setFormValues({
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
        address: user.address || "",
      });
    }
  }, []);

  const handleChange = (e) => {
    setFormValues((prevValues) => ({
      ...prevValues,
      [e.target.name]: e.target.value,
    }));
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("http://localhost:5000/api/order/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          order_id: orderId,
          name: formValues.name,
          phone: formValues.phone,
          email: formValues.email,
          delivery_point: formValues.address,
        }),
      });

      const data = await response.json();
      if (response.ok && data.success) {
        await Swal.fire({
          title: `${data.message}`,
          icon: "success",
          text: `Payable: ৳${data.payable_amount}`,
          draggable: true,
        });
        navigate(`/order/${orderId}`);
      } else {
        alert(`Error: ${ data.error || "Failed to place order" }`);
      }
    } catch (error) {
      alert("Network error: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen px-4 py-10">
      <h1 className="text-3xl font-semibold text-gray-800 text-center mb-6">
        Checkout
      </h1>

      <div className="max-w-md p-6 bg-white rounded-lg shadow-md m-auto">
        <p className="text-gray-500 mb-4">
          Place your order with correct information.
        </p>

        <form onSubmit={handlePlaceOrder} className="space-y-4">
          <input
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 text-black"
            name="name"
            type="text"
            placeholder="Full Name"
            value={formValues.name}
            onChange={handleChange}
            required
          />

          <input
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 text-black"
            name="email"
            type="email"
            placeholder="Email"
            value={formValues.email}
            onChange={handleChange}
            required
          />

          <input
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 text-black"
            name="phone"
            type="text"
            placeholder="Phone Number"
            value={formValues.phone}
            onChange={handleChange}
            required
          />

          <textarea
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 text-black"
            name="address"
            placeholder="Delivery Point"
            value={formValues.address}
            onChange={handleChange}
            rows="4"
            required
          />

          <button
            type="submit"
            disabled={loading}
            className={`w-full p-2 text-gray-50 font-semibold rounded-md transition ease-in-out duration-300 shadow-md ${
          loading
          ? "bg-orange-300 cursor-not-allowed"
            : "bg-orange-500 hover:bg-orange-600"
        }`}
          >
            {loading ? (
              <svg
                className="animate-spin h-5 w-5 mx-auto text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                ></path>
              </svg>
            ) : (
              "Place Order"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CheckoutPage;
