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
  const { bookings: bookingAPI } = useAppContext();

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function load() {
      try {
        setLoading(true);

        const res = await bookingAPI.hotelDashboard();

        if (res.success) {
          setData(res.dashboardData);
        } else {
          setError(res.message);
        }
      } catch (err) {
        setError(err.response?.data?.message || err.message);
        toast.error(err.response?.data?.message || err.message);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  return (
    <main className="min-h-screen px-6 md:px-16 lg:px-24 py-10 bg-gray-50">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        <div>
          <h1 className="text-2xl font-semibold">Owner Dashboard</h1>
          <p className="text-sm text-gray-600 mt-1">
            Bookings and revenue for your hotel.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <Link
            to="/owner"
            className="px-5 py-2 text-sm rounded-full border hover:bg-gray-100 transition"
          >
            Dashboard
          </Link>

          <Link
            to="/owner/add-room"
            className="px-5 py-2 text-sm rounded-full border hover:bg-gray-100 transition"
          >
            Add Room
          </Link>

          <Link
            to="/owner/manage-rooms"
            className="px-5 py-2 text-sm rounded-full border hover:bg-gray-100 transition"
          >
            Manage Rooms
          </Link>
        </div>
      </div>

      {/* LOADING */}
      {loading && (
        <div className="mt-6 text-gray-600">Loading dashboard...</div>
      )}

      {/* ERROR */}
      {!loading && error && (
        <div className="mt-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-red-700 text-sm">
          {error}
        </div>
      )}

      {/* DATA */}
      {!loading && data && (
        <>
          {/* STATS */}
          <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <StatCard
              icon={assets.totalBookingIcon}
              label="Total bookings"
              value={data.totalBookings}
            />

            <StatCard
              icon={assets.totalRevenueIcon}
              label="Total revenue"
              value={`Rs ${data.totalRevenue}`}
            />
          </div>

          {/* BOOKINGS */}
          <h2 className="text-xl font-semibold mt-12 mb-4">Recent Bookings</h2>

          {/* CONDITION: NO BOOKINGS */}
          {data.bookings?.length === 0 || !data.bookings ? (
            <div className="bg-white border rounded-xl p-6 text-center text-gray-500 shadow-sm">
              No bookings found
            </div>
          ) : (
            <div className="w-full bg-white border rounded-xl shadow-sm overflow-hidden">
              <div className="max-h-80 overflow-y-auto">
                <table className="w-full text-left">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="py-3 px-5 font-medium">User Name</th>
                      <th className="py-3 px-5 font-medium max-sm:hidden">
                        Room Name
                      </th>
                      <th className="py-3 px-5 font-medium text-center">
                        Amount
                      </th>
                      <th className="py-3 px-5 font-medium text-center">
                        Booking Status
                      </th>
                      <th className="py-3 px-5 font-medium text-center">
                        Payment Status
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {data.bookings
                      .sort(
                        (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
                      )
                      .slice(0, 10)
                      .map((item) => (
                        <tr key={item._id}>
                          <td className="py-3 px-5 border-t">
                            {item.user?.username || "Guest"}
                          </td>

                          <td className="py-3 px-5 border-t max-sm:hidden">
                            {item.room?.roomType}
                          </td>

                          <td className="py-3 px-5 border-t text-center">
                            Rs {item.totalPrice}
                          </td>

                          <td className="py-3 px-5 border-t text-center">
                            <span
                              className={`py-1 px-3 text-xs rounded-full ${
                                item.status === "cancelled"
                                  ? "bg-red-100 text-red-600"
                                  : "bg-green-100 text-green-600"
                              }`}
                            >
                              {item.status === "cancelled"
                                ? "Cancelled"
                                : "Booked"}
                            </span>
                          </td>

                          <td className="py-3 px-5 border-t text-center">
                            <span
                              className={`py-1 px-3 text-xs rounded-full ${
                                item.isPaid
                                  ? "bg-green-100 text-green-600"
                                  : "bg-yellow-100 text-yellow-600"
                              }`}
                            >
                              {item.isPaid ? "Completed" : "Pending"}
                            </span>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </>
      )}
    </main>
  );
};

export default OwnerDashboardPage;
