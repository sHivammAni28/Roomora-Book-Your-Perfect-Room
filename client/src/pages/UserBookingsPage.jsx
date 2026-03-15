import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useAppContext } from "../context/AppContext";

const UserBookingsPage = () => {
  const { bookings: bookingAPI } = useAppContext();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadBookings = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await bookingAPI.listUserBookings();

        if (!data.success) {
          setError(data.message || "Failed to load bookings");
          return;
        }

        setBookings(Array.isArray(data.bookings) ? data.bookings : []);
      } catch (err) {
        const message = err.response?.data?.message || err.message;
        setError(message);
        toast.error(message);
      } finally {
        setLoading(false);
      }
    };

    loadBookings();
  }, [bookingAPI]);

  return (
    <main className="px-4 md:px-16 lg:px-24 xl:px-32 py-8">
      <h1 className="text-2xl font-semibold">My bookings</h1>

      {loading && <div className="mt-6 text-gray-600">Loading bookings...</div>}

      {!loading && error && (
        <div className="mt-6 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-amber-800 text-sm">
          {error}
        </div>
      )}

      {!loading && bookings.length === 0 && (
        <div className="mt-6 text-gray-600">No bookings found.</div>
      )}

      <div className="mt-6 grid gap-4">
        {bookings.map((b) => (
          <div
            key={b._id}
            className="rounded-2xl border border-gray-100 bg-white p-4"
          >
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
              <div>
                <div className="font-medium">
                  {b.room?.roomType || "Room"}
                  {b.hotel?.name ? ` • ${b.hotel.name}` : ""}
                </div>

                <div className="text-sm text-gray-600 mt-1">
                  {b.checkInDate
                    ? new Date(b.checkInDate).toLocaleDateString()
                    : ""}

                  {" – "}

                  {b.checkOutDate
                    ? new Date(b.checkOutDate).toLocaleDateString()
                    : ""}

                  {typeof b.guests === "number" ? ` • Guests: ${b.guests}` : ""}
                </div>
              </div>

              <div className="text-sm">
                <div className="text-gray-500">Total</div>
                <div className="font-semibold">${b.totalPrice}</div>
              </div>
            </div>

            <div className="mt-3 flex flex-wrap gap-2 text-xs">
              {b.status && (
                <span className="px-2 py-1 rounded-full bg-gray-100">
                  Status: {b.status}
                </span>
              )}

              {b.paymentMethod && (
                <span className="px-2 py-1 rounded-full bg-gray-100">
                  Payment: {b.paymentMethod}
                </span>
              )}

              {typeof b.isPaid === "boolean" && (
                <span className="px-2 py-1 rounded-full bg-gray-100">
                  Paid: {b.isPaid ? "Yes" : "No"}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </main>
  );
};

export default UserBookingsPage;
