import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { assets } from "../assets/assets";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";

const StatCard = ({ icon, label, value }) => (
  <div className="rounded-2xl border border-gray-100 bg-white p-4 flex items-center gap-3">
    <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center">
      <img src={icon} alt="" className="w-5 h-5" />
    </div>
    <div>
      <div className="text-xs text-gray-500">{label}</div>
      <div className="text-lg font-semibold">{value}</div>
    </div>
  </div>
);

const OwnerDashboardPage = () => {
  const { axios, getToken } = useAppContext();

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        setLoading(true);

        const token = await getToken();

        const { data } = await axios.get("/api/bookings/hotel", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (data.success) {
          setData(data.dashboardData);
        } else {
          setError(data.message);
        }
      } catch (err) {
        setError(err.response?.data?.message || err.message);
        toast.error(err.response?.data?.message || err.message);
      } finally {
        setLoading(false);
      }
    };

    loadDashboard();
  }, []);

  return (
    <main className="px-4 md:px-16 lg:px-24 xl:px-32 py-8">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold">Owner dashboard</h1>
          <p className="text-sm text-gray-600 mt-1">
            Bookings and revenue for your hotel.
          </p>
        </div>

        <Link
          to="/owner"
          className="border border-gray-300 rounded-full px-5 py-2.5 text-sm"
        >
          Dashboard
        </Link>
        <Link
          to="/owner/add-room"
          className="border border-gray-300 rounded-full px-5 py-2.5 text-sm"
        >
          Add Room
        </Link>
        <Link
          to="/owner/manage-rooms"
          className="border border-gray-300 rounded-full px-5 py-2.5 text-sm"
        >
          Manage Rooms
        </Link>
      </div>

      {loading && (
        <div className="mt-6 text-gray-600">Loading dashboard...</div>
      )}

      {!loading && error && (
        <div className="mt-6 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-amber-800 text-sm">
          {error}
        </div>
      )}

      {!loading && data && (
        <>
          <div className="mt-6 grid sm:grid-cols-2 gap-4">
            <StatCard
              icon={assets.totalBookingIcon}
              label="Total bookings"
              value={data.totalBookings}
            />

            <StatCard
              icon={assets.totalRevenueIcon}
              label="Total revenue"
              value={`Rs-${data.totalRevenue}`}
            />
          </div>

          <h2 className="mt-10 text-lg font-semibold">Recent bookings</h2>

          <h2 className="text-xl text-blue-950/70 font-medium mb-5 mt-10">
            Recent Bookings
          </h2>

          <div className="w-full max-w-3xl text-left border border-gray-300 rounded-lg max-h-80 overflow-y-scroll">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="py-3 px-4 text-gray-800 font-medium">
                    User Name
                  </th>

                  <th className="py-3 px-4 text-gray-800 font-medium max-sm:hidden">
                    Room Name
                  </th>

                  <th className="py-3 px-4 text-gray-800 font-medium text-center">
                    Total Amount
                  </th>

                  <th className="py-3 px-4 text-gray-800 font-medium text-center">
                    Payment Status
                  </th>
                </tr>
              </thead>

              <tbody>
                {(data.bookings || []).map((item) => (
                  <tr key={item._id}>
                    <td className="py-3 px-4 border-t border-gray-300">
                      {item.user?.username || "Guest"}
                    </td>

                    <td className="py-3 px-4 text-gray-700 border-t border-gray-300 max-sm:hidden">
                      {item.room?.roomType}
                    </td>

                    <td className="py-3 px-4 text-gray-700 border-t border-gray-300 text-center">
                      Rs {item.totalPrice}
                    </td>

                    <td className="py-3 px-4 border-t border-gray-300 flex">
                      <button
                        className={`py-1 px-3 text-xs rounded-full mx-auto ${
                          item.isPaid
                            ? "bg-green-200 text-green-600"
                            : "bg-amber-200 text-yellow-600"
                        }`}
                      >
                        {item.isPaid ? "Completed" : "Pending"}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </main>
  );
};

export default OwnerDashboardPage;
