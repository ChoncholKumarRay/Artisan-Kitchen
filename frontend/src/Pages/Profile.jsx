import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("artisan_user"));
    if (!user?.user_id) {
      setLoading(false);
      return;
    }

    const fetchProfile = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/user/profile", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ user_id: user.user_id }),
        });

        const data = await res.json();
        if (data.success) {
          setProfile(data.profile);
        } else {
          alert("Failed to load profile: " + data.error);
        }
      } catch (err) {
        alert("Error: " + err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) {
    return (
      <div className="text-center mt-10 text-gray-600 font-medium">
        Loading profile...
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="text-center mt-10 text-red-500 font-medium">
        No profile found.
      </div>
    );
  }

  return (
    <div className="bg-gray-100 min-h-screen px-4 py-10">
      <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-md">
        <div className="flex flex-col items-center">
          <div className="w-20 h-20 bg-orange-500 rounded-full flex items-center justify-center text-white text-3xl font-bold mb-4">
            {profile.name?.charAt(0).toUpperCase()}
          </div>
          <h2 className="text-xl font-semibold text-gray-800 mb-1">
            {profile.name}
          </h2>
          <p className="text-sm text-gray-600 mb-1">{profile.phone}</p>
          <p className="text-sm text-gray-600 mb-1">{profile.email}</p>
          <p className="text-sm text-gray-600 mb-2">{profile.address}</p>
          <p className="text-sm font-semibold text-green-600 mb-4">
            Balance: ৳{profile.balance}
          </p>
        </div>

        <hr className="my-4" />

        <h3 className="text-lg font-bold text-gray-800 mb-2">Orders</h3>
        <div className="space-y-2">
          {profile.order_list && profile.order_list.length > 0 ? (
            profile.order_list.map((orderId) => (
              <button
                key={orderId}
                onClick={() => navigate(`/order/${orderId}`)}
                className="w-full text-left bg-orange-100 hover:bg-orange-200 text-orange-800 px-4 py-2 rounded-md shadow-sm transition"
              >
                Order ID: {orderId}
              </button>
            ))
          ) : (
            <p className="text-sm text-gray-500">No orders yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
