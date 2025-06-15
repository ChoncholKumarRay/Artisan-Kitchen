import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [updatingStatus, setUpdatingStatus] = useState(false);

  const getCookie = (name) => {
    const cookieArr = document.cookie.split(";");
    for (let cookie of cookieArr) {
      const [key, value] = cookie.trim().split("=");
      if (key === name) return value;
    }
    return null;
  };

  const token = getCookie("artisan_token");

  useEffect(() => {
    if (!token) {
      navigate("/admin/login");
      return;
    }

    const fetchOrders = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/admin/dashboard", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();
        if (res.ok && data.success) {
          setOrders(data.orders);
        } else {
          alert("Failed to load orders");
        }
      } catch (err) {
        alert("Error loading orders");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [navigate]);

  const formatStatus = (statusArr) => {
    if (!statusArr || statusArr.length === 0) return "N/A";
    return statusArr[statusArr.length - 1].status;
  };

  const handleStatusChange = async (orderId, newStatus) => {
    setUpdatingStatus(true);
    try {
      const res = await fetch("http://localhost:5000/api/order/update-status", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ order_id: orderId, status: newStatus }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        alert("Status updated");
        setSelectedOrder(null); // close popup
        window.location.reload(); // simple way to re-fetch
      } else {
        alert(data.error || "Failed to update status");
      }
    } catch (err) {
      alert("Server error");
    } finally {
      setUpdatingStatus(false);
    }
  };

  const renderItems = (label, items) =>
    items?.length > 0 && (
      <div className="mb-2">
        <div className="font-semibold underline">{label}:</div>
        <ul className="ml-4 list-disc text-sm text-gray-700">
          {items.map(({ item_id, quantity }, idx) => (
            <li key={idx}>
              {item_id?.title || "Unknown Item"} — Qty: {quantity}
            </li>
          ))}
        </ul>
      </div>
    );

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-orange-600 mb-6">Order List</h2>
      {loading ? (
        <p className="text-gray-600">Loading...</p>
      ) : orders.length === 0 ? (
        <p className="text-gray-600">No orders found.</p>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div
              key={order._id}
              className="bg-white shadow rounded-xl p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center"
            >
              <div className="text-sm text-gray-700 space-y-1">
                <div>
                  <span className="font-semibold">Order ID:</span> {order._id}
                </div>
                <div>
                  <span className="font-semibold">Name:</span>{" "}
                  {order.name || order.user_id?.name}
                </div>
                <div>
                  <span className="font-semibold">Amount:</span> ৳
                  {order.payable_amount}
                </div>
                <div>
                  <span className="font-semibold">Method:</span> {order.method}
                </div>
                <div>
                  <span className="font-semibold">Status:</span>{" "}
                  {formatStatus(order.order_status)}
                </div>
              </div>
              <button
                onClick={() => setSelectedOrder(order)}
                className="mt-4 sm:mt-0 bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600"
              >
                View More
              </button>
            </div>
          ))}
        </div>
      )}

      {selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-3xl w-full relative overflow-y-auto max-h-[80vh]">
            <button
              onClick={() => setSelectedOrder(null)}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-xl"
            >
              &times;
            </button>
            <h3 className="text-xl font-bold text-orange-600 mb-4">
              Order Details
            </h3>

            <div className="text-sm text-gray-800 space-y-2">
              <p>
                <span className="font-semibold">Order ID:</span>{" "}
                {selectedOrder._id}
              </p>
              <p>
                <span className="font-semibold">Name:</span>{" "}
                {selectedOrder.name || selectedOrder.user_id?.name}
              </p>
              <p>
                <span className="font-semibold">Phone:</span>{" "}
                {selectedOrder.phone || selectedOrder.user_id?.phone}
              </p>
              <p>
                <span className="font-semibold">Address:</span>{" "}
                {selectedOrder.delivery_point}
              </p>

              {renderItems("Breakfast Items", selectedOrder.breakfast_items)}
              {renderItems("Lunch Items", selectedOrder.lunch_items)}
              {renderItems("Dinner Items", selectedOrder.dinner_items)}

              <p>
                <span className="font-semibold">Total Price:</span> ৳
                {selectedOrder.total_price}
              </p>
              <p>
                <span className="font-semibold">Payable Amount:</span> ৳
                {selectedOrder.payable_amount}
              </p>

              <div>
                <label className="font-semibold mr-2">Update Status:</label>
                <div className="flex items-center gap-2 mt-2">
                  <select
                    className="border border-gray-300 rounded px-2 py-1"
                    value={
                      selectedOrder.newStatus ||
                      formatStatus(selectedOrder.order_status)
                    }
                    onChange={(e) =>
                      setSelectedOrder({
                        ...selectedOrder,
                        newStatus: e.target.value,
                      })
                    }
                    disabled={updatingStatus}
                  >
                    <option disabled value="">
                      Select status
                    </option>
                    <option value="Confirmed">Confirmed</option>
                    <option value="Paid">Paid</option>
                    <option value="Delivered">Delivered</option>
                    <option value="Canceled">Canceled</option>
                  </select>
                  <button
                    className="bg-orange-500 text-white px-3 py-1 rounded hover:bg-orange-600"
                    onClick={() =>
                      handleStatusChange(
                        selectedOrder._id,
                        selectedOrder.newStatus
                      )
                    }
                    disabled={!selectedOrder.newStatus || updatingStatus}
                  >
                    Update
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
