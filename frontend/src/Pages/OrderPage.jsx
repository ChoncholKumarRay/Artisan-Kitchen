import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const OrderPage = () => {
  const { orderId } = useParams();
  const [statusList, setStatusList] = useState([]);
  const [payableAmount, setPayableAmount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrderStatus = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/order/status", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ order_id: orderId }),
        });

        const data = await response.json();

        if (response.ok && data.success) {
          setStatusList(data.order_status);
          setPayableAmount(data.payable_amount);
        } else {
          console.error(data.error);
        }
      } catch (err) {
        console.error("Failed to fetch status:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrderStatus();
  }, [orderId]);

  return (
    <div className="bg-gray-100 min-h-screen px-4 py-10">
      <h1 className="text-3xl font-semibold text-gray-800 text-center mb-6">
        Order Tracking
      </h1>

      <div className="max-w-xl mx-auto bg-white rounded-lg shadow p-6">
        <p className="text-gray-600 mb-6">
          Payable Amount:{" "}
          <span className="font-bold text-orange-600">৳{payableAmount}</span>
        </p>

        {loading ? (
          <p className="text-center text-gray-500">Loading status...</p>
        ) : statusList.length ? (
          <div className="relative border-l-2 border-orange-400 pl-4 space-y-6">
            {statusList.map((status, index) => (
              <div key={index} className="relative pl-6">
                <div className="absolute left-0 top-1 w-5 h-5 bg-orange-500 rounded-full border-4 border-white"></div>
                <div>
                  <p className="font-semibold text-gray-800">{status.status}</p>
                  <p className="text-sm text-gray-500">
                    {new Date(status.time).toLocaleString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500">No status available.</p>
        )}
      </div>
    </div>
  );
};

export default OrderPage;
