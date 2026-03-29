import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { useAppContext } from "../context/AppContext";

const UserBookingsPage = () => {
  const { bookings: bookingAPI } = useAppContext();

  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // modal state
  const [showModal, setShowModal] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);

  // Proper booking state logic
  const getBookingState = (checkInDate, checkOutDate) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const checkIn = new Date(checkInDate);
    checkIn.setHours(0, 0, 0, 0);

    const checkOut = new Date(checkOutDate);
    checkOut.setHours(0, 0, 0, 0);

    if (today < checkIn) return "upcoming";
    if (today >= checkIn && today <= checkOut) return "ongoing";
    if (today > checkOut) return "completed";
  };

  // cancel allowed only before check-in
  const canCancel = (checkInDate, checkOutDate) => {
    return getBookingState(checkInDate, checkOutDate) === "upcoming";
  };

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

  const handleCancel = async () => {
    if (!selectedBooking) return;

    try {
      const res = await bookingAPI.cancel(selectedBooking._id);

      if (res.success) {
        toast.success("Booking cancelled");

        setBookings((prev) =>
          prev.map((item) =>
            item._id === selectedBooking._id
              ? { ...item, status: "cancelled" }
              : item,
          ),
        );
      } else {
        toast.error(res.message);
      }
    } catch (err) {
      toast.error("Cancel failed");
    } finally {
      setShowModal(false);
      setSelectedBooking(null);
    }
  };

  // FIXED: pass bookingId properly
  const handlePayment = async (bookingId) => {
    try {
      const res = await axios.post("/api/payment/create-session", {
        bookingId,
      });

      window.location.href = res.data.url;
    } catch (err) {
      toast.error("Payment failed");
    }
  };

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
        {bookings.map((b) => {
          const state = getBookingState(b.checkInDate, b.checkOutDate);
          const showActions = b.status !== "cancelled" && state === "upcoming";

          return (
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
                      : ""}{" "}
                    –{" "}
                    {b.checkOutDate
                      ? new Date(b.checkOutDate).toLocaleDateString()
                      : ""}
                    {typeof b.guests === "number"
                      ? ` • Guests: ${b.guests}`
                      : ""}
                  </div>
                </div>

                <div className="text-sm">
                  <div className="text-gray-500">Total</div>
                  <div className="font-semibold">Rs-{b.totalPrice}</div>
                </div>
              </div>

              <div className="mt-3 flex justify-between items-center flex-wrap gap-2 text-xs">
                <div className="flex flex-wrap gap-2">
                  {/* {b.status && (
                    <span className="px-2 py-1 rounded-full bg-gray-100">
                      Status: {b.status}
                    </span>
                  )}

                  {b.paymentMethod && (
                    <span className="px-2 py-1 rounded-full bg-gray-100">
                      Payment: {b.paymentMethod}
                    </span>
                  )} */}

                  {showActions && (
                    <button
                      onClick={() => {
                        if (!b.isPaid) handlePayment(b._id);
                      }}
                      className={`px-3 py-1 rounded text-xs font-medium ${
                        b.isPaid
                          ? "bg-green-500 text-white cursor-default"
                          : "bg-yellow-400 text-black hover:bg-yellow-500"
                      }`}
                    >
                      {b.isPaid ? "Paid" : "Pay Now"}
                    </button>
                  )}
                </div>

                {/* Correct state-based UI */}
                <div>
                  {b.status === "cancelled" ? (
                    <span className="text-gray-500 text-sm">
                      Booking Cancelled
                    </span>
                  ) : state === "completed" ? (
                    <span className="px-3 py-1 bg-blue-500 text-white rounded text-xs">
                      Stay Completed
                    </span>
                  ) : state === "ongoing" ? (
                    <span className="px-3 py-1 bg-green-500 text-white rounded text-xs">
                      Check-in started
                    </span>
                  ) : (
                    showActions && (
                      <button
                        onClick={() => {
                          setSelectedBooking(b);
                          setShowModal(true);
                        }}
                        className="px-3 py-1 bg-red-500 text-white rounded text-xs"
                      >
                        Cancel Booking
                      </button>
                    )
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal */}
      {showModal && selectedBooking && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-96 text-center shadow-lg border">
            <h2 className="text-lg font-semibold mb-4">Confirm Cancellation</h2>

            <p className="mb-6">
              Cancel booking for{" "}
              <strong>
                {selectedBooking.room?.roomType}{" "}
                {selectedBooking.hotel?.name
                  ? `• ${selectedBooking.hotel.name}`
                  : ""}
              </strong>
              ?
            </p>

            <div className="flex justify-center gap-4">
              <button
                className="bg-gray-300 px-4 py-2 rounded"
                onClick={() => setShowModal(false)}
              >
                No
              </button>

              <button
                className="bg-red-500 text-white px-4 py-2 rounded"
                onClick={handleCancel}
              >
                Yes, Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default UserBookingsPage;
